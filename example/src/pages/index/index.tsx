import React from 'react';
import { View, Input, Text, Button } from '@tarojs/components';
import CarefTaroFrom from 'carefree-taro-form';
import CarefreeTaroModal, { ModalRefProps } from 'carefree-taro-modal';
import 'taro-ui/dist/style/components/button.scss'; // 按需引入
import './index.less';

export default () => {
  const [visible, setVisible] = React.useState(false);
  const modalRef = React.useRef<ModalRefProps>();

  return (
    <View className="index">
      <Button
        onClick={() => {
          setVisible(true);
        }}
      >
        打开
      </Button>
      {visible && (
        <CarefreeTaroModal
          ref={modalRef}
          visible={visible}
          layout="bottom"
          onClose={() => setVisible(false)}
        >
          <Button
            onClick={() => {
              modalRef.current?.onMaskClick();
              console.log(modalRef.current);
            }}
          >
            关闭
          </Button>
        </CarefreeTaroModal>
      )}
      <Text>Hello world12!</Text>
      <CarefTaroFrom
        watchList={{
          ces: (value, formvalue, child, hideContext) => {
            console.log(value, hideContext);
            if (value === '12') {
              hideContext.updateValue('a', true);
            } else if (hideContext.getStoreState(['a'])) {
              hideContext.updateValue('a', false);
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
