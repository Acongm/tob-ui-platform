# ToB UI Platform Skill

Use this skill when generating frontend code for Backstage-based ToB projects that use `@tob-ui/ui-bridge`.

## Goal

Generate UI code through the governed bridge package instead of freely mixing BUI, AntD and MUI v4.

## Required workflow

0. When entering a target project, run:

```bash
tob-ui doctor . --format json
```

1. Before choosing components, run:

```bash
tob-ui suggest "<user requirement>" --format json
```

2. If a recipe is returned, inspect it:

```bash
tob-ui recipe <recipe-name> --format json
```

3. Before using a governed component, inspect it:

```bash
tob-ui info <ComponentName> --format json
```

4. When import policy is unclear, inspect rules:

```bash
tob-ui rules --format json
```

5. Generate code using imports from `@tob-ui/ui-bridge`.

6. After code generation, run:

```bash
tob-ui lint <target-dir> --format json
tob-ui usage <target-dir> --format json
```

## Import policy

Prefer:

```tsx
import { Page, SearchForm, Table, Button, StatusTag } from '@tob-ui/ui-bridge';
```

Avoid new business code that imports core components directly from:

```tsx
import { Button, Table, Form, Modal, Tag } from 'antd';
import { Button, Table, Dialog, Grid } from '@material-ui/core';
import { Button } from '@backstage/ui';
```

## Component selection rules

- CRUD/list pages: use `Page + SearchForm + Table + Button`.
- Modal form scenarios: use the `modal-form` recipe and import `Modal` / `Form` from `@tob-ui/ui-bridge` even while they are planned adapters.
- Main page actions: put primary buttons in `Page.actions`.
- Status fields: render with `StatusTag`.
- Dangerous actions: use `Button variant="danger"`; later replace with `ConfirmButton` when available.
- Do not override `.ant-*` or `.Mui-*` classes in business code.

## Theme rules

- Use `@tob-ui/theme` tokens as the source of truth.
- The initial theme is Starbucks-inspired and intentionally lightweight.
- AntD should receive theme through the adapter instead of page-level hard-coded colors.
