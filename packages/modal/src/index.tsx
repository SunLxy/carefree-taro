import React from 'react';
import { View, Text } from '@tarojs/components';
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
}

const Modal = (props: ModalProps) => {
  const {
    visible = false,
    layout = 'bottom',
    width,
    height,
    children,
    bodyClassName = '',
    maskClassName = '',
    modalClassName = '',
    onClose = () => {
      console.log(111);
    },
  } = props;
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

  return (
    <View className={`carefree-taro-modal carefree-taro-modal-${visible} ${modalClassName}`}>
      <View
        onClick={onClose}
        className={`carefree-taro-modal-overlay carefree-taro-modal-overlay-${visible} ${maskClassName}`}
      />
      <View
        className={`carefree-taro-modal-body carefree-taro-modal-body-${layout} carefree-taro-modal-body-${layout}-${visible} ${bodyClassName}`}
        style={widthAndHeight}
      >
        {children}
      </View>
    </View>
  );
};

export default Modal;
