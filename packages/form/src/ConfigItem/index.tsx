import React from 'react';
import { CarefreeFormConfigProps } from './../interface';
import FormItem from './../item';
import {
  useFormParentNameContext,
  WatchListProps,
  HideItem,
  WatchItem,
} from 'carefree-rc-field-from-utils';

import {
  Input,
  InputProps,
  Picker,
  PickerSelectorProps,
  PickerMultiSelectorProps,
  PickerTimeProps,
  PickerDateProps,
  PickerRegionProps,
  PickerView,
  PickerViewProps,
  Radio,
  RadioProps,
  Slider,
  SliderProps,
  Switch,
  SwitchProps,
  Textarea,
  TextareaProps,
  Checkbox,
  CheckboxProps,
} from '@tarojs/components';

type PickerProps =
  | PickerSelectorProps
  | PickerMultiSelectorProps
  | PickerTimeProps
  | PickerDateProps
  | PickerRegionProps;

const getPathName = (
  name: string | number | (string | number)[],
  formName: string | number | undefined,
) => {
  if (Array.isArray(name)) {
    return (formName && [formName].concat(name).join('_')) || name.join('_');
  }
  return (formName && `${formName}_${name}`) || name;
};

export interface ConfigItemProps {
  config: CarefreeFormConfigProps[];
  watchList: WatchListProps;
}

const ConfigItem = (props: ConfigItemProps) => {
  const { config, watchList } = props;

  const formName = useFormParentNameContext();

  return (
    <React.Fragment>
      {config.map((item, index) => {
        const { type, label, name, itemAttr, attr, rules, render, isHide } = item;

        const { shouldUpdate, dependencies, ...itemOther } = itemAttr || {};
        let renderItem = undefined;

        if (type === 'Input') {
          const attrs = attr as InputProps;
          renderItem = <Input placeholder={`请输入${label}`} {...attrs} />;
        } else if (type === 'Picker') {
          const attrs = attr as PickerProps;
          renderItem = <Picker {...attrs} />;
        } else if (type === 'PickerView') {
          const attrs = attr as PickerViewProps;
          renderItem = <PickerView {...attrs} />;
        } else if (type === 'Radio') {
          const attrs = attr as RadioProps;
          renderItem = <Radio {...attrs} />;
        } else if (type === 'Slider') {
          const attrs = attr as SliderProps;
          renderItem = <Slider {...attrs} />;
        } else if (type === 'Switch') {
          const attrs = attr as SwitchProps;
          renderItem = <Switch {...attrs} />;
        } else if (type === 'Textarea') {
          const attrs = attr as TextareaProps;
          renderItem = <Textarea placeholder={`请输入${label}`} {...attrs} />;
        } else if (type === 'Checkbox') {
          const attrs = attr as CheckboxProps;
          renderItem = <Checkbox {...attrs} />;
        } else if (type === 'Custom') {
          renderItem = render;
        }

        if (watchList && Object.keys(watchList).length && watchList[getPathName(name, formName)]) {
          renderItem = <WatchItem key={index}>{renderItem}</WatchItem>;
        }

        const deep: any = {};
        if (shouldUpdate) {
          deep.shouldUpdate = shouldUpdate;
        } else if (!shouldUpdate && dependencies) {
          deep.dependencies = dependencies;
        } else if (!shouldUpdate && !dependencies && typeof renderItem === 'function') {
          deep.dependencies = [name];
        }
        renderItem = (
          <FormItem {...deep} {...itemOther} name={name} label={label} rules={rules} key={index}>
            {renderItem}
          </FormItem>
        );
        if (isHide && name) {
          return (
            <HideItem key={index} name={name}>
              {renderItem}
            </HideItem>
          );
        }
        return renderItem;
      })}
    </React.Fragment>
  );
};

export default ConfigItem;
