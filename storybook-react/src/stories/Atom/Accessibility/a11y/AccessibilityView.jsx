import React, { useState, useEffect } from 'react';
import './Accessibility-report.css';

/**
 * Accessibility/variant/Accessibility 컴포넌트의 접근성 검사 결과를 표시하는 컴포넌트
 */
const AccessibilityView = () => {
  const [results, setResults] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // 컴포넌트 마운트 시 Accessibility-data.json 파일을 동적으로 가져옵니다
  useEffect(() => {
    const fetchData = async () => {
      try {
        // 접근성 검사 결과 파일을 가져옵니다
        // React에서는 동적 import를 사용하여 JSON 파일을 가져올 수 있습니다
        const data = await import('./Accessibility-data.json')
          .then(module => module.default || module)
          .catch(err => {
            console.error('접근성 데이터를 가져오는데 실패했습니다:', err);
            throw new Error('접근성 검사 결과를 찾을 수 없습니다. npm run a11y 명령을 실행해 주세요.');
          });
        
        setResults(data);
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  // 로딩 중일 때
  if (loading) {
    return <div className="a11y-report">데이터를 불러오는 중...</div>;
  }

  // 오류가 발생했을 때
  if (error) {
    return (
      <div className="a11y-report">
        <h1>접근성 검사 결과 불러오기 실패</h1>
        <p className="a11y-timestamp">오류 발생</p>
        <div className="a11y-summary" style={{ color: '#c62828' }}>
          <p>
            {error}
          </p>
          <pre className="a11y-code">npm run a11y Accessibility/variant/Accessibility</pre>
          <p>명령어를 실행하여 접근성 검사를 먼저 진행해 주세요.</p>
        </div>
      </div>
    );
  }

  // 결과가 없을 때
  if (!results) {
    return (
      <div className="a11y-report">
        <h1>접근성 검사 결과 없음</h1>
        <p className="a11y-timestamp">데이터 없음</p>
        <div className="a11y-summary" style={{ color: '#c62828' }}>
          <p>
            접근성 검사 결과 데이터를 찾을 수 없습니다. 다음 명령어를 실행하여 검사를 진행하세요:
          </p>
          <pre className="a11y-code">npm run a11y Accessibility/variant/Accessibility</pre>
        </div>
      </div>
    );
  }

  // 결과 표시
  const { passes = [], violations = [], incomplete = [], timestamp = new Date().toLocaleString() } = results || {};

  return (
    <div className="a11y-report">
      <h1>Accessibility/variant/Accessibility 컴포넌트 접근성 검사 결과</h1>
      <p className="a11y-timestamp">검사 일시: {timestamp}</p>
      
      <h2>요약</h2>
      <div className="a11y-summary">
        <div className={passes.length > 0 ? "a11y-pass" : ""}>
          <strong>통과한 항목:</strong> {passes.length}개
        </div>
        <div className={violations.length > 0 ? "a11y-fail" : ""}>
          <strong>위반 항목:</strong> {violations.length}개
        </div>
        <div>
          <strong>검토 필요 항목:</strong> {incomplete.length}개
        </div>
      </div>

      {violations.length > 0 && (
        <>
          <h2>위반 항목</h2>
          <div className="a11y-violations">
            {violations.map((violation, index) => (
              <div className="a11y-violation" key={index}>
                <h3>{index + 1}. {violation.id || '알 수 없음'}</h3>
                <div className="a11y-violation-details">
                  <p><strong>영향도:</strong> {violation.impact || '정보 없음'}</p>
                  <p><strong>설명:</strong> {violation.description || violation.help || '정보 없음'}</p>
                  {violation.helpUrl && (
                    <p><strong>도움말:</strong> <a href={violation.helpUrl} target="_blank" rel="noopener noreferrer">자세히 보기</a></p>
                  )}
                </div>
                {violation.nodes && violation.nodes.length > 0 && (
                  <div className="a11y-violation-nodes">
                    <h4>문제 요소</h4>
                    {violation.nodes.map((node, nodeIndex) => (
                      <div className="a11y-violation-node" key={"node-" + nodeIndex}>
                        <h5>요소 {nodeIndex + 1}</h5>
                        {node.html && (
                          <pre className="a11y-code">{node.html}</pre>
                        )}
                        <p><strong>해결 방법:</strong> {node.failureSummary || '정보 없음'}</p>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
        </>
      )}

      

      {incomplete.length > 0 && (
        <>
          <h2>검토 필요 항목</h2>
          <div className="a11y-incomplete">
            {incomplete.map((item, index) => (
              <span key={index}>
                <strong>{item.id || '알 수 없음'}:</strong> {item.description || item.help || '정보 없음'}
              </span>
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export default AccessibilityView;