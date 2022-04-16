export interface IconProps {
  visible?: boolean;
  size?: number | string;
  color?: string;
  borderWidth?: number;
  borderColor?: string;
  onClick?: (visible: boolean) => void;
  disabled?: boolean;
  borderStyle?:
    | 'none'
    | 'hidden'
    | 'dotted'
    | 'dashed'
    | 'solid'
    | 'double'
    | 'groove'
    | 'ridge'
    | 'inset'
    | 'outset'
    | string;
  /** 圆角倍率 用于计算圆角(宽/倍率) **/
  magnification?: number;
}
