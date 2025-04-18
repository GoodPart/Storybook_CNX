/**
 * 접근성 테스트 컴포넌트 JavaScript
 */

// DOM이 로드된 후 실행
document.addEventListener('DOMContentLoaded', function() {
  // 토글 기능 구현
  initToggle();
  
  // ARIA 역할이 버튼인 요소에 키보드 접근성 추가
  initAriaButtons();
});

/**
 * 토글 기능 초기화
 */
function initToggle() {
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
    
    // 키보드 접근성 추가
    toggleButton.addEventListener('keydown', function(event) {
      // 스페이스 또는 엔터 키 누를 때 토글 실행
      if (event.key === ' ' || event.key === 'Enter') {
        event.preventDefault();
        toggleButton.click();
      }
    });
  }
}

/**
 * ARIA 역할이 버튼인 요소에 키보드 접근성 추가
 */
function initAriaButtons() {
  const ariaButtons = document.querySelectorAll('[role="button"]');
  
  ariaButtons.forEach(button => {
    // 키보드 이벤트 처리
    button.addEventListener('keydown', function(event) {
      // 스페이스 또는 엔터 키 누를 때 클릭 이벤트 발생
      if (event.key === ' ' || event.key === 'Enter') {
        event.preventDefault();
        button.click();
      }
    });
    
    // 클릭 이벤트 처리 (예제용)
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
}

/**
 * 접근성을 위한 유틸리티 함수
 */
// 포커스 관리 함수 (모달 등에서 사용 가능)
function trapFocus(element) {
  const focusableElements = element.querySelectorAll(
    'a[href], button, textarea, input, select, [tabindex]:not([tabindex="-1"])'
  );
  
  if (focusableElements.length === 0) return;
  
  const firstElement = focusableElements[0];
  const lastElement = focusableElements[focusableElements.length - 1];
  
  // 첫 번째 요소로 포커스 이동
  firstElement.focus();
  
  element.addEventListener('keydown', function(e) {
    // Tab 키 관리
    if (e.key === 'Tab') {
      // Shift+Tab이 눌렸고 현재 첫 번째 요소에 포커스가 있는 경우
      if (e.shiftKey && document.activeElement === firstElement) {
        e.preventDefault();
        lastElement.focus();
      }
      // Tab이 눌렸고 현재 마지막 요소에 포커스가 있는 경우
      else if (!e.shiftKey && document.activeElement === lastElement) {
        e.preventDefault();
        firstElement.focus();
      }
    }
  });
} 