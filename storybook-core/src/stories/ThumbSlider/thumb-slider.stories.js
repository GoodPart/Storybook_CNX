import { ThumbSlider } from './thumb-slider.js';
import thumbsliderHtml from './thumb-slider.html?raw';
import thumbsliderCss from './thumb-slider.css?raw';
import thumbsliderJs from './thumb-slider.js?raw';
import './thumb-slider.scss';

export default {
  title: 'Atom/ThumbSlider/variant',
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component: 'swiper.js를 이용한 썸네일 슬라이더 컴포넌트입니다.',
      },
      source: {
        code: `
// HTML
${thumbsliderHtml}

// CSS
${thumbsliderCss}

// JavaScript
${thumbsliderJs}
        `
      }
    }
  },
  argTypes: {
    thumbSlideShow: {
      control: { 
        type: 'number',
        min: 1,
        max: 5
      },
      description: '썸네일 슬라이더에 표시될 슬라이드 개수',
      defaultValue: 4
    },
    thumbSlidePosition: {
      control: 'select',
      options: ['bottom', 'top', 'left', 'right'],
      description: '썸네일 슬라이더의 위치',
      defaultValue: 'bottom'
    },
    thumbSwiper: {
      control: 'text',
      description: '썸네일 슬라이더의 클래스명(.을 포함하여 작성)',
      defaultValue: '.thumbswiper_thumbswiper'
    },
    thumbNavigation: {
      control: 'select',
      options: ['none', 'main', 'thumb', 'all'],
      description: '네비게이션 버튼 표시 옵션',
      defaultValue: 'none'
    }
  }
};

export const Default = {
  render: (args) => {
    const container = document.createElement('div');
    container.innerHTML = thumbsliderHtml;
    
    const sliderElement = container.querySelector('.thumbswiper');
        
    // 이전 ThumbSlider 인스턴스 정리
    if (sliderElement._thumbSlider) {
      sliderElement._thumbSlider = null;
    }
    
    // args 값을 속성으로 설정
    sliderElement.setAttribute('thumb-slide-show', args.thumbSlideShow);
    sliderElement.setAttribute('thumb-slide-position', args.thumbSlidePosition);
    sliderElement.setAttribute('thumb-navigation', args.thumbNavigation);
    sliderElement.querySelector('.thumbswiper_mainswiper').setAttribute('thumbs-swiper', args.thumbSwiper);
    
    // 새로운 ThumbSlider 인스턴스 생성
    const thumbSlider = new ThumbSlider(sliderElement);
    sliderElement._thumbSlider = thumbSlider;
    
    return container;
  },
  args: {
    thumbSlideShow: 4,
    thumbSlidePosition: 'bottom',
    thumbSwiper: '.thumbswiper_thumbswiper',
    thumbNavigation: 'none'
  }
}; 