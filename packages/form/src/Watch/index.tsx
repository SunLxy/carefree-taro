import React from 'react';
import { WatchItem } from 'carefree-rc-field-from-utils';
import Item, { ItemProps } from './../item';
const WatchFormItem = (props: ItemProps) => {
  const { children, ...rest } = props;
  return (
    <Item {...rest}>
      <WatchItem>{children}</WatchItem>
    </Item>
  );
};
export default WatchFormItem;
