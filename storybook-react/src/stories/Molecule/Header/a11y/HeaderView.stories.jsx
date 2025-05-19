import React from 'react';
import HeaderView from './HeaderView';

/**
 * Header/variant/Header 컴포넌트의 접근성 검사 결과를 표시하는 스토리
 */
export default {
  title: 'Molecule/Header/a11y',
  component: HeaderView,
  parameters: {
    layout: 'fullscreen',
    controls: { hideNoControlsWarning: true }
  }
};

/**
 * 접근성 검사 결과 보기
 */
export const A11yReport = () => <HeaderView />;

// 스토리 타이틀 간소화
A11yReport.storyName = 'Header 검사 결과';