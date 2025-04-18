export class Slider {
  constructor(element) {
    this.container = element;
    this.wrapper = element.querySelector('.slider-wrapper');
    this.slides = Array.from(element.querySelectorAll('.slide'));
    this.prevButton = element.querySelector('.prev-button');
    this.nextButton = element.querySelector('.next-button');
    this.pagination = Array.from(element.querySelectorAll('.slider-pagination button'));
    
    this.currentIndex = 0;
    this.slideCount = this.slides.length;
    
    this.init();
  }

  init() {
    this.prevButton.addEventListener('click', () => this.prevSlide());
    this.nextButton.addEventListener('click', () => this.nextSlide());
    
    this.pagination.forEach((button, index) => {
      button.addEventListener('click', () => this.goToSlide(index));
    });

    // 키보드 네비게이션
    this.container.addEventListener('keydown', (e) => {
      switch(e.key) {
        case 'ArrowLeft':
          this.prevSlide();
          break;
        case 'ArrowRight':
          this.nextSlide();
          break;
      }
    });

    // 터치 이벤트
    let touchStartX = 0;
    this.container.addEventListener('touchstart', (e) => {
      touchStartX = e.touches[0].clientX;
    });

    this.container.addEventListener('touchend', (e) => {
      const touchEndX = e.changedTouches[0].clientX;
      const diff = touchStartX - touchEndX;

      if (Math.abs(diff) > 50) {
        if (diff > 0) {
          this.nextSlide();
        } else {
          this.prevSlide();
        }
      }
    });
  }

  goToSlide(index) {
    this.currentIndex = index;
    this.wrapper.style.transform = `translateX(-${index * 100}%)`;
    
    this.updatePagination();
    this.announceSlideChange();
  }

  prevSlide() {
    this.currentIndex = (this.currentIndex - 1 + this.slideCount) % this.slideCount;
    this.goToSlide(this.currentIndex);
  }

  nextSlide() {
    this.currentIndex = (this.currentIndex + 1) % this.slideCount;
    this.goToSlide(this.currentIndex);
  }

  updatePagination() {
    this.pagination.forEach((button, index) => {
      const isSelected = index === this.currentIndex;
      button.setAttribute('aria-selected', isSelected);
    });
  }

  announceSlideChange() {
    // 스크린리더 사용자를 위한 알림
    const liveRegion = this.container.querySelector('.sr-only') || document.createElement('div');
    liveRegion.className = 'sr-only';
    liveRegion.setAttribute('aria-live', 'polite');
    liveRegion.textContent = `슬라이드 ${this.currentIndex + 1}번`;
    
    if (!this.container.contains(liveRegion)) {
      this.container.appendChild(liveRegion);
    }
  }
} 