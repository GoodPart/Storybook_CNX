export class Modal {
  constructor(element) {
    this.container = element;
    this.modal = element.querySelector('.modal');
    this.trigger = element.querySelector('.modal-trigger');
    this.closeButton = element.querySelector('.modal-close');
    this.cancelButton = element.querySelector('.modal-cancel');
    this.confirmButton = element.querySelector('.modal-confirm');
    this.overlay = element.querySelector('.modal-overlay');
    
    this.focusableElements = this.modal.querySelectorAll(
      'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
    );
    this.firstFocusable = this.focusableElements[0];
    this.lastFocusable = this.focusableElements[this.focusableElements.length - 1];
    
    this.init();
  }

  init() {
    this.trigger.addEventListener('click', () => this.open());
    this.closeButton.addEventListener('click', () => this.close());
    this.cancelButton.addEventListener('click', () => this.close());
    this.confirmButton.addEventListener('click', () => this.close());
    this.overlay.addEventListener('click', () => this.close());
    
    // ESC 키로 모달 닫기
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && !this.modal.hidden) {
        this.close();
      }
    });

    // 모달 내부에서 포커스 트랩 설정
    this.modal.addEventListener('keydown', (e) => {
      if (e.key === 'Tab') {
        if (e.shiftKey) {
          // Shift + Tab
          if (document.activeElement === this.firstFocusable) {
            e.preventDefault();
            this.lastFocusable.focus();
          }
        } else {
          // Tab
          if (document.activeElement === this.lastFocusable) {
            e.preventDefault();
            this.firstFocusable.focus();
          }
        }
      }
    });
  }

  open() {
    this.modal.hidden = false;
    this.closeButton.focus();
    
    // 모달 외부 스크롤 방지
    document.body.style.overflow = 'hidden';
    
    // 모달 외부 요소들의 aria-hidden 설정
    Array.from(document.body.children)
      .filter(element => element !== this.modal && !this.modal.contains(element))
      .forEach(element => {
        element.setAttribute('aria-hidden', 'true');
      });
  }

  close() {
    this.modal.hidden = true;
    this.trigger.focus();
    
    // 스크롤 복원
    document.body.style.overflow = '';
    
    // aria-hidden 제거
    Array.from(document.body.children)
      .forEach(element => {
        element.removeAttribute('aria-hidden');
      });
  }
} 