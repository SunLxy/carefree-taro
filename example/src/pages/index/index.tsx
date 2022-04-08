import { Component } from 'react';
import { View, Input } from '@tarojs/components';
import CarefTaroFrom from 'carefree-taro-form';
import 'taro-ui/dist/style/components/button.scss'; // 按需引入
import './index.less';

export default class Index extends Component {
  componentWillMount() {}

  componentDidMount() {}

  componentWillUnmount() {}

  componentDidShow() {}

  componentDidHide() {}

  render() {
    return (
      <View className="index">
        {/* <Text>Hello world!</Text> */}
        <CarefTaroFrom
          watchList={{
            ces: (value, formvalue) => {
              console.log(value);
            },
          }}
          config={[
            {
              type: 'Input',
              label: '张三',
              name: 'ces',
            },
          ]}
        >
          <CarefTaroFrom.Item
            required
            name="a"
            label="标题1"
            rules={[{ required: true, message: '请输入' }]}
          >
            <Input placeholder="将会获取焦点" focus />
          </CarefTaroFrom.Item>
          <CarefTaroFrom.Item name="b" label="标题2">
            <Input placeholder="将会获取焦点" focus />
          </CarefTaroFrom.Item>
        </CarefTaroFrom>
        {/* <AtButton
          type="primary"
          onClick={() => {
            Taro.navigateTo({ url: '/pages/home/index' });
          }}
        >
          I need Taro UI
        </AtButton>
        <Text>Taro UI 支持 Vue 了吗？</Text>
        <AtButton type="primary" circle>
          支持
        </AtButton>
        <Text>共建？</Text>
        <AtButton type="secondary" circle>
          来
        </AtButton> */}
      </View>
    );
  }
}
