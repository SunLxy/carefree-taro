---
title: modal
order: 1
nav:
  order: 2
  title: modal
  path: /modal
group:
  path: /
---

一个简单的弹框组件

```bash

npm i carefree-taro-modal

```

```ts
export interface ModalProps {
  /** 显示隐藏 **/
  visible?: boolean;
  /** 展示位置 */
  layout?: 'left' | 'top' | 'right' | 'bottom' | 'middle';
  /** 宽度 **/
  width?: number | string;
  /** 高度 **/
  height?: number | string;
  /** 内容 */
  children?: React.ReactNode;
  /** 最外层 className **/
  modalClassName?: string;
  /** 遮罩层 className **/
  maskClassName?: string;
  /** 内容区域 className **/
  bodyClassName?: string;
  /** 关闭 */
  onClose?: () => void;
}

export interface ModalRefProps {
  /** 关闭 */
  onMaskClick: () => void;
  // 更新内部状态 不建议使用这个
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}
```

## 案例

```js
import CarefTaroFrom from 'carefree-taro-form';
import { View, Button } from '@tarojs/components';
import 'taro-ui/dist/style/components/button.scss';
import Modal,{ModalRefProps} from 'carefree-taro-modal';
import React from 'react';

export default Index = () => {
  const [visible, setVisible] = React.useState(false);
  const modalRef = React.useRef<ModalRefProps>()

  return (
    <View>
      <Button
        onClick={() => {
          setVisible(true);
        }}
      >
        打开
      </Button>
      <Modal ref={modalRef} visible={visible} layout="bottom" onClose={() => setVisible(false)}>
        <Button
          onClick={() => {
            // setVisible(false);
             modalRef.current?.onMaskClick()
          }}
        >
          关闭
        </Button>
      </Modal>
    </View>
  );
};
```
