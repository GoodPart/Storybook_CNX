import { LoadingBar } from './loading-bar.js';
import loadingBarSpinner from './loading-bar-spinner.html?raw';
import loadingBarDot from './loading-bar-dot.html?raw';
import loadingBarLinear from './loading-bar-linear.html?raw';
import loadingBarWave from './loading-bar-wave.html?raw';
import loadingBarPulse from './loading-bar-pulse.html?raw';
import loadingBarCss from './loading-bar.css?raw';
import spinnerCss from './loading-bar-spinner.css?raw';
import dotCss from './loading-bar-dot.css?raw';
import linearCss from './loading-bar-linear.css?raw';
import waveCss from './loading-bar-wave.css?raw';
import pulseCss from './loading-bar-pulse.css?raw';
import './loading-bar.scss';
import './loading-bar-spinner.scss';
import './loading-bar-dot.scss';
import './loading-bar-linear.scss';
import './loading-bar-wave.scss';
import './loading-bar-pulse.scss';

// 다크모드 토글 함수
const toggleDarkMode = (isDark) => {
  if (typeof document !== 'undefined') {
    document.documentElement.setAttribute('data-theme', isDark ? 'dark' : 'light');
    
    // 다크모드 미디어 쿼리 시뮬레이션을 위한 스타일 요소 추가
    let darkModeStyle = document.getElementById('dark-mode-simulation');
    if (!darkModeStyle) {
      darkModeStyle = document.createElement('style');
      darkModeStyle.id = 'dark-mode-simulation';
      document.head.appendChild(darkModeStyle);
    }
    
    // 다크모드 미디어 쿼리 시뮬레이션
    darkModeStyle.textContent = isDark 
      ? '@media (prefers-color-scheme: dark) { :root { color-scheme: dark; } }' 
      : '';
  }
};

// 공통 argTypes 정의
const commonArgTypes = {
  backgroundColor: {
    control: { type: 'color' },
    description: '로딩바 배경색',
    defaultValue: 'rgba(255, 255, 255, 0.9)',
    table: {
      category: '스타일'
    }
  },
  elementColor: {
    control: { type: 'color' },
    description: '로딩 요소의 색상',
    table: {
      category: '스타일'
    }
  },
  animationSpeed: {
    control: { type: 'range', min: 0.1, max: 3, step: 0.1 },
    description: '애니메이션 속도 (1 = 기본 속도)',
    defaultValue: 1,
    table: {
      category: '애니메이션'
    }
  },
  percentage: {
    control: { type: 'boolean' },
    description: '로딩 진행률 표시 여부',
    defaultValue: false,
    table: {
      category: '로딩'
    }
  },
  darkMode: {
    control: { type: 'boolean' },
    description: '다크모드 사용 여부',
    defaultValue: false,
    table: {
      category: '스타일'
    }
  }
};

//Docs 설정영역
export default {
  title: 'Atom/LoadingBar/variant',
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component: '접근성을 고려한 로딩바 컴포넌트입니다.'
      },
      source: {
        code: `
          // 이미지 로딩 진행률을 퍼센티지로 표시하는 핵심 코드
          
          // 1. 로딩바 초기화
          const container = document.querySelector('.loading-container');
          const loadingBar = new LoadingBar(container, {
            percentage: true
          });
          
          // 2. 이미지 로딩 진행률 추적
          const images = document.querySelectorAll('img');
          let loadedCount = 0;
          const totalCount = images.length;
          
          // 3. 이미지 로드 이벤트 리스너 등록
          images.forEach(img => {
            // 이미 로드된 이미지 처리
            if (img.complete) {
              loadedCount++;
              updateProgress();
              return;
            }
            
            // 로드 이벤트 리스너
            img.addEventListener('load', () => {
              loadedCount++;
              updateProgress();
            });
            
            // 오류 이벤트 리스너
            img.addEventListener('error', () => {
              loadedCount++;
              updateProgress();
            });
          });
          
          // 4. 진행률 계산 및 업데이트
          function updateProgress() {
            const progress = Math.round((loadedCount / totalCount) * 100);
            loadingBar.updateProgress(progress);
            
            // 모든 이미지 로드 완료 시
            if (progress >= 100) {
              setTimeout(() => {
                loadingBar.hide();
              }, 1000);
            }
          }
        `
      }
    },
  }
};

