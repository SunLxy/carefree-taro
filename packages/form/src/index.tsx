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
import { FormContext, useFormContext, FormStyleContext, useFormStyleContext } from './hooks';
import { CarefreeFormProps } from './interface';
import { useFormWatchList, useChildItemFun, getChildItemFun, ItemWatch } from './Watch';
import {
  FormSubscribeProvider,
  useFormSubscribeProvider,
  useSubscribeReginsterId,
  useSubscribe,
} from './Collect';
import useFormItemHide from './Hide/store';
import HideItem from './Hide';
import Item from './item';
import { HideContext } from './Hide/context';
import ConfigItem from './ConfigItem';
export * from './interface';

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
  const [hide] = useFormItemHide(formHide);

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
          <Form {...other} name={name} ref={ref} component={false}>
            <ConfigItem
              key={'ConfigItem'}
              config={config || []}
              watchList={watchList || {}}
              name={name}
            />
            {children}
          </Form>
        </FormStyleContext.Provider>
      </FormContext.Provider>
    </HideContext.Provider>
  );
};

const InternalForm = React.forwardRef<FormInstance, CarefreeFormProps>(InitForm);

export type RCFormProps = typeof InternalForm;

interface RefForm extends RCFormProps {
  Item: typeof Item;
  FormProvider: typeof FormProvider;
  useForm: typeof Form.useForm;
  List: typeof List;
  ItemWatch: typeof ItemWatch;
  useFormContext: typeof useFormContext;
  useFormStyleContext: typeof useFormStyleContext;
  useFormWatchList: typeof useFormWatchList;
  useChildItemFun: typeof useChildItemFun;
  getChildItemFun: typeof getChildItemFun;
  useFormItemHide: typeof useFormItemHide;
  HideItem: typeof HideItem;
  useSubscribe: typeof useSubscribe; // 初始化
  FormSubscribeProvider: typeof FormSubscribeProvider; //
  useFormSubscribeProvider: typeof useFormSubscribeProvider; // 使用
  useSubscribeReginsterId: typeof useSubscribeReginsterId; // 注册
}

const CarefreeForm: RefForm = InternalForm as RefForm;

CarefreeForm.Item = Item;
CarefreeForm.useForm = useForm;
CarefreeForm.FormProvider = FormProvider;
CarefreeForm.List = List;
// 下面这几个都是监听字段变化的
CarefreeForm.ItemWatch = ItemWatch;
CarefreeForm.useFormContext = useFormContext;
CarefreeForm.useFormWatchList = useFormWatchList;
CarefreeForm.useFormStyleContext = useFormStyleContext;
// 获取form内部更新单个字段值方法
CarefreeForm.useChildItemFun = useChildItemFun;
CarefreeForm.getChildItemFun = getChildItemFun;
// 用于组件隐藏
CarefreeForm.useFormItemHide = useFormItemHide;
CarefreeForm.HideItem = HideItem;
// 以下是为了收集form多个表单
CarefreeForm.useSubscribe = useSubscribe;
CarefreeForm.FormSubscribeProvider = FormSubscribeProvider;
CarefreeForm.useFormSubscribeProvider = useFormSubscribeProvider;
CarefreeForm.useSubscribeReginsterId = useSubscribeReginsterId;

export default CarefreeForm;
