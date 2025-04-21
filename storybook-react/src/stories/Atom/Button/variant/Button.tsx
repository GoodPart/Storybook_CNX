import './button.css';

export interface ButtonProps {
  primary?: boolean;
  backgroundColor?: string;
  size?: 'small' | 'medium' | 'large';
  label: string;
  onClick?: () => void;
  violateAccessibility?: boolean;
}

/** Primary UI component for user interaction */
export  const Button = ({
  primary = false,
  size = 'medium',
  backgroundColor,
  label,
  violateAccessibility = false,
  ...props
}: ButtonProps) => {
  const mode = primary ? 'storybook-button--primary' : 'storybook-button--secondary';
  
  // 접근성 오류를 의도적으로 생성 (버튼에 aria-label 속성 필요)
  if (violateAccessibility) {
    return (
      <button
        type="button"
        className={['storybook-button', `storybook-button--${size}`, mode].join(' ')}
        style={{ backgroundColor: '#999', color: '#888' }} // 낮은 대비로 접근성 오류 발생
        aria-hidden="true" // 스크린 리더에서 읽히지 않도록 함 (접근성 오류)
        tabIndex={-1} // 키보드 접근성 제한 (접근성 오류)
        {...props}
      >
        {/* 빈 이미지 태그는 alt 속성 없이 접근성 오류 발생 */}
        <img src="data:image/gif;base64,R0lGODlhAQABAAAAACwAAAAAAQABAAA=" />
        <span style={{ fontSize: '10px' }}>{label}</span>
      </button>
    );
  }
  
  return (
    <button
      type="button"
      className={['storybook-button', `storybook-button--${size}`, mode].join(' ')}
      style={{ backgroundColor }}
      {...props}
    >
      {label}
    </button>
  );
};
