import type { Meta, StoryObj } from '@storybook/react';
import { buiAdapters } from '@tob-ui/bui';
import { Card, StatusTag } from '@tob-ui/ui-bridge';

function BuiAdapters() {
  return (
    <Card title="BUI Adapter Status">
      <table style={{ width: '100%', borderCollapse: 'collapse' }}>
        <thead>
          <tr>
            <th style={{ textAlign: 'left', borderBottom: '1px solid #ddd', padding: 8 }}>Component</th>
            <th style={{ textAlign: 'left', borderBottom: '1px solid #ddd', padding: 8 }}>Source</th>
            <th style={{ textAlign: 'left', borderBottom: '1px solid #ddd', padding: 8 }}>Status</th>
            <th style={{ textAlign: 'left', borderBottom: '1px solid #ddd', padding: 8 }}>Reason</th>
          </tr>
        </thead>
        <tbody>
          {buiAdapters.map(adapter => (
            <tr key={adapter.name}>
              <td style={{ borderBottom: '1px solid #eee', padding: 8 }}>{adapter.name}</td>
              <td style={{ borderBottom: '1px solid #eee', padding: 8 }}>{adapter.source}</td>
              <td style={{ borderBottom: '1px solid #eee', padding: 8 }}>
                <StatusTag status={adapter.status === 'ready' ? 'success' : 'warning'}>{adapter.status}</StatusTag>
              </td>
              <td style={{ borderBottom: '1px solid #eee', padding: 8 }}>{adapter.reason}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </Card>
  );
}

const meta = {
  title: 'Governance/BUI Adapters',
  component: BuiAdapters,
  tags: ['autodocs']
} satisfies Meta<typeof BuiAdapters>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Basic: Story = {};
