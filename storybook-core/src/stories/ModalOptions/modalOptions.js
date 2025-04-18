export class ModalBuilder {
  constructor(template = '') {
    this.container = document.createElement('div');
    this.container.innerHTML = template;
    this.modalContent = this.container.querySelector('.modal-content');
    this.modal = this.container.querySelector('.modal');
  }

  setSize(size) {
    if(size && size !== 'default') {
      this.modal.classList.add(`modal-${size}`);
    }
    return this;
  }
  
  setHeader(headerOptions) {
    this.modalContent.insertAdjacentHTML('beforebegin', `
        <div class="modal-header">
            <h2 id="modal-title">${headerOptions.title}</h2>
            ${headerOptions.hasCloseButton ? '<button class="modal-close" aria-label="모달 닫기">×</button>' : ''}
        </div>    
    `);
    return this;
  }
  
  setBody(bodyOptions) {
    const bodyElement = document.createElement('div');
    bodyElement.className = 'modal-body';
    bodyElement.innerHTML = `<p>${bodyOptions}</p>`;
    this.modalContent.appendChild(bodyElement);
    return this;
  }
  
  setFooter(footerOptions) {
    const buttonHTML = footerOptions.buttons.map(btn => {
        const btnClass = btn.variant ? `modal-${btn.action} modal-btn-${btn.variant}` : `modal-${btn.action}`;
        return `<button class="${btnClass}" data-action="${btn.action}">${btn.text}</button>`;
    }).join('');
      
    this.modalContent.insertAdjacentHTML('beforeend', `
        <div class="modal-footer">
            ${buttonHTML}
        </div>
    `);

    return this;
  }

  build() {
    return this.container;
  }
}

export class ModalOptions {
  constructor(container, options = {}) {
    this.container = container;
    this.options = options;
    
    // 기본 요소
    this.modal = this.container.querySelector('.modal');
    this.trigger = this.container.querySelector('.modal-trigger');
    this.overlay = this.container.querySelector('.modal-overlay');
    
    // 포커스 트랩을 위한 요소들
    this.focusableElements = this.modal.querySelectorAll('button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])');
    this.firstFocusable = this.focusableElements[0];
    this.lastFocusable = this.focusableElements[this.focusableElements.length - 1];
    
    // 버튼 초기화
    this.initializeButtons();
    this.setupEventListeners();
  }

  initializeButtons() {
    // closeButton 초기화 (헤더에 있을 수 있음)
    this.closeButton = this.container.querySelector('.modal-close');
    
    // 푸터 버튼 초기화
    // this.cancelButton = this.container.querySelector('.modal-cancel');
    // this.confirmButton = this.container.querySelector('.modal-confirm');
    this.actionButtons = this.container.querySelectorAll('[data-action]');
  }

  setupEventListeners() {
    // 기본 이벤트
    this.trigger.addEventListener('click', () => this.openModal());
    this.overlay.addEventListener('click', () => this.closeModal());
    
    // 버튼 이벤트 (해당 버튼이 있을 때만)
    if (this.closeButton) {
      this.closeButton.addEventListener('click', () => this.closeModal());
    }
    
    // if (this.cancelButton) {
    //   this.cancelButton.addEventListener('click', () => this.closeModal());
    // }
    
    // if (this.confirmButton) {
    //   this.confirmButton.addEventListener('click', () => this.closeModal());
    // }

    // 액션 버튼 이벤트
    this.actionButtons.forEach(button => {
        const action = button.dataset.action;
        button.addEventListener('click', () => this.handleAction(action));
    });    
    
    // ESC 키로 모달 닫기
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && !this.modal.hidden) {
        this.closeModal();
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

  handleAction(action) {
    // 버튼 액션 처리
    if (action === 'cancel' || action === 'close') {
      this.closeModal();
    } else if (action === 'confirm') {
      // 확인 처리 로직
      console.log('확인 버튼 클릭됨');
      this.closeModal();
    }
    
    // 커스텀 이벤트 발생 - 외부에서 처리할 수 있도록
    const event = new CustomEvent('modal:action', {
      detail: { action, modal: this }
    });
    this.container.dispatchEvent(event);
  }

  openModal() {
    this.modal.hidden = false;
    
    // 첫 번째 포커스 가능한 요소에 포커스
    if (this.closeButton) {
      this.closeButton.focus();
    } else if (this.firstFocusable) {
      this.firstFocusable.focus();
    }
    
    // 모달 외부 스크롤 방지
    document.body.style.overflow = 'hidden';
    
    // 모달 외부 요소들의 aria-hidden 설정
    Array.from(document.body.children)
      .filter(element => element !== this.modal && !this.modal.contains(element))
      .forEach(element => {
        element.setAttribute('aria-hidden', 'true');
      });
  }

  closeModal() {
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

  static createBuilder(template){
    return new ModalBuilder(template);
  }
}
