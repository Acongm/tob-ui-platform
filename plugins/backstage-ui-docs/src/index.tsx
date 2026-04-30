import { Button, Card, Page, Stack, StatusTag, ThemeProvider } from '@tob-ui/ui-bridge';
import { components, recipes } from '@tob-ui/ui-meta';

export function TobUiDocsPage() {
  return (
    <ThemeProvider>
      <Page
        title="ToB UI Docs"
        description="Backstage plugin page for the public UI package system."
        actions={<Button variant="primary">Open Storybook</Button>}
      >
        <Stack gap={24}>
          <Card title="Package Model">
            <ul>
              <li>BUI is the primary component source.</li>
              <li>AntD is the auxiliary component source for complex form-driven widgets.</li>
              <li>ui-bridge is the public fused dependency package used by business projects.</li>
            </ul>
          </Card>

          <Card title="Components">
            <ul>
              {components.map(component => (
                <li key={component.name}>
                  <StatusTag status={component.status === 'stable' ? 'success' : component.status === 'planned' ? 'warning' : 'info'}>
                    {component.status}
                  </StatusTag>{' '}
                  <strong>{component.name}</strong> from <code>{component.source}</code>
                </li>
              ))}
            </ul>
          </Card>

          <Card title="Recipes">
            <ul>
              {recipes.map(recipe => (
                <li key={recipe.name}>
                  <strong>{recipe.name}</strong>: {recipe.components.join(' + ')}
                </li>
              ))}
            </ul>
          </Card>
        </Stack>
      </Page>
    </ThemeProvider>
  );
}

export default TobUiDocsPage;
