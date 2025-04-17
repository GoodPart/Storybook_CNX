import React, { useState, useRef } from 'react';
import './accessibility.css';

export interface AccessibilityProps {
  /**
   * 컴포넌트의 제목
   */
  title: string;
  /**
   * 접근성 레벨 (A, AA, AAA)
   */
  level?: 'A' | 'AA' | 'AAA';
  /**
   * 접근성 가이드라인에 대한 설명
   */
  description?: string;
  /**
   * 폼이 제출되었을 때 호출될 함수
   */
  onSubmit?: (data: { name: string; email: string; feedback: string }) => void;
  /**
   * 접근성 위반 여부 (Default 스토리에서만 사용)
   */
  violateAccessibility?: boolean;
}

/**
 * 접근성 검사를 위한 컴포넌트
 * 다양한 접근성 이슈를 테스트할 수 있는 요소들을 포함합니다.
 */
export const Accessibility = ({
  title = '접근성 검사 컴포넌트',
  level = 'AA',
  description = 'WCAG 가이드라인을 준수하는 접근성 검사 컴포넌트입니다.',
  onSubmit,
  violateAccessibility = false,
}: AccessibilityProps) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [feedback, setFeedback] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [isToggleOpen, setIsToggleOpen] = useState(false);
  
  // ARIA 버튼 참조
  const ariaButtonRef = useRef<HTMLDivElement>(null);

  // 토글 기능
  const handleToggle = () => {
    setIsToggleOpen(!isToggleOpen);
  };

  // 폼 제출 처리
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    if (onSubmit) {
      onSubmit({ name, email, feedback });
    }
  };
  
  // ARIA 버튼 클릭 처리
  const handleAriaButtonClick = () => {
    if (ariaButtonRef.current) {
      const originalBg = ariaButtonRef.current.style.backgroundColor;
      ariaButtonRef.current.style.backgroundColor = '#1565C0';
      
      setTimeout(() => {
        if (ariaButtonRef.current) {
          ariaButtonRef.current.style.backgroundColor = originalBg;
        }
      }, 300);
    }
  };
  
  // ARIA 버튼 키보드 접근성
  const handleAriaButtonKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      handleAriaButtonClick();
    }
  };

  return (
    <div className="accessibility-component">
      <header className="accessibility-header">
        {violateAccessibility ? (
          <h3>{title}</h3>
        ) : (
          <h1>{title}</h1>
        )}
        <span className="accessibility-level">레벨: {level}</span>
      </header>

      <section className="accessibility-description">
        {violateAccessibility ? (
          <>
            <h4>설명</h4>
            <p style={{ color: '#999', backgroundColor: '#eee' }}>{description}</p>
          </>
        ) : (
          <>
            <h2>설명</h2>
            <p>{description}</p>
          </>
        )}
      </section>

      {/* 1. 이미지 alt 속성 테스트 */}
      <section className="card">
        <h2>이미지 접근성 테스트</h2>
        <div className="image-container">
          {violateAccessibility ? (
            // 접근성 위반: alt 속성 누락
            <img src="https://picsum.photos/300/200?random=1" />
          ) : (
            <img 
              src="https://picsum.photos/300/200?random=1" 
              alt="적절한 대체 텍스트가 있는 첫 번째 이미지" 
            />
          )}
          <img 
            src="https://picsum.photos/300/200?random=2" 
            alt="적절한 대체 텍스트가 있는 두 번째 이미지" 
          />
        </div>
      </section>

      {/* 2. 색상 대비 테스트 */}
      <section className="card">
        <h2>색상 대비 테스트</h2>
        {violateAccessibility ? (
          // 접근성 위반: 낮은 색상 대비
          <p className="low-contrast">이 텍스트는 배경과 색상 대비가 충분하지 않습니다.</p>
        ) : (
          <p className="high-contrast">이 텍스트는 적절한 색상 대비를 가집니다.</p>
        )}
      </section>

      {/* 3. 링크와 버튼 테스트 */}
      <section className="card">
        <h2>링크와 버튼 테스트</h2>
        <div className="button-container">
          {violateAccessibility ? (
            // 접근성 위반: 빈 링크와 버튼
            <>
              <a href="#" className="empty-link"></a>
              <button className="empty-button"></button>
            </>
          ) : (
            <>
              <a href="#" className="valid-link">적절한 텍스트가 있는 링크</a>
              <button className="valid-button">적절한 텍스트가 있는 버튼</button>
            </>
          )}
          
          {/* ARIA 버튼 - 키보드 접근성 테스트 */}
          <div 
            ref={ariaButtonRef}
            role="button" 
            tabIndex={0} 
            className="aria-button"
            onClick={handleAriaButtonClick}
            onKeyDown={handleAriaButtonKeyDown}
          >
            ARIA 역할을 가진 버튼
          </div>
        </div>
      </section>

      {/* 4. 헤딩 레벨 테스트 */}
      <section className="card">
        <h2>헤딩 구조 테스트</h2>
        <div className="headings">
          <h2>두 번째 수준 헤딩</h2>
          {violateAccessibility ? (
            // 접근성 위반: 헤딩 레벨 건너뛰기
            <h5>다섯 번째 수준 헤딩 (h3, h4를 건너뜀)</h5>
          ) : (
            <>
              <h3>세 번째 수준 헤딩</h3>
              <h4>네 번째 수준 헤딩</h4>
            </>
          )}
        </div>
      </section>

      {/* 5. 폼 접근성 테스트 */}
      <section className="card">
        <h2>폼 접근성 테스트</h2>
        <form className="test-form" onSubmit={handleSubmit}>
          <div className="form-group">
            {violateAccessibility ? (
              // 접근성 위반: 레이블 없는 입력 필드
              <input 
                type="text" 
                placeholder="이름"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
            ) : (
              <>
                <label htmlFor="name">이름:</label>
                <input 
                  type="text" 
                  id="name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                />
              </>
            )}
          </div>
          
          <div className="form-group">
            {violateAccessibility ? (
              // 접근성 위반: 레이블이 연결되지 않은 입력 필드
              <>
                <label>이메일:</label>
                <input 
                  type="email" 
                  placeholder="이메일 주소"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </>
            ) : (
              <>
                <label htmlFor="email">이메일:</label>
                <input 
                  type="email" 
                  id="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </>
            )}
          </div>
          
          <div className="form-group">
            <label htmlFor="feedback">피드백:</label>
            <textarea 
              id="feedback"
              value={feedback}
              onChange={(e) => setFeedback(e.target.value)}
              rows={4}
            />
          </div>
          
          <div className="form-group">
            {violateAccessibility ? (
              // 접근성 위반: 레이블이 연결되지 않은 체크박스
              <>
                <input type="checkbox" required />
                <span>이용약관에 동의합니다</span>
              </>
            ) : (
              <>
                <input type="checkbox" id="terms" required />
                <label htmlFor="terms">이용약관에 동의합니다</label>
              </>
            )}
          </div>
          
          <button type="submit" className="submit-button">제출하기</button>
        </form>
        
        {submitted && (
          <div className="success-message" role="alert">
            폼이 성공적으로 제출되었습니다!
          </div>
        )}
      </section>

      {/* 6. ARIA 역할 테스트 */}
      <section className="card">
        <h2>ARIA 역할 테스트</h2>
        {violateAccessibility ? (
          // 접근성 위반: 잘못된 ARIA 역할
          <div role="invalid-role">잘못된 ARIA 역할을 가진 요소</div>
        ) : (
          <div role="region" aria-label="정보 영역">올바른 ARIA 역할을 가진 요소</div>
        )}
      </section>

      {/* 7. 토글 컴포넌트 테스트 */}
      <section className="card">
        <h2>토글 컴포넌트 테스트</h2>
        <div className="toggle-container">
          <button 
            aria-expanded={isToggleOpen}
            aria-controls="toggle-content" 
            className="toggle-button"
            onClick={handleToggle}
          >
            {isToggleOpen ? '내용 접기' : '내용 펼치기'}
          </button>
          <div 
            id="toggle-content" 
            className={`toggle-content ${isToggleOpen ? 'active' : ''}`}
          >
            <p>이 내용은 토글 버튼으로 표시하거나 숨길 수 있습니다.</p>
          </div>
        </div>
      </section>

      {/* 8. 키보드 접근성 테스트 */}
      <section className="card">
        <h2>키보드 접근성 테스트</h2>
        <div className="keyboard-a11y-container">
          <button type="button" className="a11y-button">
            키보드로 접근 가능한 버튼
          </button>
          
          {violateAccessibility ? (
            // 접근성 위반: 키보드로 접근할 수 없는 요소
            <div 
              className="keyboard-trap"
              onClick={() => alert('클릭됨')}
            >
              키보드로 접근할 수 없는 요소
            </div>
          ) : (
            <div 
              className="keyboard-accessible"
              role="button"
              tabIndex={0}
              onClick={() => alert('클릭됨')}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  e.preventDefault();
                  alert('키보드로 활성화됨');
                }
              }}
            >
              키보드로 접근 가능한 요소
            </div>
          )}
        </div>
      </section>

      <footer className="accessibility-footer">
        {violateAccessibility ? (
          // 접근성 위반: 빈 링크 텍스트
          <p>
            <a href="https://www.w3.org/WAI/standards-guidelines/wcag/" target="_blank">여기를 클릭하세요</a>
          </p>
        ) : (
          <>
            <p>이 컴포넌트는 접근성 검사를 위한 예제입니다.</p>
            <p>
              <a href="https://www.w3.org/WAI/standards-guidelines/wcag/" target="_blank" rel="noopener noreferrer">
                WCAG 가이드라인 자세히 알아보기
              </a>
            </p>
          </>
        )}
      </footer>
    </div>
  );
}; 