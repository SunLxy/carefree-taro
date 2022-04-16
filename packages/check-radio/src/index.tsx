import React from 'react';
import { View } from '@tarojs/components';
import './styles/index.css';
import Item from './Item';
import { CheckRadioContext } from './hooks';
import { ValueType, CheckRadioProps } from './interface';

const CheckRadio = (props: CheckRadioProps) => {
  const {
    value,
    onChange,
    render,
    options,
    rowKey = 'value',
    labelKey = 'label',
    children,
    ...rest
  } = props;

  const [store, setStore] = React.useState<CheckRadioProps['value']>(
    props.multiple ? [] : undefined,
  );

  let checkStore = Reflect.has(props, 'value') ? value : store;

  // 处理子集传递的状态
  const onValueChange = (itemValue: ValueType, check: boolean, rowValue: ValueType) => {
    let newValue: CheckRadioProps['value'] = itemValue;
    if (check) {
      if (props.multiple) {
        if (Array.isArray(checkStore)) {
          if (props.labelInValue) {
            newValue = (checkStore as any[]).filter((item) => item[rowKey] !== itemValue);
          } else {
            newValue = (checkStore as any[]).filter((item) => item !== itemValue);
          }
        }
      } else {
        newValue = undefined;
      }
    } else {
      if (props.multiple) {
        if (!checkStore) {
          checkStore = [];
        }
        if (Array.isArray(checkStore)) {
          if (props.labelInValue) {
            newValue = checkStore.concat([rowValue]);
          } else {
            newValue = checkStore.concat([itemValue]);
          }
        }
      } else {
        if (props.labelInValue) {
          newValue = rowValue;
        } else {
          newValue = itemValue;
        }
      }
    }
    if (onChange) {
      onChange(newValue, itemValue);
    } else {
      setStore(newValue);
    }
  };

  const optionsRender = React.useMemo(() => {
    return (options || []).map((item, index) => {
      const { onChange, children, visible, ...rest } = item;
      const label = render ? render(item) : item[labelKey];
      return <Item key={index} {...rest} label={label} value={item[rowKey]} itemValue={item} />;
    });
  }, [options]);

  return (
    <CheckRadioContext.Provider
      value={{
        ...rest,
        rowKey,
        labelKey,
        value: checkStore,
        onChange: onValueChange,
      }}
    >
      {optionsRender}
      {children}
    </CheckRadioContext.Provider>
  );
};

CheckRadio.Item = Item;

export default CheckRadio;
