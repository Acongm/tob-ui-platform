export type TobColorToken = {
  brand: string;
  brandHover: string;
  brandActive: string;
  success: string;
  warning: string;
  danger: string;
  info: string;
  text: string;
  textSecondary: string;
  border: string;
  background: string;
  surface: string;
};

export type TobRadiusToken = {
  sm: number;
  md: number;
  lg: number;
  xl: number;
};

export type TobSpaceToken = {
  xs: number;
  sm: number;
  md: number;
  lg: number;
  xl: number;
  xxl: number;
};

export type TobDesignTokens = {
  color: TobColorToken;
  radius: TobRadiusToken;
  space: TobSpaceToken;
  fontFamily: string;
};

export const starbucksInspiredTokens: TobDesignTokens = {
  color: {
    brand: '#006241',
    brandHover: '#00754a',
    brandActive: '#004c34',
    success: '#008248',
    warning: '#d89b00',
    danger: '#c94c4c',
    info: '#2b6cb0',
    text: '#1e3932',
    textSecondary: '#5f716b',
    border: '#d4e9e2',
    background: '#f7f3ed',
    surface: '#ffffff'
  },
  radius: {
    sm: 4,
    md: 8,
    lg: 12,
    xl: 20
  },
  space: {
    xs: 4,
    sm: 8,
    md: 16,
    lg: 24,
    xl: 32,
    xxl: 48
  },
  fontFamily: 'Inter, -apple-system, BlinkMacSystemFont, Segoe UI, sans-serif'
};

export const toCssVariables = (tokens: TobDesignTokens = starbucksInspiredTokens) => ({
  '--tob-color-brand': tokens.color.brand,
  '--tob-color-brand-hover': tokens.color.brandHover,
  '--tob-color-brand-active': tokens.color.brandActive,
  '--tob-color-success': tokens.color.success,
  '--tob-color-warning': tokens.color.warning,
  '--tob-color-danger': tokens.color.danger,
  '--tob-color-info': tokens.color.info,
  '--tob-color-text': tokens.color.text,
  '--tob-color-text-secondary': tokens.color.textSecondary,
  '--tob-color-border': tokens.color.border,
  '--tob-color-background': tokens.color.background,
  '--tob-color-surface': tokens.color.surface,
  '--tob-radius-sm': `${tokens.radius.sm}px`,
  '--tob-radius-md': `${tokens.radius.md}px`,
  '--tob-radius-lg': `${tokens.radius.lg}px`,
  '--tob-radius-xl': `${tokens.radius.xl}px`,
  '--tob-space-xs': `${tokens.space.xs}px`,
  '--tob-space-sm': `${tokens.space.sm}px`,
  '--tob-space-md': `${tokens.space.md}px`,
  '--tob-space-lg': `${tokens.space.lg}px`,
  '--tob-space-xl': `${tokens.space.xl}px`,
  '--tob-space-xxl': `${tokens.space.xxl}px`,
  '--tob-font-family': tokens.fontFamily
});

export const toAntdTheme = (tokens: TobDesignTokens = starbucksInspiredTokens) => ({
  token: {
    colorPrimary: tokens.color.brand,
    colorSuccess: tokens.color.success,
    colorWarning: tokens.color.warning,
    colorError: tokens.color.danger,
    colorInfo: tokens.color.info,
    colorText: tokens.color.text,
    colorTextSecondary: tokens.color.textSecondary,
    colorBorder: tokens.color.border,
    colorBgBase: tokens.color.background,
    borderRadius: tokens.radius.md,
    fontFamily: tokens.fontFamily
  }
});

export const toBuiTheme = (tokens: TobDesignTokens = starbucksInspiredTokens) => ({
  colors: tokens.color,
  radii: tokens.radius,
  space: tokens.space,
  fontFamily: tokens.fontFamily
});
