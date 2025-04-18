import searchHtml from './search.html?raw';
import searchCss from './search.css?raw';
import './search.scss';

export default {
  title: 'Atom/Search/variant',
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component: '접근성을 고려한 검색 입력창 컴포넌트입니다.'
      },
      source: {
        code: `
// HTML
${searchHtml}

// CSS
${searchCss}
        `
      }
    }
  },
  argTypes: {
    placeholder: {
      control: 'text',
      description: '플레이스홀더 텍스트',
      defaultValue: '검색어를 입력하세요'
    },
    onSearch: {
      action: 'searched',
      description: '검색 실행 시 이벤트'
    },
    onInput: {
      action: 'input',
      description: '입력값 변경 시 이벤트'
    },
    onClear: {
      action: 'cleared',
      description: '검색어 지우기 시 이벤트'
    }
  }
};

export const Default = {
  render: (args) => {
    const container = document.createElement('div');
    container.innerHTML = searchHtml;
    
    const input = container.querySelector('.search-input');
    const clearButton = container.querySelector('.search-clear');
    const searchButton = container.querySelector('.search-button');
    
    input.placeholder = args.placeholder;
    
    // 검색어 입력 시 클리어 버튼 표시
    input.addEventListener('input', args.onInput);
    
    // 클리어 버튼 클릭 시 입력값 초기화
    clearButton.addEventListener('click', args.onClear);
    
    searchButton.addEventListener('click', () => args.onSearch(input.value));
    
    return container;
  }
}; 