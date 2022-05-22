import { BaseEventOrig, Icon, Input, InputProps, View } from '@tarojs/components';
import React from 'react';
import './styles/index.css';

export interface InputSearchProps extends InputProps {
  /** 前缀 **/
  prefix?: React.ReactNode;
  /** 后缀 **/
  suffix?: React.ReactNode;
  /** 包裹层className **/
  classNameWarp?: string;
  /** 值变化事件 **/
  onChange?: (value: string | number, event?: BaseEventOrig<InputProps.inputEventDetail>) => void;
  /** 禁用**/
  disabled?: boolean;
  bordered?: boolean;
  /** 只留底部边框 **/
  borderBottom?: boolean;
}

const InputSearch = (props: InputSearchProps) => {
  const {
    prefix,
    suffix,
    className,
    classNameWarp,
    value,
    onChange,
    disabled,
    bordered = true,
    borderBottom = false,
    ...rest
  } = props;

  const [newValue, setValue] = React.useState(undefined);

  React.useMemo(() => setValue(value), [value]);

  const onInput = (event: BaseEventOrig<InputProps.inputEventDetail>) => {
    const value = event.detail.value;

    if (onChange) {
      onChange(value, event);
    } else {
      setValue(value);
    }
  };

  const onClear = () => {
    if (onChange) {
      onChange(undefined, undefined);
    } else {
      setValue(value);
    }
  };

  const isValue = !['', undefined, null].includes(newValue);

  const borderClx = ((!bordered || borderBottom) && 'carefree-taro-search-no-bordered') || '';

  return (
    <View
      className={`carefree-taro-search ${borderClx} ${
        (borderBottom && 'carefree-taro-search-bordered-bottom') || ''
      }  ${classNameWarp}`}
    >
      {prefix && <View className={`carefree-taro-search-prefix ${borderClx}`}>{prefix}</View>}
      <View className="carefree-taro-search-input-warp">
        <Input
          {...rest}
          disabled={disabled}
          value={newValue}
          onInput={onInput}
          className={`carefree-taro-search-input ${borderClx} ${className}`}
        />
        {isValue && !disabled && (
          <Icon
            size="18"
            onClick={onClear}
            className="carefree-taro-search-input-close"
            type="clear"
          />
        )}
      </View>
      {suffix && <View className={`carefree-taro-search-suffix ${borderClx}`}>{suffix}</View>}
    </View>
  );
};

export default InputSearch;
