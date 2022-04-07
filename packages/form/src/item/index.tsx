import React from 'react';
import { View, Text } from '@tarojs/components';
import { Field } from 'rc-field-form';
import { InternalFieldProps } from 'rc-field-form/lib/Field';
import { toArray, getFieldId } from '../utils/index';
import { useFormContent } from '../hooks';
import { getRequired } from './utils';
import './style/index.module.css';

export interface ItemProps extends Omit<InternalFieldProps<any>, 'name' | 'fieldContext'> {
  /** 布局 **/
  layout?: 'vertical' | 'horizontal' | 'space';
  /** 是否显示冒号 **/
  isColon?: boolean;
  /** label 展示内容 **/
  label?: React.ReactNode;
  labelWarpStyle?: React.CSSProperties;
  /** 字段 **/
  name?: string | number | (string | number)[];
  /** 必填样式 **/
  required?: boolean;
  bottomBorder?: boolean;
  bottomBorderColor?: string;
  bottomBorderWidth?: number;
  // 错误提示方面先不做，后面看一下怎么做好看点
}

const Item = (props: ItemProps) => {
  const {
    rules,
    layout = 'vertical',
    isColon,
    label,
    labelWarpStyle,
    required,
    children,
    ...other
  } = props;

  const { name: formName } = useFormContent();

  const colonRender = React.useMemo(() => {
    if (isColon && layout === 'horizontal') {
      return ':';
    }
    return <React.Fragment />;
  }, [isColon, layout]);

  return (
    <Field {...other} rules={rules}>
      {(control, meta, form) => {
        const { value, ...restcontrol } = control;
        const mergedName = toArray(props.name).length && meta ? meta.name : [];
        const fieldId = getFieldId(mergedName, formName);
        // 判断是否必填
        const isRequired = getRequired(required, rules, form);

        if (fieldId) {
          restcontrol.value = value;
        }

        const onChange = (target: any) => {
          control.onChange(target);
        };

        const childProps = {
          ...control,
          onChange: onChange,
          onInput: onChange,
          id: fieldId,
        };

        const childNode =
          typeof children === 'function'
            ? children({ ...childProps }, meta, form)
            : React.cloneElement(children as React.ReactElement, {
                ...childProps,
              });

        const errs = meta.errors.map((err) => err).join(',');
        /**
         * 1. label 放在输入框上面
         * 2. label 和输入框放在一行
         * 3. label 和输入框放在一行，两侧
         * 4. 错误提示，默认放在每行的最下方
         * 5. 错误提示可以自定义渲染
         *
         * **/

        return (
          <View style={{ borderBottom: '1px solid #ccc' }}>
            <View className={`form-item-${layout}`}>
              <View className="form-item-label">
                {isRequired && <Text className="form-item-label-required">*</Text>}
                {label}
                {colonRender}
              </View>
              <View className={`form-item-input form-item-input-${layout}`}>
                {/* 输入框 */}
                {childNode}
              </View>
            </View>
            <View>{/* 错误提示的 */}</View>
          </View>
        );
      }}
    </Field>
  );
};

export default Item;
