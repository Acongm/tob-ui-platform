import type { ReactNode } from 'react';
import type {
  DatePickerProps,
  DrawerProps,
  FormItemProps,
  FormProps,
  ModalProps,
  SelectProps,
  UploadProps
} from 'antd';
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

export function FormItem(props: FormItemProps) {
  return <AntdForm.Item {...props} />;
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

export function Select(props: SelectProps) {
  return <AntdSelect {...props} />;
}

export function Upload(props: UploadProps) {
  return <AntdUpload {...props} />;
}

export type {
  DatePickerProps,
  DrawerProps,
  FormItemProps,
  FormProps,
  ModalProps,
  SelectProps,
  UploadProps
} from 'antd';
