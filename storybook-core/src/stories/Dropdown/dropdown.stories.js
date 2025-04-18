import { Dropdown } from './dropdown.js';
import dropdownHtml from './dropdown.html?raw';
import dropdownCss from './dropdown.css?raw';
import dropdownJs from './dropdown.js?raw';
import './dropdown.scss';

export default {
  title: 'Dropdown',
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component: '접근성을 고려한 드롭다운 메뉴 컴포넌트입니다.'
      },
      source: {
        code: `
          // HTML
          ${dropdownHtml}

          // CSS
          ${dropdownCss}

          // JavaScript
          ${dropdownJs}
                  `
      }
    }
  }
};

export const Default = {
  render: () => {
    const container = document.createElement('div');
    container.innerHTML = dropdownHtml;
    
    const dropdownElement = container.querySelector('.dropdown');
    new Dropdown(dropdownElement);
    
    return container;
  }
}; 