// 스토리 정의
export const CircleSpinner = {
  render: (args) => {
    // 다크모드 토글 적용
    toggleDarkMode(args.darkMode);
    
    const container = document.createElement('div');
    container.innerHTML = loadingBarSpinner;
    
    const loadingBarElement = container;
    new LoadingBar(loadingBarElement, {
      backgroundColor: args.backgroundColor,
      elementColor: args.elementColor,
      animationSpeed: args.animationSpeed,
      percentage: args.percentage,
      loadingVisible: args.loadingVisible
    });
    
    return container;
  },
  argTypes: {
    ...commonArgTypes,
    elementColor: {
      control: { type: 'color' },
      description: '스피너 테두리 색상',
      defaultValue: '#3498db',
      table: {
        category: '스타일'
      }
    }
  },
  parameters: {
    docs: {
      description: {
        story: '원형으로 회전하는 기본 스피너 로딩 애니메이션입니다.'
      },
      story: {
        inline: true
      },
      source: {
        code: `
          // HTML
          ${loadingBarSpinner}
          
          // 이미지 로딩 진행률을 퍼센티지로 표시하는 코드
          // 1. 로딩바 초기화
          const container = document.querySelector('.loading-container');
          const loadingBar = new LoadingBar(container, {
            percentage: true
          });
          
          // 2. 이미지 로딩 진행률 추적
          const images = document.querySelectorAll('img');
          let loadedCount = 0;
          const totalCount = images.length || 1;
          
          // 3. 이미지 로딩 상태 확인 및 이벤트 등록
          images.forEach(img => {
            if (img.complete) {
              loadedCount++;
            } else {
              img.addEventListener('load', () => {
                loadedCount++;
                updateProgress();
              });
              img.addEventListener('error', () => {
                loadedCount++;
                updateProgress();
              });
            }
          });
          
          // 4. 진행률 업데이트 함수
          function updateProgress() {
            const progress = Math.round((loadedCount / totalCount) * 100);
            loadingBar.updateProgress(progress);
            
            if (progress >= 100) {
              setTimeout(() => loadingBar.hide(), 1000);
            }
          }
          
          // 5. 초기 진행률 업데이트
          updateProgress();
          
          // CSS
          ${spinnerCss}
        `
      }
    }
  }
};

export const DotLoading = {
  render: (args) => {
    // 다크모드 토글 적용
    toggleDarkMode(args.darkMode);
    
    const container = document.createElement('div');
    container.innerHTML = loadingBarDot;
    
    const loadingBarElement = container;
    new LoadingBar(loadingBarElement, {
      backgroundColor: args.backgroundColor,
      elementColor: args.elementColor,
      animationSpeed: args.animationSpeed,
      percentage: args.percentage,
      loadingVisible: args.loadingVisible
    });
    
    return container;
  },
  argTypes: {
    ...commonArgTypes,
    elementColor: {
      control: { type: 'color' },
      description: '점 색상',
      defaultValue: '#1a1a1a',
      table: {
        category: '스타일'
      }
    }
  },
  parameters: {
    docs: {
      description: {
        story: '점 3개가 순차적으로 움직이는 로딩 애니메이션입니다.'
      },
      story: {
        inline: true
      },
      source: {
        code: `
          // HTML
          ${loadingBarDot}
          
          // 이미지 로딩 진행률을 퍼센티지로 표시하는 코드
          // 1. 로딩바 초기화
          const container = document.querySelector('.loading-container');
          const loadingBar = new LoadingBar(container, {
            percentage: true
          });
          
          // 2. 이미지 로딩 진행률 추적
          const images = document.querySelectorAll('img');
          let loadedCount = 0;
          const totalCount = images.length || 1;
          
          images.forEach(img => {
            if (img.complete) {
              loadedCount++;
            } else {
              img.addEventListener('load', () => {
                loadedCount++;
                updateProgress();
              });
              img.addEventListener('error', () => {
                loadedCount++;
                updateProgress();
              });
            }
          });
          
          function updateProgress() {
            const progress = Math.round((loadedCount / totalCount) * 100);
            loadingBar.updateProgress(progress);
            
            if (progress >= 100) {
              setTimeout(() => loadingBar.hide(), 1000);
            }
          }
          
          updateProgress();
          
          // CSS
          ${dotCss}
        `
      }
    }
  }
};

export const LinearProgress = {
  render: (args) => {
    // 다크모드 토글 적용
    toggleDarkMode(args.darkMode);
    
    const container = document.createElement('div');
    container.className = 'view-test';
    container.innerHTML = loadingBarLinear;
    
    const loadingBarElement = container;
    new LoadingBar(loadingBarElement, {
      backgroundColor: args.backgroundColor,
      elementColor: args.elementColor,
      animationSpeed: args.animationSpeed,
      percentage: args.percentage,
      loadingVisible: args.loadingVisible
    });
    
    return container;
  },
  argTypes: {
    ...commonArgTypes,
    elementColor: {
      control: { type: 'color' },
      description: '프로그레스 바 색상',
      defaultValue: '#0d47a1',
      table: {
        category: '스타일'
      }
    }
  },
  parameters: {
    docs: {
      description: {
        story: '가로 방향으로 진행되는 선형 로딩 애니메이션입니다.'
      },
      story: {
        inline: true
      },
      source: {
        code: `
          // HTML
          ${loadingBarLinear}
          
          // 이미지 로딩 진행률을 퍼센티지로 표시하는 코드
          // 1. 로딩바 초기화
          const container = document.querySelector('.loading-container');
          const loadingBar = new LoadingBar(container, {
            percentage: true
          });
          
          // 2. 이미지 로딩 진행률 추적
          const images = document.querySelectorAll('img');
          let loadedCount = 0;
          const totalCount = images.length || 1;
          
          images.forEach(img => {
            if (img.complete) {
              loadedCount++;
            } else {
              img.addEventListener('load', () => {
                loadedCount++;
                updateProgress();
              });
              img.addEventListener('error', () => {
                loadedCount++;
                updateProgress();
              });
            }
          });
          
          function updateProgress() {
            const progress = Math.round((loadedCount / totalCount) * 100);
            loadingBar.updateProgress(progress);
            
            if (progress >= 100) {
              setTimeout(() => loadingBar.hide(), 1000);
            }
          }
          
          updateProgress();
          
          // CSS
          ${linearCss}
        `
      }
    }
  }
};

