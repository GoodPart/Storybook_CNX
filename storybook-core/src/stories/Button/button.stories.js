import { Button } from './button.js';
import buttonHtml from './button.html?raw';
import buttonCss from './button.css?raw';
import buttonJs from './button.js?raw';
import './button.scss';

// 메타데이터 설정
export default {
  title: 'Button',
  tags: ['autodocs'], // 자동 문서화 활성화
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
    cssSource: {
      code: buttonCss,
      language: 'css'
    }
  },
  argTypes: {
    label: {
      control: 'text',
      description: '버튼에 표시될 텍스트',
      defaultValue: 'Button'
    },
    primary: {
      control: 'boolean',
      description: '주요 버튼 여부',
      defaultValue: false
    },
    backgroundColor: {
      control: 'color',
      description: '버튼의 배경색'
    },
    size: {
      control: { 
        type: 'select',
        options: ['small', 'medium', 'large']
      },
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
export const Primary = {
  render: (args) => new Button({
    ...args,
    primary: true
  }),
  args: {
    label: "주요 버튼123222",
    primary: true
  },
  parameters: {
    docs: {
      story: {
        inline: true
      }
    }
  }
};

// // 다양한 상태의 버튼 예제
// export const Secondary = {
//   render: (args) => new Button(args),
//   args: {
//     label: '보조 버튼'
//   }
// };

// export const Large = {
//   render: (args) => new Button({
//     ...args,
//     size: 'large'
//   }),
//   args: {
//     size: 'large',
//     label: '큰 버튼'
//   }
// };

// export const Small = {
//   render: (args) => new Button({
//     ...args,
//     size: 'small'
//   }),
//   args: {
//     size: 'small',
//     label: '작은 버튼'
//   }
// }; 