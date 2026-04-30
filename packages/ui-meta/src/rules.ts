import { components } from './components';
import type { FlattenedForbiddenImportRule } from './types';

export const forbiddenImportRules: FlattenedForbiddenImportRule[] = components.flatMap(component =>
  component.forbiddenImports.map(rule => ({
    component: component.name,
    ...rule
  }))
);

export const governedSources = [
  '@tob-ui/ui-bridge',
  '@tob-ui/bui',
  '@backstage/ui',
  'antd',
  '@material-ui/core'
] as const;