export const WaveLoading = {
  render: (args) => {
    // 다크모드 토글 적용
    toggleDarkMode(args.darkMode);
    
    const container = document.createElement('div');
    container.innerHTML = loadingBarWave;
    
    const loadingBarElement = container;
    new LoadingBar(loadingBarElement, {
      backgroundColor: args.backgroundColor,
      elementColor: args.elementColor,
      animationSpeed: args.animationSpeed,
      percentage: args.percentage,
      loadingVisible: args.loadingVisible
    });
    
    return container;
  },
  argTypes: {
    ...commonArgTypes,
    elementColor: {
      control: { type: 'color' },
      description: '파도 막대 색상',
      defaultValue: '#2a2a8f',
      table: {
        category: '스타일'
      }
    }
  },
  parameters: {
    docs: {
      description: {
        story: '파도처럼 움직이는 막대 로딩 애니메이션입니다.'
      },
      story: {
        inline: true
      },
      source: {
        code: `
          // HTML
          ${loadingBarWave}
          
          // 이미지 로딩 진행률을 퍼센티지로 표시하는 코드
          // 1. 로딩바 초기화
          const container = document.querySelector('.loading-container');
          const loadingBar = new LoadingBar(container, {
            percentage: true
          });
          
          // 2. 이미지 로딩 진행률 추적
          const images = document.querySelectorAll('img');
          let loadedCount = 0;
          const totalCount = images.length || 1;
          
          images.forEach(img => {
            if (img.complete) {
              loadedCount++;
            } else {
              img.addEventListener('load', () => {
                loadedCount++;
                updateProgress();
              });
              img.addEventListener('error', () => {
                loadedCount++;
                updateProgress();
              });
            }
          });
          
          function updateProgress() {
            const progress = Math.round((loadedCount / totalCount) * 100);
            loadingBar.updateProgress(progress);
            
            if (progress >= 100) {
              setTimeout(() => loadingBar.hide(), 1000);
            }
          }
          
          updateProgress();
          
          // CSS
          ${waveCss}
        `
      }
    }
  }
};

export const PulseLoading = {
  render: (args) => {
    // 다크모드 토글 적용
    toggleDarkMode(args.darkMode);
    
    const container = document.createElement('div');
    container.innerHTML = loadingBarPulse;
    
    const loadingBarElement = container;
    new LoadingBar(loadingBarElement, {
      backgroundColor: args.backgroundColor,
      elementColor: args.elementColor,
      animationSpeed: args.animationSpeed,
      percentage: args.percentage,
      loadingVisible: args.loadingVisible
    });
    
    return container;
  },
  argTypes: {
    ...commonArgTypes,
    elementColor: {
      control: { type: 'color' },
      description: '펄스 원 색상',
      defaultValue: '#9c27b0',
      table: {
        category: '스타일'
      }
    }
  },
  parameters: {
    docs: {
      description: {
        story: '원이 박동하는 듯한 로딩 애니메이션입니다.'
      },
      story: {
        inline: true
      },
      source: {
        code: `
          // HTML
          ${loadingBarPulse}
          
          // 이미지 로딩 진행률을 퍼센티지로 표시하는 코드
          // 1. 로딩바 초기화
          const container = document.querySelector('.loading-container');
          const loadingBar = new LoadingBar(container, {
            percentage: true
          });
          
          // 2. 이미지 로딩 진행률 추적
          const images = document.querySelectorAll('img');
          let loadedCount = 0;
          const totalCount = images.length || 1;
          
          images.forEach(img => {
            if (img.complete) {
              loadedCount++;
            } else {
              img.addEventListener('load', () => {
                loadedCount++;
                updateProgress();
              });
              img.addEventListener('error', () => {
                loadedCount++;
                updateProgress();
              });
            }
          });
          
          function updateProgress() {
            const progress = Math.round((loadedCount / totalCount) * 100);
            loadingBar.updateProgress(progress);
            
            if (progress >= 100) {
              setTimeout(() => loadingBar.hide(), 1000);
            }
          }
          
          updateProgress();
          
          // CSS
          ${pulseCss}
        `
      }
    }
  }
};
