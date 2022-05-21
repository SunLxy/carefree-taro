import { Input, InputProps } from '@tarojs/components';
import React from 'react';
import './styles/index.css';
export interface SearchProps extends InputProps {}

const Search = (props: SearchProps) => {
  const { ...rest } = props;

  return <Input {...rest} className="carefree-taro-search" />;
};

export default Search;
