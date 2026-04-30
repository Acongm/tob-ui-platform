# AI Codegen Workflow

这个仓库的 AI 生成策略不是让模型自由写 React，而是让模型先查询本地组件知识和 recipe。

## 标准流程

```txt
需求
  -> tob-ui suggest
  -> tob-ui recipe
  -> tob-ui info
  -> 生成 React 代码
  -> tob-ui lint
```

## 示例

需求：生成一个用户管理列表页。

```bash
tob-ui suggest "用户管理列表页，支持搜索、新增、状态展示" --format json
```

如果返回 `crud-page`：

```bash
tob-ui recipe crud-page --format json
```

再查询组件约束：

```bash
tob-ui info Page --format json
tob-ui info SearchForm --format json
tob-ui info Table --format json
tob-ui info Button --format json
tob-ui info StatusTag --format json
```

## 生成代码约束

- 所有核心组件从 `@tob-ui/ui-bridge` 导入。
- 不直接从 `antd` 导入 `Button/Table/Form/Modal/Tag`。
- 不直接从 `@material-ui/core` 导入新代码。
- 不直接覆盖 `.ant-*`、`.Mui-*` 类名。
- 页面结构优先遵循 recipe。

## 后续增强

- 增加 `ModalForm` recipe。
- 增加 `ConfirmButton`，规范危险操作二次确认。
- 增加 `usage` 命令统计项目内 BUI/AntD/MUI 使用比例。
- 增加 MCP server，让 Codex、Claude、Cursor 直接调用组件知识。
