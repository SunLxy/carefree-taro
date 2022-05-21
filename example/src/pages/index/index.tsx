import { Button, Input, Text, View } from '@tarojs/components';
import CarefreeTaroCheckRadio from 'carefree-taro-check-radio';
import CarefTaroFrom from 'carefree-taro-form';
import CarefreeTaroModal, { ModalRefProps } from 'carefree-taro-modal';
import Search from 'carefree-taro-search';
import React from 'react';
import 'taro-ui/dist/style/components/button.scss'; // 按需引入
import './index.less';

export default () => {
  const [visible, setVisible] = React.useState(false);

  const [values, setValues] = React.useState<any>({ value: 1, label: '测试' });
  const [values2, setValues2] = React.useState<any>([{ value: '222', label: '测试' }]);
  const [values3, setValues3] = React.useState<any>(false);

  const modalRef = React.useRef<ModalRefProps>();

  const [form] = CarefTaroFrom.useForm();
  const onSubmit = async () => {
    const result = await form
      .validateFields()
      .then((value) => value)
      .catch(() => false);
    console.log(result);
    if (result) {
      // setFormData(JSON.stringify(formData))
      // onModal("bottom")
    }
  };

  return (
    <View className="index">
      <View style={{ padding: '20px' }}>
        <Search />
      </View>
      <View style={{ padding: '20px' }}>
        <CarefreeTaroCheckRadio
          // multiple
          type="radio"
          labelInValue
          value={values}
          onChange={(value) => {
            console.log('value', value);
            setValues(value);
          }}
          options={[
            {
              label: '测试',
              value: 1,
            },
            {
              label: '测试2',
              value: 2,
            },
          ]}
        />
        <CarefreeTaroCheckRadio
          value={values2}
          magnification={10}
          multiple
          labelInValue
          onChange={(value) => {
            console.log('value--->', value);
            setValues2(value);
          }}
        >
          <CarefreeTaroCheckRadio.Item value="222">吃大餐达成1</CarefreeTaroCheckRadio.Item>
          <CarefreeTaroCheckRadio.Item value="2">吃大餐达成1-2</CarefreeTaroCheckRadio.Item>
        </CarefreeTaroCheckRadio>
        <CarefreeTaroCheckRadio.Item
          visible={values3}
          onChange={(value) => {
            console.log(222, value);
            setValues3(value);
          }}
        >
          吃大餐达成2
        </CarefreeTaroCheckRadio.Item>
        <CarefreeTaroCheckRadio.Item>吃大餐达成3</CarefreeTaroCheckRadio.Item>
        <CarefreeTaroCheckRadio.Item>吃大餐达成4</CarefreeTaroCheckRadio.Item>
      </View>
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
        form={form}
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
        <Button onClick={onSubmit}>保存表单</Button>
      </CarefTaroFrom>
    </View>
  );
};
