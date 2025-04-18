export class Dropdown {
  constructor(element) {
    this.dropdown = element;
    this.trigger = element.querySelector('.dropdown-trigger');
    this.menu = element.querySelector('.dropdown-menu');
    this.menuItems = element.querySelectorAll('[role="menuitem"] button');
    
    this.init();
  }

  init() {
    this.trigger.addEventListener('click', () => this.toggleMenu());
    
    // 키보드 네비게이션
    this.trigger.addEventListener('keydown', (e) => {
      if (e.key === 'ArrowDown' || e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        this.openMenu();
        this.menuItems[0].focus();
      }
    });

    this.menuItems.forEach((item, index) => {
      item.addEventListener('keydown', (e) => {
        switch(e.key) {
          case 'ArrowDown':
            e.preventDefault();
            this.focusNextItem(index);
            break;
          case 'ArrowUp':
            e.preventDefault();
            this.focusPrevItem(index);
            break;
          case 'Escape':
            e.preventDefault();
            this.closeMenu();
            this.trigger.focus();
            break;
        }
      });
    });

    // 외부 클릭 시 닫기
    document.addEventListener('click', (e) => {
      if (!this.dropdown.contains(e.target)) {
        this.closeMenu();
      }
    });
  }

  toggleMenu() {
    const isExpanded = this.trigger.getAttribute('aria-expanded') === 'true';
    if (isExpanded) {
      this.closeMenu();
    } else {
      this.openMenu();
    }
  }

  openMenu() {
    this.trigger.setAttribute('aria-expanded', 'true');
    this.menu.classList.add('show');
  }

  closeMenu() {
    this.trigger.setAttribute('aria-expanded', 'false');
    this.menu.classList.remove('show');
  }

  focusNextItem(currentIndex) {
    const nextIndex = (currentIndex + 1) % this.menuItems.length;
    this.menuItems[nextIndex].focus();
  }

  focusPrevItem(currentIndex) {
    const prevIndex = (currentIndex - 1 + this.menuItems.length) % this.menuItems.length;
    this.menuItems[prevIndex].focus();
  }
} 