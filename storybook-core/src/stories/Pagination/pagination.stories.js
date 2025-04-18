import paginationHtml from './pagination.html?raw';
import paginationCss from './pagination.css?raw';
import './pagination.scss';

export default {
  title: 'Atom/Pagination/variant',
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component: '접근성을 고려한 페이지네이션 컴포넌트입니다.'
      },
      source: {
        code: `
// HTML
${paginationHtml}

// CSS
${paginationCss}
        `
      }
    }
  }
};

export const Default = {
  render: () => {
    const container = document.createElement('div');
    container.innerHTML = paginationHtml;
    return container;
  }
}; 