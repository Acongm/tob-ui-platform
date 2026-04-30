# ToB UI Platform

BUI 二开融合层 + AntD/MUI 迁移治理 + 组件元数据 + 类 `antd-cli` 的 AI 组件选择工具。

## 目标

这个仓库用于搭建一套面向 ToB 项目的 UI 治理平台：

- `@tob-ui/bui`：基于 Backstage UI / BUI 二开的基础组件入口。
- `@tob-ui/ui-bridge`：业务项目统一 import 入口，内部融合 BUI、AntD 与 legacy MUI。
- `@tob-ui/theme`：统一 design tokens，并向 BUI / AntD / MUI 做主题适配。
- `@tob-ui/ui-cli`：类似 `@ant-design/cli` 的组件知识查询、recipe 推荐、usage/lint 工具。
- `@tob-ui/eslint-plugin-ui-bridge`：约束业务项目不要随意直接 import 多套 UI 库。
- `packages/ai-skill`：给 Codex / Claude / Cursor 等 agent 使用的组件选择规则。

## 当前状态

MVP 初始化中。
