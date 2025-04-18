import { Step } from './step.ts';
import stepHtml from './step.html?raw';
import stepCss from './step.css?raw';
// import buttonJs from './button.js?raw';
import './step.scss';


// 메타데이터 설정
export default {
  title: 'Step',
//   tags: ['autodocs'], // 자동 문서화 활성화
  parameters: {
    docs: {
      description: {
        // component: '다양한 스타일과 크기를 지원하는 버튼 컴포넌트입니다.'
      },
      source: {
        // 코드 예제 표시
        code: stepHtml,
        language: 'html',
        type: 'code'
      }
    },
    // CSS 코드도 표시
    cssSource: {
      code: stepCss,
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
  render: (args) => {
    const pS_options = {
        animationDuration: 1000,
        numberic : true,
        steps: [
            {
                title: "이용약관 동의",
            },
            {
                title : "회원 정보 작성"
            },
            {
                title: "추가 정보 작성"
            },
            {
                title: "가입 완료",
            },
            {
                title: "기타 추가 사항 입력",
            },{
              title: "가입 완료",
          },
          {
              title: "기타 추가 사항 입력",
          },{
            title: "가입 완료",
        },
        {
            title: "기타 추가 사항 입력",
        },
         ]
    };

    const container = document.createElement('div');
    container.innerHTML = stepHtml;
    const getEle = container.querySelector('.progress-step');
    const stepModule = new Step(getEle, pS_options);
    
    // stepModule.on('next', ()=> console.log("alert??"))
    // stepModule.on('next', ()=> console.log("alert??"))

    

    setTimeout(()=> {

        const nextBtn = document.querySelector(".next");
        const prevBtn = document.querySelector(".prev");
        const updateBtn = document.querySelector(".move--update");
        
        nextBtn!.addEventListener('click', ()=> stepModule.on('next'))
        prevBtn!.addEventListener('click', ()=> stepModule.on('prev'))
        updateBtn!.addEventListener("click",()=> stepModule.on('update', 2))

        // stepModule.on('prev', (e)=> {
        //     console.log("뒤로 간 후에, 다른 작업을 하겟어!",e)
        // })
    }, 1000)

    return container

  },
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
