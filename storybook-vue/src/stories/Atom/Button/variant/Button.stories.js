// import Button from './Button.vue';
// import './Button.css';


import Button from '../../../../../shared/components/component/vue/atom/Button/variant/Button.vue'
import '../../../../../shared/components/component/vue/atom/Button/variant/Button.css'

const meta = {
  title: 'Atom/Button/variant',
  component: Button,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: '버튼 컴포넌트는 사용자의 액션을 트리거하는데 사용됩니다. 다양한 스타일과 크기를 지원합니다.'
      }
    }
  },
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: { type: 'radio' },
      options: ['primary', 'secondary'],
      description: '버튼 스타일 종류'
    },
    size: {
      control: { type: 'radio' },
      options: ['small', 'medium', 'large'],
      description: '버튼 크기'
    },
    disabled: {
      control: 'boolean',
      description: '버튼 비활성화 여부'
    },
    icon: {
      control: 'text',
      description: '버튼 아이콘'
    },
    text: {
      control: 'text',
      description: '버튼 텍스트'
    },
    backgroundColor: {
      control: 'color',
      description: '버튼의 배경색'
    },
    onClick: { 
      action: 'clicked',
      description: '클릭 이벤트 핸들러'
    }
  },
};

export default meta;

export const Primary = {
  render: (args) => ({
    components: { Button },
    setup() {
      const onButtonClick = (event) => {
        args.onClick({
          props: { ...args }
        });
      };
      return { args, onButtonClick };
    },
    template: '<Button v-bind="args" :style="{ backgroundColor: args.backgroundColor }" @click="onButtonClick" />',
  }),
  args: {
    variant: 'primary',
    text: '주요 버튼',
    size: 'small',
  },
  parameters: {
    docs: {
      description: {
        story: '주요 스타일의 버튼입니다.'
      }
    }
  }
};

export const Secondary = {
  render: (args) => ({
    components: { Button },
    setup() {
      const onButtonClick = (event) => {
        args.onClick({
          props: { ...args }
        });
      };
      return { args, onButtonClick };
    },
    template: '<Button v-bind="args" :style="{ backgroundColor: args.backgroundColor }" @click="onButtonClick" />',
  }),
  args: {
    variant: 'secondary',
    text: '보조 버튼',
    size: 'small',
  },
  parameters: {
    docs: {
      description: {
        story: '보조 스타일의 버튼입니다.'
      }
    }
  }
};

export const Icon = {
  render: (args) => ({
    components: { Button },
    setup() {
      const onButtonClick = (event) => {
        args.onClick({
          props: { ...args }
        });
      };
      return { args, onButtonClick };
    },
    template: '<Button v-bind="args" :style="{ backgroundColor: args.backgroundColor }" @click="onButtonClick" />',
  }),
  args: {
    variant: 'primary',
    text: '아이콘 버튼',
    size: 'small',
    icon: '⭐',
  },
  parameters: {
    docs: {
      description: {
        story: '아이콘이 포함된 버튼입니다.'
      }
    }
  }
}; 