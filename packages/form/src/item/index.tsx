import React from 'react';
import { View, Text } from '@tarojs/components';
import { Field } from 'rc-field-form';
import { InternalFieldProps } from 'rc-field-form/lib/Field';
import { toArray, getFieldId } from '../utils/index';
import { useFormStyleContext } from '../hooks';
import { getRequired } from './utils';
import './style/index.module.css';

export interface ItemProps extends Omit<InternalFieldProps<any>, 'name' | 'fieldContext'> {
  /** 布局 **/
  layout?: 'vertical' | 'horizontal' | 'space';
  /** 是否显示冒号 **/
  isColon?: boolean;
  /** label 展示内容 **/
  label?: React.ReactNode;
  /** 字段 **/
  name?: string | number | (string | number)[];
  /** 必填样式 **/
  required?: boolean;
  bottomBorder?: boolean;
  bottomBorderColor?: string;
  bottomBorderWidth?: number;
  // 错误提示方面先不做，后面看一下怎么做好看点
  errorLayout?: 'right' | 'left';
  /** 自定义错误渲染**/
  errorRender?: (str: string, err: string[]) => React.ReactNode;
}

const Item = (props: ItemProps) => {
  const {
    rules,
    layout: childLayout,
    isColon,
    label,
    required,
    children,
    bottomBorder,
    bottomBorderColor,
    bottomBorderWidth,
    errorLayout = 'right',
    errorRender,
    ...other
  } = props;

  const {
    name: formName,
    bottomBorder: parentBottomBorder,
    bottomBorderColor: parentBottomBorderColor,
    bottomBorderWidth: parentBottomBorderWidth,
    isColon: parentIsColon,
    layout: parentLayout,
  } = useFormStyleContext();

  const layout = React.useMemo(() => {
    return childLayout || parentLayout;
  }, [childLayout, parentLayout]);

  const colonRender = React.useMemo(() => {
    let colonStr = <Text className="form-item-label-colon">:</Text>;
    if (layout === 'horizontal') {
      if (typeof isColon === 'boolean' && isColon) {
        return colonStr;
      }
      if (typeof isColon === 'boolean' && !isColon) {
        return <React.Fragment />;
      }
      if (typeof parentIsColon === 'boolean' && parentIsColon) {
        return colonStr;
      }
    }
    return <React.Fragment />;
  }, [isColon, layout, parentIsColon]);

  const borderWidth = React.useMemo(() => {
    let width = parentBottomBorderWidth + 'px';
    if (typeof bottomBorderWidth === 'number') {
      width = bottomBorderWidth + 'px';
    }
    return width;
  }, [parentBottomBorderWidth, bottomBorderWidth]);

  const borderColor = React.useMemo(() => {
    let color = parentBottomBorderColor;
    if (typeof bottomBorderColor === 'string') {
      color = bottomBorderColor;
    }
    return color;
  }, [parentBottomBorderColor, bottomBorderColor]);

  const bottom = React.useMemo(() => {
    let borderBottom: string = `${borderWidth} solid `;
    if (!parentBottomBorder) {
      borderBottom = '';
    }
    if (typeof bottomBorder === 'boolean' && bottomBorder) {
      borderBottom = `${borderWidth} solid `;
    }

    if (typeof bottomBorder === 'boolean' && !bottomBorder) {
      borderBottom = '';
    }
    return borderBottom;
  }, [borderWidth, bottomBorder, parentBottomBorder]);

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

        const borderBottomColor = !!errs.length ? 'red' : borderColor;

        let borderStyle: { borderBottom?: string } = {};

        if (bottom) {
          borderStyle = { borderBottom: bottom + borderBottomColor };
        }

        /**
         *
         * 1. label 放在输入框上面
         * 2. label 和输入框放在一行
         * 3. label 和输入框放在一行，两侧
         * 4. 错误提示，默认放在每行的最下方
         * 5. 错误提示可以自定义渲染
         * **/

        const cls = !errs.length ? '' : 'form-item-error-color';

        return (
          <View>
            <View className={`form-item-${layout}`} style={{ ...borderStyle }}>
              <View className={`form-item-label ${cls}`}>
                {isRequired && <Text className="form-item-label-required">*</Text>}
                {label}
                {colonRender}
              </View>
              <View className={`form-item-input form-item-input-${layout}`}>
                {/* 输入框 */}
                {childNode}
              </View>
            </View>
            <View
              className={`form-item-error form-item-error-color form-item-error-${errorLayout}`}
            >
              {/* 错误提示的 */}
              {errorRender && typeof errorRender === 'function'
                ? errorRender(errs, meta.errors)
                : errs}
            </View>
          </View>
        );
      }}
    </Field>
  );
};

export default Item;
