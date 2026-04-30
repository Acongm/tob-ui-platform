# ToB UI Platform

Public UI plugin package system for ToB projects. The package model is **BUI-first**, **AntD-assisted**, and exported through a fused dependency package for business applications.

## Package Model

```txt
@tob-ui/bui
  Primary component package, based on Backstage UI / BUI direction.

@tob-ui/antd
  Auxiliary AntD package for complex form-driven widgets such as Form, Modal, Drawer, DatePicker, Select and Upload.

@tob-ui/ui-bridge
  Public fused dependency package. Business projects should import from this package instead of choosing between BUI and AntD directly.

@tob-ui/theme
  Shared design tokens and BUI/AntD theme adapters.

@tob-ui/ui-meta
  Shared component metadata and recipes for docs, CLI and AI usage.

@tob-ui/ui-cli
  Internal `antd-cli`-like component knowledge CLI for AI and developers.
```

## Workspace

```txt
packages/
  bui/                         # BUI-first component package
  antd/                        # AntD-assisted component package
  ui-bridge/                   # fused public dependency package
  ui-meta/                     # shared component metadata and recipes
  theme/                       # Starbucks-inspired tokens + BUI/AntD adapters
  ui-cli/                      # component knowledge CLI
  eslint-plugin-ui-bridge/     # import governance ESLint plugin
  ai-skill/                    # SKILL.md for Codex / Claude / Cursor

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

## Three Documentation Systems

This repository now contains three documentation entry points:

1. `apps/storybook` — component-level docs and recipe stories.
2. `apps/docs` — static public docs site for package overview and usage.
3. `plugins/backstage-ui-docs` — Backstage plugin page for embedding UI docs into a Backstage portal.

## Quick Start

```bash
pnpm install
pnpm --filter @tob-ui/storybook dev
pnpm --filter @tob-ui/docs dev
pnpm --filter @tob-ui/playground dev
```

## Business Import Policy

Business projects should prefer:

```tsx
import { Page, SearchForm, Table, Button, StatusTag, Form, Modal, DatePicker, Select } from '@tob-ui/ui-bridge';
```

Avoid new business code that directly chooses the underlying UI library:

```tsx
import { Button, Table, Form } from 'antd';
import { Button } from '@backstage/ui';
```

## BUI-first and AntD-assisted

- `@tob-ui/bui` is the primary direction and should gradually replace placeholder implementations with real Backstage UI / BUI-based components.
- `@tob-ui/antd` is the auxiliary package for mature AntD capabilities.
- `@tob-ui/ui-bridge` fuses both into a single public dependency package.

Current AntD-assisted exports:

- `Form`
- `Modal`
- `Drawer`
- `DatePicker`
- `Select`
- `Upload`

## Shared Metadata Layer

`@tob-ui/ui-meta` is the shared source for component metadata, recipes and forbidden import rules.

```txt
@tob-ui/ui-meta
  -> @tob-ui/ui-cli
  -> @tob-ui/eslint-plugin-ui-bridge
  -> @tob-ui/storybook
  -> @tob-ui/docs
  -> @tob-ui/backstage-ui-docs-plugin
  -> @tob-ui/ai-skill / future MCP
```

## CLI MVP

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

## Theme Strategy

Current `@tob-ui/theme` uses a lightweight Starbucks-inspired token set:

- brand: `#006241`
- background: `#f7f3ed`
- text: `#1e3932`
- border: `#d4e9e2`

Later it can ingest the full token definition from `https://getdesign.md/starbucks/design-md` and emit CSS variables, BUI theme mapping and AntD `ConfigProvider` theme.

## Current Status

This PR completes the architecture skeleton and the first usable package layout. The next work is to replace placeholder BUI components with real Backstage UI / BUI-based implementations and harden package publishing outputs.
