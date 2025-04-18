import { Modal } from './modal.js';
import modalHtml from './modal.html?raw';
import modalCss from './modal.css?raw';
import modalJs from './modal.js?raw';
import './modal.scss';

export default {
  title: 'Atom/Modal/variant',
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component: '접근성을 고려한 모달 컴포넌트입니다.'
      },
      source: {
        code: `
// HTML
${modalHtml}

// CSS
${modalCss}

// JavaScript
${modalJs}
        `
      }
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

export const Default = {
  render: () => {
    const container = document.createElement('div');
    container.innerHTML = modalHtml;
    
    const modalElement = container;
    new Modal(modalElement);
    
    return container;
  }
}; 