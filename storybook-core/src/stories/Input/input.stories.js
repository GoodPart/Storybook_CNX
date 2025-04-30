// import { Button } from './input.js';
// import inputHtml from './input.html?raw';
// import inputCss from './input.css?raw';
// import buttonJs from './button.js?raw';
// import './input.scss';

import inputHtml from "../../../../shared/components/component/core/atom/Input/input.html?raw"
import '../../../../shared/components/component/core/atom/Input/input.scss'

// 메타데이터 설정
export default {
  title: 'Atom/Input/variant',
  tags: ['autodocs'], // 자동 문서화 활성화
  parameters: {
    layout : "centered",
    docs: {
      description: {
        component: '다양한 스타일과 크기를 지원하는 버튼 컴포넌트입니다.'
      },
      source: {
        // 코드 예제 표시
        code: inputHtml,
        language: 'html',
        type: 'code'
      }
    },
    // CSS 코드도 표시
    cssSource: {
    //   code: inputCss,
      language: 'css'
    }
  },
  argTypes: {
    label: {
      control: 'text',
      description: '버튼에 표시될 텍스트',
      defaultValue: 'Button'
    },
    variant: {
      control: 'radio',
      description: '타입별 색상',
      options : ['default','primary', 'warring']
    },
    backgroundColor: {
      control: 'color',
      description: '버튼의 배경색'
    },
    size: {
      control: 'radio',
      options: ['s', 'm', 'l', "xl"],
      description: '버튼의 크기',
      defaultValue: 'medium'
    },
    onClick: {
      action: 'clicked',
      description: '클릭 이벤트 핸들러'
    }
  }
};

// 스토리 정의
export const Default = {
  render: (args) => {
    const container = document.createElement("div");
    container.innerHTML = inputHtml;
    container.children[0].classList.add(args.variant)
    container.children[0].classList.add(args.size)
    return container
  },
  args: {
    label: "주요 버튼123222",
    variant : "default",
    size : "s"
  },
  parameters: {
    docs: {
      story: {
        inline: true
      }
    }
  }
};

export const Warring = {
  args: {
    label: "주요 버튼123222",
    variant: "warring",
    size : "s"
  },

  render: args => {
    const container = document.createElement("div");
    container.innerHTML = inputHtml;
    container.children[0].classList.add(args.variant);
    container.children[0].classList.add(args.size)

    return container;
  },

  parameters: {
    docs: {
      story: {
        inline: true
      }
    }
  }
};

export const Primary = {
  args: {
    label: "주요 버튼123222",
    variant: "primary",
    size : "s"
    
  },

  render: args => {
    const container = document.createElement("div");
    container.innerHTML = inputHtml;
    container.children[0].classList.add(args.variant);
    container.children[0].classList.add(args.size)

    return container;
  },

  parameters: {
    docs: {
      story: {
        inline: true
      }
    }
  }
};