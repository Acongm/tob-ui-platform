import type { ReactNode } from 'react';
import type { DatePickerProps, DrawerProps, FormProps, ModalProps, SelectProps, UploadProps } from 'antd';
import {
  ConfigProvider,
  DatePicker as AntdDatePicker,
  Drawer as AntdDrawer,
  Form as AntdForm,
  Modal as AntdModal,
  Select as AntdSelect,
  Upload as AntdUpload
} from 'antd';
import { starbucksInspiredTokens, toAntdTheme } from '@tob-ui/theme';

export type AntdThemeProviderProps = {
  children?: ReactNode;
};

export function AntdThemeProvider({ children }: AntdThemeProviderProps) {
  return <ConfigProvider theme={toAntdTheme(starbucksInspiredTokens)}>{children}</ConfigProvider>;
}

export function Form(props: FormProps) {
  return <AntdForm {...props} />;
}

export function Modal(props: ModalProps) {
  return <AntdModal {...props} />;
}

export function Drawer(props: DrawerProps) {
  return <AntdDrawer {...props} />;
}

export function DatePicker(props: DatePickerProps) {
  return <AntdDatePicker {...props} />;
}

export function Select<ValueType = unknown, OptionType extends Record<string, unknown> = Record<string, unknown>>(
  props: SelectProps<ValueType, OptionType>
) {
  return <AntdSelect<ValueType, OptionType> {...props} />;
}

export function Upload(props: UploadProps) {
  return <AntdUpload {...props} />;
}

export const FormItem = AntdForm.Item;

export type { DatePickerProps, DrawerProps, FormProps, ModalProps, SelectProps, UploadProps } from 'antd';
