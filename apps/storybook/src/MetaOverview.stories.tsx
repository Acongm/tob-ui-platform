import type { Meta, StoryObj } from '@storybook/react';
import { components, recipes } from '@tob-ui/ui-meta';

function MetaOverview() {
  return (
    <div style={{ padding: 24, fontFamily: 'var(--tob-font-family, inherit)' }}>
      <h1>ToB UI Metadata</h1>
      <p>
        This page renders the same metadata consumed by <code>@tob-ui/ui-cli</code> and
        <code>@tob-ui/eslint-plugin-ui-bridge</code>.
      </p>

      <h2>Governed Components</h2>
      <table style={{ width: '100%', borderCollapse: 'collapse' }}>
        <thead>
          <tr>
            <th style={{ textAlign: 'left', borderBottom: '1px solid #ddd', padding: 8 }}>Name</th>
            <th style={{ textAlign: 'left', borderBottom: '1px solid #ddd', padding: 8 }}>Source</th>
            <th style={{ textAlign: 'left', borderBottom: '1px solid #ddd', padding: 8 }}>Status</th>
            <th style={{ textAlign: 'left', borderBottom: '1px solid #ddd', padding: 8 }}>Description</th>
          </tr>
        </thead>
        <tbody>
          {components.map(component => (
            <tr key={component.name}>
              <td style={{ borderBottom: '1px solid #eee', padding: 8 }}>{component.name}</td>
              <td style={{ borderBottom: '1px solid #eee', padding: 8 }}>{component.source}</td>
              <td style={{ borderBottom: '1px solid #eee', padding: 8 }}>{component.status}</td>
              <td style={{ borderBottom: '1px solid #eee', padding: 8 }}>{component.description}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <h2>Recipes</h2>
      <ul>
        {recipes.map(recipe => (
          <li key={recipe.name} style={{ marginBottom: 16 }}>
            <strong>{recipe.name}</strong>
            <p>{recipe.description}</p>
            <code>{recipe.components.join(' + ')}</code>
          </li>
        ))}
      </ul>
    </div>
  );
}

const meta = {
  title: 'Governance/Metadata Overview',
  component: MetaOverview,
  tags: ['autodocs']
} satisfies Meta<typeof MetaOverview>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Basic: Story = {};
