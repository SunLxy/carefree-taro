/**尝试使用 rc-field-form 进行封装 taro form 表单
 * 1. 布局 分为 'vertical' | 'horizontal' | 'space'
 * 2. `:` 显示
 * 3. 每个 from item 下的下划线
 * 4. 每个 label 项的样式
 * 5. 每个 错误提示
 * 6. 输入框外侧样式
 * 7. 必填样式
 * 8. 表单联动
 * 9. 隐藏和显示
 * 10. 多表单处理(联动和隐藏)
 * */
import React from 'react';
import Form, { useForm, FormInstance, FormProvider, List } from 'rc-field-form';
import { FormContext } from './hooks';

import { CarefreeFormProps } from './interface';

import Item from './item';

const InitForm: React.ForwardRefRenderFunction<FormInstance, CarefreeFormProps> = (props, ref) => {
  const { form, name, children, ...other } = props;

  const [forms] = Form.useForm(form);

  return (
    <FormContext.Provider value={{}}>
      <Form {...other} name={name} ref={ref} component={false}>
        {children}
      </Form>
    </FormContext.Provider>
  );
};

const InternalForm = React.forwardRef<FormInstance, CarefreeFormProps>(InitForm);

export type RCFormProps = typeof InternalForm;

interface RefForm extends RCFormProps {
  Item: typeof Item;
  useForm: typeof useForm;
  FormProvider: typeof FormProvider;
  List: typeof List;
}

const CarefreeForm: RefForm = InternalForm as RefForm;

CarefreeForm.Item = Item;
CarefreeForm.useForm = useForm;
CarefreeForm.FormProvider = FormProvider;
CarefreeForm.List = List;

export { useForm, FormProvider, List };

export default CarefreeForm;
