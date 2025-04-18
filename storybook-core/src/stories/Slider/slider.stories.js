import { Slider } from './slider.js';
import sliderHtml from './slider.html?raw';
import sliderCss from './slider.css?raw';
import sliderJs from './slider.js?raw';
import './slider.scss';

export default {
  title: 'Atom/Slider/variant',
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component: '접근성을 고려한 이미지 슬라이더 컴포넌트입니다.'
      },
      source: {
        code: `
// HTML
${sliderHtml}

// CSS
${sliderCss}

// JavaScript
${sliderJs}
        `
      }
    }
  }
};

export const Default = {
  render: () => {
    const container = document.createElement('div');
    container.innerHTML = sliderHtml;
    
    const sliderElement = container.querySelector('.slider-container');
    new Slider(sliderElement);
    
    return container;
  }
}; 