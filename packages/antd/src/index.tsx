import type { ReactNode } from 'react';
import { ConfigProvider, DatePicker as AntdDatePicker, Drawer as AntdDrawer, Form as AntdForm, Modal as AntdModal, Select as AntdSelect, Upload as AntdUpload } from 'antd';
import { starbucksInspiredTokens, toAntdTheme } from '@tob-ui/theme';

export type AntdThemeProviderProps = {
  children?: ReactNode;
};

export function AntdThemeProvider({ children }: AntdThemeProviderProps) {
  return <ConfigProvider theme={toAntdTheme(starbucksInspiredTokens)}>{children}</ConfigProvider>;
}

export const Form = AntdForm;
export const Modal = AntdModal;
export const Drawer = AntdDrawer;
export const DatePicker = AntdDatePicker;
export const Select = AntdSelect;
export const Upload = AntdUpload;

export type { FormProps } from 'antd';
