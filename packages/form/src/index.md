---
title: form
order: 1
nav:
  order: 1
  title: form
  path: /form
group:
  path: /
---

根据 rc-field-from 封装的表单，实现表单的校验/联动/隐藏/展示/更新 功能

```bash

npm i creafree-taro-form

```

部分参数可以参考 [form utils](http://carefrees.top:9001/from-utils)

类型 `ItemChildType` 和 `ItemChildAttr` 这边进行了覆写

```ts
export type ItemChildType =
  | 'Input'
  | 'Picker'
  | 'PickerView'
  | 'Radio'
  | 'Slider'
  | 'Switch'
  | 'Textarea'
  | 'Checkbox'
  | 'Custom';

export type ItemChildAttr =
  | InputProps
  | PickerProps
  | PickerViewProps
  | RadioProps
  | SliderProps
  | SwitchProps
  | TextareaProps
  | CheckboxProps;
```

## 案例

```js
import { Component } from 'react';
import { View, Input } from '@tarojs/components';
import CarefTaroFrom from 'carefree-taro-form';

export default Index = () => {
  return (
    <View>
      <CarefTaroFrom
        initialHide={{ ces2: true }}
        watchList={{
          ces: (value, formvalue, child, hideContext) => {
            console.log(value, hideContext);
            if (value === '12') {
              hideContext.updateValue('a', true);
              hideContext.updateValue('ces2', false);
            } else if (hideContext.getStoreState(['a'])) {
              hideContext.updateValue('a', false);
              hideContext.updateValue('ces2', true);
            }
          },
        }}
        config={[
          {
            type: 'Input',
            label: '张三',
            name: 'ces',
            rules: [{ required: true, message: '请输入' }],
          },
          {
            type: 'Input',
            label: '张三2',
            name: 'ces2',
            isHide: true,
            rules: [{ required: true, message: '请输入' }],
          },
        ]}
      >
        <CarefTaroFrom.HideItem name="a">
          <CarefTaroFrom.Item
            required
            name="a"
            label="标题1"
            rules={[{ required: true, message: '请输入' }]}
          >
            <Input placeholder="将会获取焦点" focus />
          </CarefTaroFrom.Item>
        </CarefTaroFrom.HideItem>
        <CarefTaroFrom.Item name="b" label="标题2">
          <Input placeholder="将会获取焦点" focus />
        </CarefTaroFrom.Item>
      </CarefTaroFrom>
    </View>
  );
};
```
