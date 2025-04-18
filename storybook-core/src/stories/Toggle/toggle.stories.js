import toggleHtml from './toggle.html?raw';
import toggleCss from './toggle.css?raw';
import './toggle.scss';

export default {
  title: 'Toggle',
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component: '접근성을 고려한 토글 스위치 컴포넌트입니다.'
      },
      source: {
        code: `
// HTML
${toggleHtml}

// CSS
${toggleCss}
        `
      }
    }
  },
  argTypes: {
    checked: {
      control: 'boolean',
      description: '토글 상태',
      defaultValue: false
    },
    disabled: {
      control: 'boolean',
      description: '비활성화 상태',
      defaultValue: false
    },
    label: {
      control: 'text',
      description: '토글 레이블',
      defaultValue: '알림 받기'
    }
  }
};

export const Default = {
  render: (args) => {
    const container = document.createElement('div');
    container.innerHTML = toggleHtml;
    
    const toggle = container.querySelector('.toggle');
    const input = toggle.querySelector('input');
    const label = toggle.querySelector('.toggle-label');
    
    input.checked = args.checked;
    input.disabled = args.disabled;
    label.textContent = args.label;
    
    if (args.disabled) {
      toggle.classList.add('disabled');
    }
    
    return container;
  }
};

export const Checked = {
  ...Default,
  args: {
    checked: true
  }
};

export const Disabled = {
  ...Default,
  args: {
    disabled: true
  }
}; 