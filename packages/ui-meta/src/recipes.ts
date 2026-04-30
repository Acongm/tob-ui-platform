import type { RecipeMeta } from './types';

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
  },
  {
    name: 'modal-form',
    description: '新增/编辑弹窗表单模式：Button + Modal + Form。',
    scenario: '列表页内新增、编辑、复制配置等弹窗表单操作。',
    imports: ["import { Button, Modal, Form } from '@tob-ui/ui-bridge';"],
    components: ['Button', 'Modal', 'Form'],
    avoid: ['不要直接手写 antd Modal + antd Form。', '不要用 MUI Dialog 实现新弹窗。'],
    notes: ['MVP 阶段 Modal/Form 为 planned adapter。', '后续应沉淀 ModalForm，统一 open、submit、loading、reset 行为。']
  }
];
