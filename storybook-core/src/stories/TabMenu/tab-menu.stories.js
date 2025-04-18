import { TabMenu } from './tab-menu.js';
import tabMenuHtml from './tab-menu.html?raw';
import tabMenuCss from './tab-menu.css?raw';
import tabMenuJs from './tab-menu.js?raw';
import './tab-menu.scss';

export default {
  title: 'Atom/TabMenu/variant',
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component: '접근성을 고려한 탭 메뉴 컴포넌트입니다.'
      },
      source: {
        code: null,
        language: 'html',
        type: 'code'
      }
    },
    sourceCode: {
      html: {
        code: tabMenuHtml,
        language: 'html',
        title: 'HTML'
      },
      css: {
        code: tabMenuCss,
        language: 'css',
        title: 'CSS'
      },
      js: {
        code: tabMenuJs,
        language: 'javascript',
        title: 'JavaScript'
      }
    }
  }
};

export const Default = {
  render: () => {
    const container = document.createElement('div');
    container.innerHTML = tabMenuHtml;
    
    const tabMenuElement = container.querySelector('.tab-container');
    new TabMenu(tabMenuElement);
    
    return container;
  },
  parameters: {
    docs: {
      story: {
        inline: true
      },
      source: {
        code: `
// HTML
${tabMenuHtml}

// CSS
${tabMenuCss}

// JavaScript
${tabMenuJs}
        `
      }
    }
  }
}; 