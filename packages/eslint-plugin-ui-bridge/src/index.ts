import { forbiddenImportRules } from '@tob-ui/ui-meta';

type ImportDeclarationNode = {
  source: { value: string };
  specifiers?: Array<{ imported?: { name: string }; local?: { name: string } }>;
};

type RuleContext = {
  report: (input: { node: unknown; message: string }) => void;
};

const noRawUiImport = {
  meta: {
    type: 'problem',
    docs: {
      description: 'Disallow raw AntD, MUI v4 and BUI imports for governed ToB components.'
    },
    messages: {}
  },
  create(context: RuleContext) {
    return {
      ImportDeclaration(node: ImportDeclarationNode) {
        const source = node.source.value;
        const rules = forbiddenImportRules.filter(item => item.from === source);
        if (rules.length === 0) return;

        const importedNames = (node.specifiers ?? [])
          .map(specifier => specifier.imported?.name ?? specifier.local?.name)
          .filter(Boolean) as string[];

        for (const rule of rules) {
          const matched = importedNames.filter(name => rule.names.includes(name));
          if (matched.length === 0) continue;

          context.report({
            node,
            message: `${matched.join(', ')} should be imported from @tob-ui/ui-bridge as ${rule.component}. ${rule.reason}`
          });
        }
      }
    };
  }
};

export const rules = {
  'no-raw-ui-import': noRawUiImport
};

export default {
  rules,
  configs: {
    recommended: {
      plugins: ['@tob-ui/ui-bridge'],
      rules: {
        '@tob-ui/ui-bridge/no-raw-ui-import': 'error'
      }
    }
  }
};
