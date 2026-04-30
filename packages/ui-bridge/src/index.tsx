import type { ReactNode } from 'react';
import { Button as BuiButton, Card, Stack, type ButtonProps as BuiButtonProps } from '@tob-ui/bui';
import { starbucksInspiredTokens, toCssVariables } from '@tob-ui/theme';

export type { ButtonVariant } from '@tob-ui/bui';
export { Card, Stack };

export type ButtonProps = BuiButtonProps & {
  permission?: string;
};

export function Button({ permission: _permission, ...props }: ButtonProps) {
  return <BuiButton {...props} />;
}

export type PageProps = {
  title: ReactNode;
  description?: ReactNode;
  actions?: ReactNode;
  children?: ReactNode;
};

export function Page({ title, description, actions, children }: PageProps) {
  return (
    <main
      style={{
        minHeight: '100%',
        padding: 'var(--tob-space-xl, 32px)',
        background: 'var(--tob-color-background, #f7f3ed)',
        color: 'var(--tob-color-text, #1e3932)',
        fontFamily: 'var(--tob-font-family, inherit)'
      }}
    >
      <header style={{ display: 'flex', justifyContent: 'space-between', gap: 16, marginBottom: 24 }}>
        <div>
          <h1 style={{ margin: 0, fontSize: 28, lineHeight: 1.25 }}>{title}</h1>
          {description && <p style={{ margin: '8px 0 0', color: 'var(--tob-color-text-secondary, #5f716b)' }}>{description}</p>}
        </div>
        {actions && <div>{actions}</div>}
      </header>
      {children}
    </main>
  );
}

export type StatusTagStatus = 'success' | 'warning' | 'danger' | 'info' | 'default';

export type StatusTagProps = {
  status?: StatusTagStatus;
  children?: ReactNode;
};

const statusColor: Record<StatusTagStatus, string> = {
  success: 'var(--tob-color-success, #008248)',
  warning: 'var(--tob-color-warning, #d89b00)',
  danger: 'var(--tob-color-danger, #c94c4c)',
  info: 'var(--tob-color-info, #2b6cb0)',
  default: 'var(--tob-color-text-secondary, #5f716b)'
};

export function StatusTag({ status = 'default', children }: StatusTagProps) {
  return (
    <span
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        minHeight: 24,
        padding: '0 8px',
        borderRadius: 999,
        color: statusColor[status],
        background: 'color-mix(in srgb, currentColor 10%, transparent)',
        fontSize: 12,
        fontWeight: 600
      }}
    >
      {children}
    </span>
  );
}

export function ThemeProvider({ children }: { children?: ReactNode }) {
  return <div style={toCssVariables(starbucksInspiredTokens)}>{children}</div>;
}

export type SearchFormProps = {
  children?: ReactNode;
  actions?: ReactNode;
};

export function SearchForm({ children, actions }: SearchFormProps) {
  return (
    <Card
      extra={actions}
      title="Search"
    >
      <Stack direction="row" gap={16} align="center">
        {children}
      </Stack>
    </Card>
  );
}

export type TableProps<T> = {
  dataSource: T[];
  columns: Array<{ title: ReactNode; dataIndex: keyof T; render?: (value: T[keyof T], record: T) => ReactNode }>;
  rowKey: keyof T;
};

export function Table<T extends Record<string, unknown>>({ dataSource, columns, rowKey }: TableProps<T>) {
  return (
    <Card>
      <table style={{ width: '100%', borderCollapse: 'collapse' }}>
        <thead>
          <tr>
            {columns.map(column => (
              <th key={String(column.dataIndex)} style={{ textAlign: 'left', padding: 12, borderBottom: '1px solid var(--tob-color-border, #d4e9e2)' }}>
                {column.title}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {dataSource.map(record => (
            <tr key={String(record[rowKey])}>
              {columns.map(column => {
                const value = record[column.dataIndex];
                return (
                  <td key={String(column.dataIndex)} style={{ padding: 12, borderBottom: '1px solid var(--tob-color-border, #d4e9e2)' }}>
                    {column.render ? column.render(value, record) : String(value ?? '')}
                  </td>
                );
              })}
            </tr>
          ))}
        </tbody>
      </table>
    </Card>
  );
}
