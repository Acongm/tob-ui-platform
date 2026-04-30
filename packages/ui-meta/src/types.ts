export type ComponentSource = 'bui' | 'antd' | 'legacy-mui' | 'bridge';
export type ComponentStatus = 'stable' | 'experimental' | 'legacy-adapter' | 'planned';

export type ForbiddenImportRule = {
  from: string;
  names: string[];
  reason: string;
};

export type ComponentMeta = {
  name: string;
  packageName: string;
  source: ComponentSource;
  status: ComponentStatus;
  category: string;
  description: string;
  replaces: string[];
  allowedImport: string;
  forbiddenImports: ForbiddenImportRule[];
  aiGuidance: string[];
};

export type RecipeMeta = {
  name: string;
  description: string;
  scenario: string;
  imports: string[];
  components: string[];
  avoid: string[];
  notes: string[];
};

export type FlattenedForbiddenImportRule = ForbiddenImportRule & {
  component: string;
};
