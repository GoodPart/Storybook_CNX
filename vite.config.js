import path from 'path';
import { vanillaExtractPlugin } from '@vanilla-extract/vite-plugin';

export default {
  resolve : {
    // alias: {
    //   '@': path.resolve(__dirname, './src'), // 예: @를 src 폴더로
    //   '~components': path.resolve(__dirname, './src/components'), // 예: ~components를 컴포넌트 폴더로
    // },
  },
  plugins: [vanillaExtractPlugin()]
};