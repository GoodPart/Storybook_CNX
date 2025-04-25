import React from 'react';
import AccessibilityView from './AccessibilityView';

/**
 * Accessibility/variant/Accessibility 컴포넌트의 접근성 검사 결과를 표시하는 스토리
 */
export default {
  title: 'Atom/Accessibility/a11y',
  component: AccessibilityView,
  parameters: {
    layout: 'fullscreen',
    controls: { hideNoControlsWarning: true }
  }
};

/**
 * 접근성 검사 결과 보기
 */
export const A11yReport = () => <AccessibilityView />;

// 스토리 타이틀 간소화
A11yReport.storyName = 'Accessibility 검사 결과';