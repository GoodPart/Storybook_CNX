export class Button {
  constructor(options = {}) {
    const {
      primary = false,
      size = 'medium',
      backgroundColor,
      label = 'Button',
      onClick = () => {}
    } = options;

    const button = document.createElement('button');
    button.type = 'button';
    button.innerText = label;
    button.addEventListener('click', onClick);

    const mode = primary ? 'button--primary' : 'button--secondary';
    button.className = ['button', `button--${size}`, mode].join(' ');

    if (backgroundColor) {
      button.style.backgroundColor = backgroundColor;
    }

    return button;
  }

  init() {
    this.button.addEventListener('keydown', this.handleKeydown.bind(this));
  }

  handleKeydown(e) {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      this.button.click();
    }
  }

  setVariant(variant) {
    const currentSize = this.button.className.match(/btn-(?:small|medium|large)/)[0];
    this.button.className = `btn btn-${variant} ${currentSize}`;
  }

  setSize(size) {
    const currentVariant = this.button.className.match(/btn-(?:primary|secondary)/)[0];
    this.button.className = `btn ${currentVariant} btn-${size}`;
  }

  setText(text) {
    this.button.querySelector('.btn-text').textContent = text;
  }
} 