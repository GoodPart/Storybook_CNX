import a11yReport from './a11y/report.mdx?raw';
import accessibilityHtml from './accessibility.html?raw';
import accessibilityCss from './accessibility.css?raw';
import accessibilityJs from './accessibility.js?raw';
import './accessibility.css';

export default {
  title: 'Accessibility',
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component: '접근성 검사를 위한 테스트 컴포넌트입니다. 여러 접근성 위반 사례가 포함되어 있습니다.'
      },
      source: {
        code: `
// HTML
${accessibilityHtml}

// CSS
${accessibilityCss}

// JavaScript
${accessibilityJs}
        `
      }
    }
  }
};

export const Default = {
  render: () => {
    const container = document.createElement('div');
    container.innerHTML = accessibilityHtml;
    
    // JavaScript 기능 적용을 위한 스크립트 추가
    const script = document.createElement('script');
    script.textContent = `
      // DOM이 로드된 후 실행
      document.addEventListener('DOMContentLoaded', function() {
        // 토글 기능 구현
        const toggleButton = document.querySelector('.toggle-button');
        const toggleContent = document.querySelector('.toggle-content');
        
        if (toggleButton && toggleContent) {
          toggleButton.addEventListener('click', function() {
            // 콘텐츠 표시 상태 토글
            const isExpanded = toggleContent.classList.toggle('active');
            
            // ARIA 속성 업데이트
            toggleButton.setAttribute('aria-expanded', isExpanded);
            
            // 버튼 텍스트 변경 (접근성을 위해)
            toggleButton.textContent = isExpanded ? '내용 접기' : '내용 펼치기';
          });
        }
        
        // ARIA 역할이 버튼인 요소에 클릭 이벤트 추가
        const ariaButtons = document.querySelectorAll('[role="button"]');
        
        ariaButtons.forEach(button => {
          button.addEventListener('click', function() {
            console.log('ARIA 버튼이 클릭되었습니다.');
            
            // 시각적 피드백 추가
            const originalBg = button.style.backgroundColor;
            button.style.backgroundColor = '#1565C0';
            
            // 0.3초 후 원래 색상으로 복원
            setTimeout(() => {
              button.style.backgroundColor = originalBg;
            }, 300);
          });
        });
      });
    `;
    container.appendChild(script);
    
    return container;
  },
  parameters: {
    docs: {
      story: {
        inline: true
      }
    }
  }
};

// 접근성 보고서 스토리 추가
export const AccessibilityReport = {
  render: () => {
    const container = document.createElement('div');
    container.className = 'a11y-report';
    container.innerHTML = `
      <div style="padding: 20px; font-family: 'Arial', sans-serif;">
        <h1 style="color: #333; border-bottom: 1px solid #eee; padding-bottom: 10px;">접근성 보고서</h1>
        <div style="line-height: 1.6;">
          <pre style="white-space: pre-wrap; word-break: break-word;">${a11yReport}</pre>
        </div>
      </div>
    `;
    return container;
  },
  parameters: {
    docs: {
      description: {
        story: '컴포넌트 접근성 검사 결과입니다.'
      }
    }
  }
};