import { View } from '@tarojs/components';
import React from 'react';
import CheckRadio from '../icon/CheckRadio';
import './styles/index.css';
import { useCheckRadioContext } from './../hooks';
import { ItemProps } from './../interface';
const Item = (props: ItemProps) => {
  const { value, className } = props;

  const child = Reflect.has(props, 'label') ? Reflect.get(props, 'label') : props.children;

  const [visible, setVisible] = React.useState(false);

  const store = useCheckRadioContext();

  const magnification = React.useMemo(() => {
    return Reflect.has(store, 'magnification')
      ? Reflect.get(store, 'magnification')
      : Reflect.has(props, 'magnification')
      ? Reflect.get(props, 'magnification')
      : 2;
  }, [store.magnification, props.magnification]);

  const iconProps = React.useMemo(() => {
    return Reflect.has(store, 'iconProps') ? Reflect.get(store, 'iconProps') : props.iconProps;
  }, [store.iconProps, props.iconProps]);

  const disabled = React.useMemo(() => {
    return Reflect.has(store, 'disabled') ? Reflect.get(store, 'disabled') : props.disabled;
  }, [store.disabled, props.disabled]);

  const type = React.useMemo(() => {
    return Reflect.has(store, 'type') ? Reflect.get(store, 'type') : props.type;
  }, [store.type, props.type]);

  const diffValue = JSON.stringify({
    value,
    store: store.value,
  });

  const check = React.useMemo(() => {
    if (store.multiple) {
      if (Array.isArray(store.value) && store.value.length) {
        if (store.labelInValue) {
          return !!store.value.find((item) => (item || {})[store.rowKey || ''] === value);
        } else {
          return !!store.value.find((item) => item === value);
        }
      }
    } else {
      if (store.value || store.value === 0 || store.value === false) {
        if (store.labelInValue && store.value) {
          return store.value[store.rowKey || ''] === value;
        }
        return store.value === value;
      }
    }
    return false;
  }, [diffValue]);

  let checkVisible = store.onChange
    ? check
    : Reflect.has(props, 'visible')
    ? props.visible
    : visible;

  const onClick = () => {
    if (type === 'radio' && checkVisible) {
      return;
    }
    if (store.onChange) {
      store.onChange(
        value,
        checkVisible,
        props.itemValue || { [store.rowKey || '']: value, [store.labelKey || '']: child },
      );
    } else if (props.onChange) {
      props.onChange(!checkVisible);
    } else {
      setVisible(!checkVisible);
    }
  };

  return (
    <View onClick={onClick} className={`carefree-taro-check-radio-item ${className}`}>
      <CheckRadio
        {...(iconProps || {})}
        disabled={disabled}
        magnification={magnification}
        visible={checkVisible}
        onClick={onClick}
      />
      <View className="carefree-taro-check-radio-item-body">{child}</View>
    </View>
  );
};

export default Item;
