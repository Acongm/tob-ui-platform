export type {
  ComponentMeta,
  ComponentSource,
  ComponentStatus,
  ForbiddenImportRule,
  FlattenedForbiddenImportRule,
  RecipeMeta
} from './types';
export { components } from './components';
export { recipes } from './recipes';
export { forbiddenImportRules, governedSources } from './rules';

export function findComponent(name: string) {
  return components.find(component => component.name.toLowerCase() === name.toLowerCase());
}

export function findRecipe(name: string) {
  return recipes.find(recipe => recipe.name === name);
}
