import type { Meta, StoryObj } from '@storybook/html';
import buttonHtml from "../../../storybook-core/src/stories/Button/button.html?raw";


type ButtonArgs = {
  primary: boolean;
  label: string;
};

const meta: Meta<ButtonArgs> = {
  title: 'Button',
  parameters: {
      docs: {
        description: {
          component: '다양한 스타일과 크기를 지원하는 버튼 컴포넌트입니다.'
        },
        source: {
          // 코드 예제 표시
          code: buttonHtml,
          language: 'html',
          type: 'code'
        }
      },
      // CSS 코드도 표시
    },
};

export default meta;
type Story = StoryObj<ButtonArgs>;

export const Core: Story = {
  render: (args) => `<div>123</div>`,
  args: {
    primary: true,
    label: 'Button',
  },
};