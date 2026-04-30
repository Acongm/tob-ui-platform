import type { Meta, StoryObj } from '@storybook/react';
import { Button, Page, SearchForm, StatusTag, Table } from '@tob-ui/ui-bridge';

type Row = {
  id: string;
  name: string;
  status: 'active' | 'blocked';
  owner: string;
};

const rows: Row[] = [
  { id: '1', name: 'Catalog', status: 'active', owner: 'Platform Team' },
  { id: '2', name: 'Work Order', status: 'blocked', owner: 'SDLC Team' }
];

function CrudPageDemo() {
  return (
    <Page title="User Management" description="Recipe: Page + SearchForm + Table" actions={<Button variant="primary">Create</Button>}>
      <SearchForm actions={<Button>Search</Button>}>
        <span>Keyword input placeholder</span>
      </SearchForm>
      <div style={{ height: 24 }} />
      <Table<Row>
        rowKey="id"
        dataSource={rows}
        columns={[
          { title: 'Name', dataIndex: 'name' },
          { title: 'Owner', dataIndex: 'owner' },
          {
            title: 'Status',
            dataIndex: 'status',
            render: value => <StatusTag status={value === 'active' ? 'success' : 'danger'}>{String(value)}</StatusTag>
          }
        ]}
      />
    </Page>
  );
}

const meta = {
  title: 'Recipes/CrudPage',
  component: CrudPageDemo,
  tags: ['autodocs']
} satisfies Meta<typeof CrudPageDemo>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Basic: Story = {};
