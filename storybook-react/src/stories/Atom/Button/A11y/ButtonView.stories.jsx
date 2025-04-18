import React from 'react';
import ButtonView from './ButtonView';

/**
 * Button/Components/Button 컴포넌트의 접근성 검사 결과를 표시하는 스토리
 */
export default {
  title: 'atom/Button/A11y',
  component: ButtonView,
  parameters: {
    layout: 'fullscreen',
    controls: { hideNoControlsWarning: true }
  }
};

/**
 * 접근성 검사 결과 보기
 */
export const A11yReport = () => <ButtonView />;

// 스토리 타이틀 간소화
A11yReport.storyName = 'Button 검사 결과';