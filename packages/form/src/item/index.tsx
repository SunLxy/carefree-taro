import React from 'react';
import { View } from '@tarojs/components';
import { Field } from 'rc-field-form';
import { InternalFieldProps } from 'rc-field-form/lib/Field';
import { toArray, getFieldId } from '../utils/index';
import { useFormContent } from '../hooks';
import { getRequired } from './utils';

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
  const { rules, layout, isColon, label, labelWarpStyle, required, children, ...other } = props;

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
        const childNode =
          typeof children === 'function'
            ? children({ ...control, id: fieldId }, meta, form)
            : React.cloneElement(children as React.ReactElement, {
                ...restcontrol,
                onChange: onChange,
                onInput: onChange,
                id: fieldId,
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
            <View>
              <View>
                {label}
                {colonRender}
              </View>
              <View>
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
