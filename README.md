# ToB UI Platform

Public UI plugin package system for ToB projects. The package model is **BUI-first**, **AntD-assisted**, and exported through a stable fused package for business applications.

This repository is not intended to fork and freely modify upstream UI source code. It should preserve upstream upgrade paths by placing all customization in wrapper packages, adapter layers, theme tokens and metadata-driven documentation.

## Current main status

PR #1 has been merged into `main`.

The current `main` branch contains the first architecture skeleton:

- BUI-first package boundary.
- AntD-assisted package boundary.
- Fused public dependency package.
- Theme/token adapter layer.
- Shared component metadata.
- CLI for component knowledge and AI guidance.
- Storybook docs, static docs app and Backstage docs plugin entry.
- Changesets and CI foundation.

Important boundary: `@tob-ui/bui` currently uses fallback wrappers for `Button`, `Card` and `Stack`. These wrappers define our stable API surface while the actual `@backstage/ui` implementation is finalized.

## Core rule: do not modify upstream UI source code

Do not directly edit copied upstream source code from Backstage UI or Ant Design.

All custom behavior should be added through these layers:

```txt
@tob-ui/theme        # design tokens, CSS variables, theme adapters
@tob-ui/bui          # BUI wrappers/adapters around Backstage UI primitives
@tob-ui/antd         # AntD auxiliary wrappers/adapters
@tob-ui/ui-bridge    # fused public API consumed by business apps
@tob-ui/ui-meta      # metadata, recipes and governance rules
```

Why this rule exists:

- Keeps `@backstage/ui` and `antd` upgradeable.
- Prevents local source forks from diverging from upstream.
- Keeps business projects importing from one stable package.
- Makes AI-generated code follow the same component selection rules.

When a component needs customization, prefer this order:

```txt
1. theme tokens / CSS variables
2. wrapper props in @tob-ui/bui or @tob-ui/antd
3. adapter logic in @tob-ui/ui-bridge
4. metadata and recipe guidance in @tob-ui/ui-meta
5. only then consider upstream contribution or a clearly isolated patch
```

## Package model

```txt
@tob-ui/bui
  Primary BUI-first component package.
  Target: wrap/adapt Backstage UI primitives from https://ui.backstage.io/.
  Current: local fallback wrappers for Button/Card/Stack.

@tob-ui/antd
  Auxiliary AntD package for mature form-driven widgets.
  Current: Form, Modal, Drawer, DatePicker, Select, Upload and AntdThemeProvider.

@tob-ui/ui-bridge
  Fused public dependency package.
  Business projects should import from this package instead of choosing BUI or AntD directly.

@tob-ui/theme
  Shared design tokens and BUI/AntD theme adapters.

@tob-ui/ui-meta
  Shared component metadata, recipes and import-governance rules.

@tob-ui/ui-cli
  Internal `antd-cli`-like component knowledge CLI for developers and AI agents.

@tob-ui/eslint-plugin-ui-bridge
  ESLint rules that prevent raw usage of governed AntD/BUI/MUI imports.

@tob-ui/ai-skill
  SKILL.md for Codex / Claude / Cursor style workflows.

@tob-ui/backstage-ui-docs-plugin
  Backstage plugin docs entry.
```

## Workspace layout

```txt
packages/
  bui/                         # BUI-first wrappers/adapters
  antd/                        # AntD-assisted wrappers/adapters
  ui-bridge/                   # fused public dependency package
  ui-meta/                     # shared component metadata and recipes
  theme/                       # tokens, CSS variables and theme adapters
  ui-cli/                      # component knowledge CLI
  eslint-plugin-ui-bridge/     # import governance ESLint plugin
  ai-skill/                    # SKILL.md for AI coding agents

apps/
  docs/                        # static public docs app
  playground/                  # Vite playground
  storybook/                   # Storybook component docs

plugins/
  backstage-ui-docs/           # Backstage plugin docs entry

docs/
  architecture.md
  component-governance.md
  ai-codegen-workflow.md
```

## Which parts are source code?

These packages are the runtime source packages:

```txt
packages/bui
packages/antd
packages/ui-bridge
packages/theme
```

Their responsibility:

- provide stable public component APIs;
- keep upstream UI libraries replaceable;
- avoid leaking raw AntD/BUI choices into business projects.

Business applications should not import directly from `@tob-ui/bui`, `@tob-ui/antd`, `antd` or `@backstage/ui` unless there is a specific package-level reason. The normal entry is `@tob-ui/ui-bridge`.

## Which parts are style customization?

Style customization belongs mainly in:

```txt
packages/theme/src/index.ts
```

Current token source is a lightweight Starbucks-inspired set:

```txt
brand:      #006241
background: #f7f3ed
text:       #1e3932
border:     #d4e9e2
```

The theme package exports:

- `starbucksInspiredTokens`
- `toCssVariables`
- `toAntdTheme`
- `toBuiTheme`

