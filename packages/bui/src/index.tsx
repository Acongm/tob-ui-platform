import type { CSSProperties, ReactNode } from 'react';
export { buiAdapters } from './adapters/backstage-ui';

export type ButtonVariant = 'primary' | 'secondary' | 'danger' | 'ghost';

export type ButtonProps = {
  children?: ReactNode;
  variant?: ButtonVariant;
  loading?: boolean;
  disabled?: boolean;
  onClick?: () => void;
};

const variantStyle: Record<ButtonVariant, CSSProperties> = {
  primary: {
    color: '#fff',
    backgroundColor: 'var(--tob-color-brand, #006241)',
    borderColor: 'var(--tob-color-brand, #006241)'
  },
  secondary: {
    color: 'var(--tob-color-text, #1e3932)',
    backgroundColor: 'var(--tob-color-surface, #fff)',
    borderColor: 'var(--tob-color-border, #d4e9e2)'
  },
  danger: {
    color: '#fff',
    backgroundColor: 'var(--tob-color-danger, #c94c4c)',
    borderColor: 'var(--tob-color-danger, #c94c4c)'
  },
  ghost: {
    color: 'var(--tob-color-brand, #006241)',
    backgroundColor: 'transparent',
    borderColor: 'transparent'
  }
};

export function Button({ children, variant = 'secondary', loading, disabled, onClick }: ButtonProps) {
  return (
    <button
      type="button"
      disabled={disabled || loading}
      onClick={onClick}
      data-tob-bui-adapter="Button"
      style={{
        minHeight: 36,
        padding: '0 16px',
        borderRadius: 'var(--tob-radius-md, 8px)',
        border: '1px solid',
        cursor: disabled || loading ? 'not-allowed' : 'pointer',
        fontFamily: 'var(--tob-font-family, inherit)',
        fontWeight: 600,
        ...variantStyle[variant],
        opacity: disabled || loading ? 0.6 : 1
      }}
    >
      {loading ? 'Loading...' : children}
    </button>
  );
}

export type CardProps = {
  title?: ReactNode;
  children?: ReactNode;
  extra?: ReactNode;
};

export function Card({ title, children, extra }: CardProps) {
  return (
    <section
      data-tob-bui-adapter="Card"
      style={{
        background: 'var(--tob-color-surface, #fff)',
        border: '1px solid var(--tob-color-border, #d4e9e2)',
        borderRadius: 'var(--tob-radius-lg, 12px)',
        padding: 'var(--tob-space-lg, 24px)',
        boxShadow: '0 8px 24px rgba(30, 57, 50, 0.06)'
      }}
    >
      {(title || extra) && (
        <header style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 16 }}>
          <strong>{title}</strong>
          {extra}
        </header>
      )}
      {children}
    </section>
  );
}

export type StackProps = {
  children?: ReactNode;
  gap?: number;
  direction?: 'row' | 'column';
  align?: CSSProperties['alignItems'];
  justify?: CSSProperties['justifyContent'];
};

export function Stack({ children, gap = 16, direction = 'column', align, justify }: StackProps) {
  return (
    <div
      data-tob-bui-adapter="Stack"
      style={{ display: 'flex', flexDirection: direction, gap, alignItems: align, justifyContent: justify }}
    >
      {children}
    </div>
  );
}
