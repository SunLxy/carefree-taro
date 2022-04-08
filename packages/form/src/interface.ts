import React from 'react';
import { FormProps } from 'rc-field-form';
import { GetStoreProps } from './Hide/interface';
import { InternalFormInstance, InternalNamePath, FormInstance } from 'rc-field-form/lib/interface';
import { Rule } from 'rc-field-form/lib/interface';
import {
  InputProps,
  PickerSelectorProps,
  PickerMultiSelectorProps,
  PickerTimeProps,
  PickerDateProps,
  PickerRegionProps,
  PickerViewProps,
  RadioProps,
  SliderProps,
  SwitchProps,
  TextareaProps,
  CheckboxProps,
} from '@tarojs/components';

type PickerProps =
  | PickerSelectorProps
  | PickerMultiSelectorProps
  | PickerTimeProps
  | PickerDateProps
  | PickerRegionProps;

import { ItemProps } from './item';

import { Subscribe } from './Collect';

export type ItemChildType =
  | 'Input'
  | 'Picker'
  | 'PickerView'
  | 'Radio'
  | 'Slider'
  | 'Switch'
  | 'Textarea'
  | 'Checkbox'
  | 'Custom';

export type ItemChildAttr =
  | InputProps
  | PickerProps
  | PickerViewProps
  | RadioProps
  | SliderProps
  | SwitchProps
  | TextareaProps
  | CheckboxProps;

/** config 配置项  */
export interface SimpleFormConfigProps {
  /** 类型 */
  type: ItemChildType;
  /** formItem 表单 label 值 */
  label?: string | React.ReactNode;
  /** formItem 表单 name 值 */
  name?: string | number | (string | number)[];
  /** formItem 表单 其他属性值*/
  itemAttr?: Omit<ItemProps, 'rules' | 'label' | 'name'> & {
    /** 用于当前的Item项是否用于监听，(前提是watchList设置了) */ watch?: boolean;
  };
  /** formItem 表单 children 中组件参数*/
  attr?: Partial<ItemChildAttr>;
  /** formItem 表单 规则*/
  rules?: Rule[];
  render?: React.ReactNode | ((...arg: any) => React.ReactNode);
  // 是否启用组件隐藏显示
  isHide?: boolean;
}

export interface CarefreeFormProps extends FormProps {
  config?: SimpleFormConfigProps[];
  children?: React.ReactNode;
  /** 监听字段 */
  watchList?: WatchListProps;
  /** Form.useFormItemHide 返回值  */
  formHide?: GetStoreProps;
  /** 初始值 隐藏显示 字段对应的值 */
  initialHide?: { [x: string]: boolean };
  // 用于多个form表单
  subscribe?: Subscribe;
  /** 表单项布局 **/
  layout?: 'vertical' | 'horizontal' | 'space';
}

/** 外层嵌套的context的值 */
export interface FormContextProps {
  /** 第一次加载 */
  firstMont?: boolean;
  /** 监听字段 */
  watchList?: WatchListProps;
  /** Form.useForm() */
  form?: FormInstance<any>;
  /**   Form.useForm() 与这个一致 */
  itemRefHook?: FormInstance<any>;
}

export type ChildPropsType = (InternalFormInstance | {}) & {
  /** 更新字段值   */
  updateValue: (namePath: InternalNamePath, value: any) => void;
};
export interface WatchListProps {
  /** 字段对应的 监听方法 */
  [s: string]: (
    value: any,
    formValue?: any,
    child?: ChildPropsType,
    hideContext?: GetStoreProps,
    cx?: { forms: Subscribe['subForm']; hides: Subscribe['subHides'] },
  ) => void;
}

export interface ContextStyleProps {
  /** 当前表单名称 **/
  name?: string;
  /** 当前表单项 是否显示下方的横线 **/
  bottomBorder?: boolean;
  /** 当前表单项 下方的横线 的颜色 **/
  bottomBorderColor?: string;
  /** 当前表单项 下方的横线 的宽度 **/
  bottomBorderWidth?: number;
  /** 是否显示冒号 **/
  isColon?: boolean;
  /** 表单项布局 **/
  layout?: 'vertical' | 'horizontal' | 'space';
}

export interface ContextProps {
  /** 第一次加载 */
  firstMont?: boolean;
  /** 监听字段 */
  watchList?: WatchListProps;
  /** Form.useForm() */
  form?: FormInstance<any>;
  /**   Form.useForm() 与这个一致 */
  itemRefHook?: FormInstance<any>;
}
