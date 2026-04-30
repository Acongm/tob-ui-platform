# ToB UI Platform

BUI 二开融合层 + AntD/MUI 迁移治理 + 组件元数据 + 类 `antd-cli` 的 AI 组件选择工具。

## 项目目标

这个仓库不是单纯再造一个 UI 库，而是在 Backstage/BUI 二开、AntD 存量能力、MUI v4 legacy 迁移之间增加一层统一治理入口：

- 统一业务项目 import 来源。
- 统一 ToB 页面交互模式。
- 统一主题 token 和多 UI 库适配。
- 通过 CLI 给 AI agent 查询组件知识、recipe 和禁用规则。
- 通过 lint/usage 逐步治理 AntD、MUI、BUI 混用问题。

## Workspace

```txt
packages/
  bui/                         # BUI 二开组件入口，MVP 先放轻量占位组件
  ui-bridge/                   # 业务项目统一 import 入口
  theme/                       # Starbucks-inspired tokens + BUI/AntD adapter
  ui-cli/                      # 类 antd-cli 的组件知识查询、usage 和 lint 工具
  eslint-plugin-ui-bridge/     # import 治理 ESLint 插件
  ai-skill/                    # 给 Codex / Claude / Cursor 的 SKILL.md

apps/
  playground/                  # Vite playground，验证 bridge 组件组合
  storybook/                   # Storybook 组件文档与 recipe 展示

docs/
  architecture.md
  component-governance.md
  ai-codegen-workflow.md
```

## 快速开始

```bash
pnpm install
pnpm --filter @tob-ui/playground dev
pnpm --filter @tob-ui/storybook dev
```

## CLI MVP

```bash
pnpm --filter @tob-ui/ui-cli start -- list --format json
pnpm --filter @tob-ui/ui-cli start -- info Button --format json
pnpm --filter @tob-ui/ui-cli start -- recipe crud-page --format json
pnpm --filter @tob-ui/ui-cli start -- suggest "用户管理列表页" --format json
pnpm --filter @tob-ui/ui-cli start -- lint apps/playground/src --format json
pnpm --filter @tob-ui/ui-cli start -- usage apps/playground/src --format json
```

## 业务推荐 import

```tsx
import { Page, SearchForm, Table, Button, StatusTag } from '@tob-ui/ui-bridge';
```

## 不推荐新业务代码直接 import

```tsx
import { Button, Table, Form } from 'antd';
import { Button as MuiButton } from '@material-ui/core';
import { Button } from '@backstage/ui';
```

## AntD adapter 策略

`ui-bridge` 已经预留 AntD adapter registry：

- `Form`
- `Modal`
- `Drawer`
- `DatePicker`
- `Select`
- `Upload`

这些组件短期可以复用 AntD 底层实现，但业务项目仍然从 `@tob-ui/ui-bridge` 导入，避免 AntD API 直接扩散到业务层。

## 主题策略

当前 `@tob-ui/theme` 先基于 Starbucks 风格做轻量二次处理：

- brand: `#006241`
- background: `#f7f3ed`
- text: `#1e3932`
- border: `#d4e9e2`

后续可以逐步接入 `https://getdesign.md/starbucks/design-md` 的完整 token，并输出：

- CSS variables
- AntD `ConfigProvider` theme
- BUI theme mapping
- legacy MUI theme mapping

## AI 生成代码流程

```txt
需求
  -> tob-ui suggest
  -> tob-ui recipe
  -> tob-ui info
  -> 生成代码
  -> tob-ui lint
  -> tob-ui usage
```

详见 `docs/ai-codegen-workflow.md`。

## 下一步路线

1. 用真实 Backstage UI / BUI 组件替换 `packages/bui` 的占位实现。
2. 将 `ui-bridge` 的 planned AntD adapters 替换成真实 Form、Modal、Drawer、DatePicker、Upload、Select 实现。
3. 将 Storybook 和 `ui-cli` 进一步共享组件 meta/recipe 数据源。
4. 增加 MCP server，供 Codex、Claude、Cursor 直接查询组件知识。
5. 增加 codemod：MUI v4 / AntD 核心组件迁移到 `@tob-ui/ui-bridge`。
