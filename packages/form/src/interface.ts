import { FormProps } from 'rc-field-form';

export interface CarefreeFormProps extends FormProps {}

export interface ContextProps {
  name?: string;
  bottomBorder?: boolean;
  bottomBorderColor?: string;
  bottomBorderWidth?: number;
  /** 是否显示冒号 **/
  isColon?: boolean;
}
