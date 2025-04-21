import a11yReport from './a11y/report.mdx?raw';
import { Accordion } from './accordion.js';
import accordionHtml from './accordion.html?raw';
import accordionCss from './accordion.css?raw';
import accordionJs from './accordion.js?raw';
import './accordion.scss';

export default {
  title: 'Atom/Accordion/variant',
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component: '접근성을 고려한 아코디언 컴포넌트입니다. 다중 확장과 단일 확장 두 가지 타입을 지원합니다.'
      },
      source: {
        code: `
// HTML
${accordionHtml}

// CSS
${accordionCss}

// JavaScript
${accordionJs}
        `
      }
    }
  }
};

// 다중 확장 가능한 기본 아코디언
export const MultiExpand = {
  name: '다중 확장 아코디언',
  render: () => {
    const container = document.createElement('div');
    container.innerHTML = accordionHtml;
    
    const accordionElement = container.querySelector('.accordion');
    new Accordion(accordionElement, { singleExpand: false });
    
    return container;
  },
  parameters: {
    docs: {
      description: {
        story: '여러 섹션을 동시에 열 수 있는 아코디언입니다.'
      }
    }
  }
};

// 단일 확장만 가능한 아코디언
export const SingleExpand = {
  name: '단일 확장 아코디언',
  render: () => {
    const container = document.createElement('div');
    container.innerHTML = accordionHtml;
    
    const accordionElement = container.querySelector('.accordion');
    new Accordion(accordionElement, { singleExpand: true });
    
    return container;
  },
  parameters: {
    docs: {
      description: {
        story: '한 번에 하나의 섹션만 열 수 있는 아코디언입니다. 새로운 섹션을 열면 이전에 열려있던 섹션은 자동으로 닫힙니다.'
      }
    }
  }
}; 