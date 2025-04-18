import tooltipHtml from './tooltip.html?raw';
import tooltipCss from './tooltip.css?raw';
import './tooltip.scss';

export default {
  title: 'Tooltip',
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component: '접근성을 고려한 툴팁 컴포넌트입니다.'
      },
      source: {
        code: `
// HTML
${tooltipHtml}

// CSS
${tooltipCss}
        `
      }
    }
  }
};

export const Default = {
  render: () => {
    const container = document.createElement('div');
    container.innerHTML = tooltipHtml;
    return container;
  }
}; 