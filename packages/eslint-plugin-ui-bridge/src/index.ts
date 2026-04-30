type ImportDeclarationNode = {
  source: { value: string };
  specifiers?: Array<{ imported?: { name: string }; local?: { name: string } }>;
};

type RuleContext = {
  report: (input: { node: unknown; message: string }) => void;
};

const restrictedImports: Array<{ from: string; names: string[]; replacement: string; reason: string }> = [
  {
    from: 'antd',
    names: ['Button', 'Table', 'Form', 'Modal', 'Drawer', 'Tag'],
    replacement: '@tob-ui/ui-bridge',
    reason: '核心 ToB 交互组件必须从 @tob-ui/ui-bridge 导入，避免 AntD 自由组合导致交互和样式不一致。'
  },
  {
    from: '@material-ui/core',
    names: ['Button', 'Table', 'Grid', 'Dialog', 'Chip', 'Container'],
    replacement: '@tob-ui/ui-bridge',
    reason: 'MUI v4 属于 legacy，只允许存量 adapter 内部使用。'
  },
  {
    from: '@backstage/ui',
    names: ['Button'],
    replacement: '@tob-ui/ui-bridge',
    reason: '业务代码不直接依赖底层 BUI，统一通过 ui-bridge 暴露。'
  }
];

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
        const rule = restrictedImports.find(item => item.from === source);
        if (!rule) return;

        const importedNames = (node.specifiers ?? [])
          .map(specifier => specifier.imported?.name ?? specifier.local?.name)
          .filter(Boolean) as string[];

        const matched = importedNames.filter(name => rule.names.includes(name));
        if (matched.length === 0) return;

        context.report({
          node,
          message: `${matched.join(', ')} should be imported from ${rule.replacement}. ${rule.reason}`
        });
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
