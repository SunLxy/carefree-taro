---
title: start
order: 1
nav:
  order: 9
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
