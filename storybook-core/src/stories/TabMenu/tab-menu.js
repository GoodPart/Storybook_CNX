export class TabMenu {
  constructor(element) {
    this.container = element;
    this.tabs = Array.from(this.container.querySelectorAll('.tab'));
    this.panels = Array.from(this.container.querySelectorAll('.tab-panel'));
    
    this.init();
  }

  init() {
    this.tabs.forEach((tab, index) => {
      tab.addEventListener('click', () => this.activateTab(index));
      tab.addEventListener('keydown', (e) => this.handleKeydown(e, index));
    });
  }

  activateTab(index) {
    this.tabs.forEach((tab, i) => {
      const isActive = i === index;
      tab.setAttribute('aria-selected', isActive);
      tab.classList.toggle('active', isActive);
      this.panels[i].hidden = !isActive;
    });
  }

  handleKeydown(e, index) {
    const tabCount = this.tabs.length;
    let targetIndex;

    switch (e.key) {
      case 'ArrowRight':
        targetIndex = (index + 1) % tabCount;
        break;
      case 'ArrowLeft':
        targetIndex = (index - 1 + tabCount) % tabCount;
        break;
      default:
        return;
    }

    e.preventDefault();
    this.activateTab(targetIndex);
    this.tabs[targetIndex].focus();
  }
} 