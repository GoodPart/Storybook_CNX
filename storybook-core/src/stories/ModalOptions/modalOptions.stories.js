import { ModalOptions } from './modalOptions.js';
import modalOptionsHtml from './modalOptions.html?raw';
import modalOptionsCss from './modalOptions.css?raw';
import modalOptionsJs from './modalOptions.js?raw';
import './modalOptions.scss';

/**
 * 스토리북 설정
 * 스토리북 타이틀, 태그, 파라미터, 아규먼트 설정
 * 스토리북 파라미터 설정
 */
export default {
  title: 'Atom/ModalOptions/variant',
  tags: ['autodocs'],
  parameters: {
    docs: {
      story: {
        height: '500px',
      },
      description: {
        component: `모달 옵션 컴포넌트(접근성, 반응형, 다양한 레이아웃 옵션)`
      },
      source: {
        code: `
            // HTML
            ${modalOptionsHtml}

            // CSS
            ${modalOptionsCss}

            // JavaScript
            ${modalOptionsJs}
        `
      }
    },
    /**
     * 스토리북 파라미터 설정
     * 파라미터 설정(모달 크기, 헤더, 푸터)
     */
    argTypes: {
      size: {
        control: 'select',
        options: ['default', 'sm', 'lg', 'xl', 'fullscreen'],
        description: '모달 크기 설정',
        defaultValue: 'default',
      },
      header: {
        control: 'object',
        description: '헤더 옵션',
        defaultValue: {
          show: false,
          title: 'Modal Title',
          hasCloseButton: true,
        },
      },
      footer: {
        control: 'object',
        description: '푸터 옵션',
        defaultValue: {
          show: false,
          buttons: [
            { text: '취소', action: 'cancel', variant: 'secondary' },
            { text: '확인', action: 'confirm', variant: 'primary' }
          ]
        },
      },
      body: {
        control: 'text',
        description: '바디 본문 텍스트',
        defaultValue: '모달 내용이 들어갑니다.'
      },
    },
    viewport: {
      viewports: {
        mobile: {
          name: '모바일',
          styles: {
            width: '360px',
            height: '640px',
          },
        },
        tablet: {
          name: '태블릿',
          styles: {
            width: '768px',
            height: '1024px',
          },
        },
        desktop: {
          name: '데스크톱',
          styles: {
            width: '1280px',
            height: '800px',
          },
        },
      },
      defaultViewport: 'desktop',
    }
  }
};

/**
 * 모든 스토리에 공통으로 사용할 함수
 * 모달 구조 생성
 * 모달 이벤트 핸들러 추가
 * 모달 컨테이너 반환
 */
