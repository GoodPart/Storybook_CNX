import { Gnb } from './gnb.js';
// import gnbHtml from './gnb.html?raw';
import gnbDefaultHtml from './gnb-default.html?raw';
import gnbVerticalHtml from './gnb-vertical.html?raw';
import gnbCss from './gnb.css?raw';
import gnbVerticalCss from './gnb-vertical.css?raw';
import gnbJs from './gnb.js?raw';
import gnbVerticalJs from './gnb-vertical.js?raw';
import './gnb.scss';
import './gnb-vertical.css';

export default {
  title: 'Gnb',
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component: 'GNB 컴포넌트입니다.'
      },
      source: {
        code: `
          // HTML

          // CSS
          ${gnbCss}

          // JavaScript
          ${gnbJs}
        `
      },
      canvas: { hidden: true }
    },
    previewTabs: {
      'storybook/docs/panel': { hidden: true }
    },
    viewMode: 'story',
    options: {
      showPanel: false
    }
  }
};

// 기본 GNB
export const Default = {
  name: '기본 GNB',
  render: () => {
    const container = document.createElement('div');
    container.innerHTML = gnbDefaultHtml;
    
    setTimeout(() => {
      const gnbElement = container.querySelector('.gnb-default');
      if (gnbElement) {
        new Gnb(gnbElement, { theme: 'default', type: 'default' });
      }
    }, 0);
    
    return container;
  },
  parameters: {
    docs: {
      description: {
        story: '기본 스타일의 GNB 컴포넌트'
      },
      source: {
        code: `
// HTML
${gnbDefaultHtml}

// CSS
${gnbCss}

// JavaScript
${gnbJs}
        `
      }
    }
  }
};

// 수직형 사이드 메뉴
export const Vertical = {
  name: '수직형 사이드 메뉴',
  render: () => {
    const container = document.createElement('div');
    container.innerHTML = gnbVerticalHtml;

    setTimeout(() => {
      // Manually initialize the vertical GNB with inline script
      const script = document.createElement('script');
      script.textContent = gnbVerticalJs;
      container.appendChild(script);
    }, 0);

    return container;
  },
  parameters: {
    docs: {
      description: {
		story: '위에서 아래로 드롭다운되는 GNB 메뉴'
	  },
	  source: {
        code: `
// HTML
${gnbVerticalHtml}

// CSS
${gnbVerticalCss}

// JavaScript
${gnbVerticalJs}
        `
      }
    }
  }
};
