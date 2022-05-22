import React from 'react';
import Search, { InputSearchProps } from 'carefree-taro-search';
import Modal, { ModalProps } from 'carefree-taro-modal';
import { Button, View, Icon } from '@tarojs/components';
import './styles/index.css';

export interface FuzzySearchProps extends ModalProps {
  title?: React.ReactNode;
  value?: string;
  onChange?: InputSearchProps['onChange'];
  searchProps?: Omit<InputSearchProps, 'onChange'>;
  searchBtnText?: React.ReactNode;
  children?: React.ReactNode;
}

const FuzzySearch = (props: FuzzySearchProps) => {
  const {
    title = '请选择',
    visible = true,
    bodyClassName = '',
    searchProps = {},
    onChange,
    searchBtnText = '查询',
    children,
    scrollViewProps,
    onClose,
    ...rest
  } = props;

  return (
    <React.Fragment>
      <Modal
        visible={visible}
        height="50%"
        disabledMask
        {...rest}
        onClose={onClose}
        bodyClassName={`carefree-taro-fuzzy-search ${bodyClassName}`}
      >
        <View className="carefree-taro-fuzzy-search-title">{title}</View>
        <Icon onClick={onClose} className="carefree-taro-fuzzy-search-close" type="clear" />
        <Search
          {...searchProps}
          suffix={<Button className="carefree-taro-fuzzy-search-btn">{searchBtnText}</Button>}
          onChange={onChange}
        />
        <View style={{ overflowY: 'auto' }}>{children}</View>
      </Modal>
    </React.Fragment>
  );
};

export default FuzzySearch;
