# @tob-ui/bui

BUI-first component package for the ToB UI Platform.

This package is the primary component layer. It is designed to align with the Backstage UI / BUI direction while keeping a stable public API for `@tob-ui/ui-bridge`.

## Current status

The current implementation uses local fallback wrappers for:

- `Button`
- `Card`
- `Stack`

These wrappers are intentionally small and are marked with `data-tob-bui-adapter` attributes so they can be replaced incrementally by real `@backstage/ui` implementations.

## Target direction

```txt
@tob-ui/bui
  -> wraps or adapts @backstage/ui primitives
  -> exposes stable ToB component API
  -> is consumed by @tob-ui/ui-bridge
```

## Adapter metadata

The package exports `buiAdapters`, which records current adapter status:

```ts
import { buiAdapters } from '@tob-ui/bui';
```

Status values:

- `fallback`: local wrapper implementation, not yet backed by real `@backstage/ui`.
- `ready`: backed by real `@backstage/ui` or approved BUI primitive.

## Why optional peer dependency?

`@backstage/ui` is currently declared as an optional peer dependency so this repository can be bootstrapped and tested before the real BUI dependency is installed. Once the actual BUI package version is confirmed, it should be tightened.
