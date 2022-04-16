import React from 'react';
import { View } from '@tarojs/components';
import './styles/index.css';
import { IconProps } from './interface';
import { getCircleBgSize, getCircleSize } from './utils';
export default (props: IconProps) => {
  const {
    visible = false,
    size = 20,
    color = '#1890ff',
    borderWidth = 1,
    borderColor = '#d9d9d9',
    borderStyle = 'solid',
    onClick,
    disabled,
    magnification = 2,
  } = props;

  const [show, setShow] = React.useState(visible);

  let isShow = show;
  if (Reflect.has(props, 'visible')) {
    isShow = Reflect.get(props, 'visible');
  }

  const bg = React.useMemo(() => {
    if (isShow) {
      return { backgroundColor: color };
    }
    return {};
  }, [color, isShow]);

  return (
    <View
      className={`carefree-taro-icon-check-radio carefree-taro-icon-check-radio-disabled-${disabled}`}
      onClick={(event) => {
        if (disabled) {
          return;
        }
        event.stopPropagation();
        event.preventDefault();
        if (onClick) {
          onClick(!isShow);
        } else {
          setShow(!isShow);
        }
      }}
      style={{
        borderWidth,
        borderColor,
        borderStyle,
        ...getCircleSize(size, borderWidth, magnification),
      }}
    >
      <View
        className={`carefree-taro-icon-check-radio-${isShow} carefree-taro-icon-check-radio-bg`}
        style={{
          ...getCircleBgSize(size, borderWidth, magnification),
          ...bg,
        }}
      />
    </View>
  );
};
