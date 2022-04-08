import React from 'react';
import { HOOK_MARK } from 'rc-field-form/lib/FieldContext';
import { InternalFormInstance, FormInstance, NamePath } from 'rc-field-form/lib/interface';
import { ChildPropsType } from '../interface';
import { useHideContext } from '../Hide/context';
import { GetStoreProps } from './../Hide/interface';
import { Subscribe, useFormSubscribeProvider } from '../Collect';
import { useFormContext } from '../hooks';
import Item, { ItemProps } from '../item';

export const getNamePath = (path: NamePath) => {
  if (Array.isArray(path)) {
    return path;
  }
  if (typeof path === 'string') {
    return path.split('_').filter((ite) => ite);
  }
  return path;
};

// 根据 Form.useForm() 返回值 [from] 进行获取子项中更新值的方法
export const getChildItemFun = (form: FormInstance) => {
  let childFun: any = {};
  if (form) {
    const { getInternalHooks } = form as InternalFormInstance;
    childFun = getInternalHooks(HOOK_MARK);
  }
  const updateValue = (namePath: NamePath, value: any) => {
    if (childFun.dispatch) {
      childFun.dispatch({
        type: 'updateValue',
        namePath: getNamePath(namePath),
        value,
      });
    }
  };
  // 批量更新值
  const bathUpdateValue = (value: { [k: string]: any }) => {
    Object.entries(value).forEach(([path, value]) => {
      updateValue(path, value);
    });
  };
  return {
    ...childFun,
    updateValue,
    bathUpdateValue,
  };
};

// 获取子项中更新值的方法的 hook
export const useChildItemFun = (form: FormInstance) => {
  return getChildItemFun(form);
};

// 这种方法其他可以使用 Form.
export const useFormWatchList = (props: { [x: string]: any }) => {
  const contex = useFormContext();
  const sub = useFormSubscribeProvider();
  const hideContext = useHideContext();
  let fun:
    | ((
        value: any,
        formValue?: any,
        child?: ChildPropsType,
        hideContext?: GetStoreProps,
        cx?: { forms: Subscribe['subForm']; hides: Subscribe['subHides'] },
      ) => void)
    | undefined;
  let childProps: ChildPropsType = useChildItemFun(contex.itemRefHook);
  if (contex) {
    const { watchList } = contex;
    fun = watchList[(props || {}).id];
  }
  React.useEffect(() => {
    if ((contex || {}).firstMont) {
      const { getFieldsValue } = contex.itemRefHook;
      if (typeof fun === 'function') {
        fun((props || {}).value, getFieldsValue(true), { ...childProps }, hideContext, {
          forms: sub.subForms,
          hides: sub.subHides,
        });
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [JSON.stringify((props || {}).value)]);
  return [childProps];
};

// 监听组件 外层
export const Warp = (props: { [x: string]: any }) => {
  const { children, ...rest } = props || {};
  const [childProps] = useFormWatchList(props);
  if (typeof children === 'function') {
    return children({ ...rest, childProps });
  }
  if (React.isValidElement(children)) {
    return React.cloneElement(children, { ...rest });
  }
  return children;
};

// 监听子组件
export const ItemWatch = (props: ItemProps) => {
  const { children, ...rest } = props;
  return (
    <Item {...rest}>
      <Warp>{children}</Warp>
    </Item>
  );
};
