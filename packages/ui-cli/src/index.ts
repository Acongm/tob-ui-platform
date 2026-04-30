#!/usr/bin/env node
import { existsSync, readFileSync, readdirSync, statSync } from 'node:fs';
import { join } from 'node:path';
import { components, findComponent, findRecipe, forbiddenImportRules, recipes } from '@tob-ui/ui-meta';

const args = process.argv.slice(2);
const command = args[0] ?? 'help';

const hasJson = args.includes('--format') && args.includes('json');

function print(value: unknown) {
  if (hasJson) {
    console.log(JSON.stringify(value, null, 2));
    return;
  }
  if (typeof value === 'string') {
    console.log(value);
    return;
  }
  console.log(JSON.stringify(value, null, 2));
}

function help() {
  print(`tob-ui commands:\n\n  list [--format json]\n  info <Component> [--format json]\n  recipe <name> [--format json]\n  suggest <requirement> [--format json]\n  lint <dir> [--format json]\n  usage <dir> [--format json]\n`);
}

function list() {
  print({ components: components.map(({ name, packageName, source, status, category, description }) => ({ name, packageName, source, status, category, description })) });
}

function info(name: string | undefined) {
  const component = findComponent(String(name ?? ''));
  if (!component) {
    print({ error: `Component not found: ${name}`, available: components.map(item => item.name) });
    process.exitCode = 1;
    return;
  }
  print(component);
}

function recipe(name: string | undefined) {
  const target = findRecipe(String(name ?? ''));
  if (!target) {
    print({ error: `Recipe not found: ${name}`, available: recipes.map(item => item.name) });
    process.exitCode = 1;
    return;
  }
  print(target);
}

function suggest(requirement: string | undefined) {
  const text = String(requirement ?? '').toLowerCase();
  const selected = text.includes('弹窗') || text.includes('表单') || text.includes('modal')
    ? recipes.find(item => item.name === 'modal-form') ?? recipes[0]
    : text.includes('crud') || text.includes('列表') || text.includes('管理') || text.includes('新增')
      ? recipes.find(item => item.name === 'crud-page') ?? recipes[0]
      : recipes.find(item => item.name === 'search-table') ?? recipes[0];

  print({
    requirement,
    recommendedRecipe: selected.name,
    reason: selected.description,
    imports: selected.imports,
    components: selected.components,
    avoid: selected.avoid,
    nextCommands: [
      `tob-ui recipe ${selected.name} --format json`,
      ...selected.components.map(component => `tob-ui info ${component} --format json`)
    ]
  });
}

function walk(dir: string): string[] {
  if (!existsSync(dir)) return [];
  const entries = readdirSync(dir);
  return entries.flatMap(entry => {
    const path = join(dir, entry);
    const stat = statSync(path);
    if (stat.isDirectory()) {
      if (['node_modules', 'dist', 'build', '.git'].includes(entry)) return [];
      return walk(path);
    }
    if (/\.(ts|tsx|js|jsx)$/.test(entry)) return [path];
    return [];
  });
}

function collectImports(files: string[]) {
  const imports: Array<{ file: string; source: string; names: string[] }> = [];
  const importRegex = /import\s*\{([^}]+)\}\s*from\s*['"]([^'"]+)['"]/g;

  for (const file of files) {
    const content = readFileSync(file, 'utf8');
    for (const match of content.matchAll(importRegex)) {
      const names = match[1]
        .split(',')
        .map(name => name.trim().split(/\s+as\s+/i)[0]?.trim())
        .filter(Boolean) as string[];
      imports.push({ file, source: match[2], names });
    }
  }
  return imports;
}

function lint(dir = 'src') {
  const files = walk(dir);
  const violations = files.flatMap(file => {
    const content = readFileSync(file, 'utf8');
    return forbiddenImportRules.flatMap(rule => {
      const matched = rule.names.filter(name => {
        const namedImport = new RegExp(`import\\s*\\{[^}]*\\b${name}\\b[^}]*\\}\\s*from\\s*['\"]${rule.from.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}['\"]`);
        return namedImport.test(content);
      });
      return matched.map(name => ({
        file,
        from: rule.from,
        name,
        component: rule.component,
        message: rule.reason,
        suggestion: `Use ${rule.component} from @tob-ui/ui-bridge instead.`
      }));
    });
  });
  print({ filesScanned: files.length, violations });
  if (violations.length > 0) process.exitCode = 1;
}

function usage(dir = 'src') {
  const files = walk(dir);
  const imports = collectImports(files);
  const groups = {
    bridge: imports.filter(item => item.source === '@tob-ui/ui-bridge'),
    bui: imports.filter(item => item.source === '@tob-ui/bui' || item.source === '@backstage/ui'),
    antd: imports.filter(item => item.source === 'antd' || item.source.startsWith('antd/')),
    muiV4: imports.filter(item => item.source === '@material-ui/core' || item.source.startsWith('@material-ui/')),
    other: imports.filter(item => !['@tob-ui/ui-bridge', '@tob-ui/bui', '@backstage/ui', 'antd', '@material-ui/core'].includes(item.source) && !item.source.startsWith('antd/') && !item.source.startsWith('@material-ui/'))
  };

  print({
    filesScanned: files.length,
    totals: {
      bridge: groups.bridge.length,
      bui: groups.bui.length,
      antd: groups.antd.length,
      muiV4: groups.muiV4.length,
      other: groups.other.length
    },
    details: groups
  });
}

switch (command) {
  case 'list':
    list();
    break;
  case 'info':
    info(args[1]);
    break;
  case 'recipe':
    recipe(args[1]);
    break;
  case 'suggest':
    suggest(args.slice(1).filter(arg => arg !== '--format' && arg !== 'json').join(' '));
    break;
  case 'lint':
    lint(args[1] ?? 'src');
    break;
  case 'usage':
    usage(args[1] ?? 'src');
    break;
  default:
    help();
}
