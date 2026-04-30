export type ComponentMeta = {
  name: string;
  packageName: string;
  source: 'bui' | 'antd' | 'legacy-mui' | 'bridge';
  status: 'stable' | 'experimental' | 'legacy-adapter';
  category: string;
  description: string;
  replaces: string[];
  allowedImport: string;
  forbiddenImports: Array<{ from: string; names: string[]; reason: string }>;
  aiGuidance: string[];
};

export type RecipeMeta = {
  name: string;
  description: string;
  scenario: string;
  imports: string[];
  components: string[];
  avoid: string[];
  notes: string[];
};

export const components: ComponentMeta[] = [
  {
    name: 'Page',
    packageName: '@tob-ui/ui-bridge',
    source: 'bridge',
    status: 'stable',
    category: 'layout',
    description: '统一页面容器，负责标题、描述、操作区、页面背景和基础布局。',
    replaces: ['PageHeader', '@material-ui/core/Container', 'antd/PageHeader'],
    allowedImport: '@tob-ui/ui-bridge',
    forbiddenImports: [
      { from: '@material-ui/core', names: ['Container'], reason: '页面容器统一由 Page 管理，避免 MUI v4 layout 残留。' }
    ],
    aiGuidance: ['页面级标题必须使用 Page.title。', '主操作按钮放入 Page.actions。', '不要在业务页面重复手写 header layout。']
  },
  {
    name: 'Button',
    packageName: '@tob-ui/ui-bridge',
    source: 'bui',
    status: 'stable',
    category: 'general',
    description: '统一按钮组件，封装企业 variant、权限占位、loading 与基础样式。',
    replaces: ['antd/Button', '@material-ui/core/Button', '@backstage/ui/Button'],
    allowedImport: '@tob-ui/ui-bridge',
    forbiddenImports: [
      { from: 'antd', names: ['Button'], reason: '按钮样式和主次操作语义需要统一。' },
      { from: '@material-ui/core', names: ['Button'], reason: 'MUI v4 Button 属于 legacy，不允许新代码使用。' },
      { from: '@backstage/ui', names: ['Button'], reason: '业务代码应该从 ui-bridge 导入，避免底层 BUI API 泄漏。' }
    ],
    aiGuidance: ['提交、创建、保存使用 variant=primary。', '删除、回滚等危险操作使用 variant=danger。', '异步按钮必须传 loading 或接入统一 action hook。']
  },
  {
    name: 'SearchForm',
    packageName: '@tob-ui/ui-bridge',
    source: 'bridge',
    status: 'experimental',
    category: 'data-entry',
    description: '列表页查询区统一组件，后续可适配 AntD Form 或 schema renderer。',
    replaces: ['antd/Form', '@material-ui/core/Grid'],
    allowedImport: '@tob-ui/ui-bridge',
    forbiddenImports: [
      { from: 'antd', names: ['Form'], reason: '列表页查询区优先使用 SearchForm，避免布局和重置逻辑不一致。' }
    ],
    aiGuidance: ['CRUD 列表页优先使用 SearchForm。', '搜索按钮和重置按钮放到 actions。', '不要在列表页顶部直接手写 antd Form layout。']
  },
  {
    name: 'Table',
    packageName: '@tob-ui/ui-bridge',
    source: 'bridge',
    status: 'experimental',
    category: 'data-display',
    description: '统一表格入口，MVP 为轻量实现，后续可适配 AntD Table 或 BUI Table。',
    replaces: ['antd/Table', '@material-ui/core/Table'],
    allowedImport: '@tob-ui/ui-bridge',
    forbiddenImports: [
      { from: 'antd', names: ['Table'], reason: '表格需要统一 loading、empty、pagination、rowKey 和 density 规则。' },
      { from: '@material-ui/core', names: ['Table'], reason: 'MUI v4 Table 属于 legacy，不允许新代码使用。' }
    ],
    aiGuidance: ['业务表格必须指定 rowKey。', '列表页表格优先和 SearchForm 组成 search-table recipe。', '不要直接从 antd 导入 Table。']
  },
  {
    name: 'StatusTag',
    packageName: '@tob-ui/ui-bridge',
    source: 'bridge',
    status: 'stable',
    category: 'data-display',
    description: '统一状态标签，用于审批状态、工单状态、发布状态等 ToB 高频场景。',
    replaces: ['antd/Tag', '@material-ui/core/Chip'],
    allowedImport: '@tob-ui/ui-bridge',
    forbiddenImports: [
      { from: 'antd', names: ['Tag'], reason: '业务状态语义优先使用 StatusTag，普通标签可灰度允许。' },
      { from: '@material-ui/core', names: ['Chip'], reason: 'MUI v4 Chip 属于 legacy，不允许新代码使用。' }
    ],
    aiGuidance: ['状态字段渲染优先使用 StatusTag。', '成功、失败、警告、处理中必须映射到固定 status。']
  }
];

export const recipes: RecipeMeta[] = [
  {
    name: 'crud-page',
    description: '标准 ToB CRUD 页面：Page + SearchForm + Table + Button。',
    scenario: '创建、查询、编辑、删除资源列表。',
    imports: ["import { Page, SearchForm, Table, Button, StatusTag } from '@tob-ui/ui-bridge';"],
    components: ['Page', 'SearchForm', 'Table', 'Button', 'StatusTag'],
    avoid: ['不要直接从 antd 导入 Button/Table/Form。', '不要直接从 @material-ui/core 导入 Button/Table/Grid。', '不要手写页面 header、搜索区和表格容器。'],
    notes: ['主按钮放到 Page.actions。', '搜索区使用 SearchForm。', '表格必须指定 rowKey。', '危险操作必须二次确认，后续沉淀 ConfirmButton。']
  },
  {
    name: 'search-table',
    description: '搜索区 + 表格的列表模式。',
    scenario: '只有查询和列表展示，没有新增编辑弹窗。',
    imports: ["import { Page, SearchForm, Table, Button } from '@tob-ui/ui-bridge';"],
    components: ['Page', 'SearchForm', 'Table', 'Button'],
    avoid: ['不要直接使用 antd Form + antd Table 拼装。'],
    notes: ['搜索区负责筛选条件。', '表格负责展示结果。', '分页、loading、empty 作为 Table 后续增强能力。']
  }
];

export const forbiddenImportRules = components.flatMap(component =>
  component.forbiddenImports.map(rule => ({
    component: component.name,
    ...rule
  }))
);
