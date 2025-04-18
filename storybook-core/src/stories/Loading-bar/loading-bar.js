export class LoadingBar {
  /**
   * LoadingBar 클래스의 생성자
   * @param {HTMLElement} element - 로딩 요소를 포함하는 컨테이너 요소
   * @param {Object} options - 로딩바 설정 옵션
   * @param {string} options.backgroundColor - 배경색
   * @param {string} options.elementColor - 로딩 요소 색상
   * @param {number} options.animationSpeed - 애니메이션 속도 배수 (1 = 기본 속도)
   * @param {boolean} options.percentage - 로딩 진행률 표시 여부
   */
  constructor(element, options = {}) {
    // 컨테이너 요소 저장
    this.container = element;
    
    // 기본 옵션 설정
    this.options = {
      backgroundColor: options.backgroundColor || null,
      elementColor: options.elementColor || null,
      animationSpeed: options.animationSpeed || 1,
      percentage: options.percentage || false
    };
    
    // 다양한 로딩 요소 찾기
    this.loadingElement = element.querySelector('.spinner') || 
                          element.querySelector('.dot-loading') || 
                          element.querySelector('.linear-activity') || 
                          element.querySelector('.wave-loading') || 
                          element.querySelector('.pulse-loading');
    
    // 로딩 요소의 원래 display 스타일 저장
    if (this.loadingElement) {
      this.originalDisplay = this.getOriginalDisplay(this.loadingElement);
    }
    
    // 스크린 리더를 위한 텍스트 요소 찾기 (.sr-only 클래스를 가진 요소)
    this.loadingText = element.querySelector('.sr-only');
    
    // 진행률 요소 및 변수 초기화
    this.progressText = null;
    this.animationId = null;
    
    // 초기화 메서드 호출
    this.init();
  }

  /**
   * 요소의 원래 display 스타일을 반환하는 메서드
   * @param {HTMLElement} element - display 스타일을 확인할 요소
   * @returns {string} - 요소의 원래 display 스타일
   */
  getOriginalDisplay(element) {
    const computedStyle = window.getComputedStyle(element);
    return computedStyle.display !== 'none' ? computedStyle.display : 'block';
  }

  /**
   * 초기화 메서드
   * 로딩 요소의 초기 상태를 설정합니다.
   */
  init() {
    // 초기 설정 - 기본적으로 로딩 요소를 표시합니다.
    this.show();
    
    // 진행률 표시가 활성화된 경우 진행률 요소 생성
    if (this.options.percentage) {
      this.createProgressElements();
      this.startTracking();
    }
  }

  /**
   * 진행률 표시 요소를 생성하는 메서드
   */
  createProgressElements() {
    // 진행률 컨테이너 생성
    const progressContainer = document.createElement('div');
    progressContainer.className = 'progress-container';
    progressContainer.style.position = 'relative';
    progressContainer.style.width = '100%';
    progressContainer.style.marginTop = '10px';
    progressContainer.style.textAlign = 'center';
    
    // 진행률 텍스트 생성
    this.progressText = document.createElement('div');
    this.progressText.className = 'progress-text';
    this.progressText.style.fontSize = '14px';
    this.progressText.style.fontWeight = 'bold';
    this.progressText.style.color = '#333';
    this.progressText.textContent = '0%';
    
    // 요소 추가
    progressContainer.appendChild(this.progressText);
    
    // 다크모드 감지 및 스타일 조정
    if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
      this.progressText.style.color = '#fff';
    }
    
    // loading-wrapper 내부에 진행률 컨테이너 추가
    const loadingWrapper = this.container.querySelector('.loading-wrapper');
    if (loadingWrapper) {
      loadingWrapper.appendChild(progressContainer);
    } else {
      // loading-wrapper가 없는 경우 loading-container에 추가
      const loadingContainer = this.container.querySelector('.loading-container') || this.container;
      loadingContainer.appendChild(progressContainer);
    }
  }

  /**
   * 페이지 로딩 진행률 추적 시작
   */
  startTracking() {
    // 브라우저가 Performance API를 지원하는지 확인
    if (!performance || !performance.getEntriesByType) {
      console.warn('Performance API is not supported in this browser');
      this.simulateProgress(); // 지원하지 않는 경우 시뮬레이션
      return;
    }
    
    // 로딩 상태를 추적하기 위한 변수
    const state = {
      totalImages: 0,
      loadedImages: 0,
      pendingImages: new Set(),
      allImagesLoaded: false,
      domContentLoaded: false,
      windowLoaded: false
    };
    
    // 디버깅용 로그 함수
    const logState = (message) => {
      console.log(`[로딩바] ${message} - 이미지: ${state.loadedImages}/${state.totalImages}, DOM: ${state.domContentLoaded}, Window: ${state.windowLoaded}`);
    };

    // DOM이 로드되었을 때
    window.addEventListener('DOMContentLoaded', () => {
      state.domContentLoaded = true;
      logState('DOMContentLoaded 이벤트 발생');
      updateProgressDisplay();
    });
    
    // 모든 이미지 로딩 감시 함수
    const trackAllImages = () => {
      // 컨테이너 및 하위 요소들의 모든 이미지 수집
      const allImages = [];
      
      // 문서 전체 이미지
      const documentImages = document.querySelectorAll('img');
      documentImages.forEach(img => allImages.push(img));
      
      // 컨테이너 내부 이미지만 추적하고 싶은 경우 아래 코드 사용
      /*
      const containerImages = this.container.querySelectorAll('img');
      containerImages.forEach(img => allImages.push(img));
      */
      
      // 이미지 없으면 바로 리턴
      if (allImages.length === 0) {
        state.allImagesLoaded = true;
        logState('이미지가 없습니다');
        return;
      }
      
      state.totalImages = allImages.length;
      logState(`총 ${state.totalImages}개의 이미지를 발견했습니다`);
      
      // 각 이미지에 로드 이벤트 리스너 추가
      allImages.forEach((img, index) => {
        // 각 이미지에 고유 ID 부여 (추적용)
        const imageId = `img_${index}`;
        state.pendingImages.add(imageId);
        
        // 디버그용 메시지 출력 - 이미지 URL 표시
        logState(`이미지 #${index} URL: ${img.src}`);
        
        // 이미 로드된 이미지 처리
        if (img.complete) {
          state.loadedImages++;
          state.pendingImages.delete(imageId);
          logState(`이미지 ${index + 1}/${state.totalImages}가 이미 로드되어 있습니다 (${img.src})`);
          updateProgressDisplay();
          return;
        }
        
        // 이미지 로드 이벤트 처리
        img.addEventListener('load', () => {
          if (!state.pendingImages.has(imageId)) return; // 중복 처리 방지
          
          state.loadedImages++;
          state.pendingImages.delete(imageId);
          logState(`이미지 ${index + 1}/${state.totalImages}가 로드 완료되었습니다 (${img.src})`);
          
          // 모든 이미지가 로드 완료됐는지 확인
          if (state.pendingImages.size === 0) {
            state.allImagesLoaded = true;
            logState('모든 이미지가 로드 완료되었습니다');
            // 즉시 onAllResourcesLoaded 호출
            onAllResourcesLoaded();
          }
          
          updateProgressDisplay();
        });
        
        // 이미지 로드 오류 처리 (오류도 로드 완료로 간주)
        img.addEventListener('error', () => {
          if (!state.pendingImages.has(imageId)) return; // 중복 처리 방지
          
          state.loadedImages++;
          state.pendingImages.delete(imageId);
          logState(`이미지 ${index + 1}/${state.totalImages} 로드 오류 발생 (${img.src})`);
          
          // 모든 이미지가 처리됐는지 확인
          if (state.pendingImages.size === 0) {
            state.allImagesLoaded = true;
            logState('모든 이미지가 처리 완료되었습니다');
            // 즉시 onAllResourcesLoaded 호출
            onAllResourcesLoaded();
          }
          
          updateProgressDisplay();
        });
      });
    };
    
    // 모든 리소스 로딩 완료시 처리 함수
    const onAllResourcesLoaded = () => {
      logState('모든 리소스 로드 완료 - 100% 표시');
      
      // 애니메이션 프레임 취소
      if (this.animationId) {
        cancelAnimationFrame(this.animationId);
        this.animationId = null;
      }
      
      // 강제로 100% 진행률 표시
      this.updateProgress(100);
      
      // 5초 후 로딩 인디케이터 숨기기 (1초에서)
      setTimeout(() => {
        // 사용자가 명시적으로 표시 유지를 지정하지 않았다면 숨김
        if (this.options.loadingVisible !== true) {
          this.hide();
        }
      }, 1000);
    };
    
    // 진행률 계산 및 표시 함수
    const updateProgressDisplay = () => {
      // 모든 이미지가 로드 완료된 경우, 즉시 종료 (이미 onAllResourcesLoaded가 호출됨)
      if (state.allImagesLoaded) {
        return;
      }
      
      // 기본 진행률 계산 (DOM 로딩 상태 기준)
      let progress = 0;
      
      // DOM 로딩 상태에 따라 기본 진행률 결정 (전체의 20%)
      if (state.domContentLoaded) {
        progress = 20;
      }
      
      // 이미지 로딩 진행률 계산 (전체의 80%)
      let imageProgress = 0;
      if (state.totalImages > 0) {
        imageProgress = (state.loadedImages / state.totalImages) * 80;
      } else {
        // 이미지가 없는 경우 이미지 로딩은 완료된 것으로 간주
        imageProgress = 80;
        state.allImagesLoaded = true;
        onAllResourcesLoaded();
        return;
      }
      
      // 전체 진행률 계산
      const totalProgress = progress + imageProgress;
      
      // window load 이벤트가 발생했고 이미지가 아직 로딩 중이면 진행률 부스트
      if (state.windowLoaded) {
        // 최소 70%는 보장하여 빠르게 진행 중인 느낌을 줌
        this.updateProgress(Math.max(totalProgress, 70));
      } else {
        // 일반적인 진행률 표시
        this.updateProgress(totalProgress);
      }
    };
    
    // 주기적으로 상태 확인 및 업데이트
    const checkProgressLoop = () => {
      // 모든 이미지가 로드되었다면 즉시 100% 표시하고 종료
      if (state.allImagesLoaded) {
        onAllResourcesLoaded();
        return;
      }
      
      updateProgressDisplay();
      
      // 모든 리소스가 로드되지 않았으면 계속 확인
      if (!state.allImagesLoaded) {
        this.animationId = requestAnimationFrame(checkProgressLoop);
      }
    };
    
    // 페이지 완전 로드 이벤트 리스너
    window.addEventListener('load', () => {
      state.windowLoaded = true;
      logState('Window load 이벤트 발생');
      
      // 모든 이미지가 이미 로드된 경우 즉시 완료 처리
      if (state.allImagesLoaded) {
        onAllResourcesLoaded();
      } else {
        // 아직 이미지 로딩 중인 경우, 다시 한번 확인
        const remainingImages = Array.from(state.pendingImages);
        logState(`Window load 이벤트 발생 시점에 ${remainingImages.length}개 이미지가 아직 로딩 중입니다`);
        
        // 5초 후에도 이미지가 로드되지 않으면 강제로 100% 표시
        setTimeout(() => {
          if (!state.allImagesLoaded) {
            logState('5초 시간 초과로 로딩 표시를 100%로 강제 전환합니다');
            state.allImagesLoaded = true;
            onAllResourcesLoaded();
          }
        }, 5000);
      }
    });
    
    // 초기 실행
    trackAllImages();
    checkProgressLoop();
  }

  /**
   * 진행률 시뮬레이션 (Performance API가 지원되지 않는 경우)
   */
  simulateProgress() {
    let progress = 0;
    const increment = 5;
    const maxProgress = 95; // 시뮬레이션에서는 95%까지만 진행
    const interval = 500; // 0.5초 간격으로 업데이트
    
    const simulate = () => {
      progress += Math.random() * increment;
      progress = Math.min(progress, maxProgress);
      this.updateProgress(progress);
      
      if (progress < maxProgress) {
        setTimeout(simulate, interval);
      }
    };
    
    simulate();
    
    // 페이지 로드 완료 이벤트 리스너
    window.addEventListener('load', () => {
      // 로드가 끝났으므로 100%로 고정
      this.updateProgress(100);
    });
  }

  /**
   * 진행률 UI 업데이트
   * @param {number} progress - 진행률 (0-100)
   */
  updateProgress(progress) {
    if (!this.progressText) return;
    
    const roundedProgress = Math.round(progress);
    this.progressText.textContent = `${roundedProgress}%`;
    
    // 스크린 리더를 위한 로딩 텍스트 업데이트
    this.setLoadingText(`페이지 로딩 중, ${roundedProgress}% 완료`);
    
    // 100% 완료 시 완료 메시지 설정
    if (roundedProgress === 100) {
      this.setLoadingText('로딩이 완료되었습니다.');
      
      // 잠시 후 진행률 표시 숨기기
      setTimeout(() => {
        if (this.options.loadingVisible !== false) {
          // loading-wrapper 내부 또는 loading-container 내부에서 찾기
          const progressContainer = 
            this.container.querySelector('.loading-wrapper .progress-container') || 
            this.container.querySelector('.progress-container');
            
          if (progressContainer) {
            progressContainer.style.opacity = '0';
            progressContainer.style.transition = 'opacity 0.5s';
          }
        }
      }, 1000);
    }
  }

  /**
   * 로딩 요소를 표시하는 메서드
   * 로딩 요소를 화면에 보이게 하고 접근성 속성을 설정합니다.
   */
  show() {
    if (this.loadingElement) {
      // 로딩 요소를 화면에 표시합니다.
      this.loadingElement.style.display = this.originalDisplay;
      
      // 접근성을 위해 aria-hidden 속성을 false로 설정합니다.
      // 이렇게 하면 스크린 리더가 이 요소를 인식할 수 있습니다.
      this.loadingElement.setAttribute('aria-hidden', 'false');
    }
    this.container.style.display = 'flex';
    
    // 옵션 적용
    this.applyOptions();
  }

  /**
   * 로딩 요소를 숨기는 메서드
   * 로딩 요소를 화면에서 숨기고 접근성 속성을 설정합니다.
   */
  hide() {
    if (this.loadingElement) {
      // 로딩 요소를 화면에서 숨깁니다.
      this.loadingElement.style.display = 'none';
      
      // 접근성을 위해 aria-hidden 속성을 true로 설정합니다.
      // 이렇게 하면 스크린 리더가 이 요소를 무시합니다.
      this.loadingElement.setAttribute('aria-hidden', 'true');

      // 로딩 완료 메시지 설정
      this.setLoadingText('로딩이 완료되었습니다.');
      
      // 완료 메시지를 읽은 후 텍스트 요소도 숨김 처리
      if (this.loadingText) {
        setTimeout(() => {
          this.loadingText.style.display = 'none';
        }, 1000); // 스크린리더가 완료 메시지를 읽을 수 있도록 1초 대기
      }
    }
    
    // 진행률 표시 요소가 있으면 함께 숨김
    // loading-wrapper 내부 또는 loading-container 내부에서 찾기
    const progressContainer = 
      this.container.querySelector('.loading-wrapper .progress-container') || 
      this.container.querySelector('.progress-container');
    
    if (progressContainer) {
      progressContainer.style.display = 'none';
    }
    
    // Performance API 추적 중지
    if (this.animationId) {
      cancelAnimationFrame(this.animationId);
    }
    
    this.container.style.display = 'none';
  }

  /**
   * 로딩 텍스트를 변경하는 메서드
   * 스크린 리더를 위한 텍스트 내용을 업데이트합니다.
   * @param {string} text - 설정할 새로운 로딩 텍스트
   */
  setLoadingText(text) {
    // loadingText 요소가 존재하는 경우에만 텍스트를 변경합니다.
    if (this.loadingText) {
      // 텍스트 내용을 업데이트합니다.
      this.loadingText.textContent = text;
    }
  }

  /**
   * 옵션을 적용합니다.
   */
  applyOptions() {
    // 배경색 적용
    if (this.options.backgroundColor) {
      const loadingContainer = this.container.querySelector('.loading-container');
      if (loadingContainer) {
        loadingContainer.style.backgroundColor = this.options.backgroundColor;
      } else {
        this.container.style.backgroundColor = this.options.backgroundColor;
      }
    }
    
    // 요소 색상 적용
    if (this.options.elementColor) {
      if (this.container.querySelector('.spinner')) {
        const spinner = this.container.querySelector('.spinner');
        spinner.style.borderColor = `${this.options.elementColor}33`; // 약간 투명한 버전
        spinner.style.borderTopColor = this.options.elementColor;
      }
      
      if (this.container.querySelector('.dot')) {
        const dots = this.container.querySelectorAll('.dot');
        dots.forEach(dot => {
          dot.style.backgroundColor = this.options.elementColor;
        });
      }
      
      if (this.container.querySelector('.linear-activity-line')) {
        this.container.querySelector('.linear-activity-line').style.backgroundColor = this.options.elementColor;
      }
      
      if (this.container.querySelector('.wave-bar')) {
        const bars = this.container.querySelectorAll('.wave-bar');
        bars.forEach(bar => {
          bar.style.backgroundColor = this.options.elementColor;
        });
      }
      
      if (this.container.querySelector('.pulse-loading')) {
        this.container.querySelector('.pulse-loading').style.backgroundColor = this.options.elementColor;
      }
      
      // 진행률 텍스트에 색상 적용
      if (this.progressText) {
        this.progressText.style.color = this.options.elementColor;
      }
    }
    
    // 애니메이션 속도 적용 (개선된 방법)
    if (this.options.animationSpeed !== 1) {
      // 각 요소별 기본 애니메이션 시간(초)
      const defaultDurations = {
        '.spinner': 1,
        '.dot': 1.5,
        '.linear-activity-line': 2,
        '.wave-bar': 1.2,
        '.pulse-loading': 1.5
      };
      
      // 각 선택자별로 애니메이션 속도 적용
      Object.entries(defaultDurations).forEach(([selector, defaultDuration]) => {
        const elements = this.container.querySelectorAll(selector);
        const newDuration = `${defaultDuration / this.options.animationSpeed}s`;
        
        elements.forEach(el => {
          el.style.animationDuration = newDuration;
        });
      });
      
      // wave-bar의 경우 animation-delay도 조정
      if (this.container.querySelectorAll('.wave-bar').length > 0) {
        const delayMultiplier = 1 / this.options.animationSpeed;
        const bars = this.container.querySelectorAll('.wave-bar');
        const defaultDelays = [-1.2, -1.1, -1.0, -0.9, -0.8];
        
        bars.forEach((bar, index) => {
          if (index < defaultDelays.length) {
            bar.style.animationDelay = `${defaultDelays[index] * delayMultiplier}s`;
          }
        });
      }
      
      // dot의 경우 animation-delay도 조정
      if (this.container.querySelectorAll('.dot').length > 0) {
        const delayMultiplier = 1 / this.options.animationSpeed;
        const dots = this.container.querySelectorAll('.dot');
        const defaultDelays = [0, 0.3, 0.6];
        
        dots.forEach((dot, index) => {
          if (index < defaultDelays.length) {
            dot.style.animationDelay = `${defaultDelays[index] * delayMultiplier}s`;
          }
        });
      }
    }
  }
}