const createModal = (args) => {
  /**
   * 모달 구조 생성
   * 모달 설정(크기, 열기버튼, 닫기버튼, 헤더, 바디, 푸터)
   * 모달 컨테이너 생성
   */
  let html = `
    <div>
      <button class="modal-trigger">모달 열기</button>
      <div class="modal ${args.size !== 'default' ? `modal-${args.size}` : ''}" role="dialog" aria-modal="true" hidden>
        <div class="modal-overlay"></div>
        <div class="modal-content">
  `;
  
  /**
   * 헤더 추가 (show가 true인 경우만)
   * 모달 헤더 타이틀 추가
   * 닫기 버튼 추가
   */
  if (args.header && args.header.show) {
    html += `
          <div class="modal-header">
            <h2 id="modal-title">${args.header.title}</h2>
            ${args.header.hasCloseButton ? '<button class="modal-close" aria-label="모달 닫기">×</button>' : ''}
          </div>
    `;
  }

  /**
   * 바디 추가 (항상)
   * 바디 요소 생성
   * 바디 요소 텍스트 추가
   */
    html += `
        <div class="modal-body">
            <p>${args.body}</p>
        </div>
    `;
  
  /**
   * 푸터 추가 (show가 true인 경우만)
   */
  if (args.footer && args.footer.show) {
    const buttonHTML = args.footer.buttons.map(btn => {
      const btnClass = btn.variant ? `modal-${btn.action} modal-btn-${btn.variant}` : `modal-${btn.action}`;
      return `<button class="${btnClass}" data-action="${btn.action}">${btn.text}</button>`;
    }).join('');
    
    html += `
        <div class="modal-footer">
            ${buttonHTML}
        </div>
    `;
  }
  
  /**
   * 모달 컨테이너 닫기
   */
  html += `
        </div>
      </div>
    </div>
  `;
  
  /**
   * 컨테이너 생성 및 HTML 설정d
   */
  const container = document.createElement('div');
  container.innerHTML = html;
  
  /**
   * 이벤트 핸들러 추가
   * 모달 열기 버튼 이벤트 핸들러 추가(열기, 닫기, 액션버튼)
   */
  const trigger = container.querySelector('.modal-trigger');
  const modal = container.querySelector('.modal');
  const closeBtn = container.querySelector('.modal-close');
  const overlay = container.querySelector('.modal-overlay');
  const actionBtns = container.querySelectorAll('[data-action]');
  
  /**
   * 모달 열기 버튼 이벤트 핸들러 추가
   */
  trigger.addEventListener('click', () => modal.hidden = false);
  
  /**
   * 닫기 버튼 이벤트 핸들러 추가
   */
  if (closeBtn) {
    closeBtn.addEventListener('click', () => modal.hidden = true);
  }
  
  /**
   * 액션 버튼 이벤트 핸들러 추가
   */
  actionBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      console.log(`Button clicked: ${btn.dataset.action}`);
      modal.hidden = true;
    });
  });
  
  /**
   * 오버레이 클릭
   */
  overlay.addEventListener('click', () => modal.hidden = true);
  
  return container;
};

/**
 * 기본 모달 (헤더와 푸터 없음)
 * 이벤트 핸들러 추가(열기, 닫기, 액션)
 * 오버레이 클릭 이벤트 핸들러 추가
 * 컨테이너 반환
 */
export const Basic = {
  render: (args) => createModal(args),
  args: {
    body: '기본 모달입니다. 헤더와 푸터가 없습니다.'
  }
};

/**
 * 헤더가 있는 모달
 * 이벤트 핸들러 추가(열기, 닫기, 액션)
 * 오버레이 클릭 이벤트 핸들러 추가
 * 컨테이너 반환
 */
export const Header = {
  render: (args) => createModal(args),
  args: {
    header: {
      show: true,
      title: '헤더 모달',
      hasCloseButton: true
    },
    body: '헤더가 있는 모달입니다.'
  }
};

/**
 * 푸터가 있는 모달
 * 이벤트 핸들러 추가(열기, 닫기, 액션)
 * 오버레이 클릭 이벤트 핸들러 추가
 * 컨테이너 반환
 */
export const Footer = {
  render: (args) => createModal(args),
  args: {
    footer: {
      show: true,
      buttons: [
        { text: '취소', action: 'cancel', variant: 'secondary' },
        { text: '확인', action: 'confirm', variant: 'primary' }
      ]
    },
    body: '푸터가 있는 모달입니다.'
  }
};

/**
 * 헤더와 푸터가 모두 있는 모달
 * 이벤트 핸들러 추가(열기, 닫기, 액션)
 * 오버레이 클릭 이벤트 핸들러 추가
 * 컨테이너 반환
 */
export const Complete = {
  render: (args) => createModal(args),
  args: {
    header: {
      show: true,
      title: '완전한 모달',
      hasCloseButton: true
    },
    body: '헤더와 푸터가 모두 있는 완전한 모달입니다.',
    footer: {
      show: true,
      buttons: [
        { text: '취소', action: 'cancel', variant: 'secondary' },
        { text: '확인', action: 'confirm', variant: 'primary' }
      ]
    }
  }
};
