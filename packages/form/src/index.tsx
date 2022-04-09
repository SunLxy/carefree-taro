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
import { FormStyleContext, useFormStyleContext } from './hooks';
import Item from './item';
import ConfigItem from './ConfigItem';

import {
  /** 原 Collect  */
  SubscribeFormProvider,
  useSubscribeFormProvider,
  useSubscribeReginsterId,
  useSubscribe,
  /** 原 watch  */
  useWatchList,
  useChildItemFun,
  getChildItemFun,
  WatchItem,
  /** 原 hide  */
  HideItem,
  useHideFormItem,
  HideContext,
  /** 原 hooks  */
  FormContext,
  useFormContext,
  FormParentNameContext,
  useFormParentNameContext,
} from 'carefree-rc-field-from-utils';
export * from 'carefree-rc-field-from-utils';
import { CarefreeFormProps, CarefreeFormConfigProps } from './interface';
export type { CarefreeFormProps, CarefreeFormConfigProps };

const InitForm: React.ForwardRefRenderFunction<FormInstance, CarefreeFormProps> = (props, ref) => {
  const {
    form,
    name,
    children,
    config = [],
    watchList,
    formHide,
    initialHide,
    subscribe,
    layout = 'horizontal',
    ...other
  } = props;

  const formRef = React.useRef<FormInstance>();

  const [firstMont, setFirstMont] = React.useState(false);

  React.useEffect(() => {
    let timer;
    clearTimeout(timer);
    timer = setTimeout(() => {
      setFirstMont(true);
    }, 300);
    return () => clearTimeout(timer);
  }, []);
  const [forms] = Form.useForm(form);
  const [hide] = useHideFormItem(formHide);

  // 只用组件加载的时候 运行一次
  React.useMemo(() => hide.setInitialValues(initialHide || {}, true), []);
  // 当前这个适用于 多个form表单获取值
  const [sub] = useSubscribe(subscribe);

  useSubscribeReginsterId({
    name: props.name,
    form: forms,
    subscribe: sub,
    hide: hide,
  });
  React.useImperativeHandle(ref, () => formRef.current);

  return (
    <FormParentNameContext.Provider value={name}>
      <HideContext.Provider value={hide}>
        <FormContext.Provider
          value={{
            firstMont,
            watchList: watchList || {},
            form: forms,
            itemRefHook: formRef.current,
          }}
        >
          <FormStyleContext.Provider
            value={{
              bottomBorder: true,
              bottomBorderColor: '#ccc',
              bottomBorderWidth: 1,
              isColon: true,
              layout: 'vertical',
            }}
          >
            <Form {...other} name={name} ref={formRef} component={false}>
              <ConfigItem config={config || []} watchList={watchList || {}} />
              {children}
            </Form>
          </FormStyleContext.Provider>
        </FormContext.Provider>
      </HideContext.Provider>
    </FormParentNameContext.Provider>
  );
};

const InternalForm = React.forwardRef<FormInstance, CarefreeFormProps>(InitForm);

export type RCFormProps = typeof InternalForm;

interface RefForm extends RCFormProps {
  Item: typeof Item;
  FormProvider: typeof FormProvider;
  useForm: typeof Form.useForm;
  List: typeof List;
  WatchItem: typeof WatchItem;
  useFormContext: typeof useFormContext;
  useFormStyleContext: typeof useFormStyleContext;
  useWatchList: typeof useWatchList;
  useChildItemFun: typeof useChildItemFun;
  getChildItemFun: typeof getChildItemFun;
  useHideFormItem: typeof useHideFormItem;
  HideItem: typeof HideItem;
  useSubscribe: typeof useSubscribe; // 初始化
  SubscribeFormProvider: typeof SubscribeFormProvider; //
  useSubscribeFormProvider: typeof useSubscribeFormProvider; // 使用
  useSubscribeReginsterId: typeof useSubscribeReginsterId; // 注册
  useFormParentNameContext: typeof useFormParentNameContext;
  FormParentNameContext: typeof FormParentNameContext;
}

const CarefreeForm: RefForm = InternalForm as RefForm;

CarefreeForm.Item = Item;
CarefreeForm.useForm = useForm;
CarefreeForm.FormProvider = FormProvider;
CarefreeForm.List = List;
// 下面这几个都是监听字段变化的
CarefreeForm.WatchItem = WatchItem;
CarefreeForm.useFormContext = useFormContext;
CarefreeForm.useWatchList = useWatchList;
CarefreeForm.useFormStyleContext = useFormStyleContext;
CarefreeForm.FormParentNameContext = FormParentNameContext;
CarefreeForm.useFormParentNameContext = useFormParentNameContext;

// 获取form内部更新单个字段值方法
CarefreeForm.useChildItemFun = useChildItemFun;
CarefreeForm.getChildItemFun = getChildItemFun;
// 用于组件隐藏
CarefreeForm.useHideFormItem = useHideFormItem;
CarefreeForm.HideItem = HideItem;
// 以下是为了收集form多个表单
CarefreeForm.useSubscribe = useSubscribe;
CarefreeForm.SubscribeFormProvider = SubscribeFormProvider;
CarefreeForm.useSubscribeFormProvider = useSubscribeFormProvider;
CarefreeForm.useSubscribeReginsterId = useSubscribeReginsterId;

export default CarefreeForm;
