import React from 'react';
import { View } from '@tarojs/components';
import './styles/index.css';
import CheckRadio from './icon/CheckRadio';
export default () => {
  return (
    <View>
      <CheckRadio />
      <CheckRadio magnification={10} />
    </View>
  );
};
