import { createRoot } from 'react-dom/client';
import { Button, Card, Page, Stack, ThemeProvider } from '@tob-ui/ui-bridge';
import { components, recipes } from '@tob-ui/ui-meta';

function DocsApp() {
  return (
    <ThemeProvider>
      <Page
        title="ToB UI Platform Docs"
        description="Public documentation for BUI-first, AntD-assisted UI packages."
        actions={<Button variant="primary">Get Started</Button>}
      >
        <Stack gap={24}>
          <Card title="Packages">
            <ul>
              <li><strong>@tob-ui/bui</strong>: BUI-first component package.</li>
              <li><strong>@tob-ui/antd</strong>: AntD-assisted component package.</li>
              <li><strong>@tob-ui/ui-bridge</strong>: fused public dependency package.</li>
              <li><strong>@tob-ui/theme</strong>: shared tokens and theme adapters.</li>
              <li><strong>@tob-ui/ui-cli</strong>: AI-oriented component knowledge CLI.</li>
            </ul>
          </Card>

          <Card title="Governed Components">
            <ul>
              {components.map(component => (
                <li key={component.name}>
                  <strong>{component.name}</strong> — {component.description} <em>({component.source}/{component.status})</em>
                </li>
              ))}
            </ul>
          </Card>

          <Card title="Recipes">
            <ul>
              {recipes.map(recipe => (
                <li key={recipe.name}>
                  <strong>{recipe.name}</strong> — {recipe.components.join(' + ')}
                </li>
              ))}
            </ul>
          </Card>
        </Stack>
      </Page>
    </ThemeProvider>
  );
}

createRoot(document.getElementById('root')!).render(<DocsApp />);
