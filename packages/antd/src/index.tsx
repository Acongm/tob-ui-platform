import { createElement, type ComponentType, type ReactNode } from 'react';
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

const FormComponent = AntdForm as unknown as ComponentType<FormProps>;
const FormItemComponent = AntdForm.Item as unknown as ComponentType<FormItemProps>;
const ModalComponent = AntdModal as unknown as ComponentType<ModalProps>;
const DrawerComponent = AntdDrawer as unknown as ComponentType<DrawerProps>;
const DatePickerComponent = AntdDatePicker as unknown as ComponentType<DatePickerProps>;
const SelectComponent = AntdSelect as unknown as ComponentType<SelectProps>;
const UploadComponent = AntdUpload as unknown as ComponentType<UploadProps>;

export function AntdThemeProvider({ children }: AntdThemeProviderProps) {
  return <ConfigProvider theme={toAntdTheme(starbucksInspiredTokens)}>{children}</ConfigProvider>;
}

export function Form(props: FormProps) {
  return createElement(FormComponent, props);
}

export function FormItem(props: FormItemProps) {
  return createElement(FormItemComponent, props);
}

export function Modal(props: ModalProps) {
  return createElement(ModalComponent, props);
}

export function Drawer(props: DrawerProps) {
  return createElement(DrawerComponent, props);
}

export function DatePicker(props: DatePickerProps) {
  return createElement(DatePickerComponent, props);
}

export function Select(props: SelectProps) {
  return createElement(SelectComponent, props);
}

export function Upload(props: UploadProps) {
  return createElement(UploadComponent, props);
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
