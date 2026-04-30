export type AntdAdapterStatus = 'planned' | 'ready';

export type AntdAdapterMeta = {
  name: string;
  status: AntdAdapterStatus;
  source: 'antd';
  bridgeComponent: string;
  reason: string;
};

export const antdAdapters: AntdAdapterMeta[] = [
  {
    name: 'Form',
    status: 'ready',
    source: 'antd',
    bridgeComponent: 'Form',
    reason: 'AntD Form 生态成熟，短期作为表单能力底座，但业务代码从 ui-bridge 导入。'
  },
  {
    name: 'Modal',
    status: 'ready',
    source: 'antd',
    bridgeComponent: 'Modal',
    reason: '迁移期允许复用 AntD Modal 的能力，交互语义由 ui-bridge 约束。'
  },
  {
    name: 'Drawer',
    status: 'ready',
    source: 'antd',
    bridgeComponent: 'Drawer',
    reason: '详情/编辑抽屉是 ToB 高频模式，先通过 adapter 收口。'
  },
  {
    name: 'DatePicker',
    status: 'ready',
    source: 'antd',
    bridgeComponent: 'DatePicker',
    reason: '日期选择器复杂度高，短期保留 AntD 底层实现。'
  },
  {
    name: 'Select',
    status: 'ready',
    source: 'antd',
    bridgeComponent: 'Select',
    reason: '选择器与远程 options、搜索、清空等业务逻辑强相关，需统一封装。'
  },
  {
    name: 'Upload',
    status: 'ready',
    source: 'antd',
    bridgeComponent: 'Upload',
    reason: '上传涉及权限、接口协议、错误处理，必须通过 bridge 收口。'
  }
];
