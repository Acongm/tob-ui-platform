import { createRoot } from 'react-dom/client';
import { Button, Page, SearchForm, StatusTag, Table, ThemeProvider } from '@tob-ui/ui-bridge';

type UserRow = {
  id: string;
  name: string;
  status: 'active' | 'blocked';
  owner: string;
};

const rows: UserRow[] = [
  { id: '1', name: 'Backstage Catalog', status: 'active', owner: 'Platform Team' },
  { id: '2', name: 'Work Order', status: 'blocked', owner: 'SDLC Team' }
];

function App() {
  return (
    <ThemeProvider>
      <Page
        title="ToB UI Platform"
        description="BUI 二开融合层 + AntD/MUI 治理 + AI 组件选择工具"
        actions={<Button variant="primary">Create</Button>}
      >
        <SearchForm actions={<Button variant="secondary">Search</Button>}>
          <span>Search fields placeholder</span>
        </SearchForm>

        <div style={{ height: 24 }} />

        <Table<UserRow>
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
    </ThemeProvider>
  );
}

createRoot(document.getElementById('root')!).render(<App />);
