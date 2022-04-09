import {
  CarefreeFormProps as CarefreeRCFormProps,
  CarefreeFormConfigProps as CarefreeRCFormConfigProps,
} from 'carefree-rc-field-from-utils';
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

export interface CarefreeFormConfigProps
  extends CarefreeRCFormConfigProps<ItemChildType, ItemChildAttr, ItemProps> {}

export interface CarefreeFormProps
  extends CarefreeRCFormProps<ItemChildType, ItemChildAttr, ItemProps> {}

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
