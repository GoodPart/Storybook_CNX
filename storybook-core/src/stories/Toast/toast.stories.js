import toastHtml from './toast.html?raw';
import toastCss from './toast.css?raw';
import './toast.scss';

export default {
  title: 'Toast',
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component: '접근성을 고려한 토스트 알림 컴포넌트입니다.'
      },
      source: {
        code: `
          // HTML
          ${toastHtml}

          // CSS
          ${toastCss}
        `
      }
    }
  },
  argTypes: {
    type: {
      control: { type: 'select', options: ['success', 'error', 'warning'] },
      description: '토스트 타입',
      defaultValue: 'success'
    },
    title: {
      control: 'text',
      description: '알림 제목'
    },
    message: {
      control: 'text',
      description: '알림 메시지'
    },
    duration: {
      control: 'number',
      description: '표시 지속 시간(ms)',
      defaultValue: 3000
    }
  }
};

export const Success = {
  render: (args) => {
    // HTML 문자열로 직접 작업
    const isError = args.type === 'error';
    const isWarning = args.type === 'warning';
    const title = args.title || (isError ? '오류' : (isWarning ? '경고' : '성공'));
    const message = args.message || 
      (isError ? '작업 중 오류가 발생했습니다.' : 
       (isWarning ? '주의가 필요한 상황입니다.' : '작업이 성공적으로 완료되었습니다.'));
    
    // HTML 템플릿 생성
    const html = `
      <div class="toast-container" role="alert" aria-live="polite">
        <div class="toast ${args.type} toast-visible toast-animated">
          <div class="toast-icon">${isError ? '!' : (isWarning ? '⚠' : '✓')}</div>
          <div class="toast-content">
            <div class="toast-title">${title}</div>
            <div class="toast-message">${message}</div>
          </div>
          <button class="toast-close" aria-label="알림 닫기">×</button>
        </div>
      </div>
    `;
    
    // HTML을 DOM으로 변환
    const container = document.createElement('div');
    container.innerHTML = html;
    container.className = 'toast-wrapper';
    
    // 클릭 이벤트와 자동 닫기 로직 추가
    const toastElement = container.querySelector('.toast');
    
    // 자동 닫기
    setTimeout(() => {
      toastElement.classList.remove('toast-visible');
      toastElement.classList.add('hiding');
      setTimeout(() => {
        toastElement.hidden = true;
      }, 300);
    }, args.duration);
    
    // 닫기 버튼
    container.querySelector('.toast-close').addEventListener('click', () => {
      toastElement.classList.remove('toast-visible');
      toastElement.classList.add('hiding');
      setTimeout(() => {
        toastElement.hidden = true;
      }, 300);
    });
    
    return container;
  },
  args: {
    type: 'success',
    title: '성공',
    message: '작업이 성공적으로 완료되었습니다.',
    duration: 3000
  }
};

export const Error = {
  ...Success,
  args: {
    type: 'error',
    title: '오류',
    message: '작업 중 오류가 발생했습니다.',
    duration: 3000
  }
};

export const Warning = {
  ...Success,
  args: {
    type: 'warning',
    title: '경고',
    message: '주의가 필요한 상황입니다.',
    duration: 3000
  }
}; 
