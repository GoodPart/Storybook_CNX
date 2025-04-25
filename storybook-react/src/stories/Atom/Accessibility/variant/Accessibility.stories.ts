import type { Meta, StoryObj } from '@storybook/react';
import { fn } from '@storybook/test';

import { Accessibility } from './Accessibility';

const meta = {
  title: 'Atom/Accessibility/variant',
  component: Accessibility,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    title: { control: 'text' },
    level: { 
      control: 'select', 
      options: ['A', 'AA', 'AAA'],
      description: '접근성 준수 레벨' 
    },
    description: { control: 'text' },
    onSubmit: { action: 'submitted' }
  },
  args: { 
    onSubmit: fn() 
  },
} satisfies Meta<typeof Accessibility>;

export default meta;
type Story = StoryObj<typeof meta>;

// 기본 접근성 컴포넌트
export const Default: Story = {
  args: {
    title: '접근성 검사 컴포넌트',
    level: 'AA',
    description: 'WCAG 가이드라인을 준수하는 접근성 검사 컴포넌트입니다.',
    violateAccessibility: true
  },
};

// WCAG A 레벨 접근성 컴포넌트
export const LevelA: Story = {
  args: {
    title: '접근성 레벨 A 검사 컴포넌트',
    level: 'A',
    description: 'WCAG 레벨 A 가이드라인을 준수하는 접근성 검사 컴포넌트입니다.',
  },
};

// WCAG AAA 레벨 접근성 컴포넌트
export const LevelAAA: Story = {
  args: {
    title: '접근성 레벨 AAA 검사 컴포넌트',
    level: 'AAA',
    description: 'WCAG 레벨 AAA 가이드라인을 준수하는 접근성 검사 컴포넌트입니다.',
  },
}; 