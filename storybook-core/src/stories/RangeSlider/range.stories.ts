import {RangeSlider} from './range.js';
import { RangeSlider2 } from './range.ts';
import rangeHtml from './range.html?raw';
import rangeCss from './range.css?raw';
// import rangeJs from './range.js?raw';
import './range.scss';

// 메타데이터 설정
export default {
  title: 'Range',
  tags: ['autodocs'], // 자동 문서화 활성화
  parameters: {
    docs: {
      description: {
        component: '다양한 스타일과 크기를 지원하는 버튼 컴포넌트입니다.'
      },
      source: {
        // 코드 예제 표시
        code: rangeHtml,
        language: 'html',
        type: 'code'
      }
    },
    // CSS 코드도 표시
    cssSource: {
      code: rangeCss,
      language: 'css'
    }
  },
  // argTypes: {
  //   label: {
  //     control: 'text',
  //     description: '버튼에 표시될 텍스트',
  //     defaultValue: 'Range'
  //   },
  //   primary: {
  //     control: 'boolean',
  //     description: '주요 버튼 여부',
  //     defaultValue: false
  //   },
  //   backgroundColor: {
  //     control: 'color',
  //     description: '버튼의 배경색'
  //   },
  //   size: {
  //     control: { 
  //       type: 'select',
  //       options: ['small', 'medium', 'large']
  //     },
  //     description: '버튼의 크기',
  //     defaultValue: 'medium'
  //   },
  //   onClick: {
  //     action: 'clicked',
  //     description: '클릭 이벤트 핸들러'
  //   }
  // }
};

// 스토리 정의
export const Default = {
  render: (args) => {
  const container = document.createElement('div');
  container.innerHTML = rangeHtml;
  const getEle = container.querySelector('#rangeSliderbar_1');
  
//  const range = new RangeSlider2(getEle,{
//     // extensionUnit : '%',
//     showValue : true,
//     step : 5,
//     // toolTip : {
//     //   direction : 'top',
//     //   mode : 'active', // hover, active
//     //   effect : true
//     // },
//     leftProps : {
//       id : "#input-left",
//       // disabled : true,
//       values : {
//         min : 0, // 최소값
//         max : 100, // 최대값
//         currentValue : 10 // 현재 값
//       },
//     },
//     rightProps : {
//       id : "#input-right",
//       // disabled : true,
//       values : {
//         min : 0, 
//         max : 100, 
//         currentValue : 40 
//       }
//     },
//   })

new RangeSlider2(getEle, {
  showValue : true,
  toolTip : {
    direction : 'top',
    mode : 'active', // hover, active
    effect : true
  },
  step : 5,
    leftProps : {
      id : "#input-left",
      values : {
        min : 0, // 최소값
        max : 100, // 최대값
        currentValue : 10 // 현재 값
      },
    },
    rightProps : {
      id : "#input-right",
      values : {
        min : 0, 
        max : 100, 
        currentValue : 40 
      }
    },
})

  // range.onChange("left", (event)=> {
  //   console.log(event)
  // })

  return container;

  },
  // args: {
  //   label: '주요 버튼',
  //   // primary: true
  // },
  // parameters: {
  //   docs: {
  //     story: {
  //       inline: true
  //     },
  //     source : {
  //       code : `
  //       // HTML
  //       ${rangeHtml}
        
  //       // CSS
        
  //       // JavaScript
  //       `
  //     }
  //   }
  // }
};

// 다양한 상태의 버튼 예제
// export const Secondary = {
//   render: (args) => new Range(args),
//   args: {
//     label: '보조 버튼'
//   }
// };

// export const Large = {
//   render: (args) => new Range({
//     ...args,
//     size: 'large'
//   }),
//   args: {
//     size: 'large',
//     label: '큰 버튼'
//   }
// };

// export const Small = {
//   render: (args) => new Range({
//     ...args,
//     size: 'small'
//   }),
//   args: {
//     size: 'small',
//     label: '작은 버튼'
//   }
// }; 