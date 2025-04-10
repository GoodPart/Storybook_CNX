import { addons } from '@storybook/manager-api';
import { create } from '@storybook/theming/create';

// 커스텀 테마 생성
const myTheme = create({
  base: 'light',
  
  // 브랜드
  brandTitle: '접근성 컴포넌트 라이브러리',
  brandUrl: 'https://github.com/yohan-work/CNX_PUB2',
  brandImage: '/cnxc_logo.svg',
  brandTarget: '_self',
  
  // UI
  appBg: '#ffffff',
  appContentBg: '#ffffff',
  appBorderColor: '#e0e0e0',
  appBorderRadius: 4,
  
  // 텍스트 색상
  textColor: '#333333',
  textInverseColor: '#ffffff',
  
  // 툴바 색상
  barTextColor: '#999999',
  barSelectedColor: '#4A90E2',
  barBg: '#ffffff',
  
  // 폼 색상
  inputBg: '#ffffff',
  inputBorder: '#e0e0e0',
  inputTextColor: '#333333',
  inputBorderRadius: 4,
});

// 테마 적용
addons.setConfig({
  theme: myTheme,
}); 