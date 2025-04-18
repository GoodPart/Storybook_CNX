export class Accordion {
  constructor(element, options = {}) {
    this.accordion = element;
    this.items = Array.from(element.querySelectorAll('.accordion-item'));
    this.singleExpand = options.singleExpand || false; // 단일 확장 옵션 추가
    
    this.init();
  }

  init() {
    this.items.forEach(item => {
      const header = item.querySelector('.accordion-header');
      const panel = item.querySelector('.accordion-panel');
      
      header.addEventListener('click', () => this.togglePanel(header, panel));
      
      // 키보드 접근성
      header.addEventListener('keydown', (e) => {
        switch (e.key) {
          case 'Enter':
          case ' ':
            e.preventDefault();
            this.togglePanel(header, panel);
            break;
          case 'ArrowDown':
            e.preventDefault();
            this.focusNextHeader(header);
            break;
          case 'ArrowUp':
            e.preventDefault();
            this.focusPrevHeader(header);
            break;
          case 'Home':
            e.preventDefault();
            this.focusFirstHeader();
            break;
          case 'End':
            e.preventDefault();
            this.focusLastHeader();
            break;
        }
      });
    });
  }

  togglePanel(header, panel) {
    const isExpanded = header.getAttribute('aria-expanded') === 'true';
    
    // 단일 확장 모드일 경우 다른 패널들을 닫음
    if (this.singleExpand && !isExpanded) {
      this.items.forEach(item => {
        const itemHeader = item.querySelector('.accordion-header');
        const itemPanel = item.querySelector('.accordion-panel');
        
        if (itemHeader !== header) {
          itemHeader.setAttribute('aria-expanded', 'false');
          this.closePanel(itemPanel);
        }
      });
    }
    
    header.setAttribute('aria-expanded', !isExpanded);
    
    if (!isExpanded) {
      this.openPanel(panel);
    } else {
      this.closePanel(panel);
    }
  }

  openPanel(panel) {
    panel.style.height = '0';
    panel.hidden = false;
    const height = panel.scrollHeight;
    panel.style.height = height + 'px';
    
    setTimeout(() => {
      panel.style.height = '';
    }, 300);
  }

  closePanel(panel) {
    panel.style.height = panel.scrollHeight + 'px';
    setTimeout(() => {
      panel.style.height = '0';
    }, 0);
    
    setTimeout(() => {
      panel.hidden = true;
      panel.style.height = '';
    }, 300);
  }

  focusNextHeader(currentHeader) {
    const headers = Array.from(this.accordion.querySelectorAll('.accordion-header'));
    const currentIndex = headers.indexOf(currentHeader);
    const nextHeader = headers[currentIndex + 1] || headers[0];
    nextHeader.focus();
  }

  focusPrevHeader(currentHeader) {
    const headers = Array.from(this.accordion.querySelectorAll('.accordion-header'));
    const currentIndex = headers.indexOf(currentHeader);
    const prevHeader = headers[currentIndex - 1] || headers[headers.length - 1];
    prevHeader.focus();
  }

  focusFirstHeader() {
    const firstHeader = this.accordion.querySelector('.accordion-header');
    firstHeader.focus();
  }

  focusLastHeader() {
    const headers = this.accordion.querySelectorAll('.accordion-header');
    const lastHeader = headers[headers.length - 1];
    lastHeader.focus();
  }
} 