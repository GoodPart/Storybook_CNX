// import Input from './Input.vue';
import Input from "../../../../../../shared/components/component/vue/atom/Input/Input.vue"
// import './Input.css';
import { ref } from 'vue';

const meta = {
  title: 'Atom/Input/variant',
  component: Input,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: '입력 필드 컴포넌트는 다양한 타입의 사용자 입력을 받는데 사용됩니다. 다양한 스타일과 크기를 지원합니다.'
      }
    }
  },
  tags: ['autodocs'],
  argTypes: {
    type: {
      control: { type: 'select' },
      options: ['text', 'number', 'password'],
      description: '입력 필드 타입'
    },
    themeColor: {
      control: { type: 'radio' },
      options: ['default', 'transparent', 'primary', 'warning'],
      description: '테마 색상'
    },
    size: {
      control: { type: 'radio' },
      options: ['s', 'm', 'l', 'xl'],
      description: '입력 필드 크기'
    },
    disabled: {
      control: 'boolean',
      description: '비활성화 여부'
    },
    value: {
      control: 'text',
      description: '입력 필드 값'
    },
    placeholder: {
      control: 'text',
      description: '힌트 텍스트'
    },
    'update:value': { 
      action: 'value updated',
      description: '입력 값이 변경될 때 발생하는 이벤트'
    }
  },
};

export default meta;

export const Default = {
  render: (args) => ({
    components: { Input },
    setup() {
      return { args };
    },
    template: '<Input v-bind="args" />',
  }),
  args: {
    placeholder: 'Search',
    type: 'text',
    value: '',
    themeColor: 'default',
    size: 's',
    disabled: false
  },
  parameters: {
    docs: {
      description: {
        story: '기본 스타일의 입력 필드입니다.'
      }
    }
  }
};

export const Primary = {
  render: (args) => ({
    components: { Input },
    setup() {
      return { args };
    },
    template: '<Input v-bind="args" />',
  }),
  args: {
    placeholder: 'Search',
    type: 'text',
    value: '',
    themeColor: 'primary',
    size: 's',
    disabled: false
  },
  parameters: {
    docs: {
      description: {
        story: '주요 스타일의 입력 필드입니다.'
      }
    }
  }
};

export const warning = {
  render: (args) => ({
    components: { Input },
    setup() {
      return { args };
    },
    template: '<Input v-bind="args" />',
  }),
  args: {
    placeholder: 'Search',
    type: 'text',
    value: '',
    themeColor: 'warning',
    size: 's',
    disabled: false
  },
  parameters: {
    docs: {
      description: {
        story: '경고 스타일의 입력 필드입니다.'
      }
    }
  }
};

export const WithValueUpdate = {
  render: (args) => ({
    components: { Input },
    setup() {
      const inputValue = ref(args.value || '');
      
      return { 
        args,
        inputValue
      };
    },
    template: `
      <div>
        <Input 
          v-model:value="inputValue"
          :placeholder="args.placeholder"
          :type="args.type"
          :themeColor="args.themeColor"
          :size="args.size"
          :disabled="args.disabled"
        />
        <p>
        현재 입력값: {{ inputValue }}
        </p>
      </div>
    `,
  }),
  args: {
    placeholder: '입력해 보세요',
    type: 'text',
    value: '',
    themeColor: 'primary',
    size: 'm',
    disabled: false
  },
  parameters: {
    docs: {
      description: {
        story: '입력 값 변경 이벤트를 활용하는 예시입니다. Actions 패널에서 이벤트를 확인할 수 있습니다.'
      },
      source: {
        code: `
<script setup>
import { ref } from 'vue';
import Input from './Input.vue';

// 반응형 상태 정의(값이 변경되면 해당 값을 사용하는 컴포넌트나 템플릿이 자동으로 업데이트되는 특별한 형태의 데이터)
const inputValue = ref('');
</script>

<template>
  <div>
    <Input 
      v-model:value="inputValue"
      placeholder="입력해 보세요"
      type="text"
      themeColor="primary"
      size="m"
    />
    <p>
    현재 입력값: {{ inputValue }}
    </p>
  </div>
</template>
`
      }
    }
  }
};