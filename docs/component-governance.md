# Component Governance

## 目标

通过 `@tob-ui/ui-bridge` 收口业务项目的 UI import，降低开发者在 BUI、AntD、MUI v4 之间自由选择导致的不一致。

## 分级策略

### Level 0: 强制使用 ui-bridge

这些组件影响 ToB 页面的一致性，新代码必须从 `@tob-ui/ui-bridge` 导入：

- `Page`
- `Button`
- `SearchForm`
- `Table`
- `StatusTag`

### Level 1: ui-bridge 优先，底层暂时可由 AntD 实现

这些能力可以先适配 AntD，业务代码仍然只依赖 `@tob-ui/ui-bridge`：

- `Form`
- `Modal`
- `Drawer`
- `DatePicker`
- `Upload`
- `Select`

### Level 2: 临时允许直接使用底层库

低风险辅助组件可在过渡期灰度允许，但需要被 usage/lint 记录：

- `Tooltip`
- `Popover`
- `Spin`
- `Skeleton`
- `Divider`

### Level 3: legacy only

MUI v4 只允许在 legacy adapter 或存量迁移分支中出现，不允许新业务代码直接导入。

## 禁止示例

```tsx
import { Button, Table, Form } from 'antd';
import { Button as MuiButton } from '@material-ui/core';
```

## 推荐示例

```tsx
import { Page, SearchForm, Table, Button, StatusTag } from '@tob-ui/ui-bridge';
```

## AI 生成代码策略

AI 在生成代码前应该先查询：

```bash
tob-ui suggest "用户管理列表页" --format json
tob-ui recipe crud-page --format json
tob-ui info Table --format json
```

生成后执行：

```bash
tob-ui lint src --format json
```
