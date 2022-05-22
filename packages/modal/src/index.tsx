import React from 'react';
import { View } from '@tarojs/components';
import './style/index.module.css';

export interface ModalProps {
  /** 显示隐藏 **/
  visible?: boolean;
  /** 展示位置 */
  layout?: 'left' | 'top' | 'right' | 'bottom' | 'middle';
  /** 宽度 **/
  width?: number | string;
  /** 高度 **/
  height?: number | string;
  /** 内容 */
  children?: React.ReactNode;
  /** 最外层 className **/
  modalClassName?: string;
  /** 遮罩层 className **/
  maskClassName?: string;
  /** 内容区域 className **/
  bodyClassName?: string;
  /** 关闭 */
  onClose?: () => void;
  disabledMask?: boolean;
}
export interface ModalRefProps {
  /** 关闭 */
  onMaskClick: () => void;
  //
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const Modal: React.ForwardRefRenderFunction<ModalRefProps, ModalProps> = (props, ref) => {
  const {
    visible = false,
    layout = 'bottom',
    width,
    height,
    children,
    bodyClassName = '',
    maskClassName = '',
    modalClassName = '',
    onClose = () => {},
    disabledMask = false,
  } = props;
  const timer = React.useRef<NodeJS.Timeout>();

  const [open, setOpen] = React.useState(false);

  React.useEffect(() => {
    if (visible !== open) {
      timer.current = setTimeout(() => {
        setOpen(visible);
      }, 300);
    }
    return () => clearTimeout(timer.current);
  }, [visible]);

  React.useEffect(() => {
    return () => clearTimeout(timer.current);
  }, []);

  const widthAndHeight = React.useMemo(() => {
    // 高度
    if (['bottom', 'top'].includes(layout)) {
      return { height };
    } else if (['left', 'right'].includes(layout)) {
      // 宽度
      return { width };
    } else if (layout === 'middle') {
      // 宽高
      return { width, height };
    }
    return {};
  }, [width, height, layout]);

  const onMaskClick = () => {
    setOpen(false);
    timer.current = setTimeout(() => {
      onClose && onClose();
      clearTimeout(timer.current);
    }, 300);
  };

  React.useImperativeHandle(ref, () => ({
    onMaskClick: onMaskClick,
    setOpen,
  }));

  return (
    <View className={`carefree-taro-modal carefree-taro-modal-${open} ${modalClassName}`}>
      <View
        onClick={() => {
          !disabledMask && onMaskClick();
        }}
        className={`carefree-taro-modal-overlay carefree-taro-modal-overlay-${open} ${maskClassName}`}
      />
      <View
        className={`carefree-taro-modal-body carefree-taro-modal-body-${layout} carefree-taro-modal-body-${layout}-${open} ${bodyClassName}`}
        style={widthAndHeight}
      >
        {children}
      </View>
    </View>
  );
};

export default React.forwardRef(Modal);
