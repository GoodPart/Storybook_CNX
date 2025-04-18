import { register } from 'swiper/element/bundle';
register();


export class ThumbSlider {
  constructor(element) {
    this.element = element;
    this.init();
  }

  init() {
    const mainSliderContainer = this.element.querySelector('.thumbswiper_mainswiper');
    //예외처리: 메인슬라이더 컨테이너가 없으면 종료
    if (!mainSliderContainer) {
      console.error('Mainslider container not found');
      return;
    }

    //썸네일 슬라이더 컨테이너 생성
    const thumbSliderContainer = document.createElement('swiper-container');
    const thumbsSwiper = mainSliderContainer.getAttribute('thumbs-swiper') || '.thumbswiper_thumbswiper';
    const thumbSliderClassName = thumbsSwiper.replace('.', '');
    thumbSliderContainer.className = thumbSliderClassName;
    
    // thumbs-swiper 속성이 없는 경우 추가
    if (!mainSliderContainer.getAttribute('thumbs-swiper')) {
      mainSliderContainer.setAttribute('thumbs-swiper', thumbsSwiper);
    }
    
    this.element.appendChild(thumbSliderContainer);

    //옵션제어 : 썸네일 슬라이더 개수 설정
    let thumbSlideShow = this.element.getAttribute('thumb-slide-show');
    //예외처리 : 썸네일 슬라이더 개수가 없으면 메인 슬라이더 개수로 설정
    if (!thumbSlideShow) {
      const mainSlideCount = mainSliderContainer.querySelectorAll('swiper-slide').length;
      thumbSlideShow = mainSlideCount;
    }
    thumbSliderContainer.setAttribute('slides-per-view', thumbSlideShow);

    //옵션제어 : 썸네일 슬라이더 위치 설정
    let thumbSlidePosition = this.element.getAttribute('thumb-slide-position');
    //예외처리 : 썸네일 슬라이더 위치가 없으면 bottom이 기본값
    if (!thumbSlidePosition) {
      thumbSlidePosition = 'bottom';
    }
    this.element.classList.add('thumb-'+thumbSlidePosition);
    
    //옵션제어 : 네비게이션 설정
    let navigationOption = this.element.getAttribute('thumb-navigation') || 'none';
    if (navigationOption === 'main' || navigationOption === 'all') {
      mainSliderContainer.setAttribute('navigation', 'true');
    }
    if (navigationOption === 'thumb' || navigationOption === 'all') {
      thumbSliderContainer.setAttribute('navigation', 'true');
    }
    
    //left, right일 경우 세로방향 스와이퍼로 변경
    if (thumbSlidePosition === 'left' || thumbSlidePosition === 'right') {
      thumbSliderContainer.setAttribute('direction', 'vertical');
      
      // thumbSlide의 Height 갱신
      const updateHeight = () => {
        const mainSliderHeight = mainSliderContainer.offsetHeight; // 갱신시점의 mainSlider의 height 받아오기기
        if (mainSliderHeight > 0) {
          thumbSliderContainer.style.height = `${mainSliderHeight}px`;
          thumbSliderContainer.swiper.update(); // 썸네일 슬라이더 새로고침
        }
      };

      // MutationObserver를 사용하여 mainSliderContainer 높이 변화 감지
      const observer = new MutationObserver(updateHeight);
      
      // 옵저버 설정
      observer.observe(mainSliderContainer, {
        attributes: true,
        childList: true,
        subtree: true
      });

      // 이미지 로딩 완료 체크
      const images = mainSliderContainer.querySelectorAll('img');
      let loadedImages = 0;
      
      const checkAllImagesLoaded = () => {
        loadedImages++;
        if (loadedImages === images.length) {
          updateHeight(); // 모든 이미지가 로드되면 높이 업데이트
        }
      };

      images.forEach(img => {
        if (img.complete) {
          checkAllImagesLoaded();
        } else {
          img.addEventListener('load', checkAllImagesLoaded);
        }
      });
    }

    //메인 슬라이더 복사 (썸네일 슬라이더 자동 생성)
    const mainSlides = mainSliderContainer.querySelectorAll('swiper-slide');
    mainSlides.forEach(slide => {
      const clonedSlide = slide.cloneNode(true);
      thumbSliderContainer.appendChild(clonedSlide);      
    });    
  }
}