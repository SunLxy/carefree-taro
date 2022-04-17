import { IconProps } from './icon/interface';
export type ValueType = string | number | boolean | Record<string, any>;

export interface CheckRadioProps {
  /** 值 **/
  value?: ValueType | ValueType[];
  labelInValue?: boolean;
  /** 值变更事件 **/
  onChange?: (value: ValueType | ValueType[], options?: ValueType) => void;
  /** 是否 多选 **/
  multiple?: boolean;
  /** 禁用 **/
  disabled?: boolean;
  /** icon 图标配置 **/
  iconProps?: Omit<IconProps, 'onClick' | 'visible' | 'disabled' | 'magnification'>;
  /** 主键 */
  rowKey?: string;
  /** 渲染字段 */
  labelKey?: string;
  /** 自定义渲染 **/
  render?: (options: ValueType) => React.ReactNode;
  options?: Record<string, any>[];
  children?: React.ReactNode;
  /** 圆角倍率 用于计算圆角(宽/倍率) **/
  magnification?: number;
  type?: 'radio';
}

export interface ItemProps {
  visible?: boolean;
  /** 组件的值 */
  value?: ValueType;
  /** 组件渲染  当设置 children 时以 children 展示 **/
  label?: React.ReactNode;
  /** 这个参数 适用于 单个展示时使用 **/
  onChange?: (visible: boolean) => void;
  /** 禁用 **/
  disabled?: boolean;
  /** icon 图标配置 **/
  iconProps?: Omit<IconProps, 'onClick' | 'visible' | 'disabled' | 'magnification'>;
  children?: React.ReactNode;
  /** 在options中当前对象的所有值 */
  itemValue?: ValueType;
  className?: string;
  /** 圆角倍率 用于计算圆角(宽/倍率) **/
  magnification?: number;
  type?: 'radio';
}

export interface CheckRadioContextProps extends Omit<CheckRadioProps, 'render' | 'onChange'> {
  onChange?: (value: ValueType, check: boolean, options?: ValueType) => void;
}
