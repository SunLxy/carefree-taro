import { defineConfig } from 'dumi';
import { resolve } from 'path';

export default defineConfig({
  title: 'carefree-taro',
  favicon:
    'https://user-images.githubusercontent.com/9554297/83762004-a0761b00-a6a9-11ea-83b4-9c8ff721d4b8.png',
  logo: 'https://user-images.githubusercontent.com/9554297/83762004-a0761b00-a6a9-11ea-83b4-9c8ff721d4b8.png',
  outputPath: 'docs-dist',
  mode: 'site',
  alias: {
    'carefree-taro-form': resolve(__dirname, './packages/form/src/index.tsx'),
    'carefree-taro-modal': resolve(__dirname, './packages/modal/src/index.tsx'),
  },
  resolve: {
    includes: ['docs', 'packages/form/src', 'packages/modal/src'],
  },
});
