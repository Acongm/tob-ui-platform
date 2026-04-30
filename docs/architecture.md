# Architecture

`tob-ui-platform` 的目标不是再造一套孤立 UI 库，而是在 BUI 二开、AntD 存量能力、MUI v4 legacy 迁移之间增加一层可治理的统一入口。

## 分层

```txt
business apps
  -> @tob-ui/ui-bridge
  -> @tob-ui/bui / antd / legacy mui adapters
  -> @tob-ui/theme
```

## 核心包

- `@tob-ui/bui`：BUI 二开组件入口。当前 MVP 先提供基础 Button、Card、Stack 等占位实现，后续替换为基于 Backstage UI 的真实实现。
- `@tob-ui/ui-bridge`：业务项目唯一推荐 import 入口。它决定某个组件底层来自 BUI、AntD 还是 legacy adapter。
- `@tob-ui/theme`：统一 design token。当前基于 Starbucks 风格做了二次抽象，后续可接入 `https://getdesign.md/starbucks/design-md` 的完整 token。
- `@tob-ui/ui-cli`：类似 `@ant-design/cli`，给 AI 和开发者查询组件知识、recipe、推荐组件组合、扫描违规 import。
- `@tob-ui/eslint-plugin-ui-bridge`：把 import 治理做成 lint 规则。
- `@tob-ui/ai-skill`：给 Codex、Claude、Cursor 等 agent 使用的固定流程。

## 治理原则

1. 业务代码优先从 `@tob-ui/ui-bridge` 导入。
2. 核心交互组件禁止直接从 `antd`、`@material-ui/core`、`@backstage/ui` 导入。
3. AntD 暂时保留为底层实现，不急于移除。
4. MUI v4 只作为 legacy adapter 存在。
5. Storybook 给人看，`ui-cli` 的 JSON 元数据给 AI 看，两者尽量共享同一份组件元数据。
