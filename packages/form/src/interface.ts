import { FormProps } from 'rc-field-form';
import React from 'react';

import { ItemProps } from './item';
export interface CarefreeFormItemConfig {
  /** label **/
  label?: React.ReactNode;
  /** 字段 **/
  name?: string | number | (string | number)[];
  /** 子项 属性  列如：Input之类的  */
  attr?: any;
  /** form item 属性 **/
  itemAttr?: Omit<ItemProps, 'label' | 'name'>;
}

export interface CarefreeFormProps extends FormProps {
  /** 表单项的 配置 */
  config: CarefreeFormItemConfig[];
  /** 隐藏  */
  /** 收集  */
}

export interface ContextProps {
  name?: string;
  bottomBorder?: boolean;
  bottomBorderColor?: string;
  bottomBorderWidth?: number;
  /** 是否显示冒号 **/
  isColon?: boolean;
}
