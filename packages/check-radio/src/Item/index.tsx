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
  const diffValue = JSON.stringify({
    value,
    store: store.value,
  });

  const check = React.useMemo(() => {
    if (store.multiple) {
      if (Array.isArray(store.value) && store.value.length) {
        if (store.labelInValue) {
          return !!store.value.find((item) => item[store.rowKey] === value);
        } else {
          return !!store.value.find((item) => item === value);
        }
      }
    } else {
      if (store.value || store.value === 0 || store.value === false) {
        if (store.labelInValue && store.value) {
          return store.value[store.rowKey] === value;
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

  const onClick = (visible: boolean) => {
    if (store.onChange) {
      store.onChange(
        value,
        checkVisible,
        props.itemValue || { [store.rowKey]: value, [store.labelKey]: child },
      );
    } else if (props.onChange) {
      props.onChange(!checkVisible);
    } else {
      setVisible(visible);
    }
  };

  return (
    <View
      onClick={() => onClick(!visible)}
      className={`carefree-taro-check-radio-item ${className}`}
    >
      <CheckRadio visible={checkVisible} onClick={onClick} />
      <View className="carefree-taro-check-radio-item-body">{child}</View>
    </View>
  );
};

export default Item;