Use this package to customize color, radius, spacing and typography. Later, the full token definition can be ingested from:

```txt
https://getdesign.md/starbucks/design-md
```

Do not hard-code `.ant-*`, `.Mui-*` or upstream BUI internal class overrides in business code. Prefer tokens, wrapper props and semantic APIs.

## Which parts are metadata and AI guidance?

These are not runtime UI components:

```txt
packages/ui-meta
packages/ui-cli
packages/eslint-plugin-ui-bridge
packages/ai-skill
```

Their responsibility:

- document which component should be used;
- provide recipes such as CRUD pages and modal forms;
- expose rules for AI agents and developers;
- prevent raw imports of governed components.

The shared data flow is:

```txt
@tob-ui/ui-meta
  -> @tob-ui/ui-cli
  -> @tob-ui/eslint-plugin-ui-bridge
  -> apps/storybook
  -> apps/docs
  -> plugins/backstage-ui-docs
  -> @tob-ui/ai-skill / future MCP
```

## Three documentation systems

This repository contains three documentation entry points:

1. `apps/storybook` — component-level docs, adapter status and recipe stories.
2. `apps/docs` — static public docs site for package overview and usage.
3. `plugins/backstage-ui-docs` — Backstage plugin page for embedding UI docs into a Backstage portal.

Run them with:

```bash
pnpm --filter @tob-ui/storybook dev
pnpm --filter @tob-ui/docs dev
pnpm --filter @tob-ui/playground dev
```

## Install and develop

```bash
pnpm install
pnpm typecheck
pnpm build
```

Run Storybook:

```bash
pnpm storybook:dev
```

Run static docs:

```bash
pnpm docs:dev
```

Run playground:

```bash
pnpm playground:dev
```

## Business usage

Business projects should import from `@tob-ui/ui-bridge`:

```tsx
import {
  Page,
  SearchForm,
  Table,
  Button,
  StatusTag,
  Form,
  Modal,
  DatePicker,
  Select,
} from '@tob-ui/ui-bridge';
```

Avoid choosing the underlying UI library directly:

```tsx
// Avoid in business code
import { Button, Table, Form } from 'antd';
import { Button } from '@backstage/ui';
```

## CLI usage

The CLI is used by developers and AI agents to query the component system.

```bash
pnpm --filter @tob-ui/ui-cli start -- list --format json
pnpm --filter @tob-ui/ui-cli start -- info Button --format json
pnpm --filter @tob-ui/ui-cli start -- recipe crud-page --format json
pnpm --filter @tob-ui/ui-cli start -- suggest "用户管理列表页" --format json
pnpm --filter @tob-ui/ui-cli start -- rules --format json
pnpm --filter @tob-ui/ui-cli start -- lint apps/playground/src --format json
pnpm --filter @tob-ui/ui-cli start -- usage apps/playground/src --format json
pnpm --filter @tob-ui/ui-cli start -- doctor . --format json
```

Recommended AI flow:

```txt
进入项目
  -> tob-ui doctor
需求
  -> tob-ui suggest
  -> tob-ui recipe
  -> tob-ui info
  -> tob-ui rules
生成代码
  -> tob-ui lint
  -> tob-ui usage
```

## Build and release

```bash
pnpm typecheck
pnpm build
pnpm changeset
pnpm version
pnpm release
```

The repository uses Changesets and GitHub Actions CI.

Before enabling real npm publishing, configure this repository secret:

```txt
NPM_TOKEN
```

Current publishable packages:

- `@tob-ui/bui`
- `@tob-ui/antd`
- `@tob-ui/ui-bridge`
- `@tob-ui/theme`
- `@tob-ui/ui-meta`
- `@tob-ui/ui-cli`
- `@tob-ui/eslint-plugin-ui-bridge`
- `@tob-ui/ai-skill`
- `@tob-ui/backstage-ui-docs-plugin`

## Upgrade policy

To support future upstream upgrades:

- keep `@backstage/ui` and `antd` as peer dependencies where possible;
- keep custom behavior in wrappers/adapters;
- keep theme changes in `@tob-ui/theme`;
- keep AI/developer guidance in `@tob-ui/ui-meta`;
- avoid copying and editing upstream source files;
- avoid exposing upstream component-specific APIs directly from business projects.

Expected upgrade process:

```txt
1. Upgrade @backstage/ui or antd version.
2. Run Storybook and playground.
3. Update adapter wrappers if upstream APIs changed.
4. Update ui-meta if component guidance changed.
5. Business apps keep importing from @tob-ui/ui-bridge.
```

## Current limitations

- `@tob-ui/bui` still uses local fallback wrappers for `Button`, `Card` and `Stack`.
- Real Backstage UI / BUI adapters still need to replace the fallback wrappers after the exact upstream API is finalized.
- The current token set is lightweight and should later be replaced or extended by the full Starbucks design token source.
- Some package exports in main may still point to source files until the dist-build PR is fully merged.
