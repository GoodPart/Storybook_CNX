#!/usr/bin/env node

/**
 * storybook-react 환경에서 간단한 접근성 검사 스크립트
 * 사용법: node scripts/simple-a11y.js <컴포넌트_이름>
 */

import fs from "fs";
import path from "path";
import { JSDOM } from "jsdom";
import * as chalk from "chalk";
import puppeteer from "puppeteer";
import { mkdir } from "fs/promises";

// 브라우저에서 axe-core를 사용하여 접근성 검사
async function checkAccessibilityWithAxe(page) {
  try {
    // 페이지 완전히 로드될 때까지 대기
    await page.waitForFunction(() => document.readyState === "complete", {
      timeout: 5000,
    });

    // axe-core 라이브러리 삽입
    try {
      await page.addScriptTag({
        url: "https://cdnjs.cloudflare.com/ajax/libs/axe-core/4.8.4/axe.min.js",
        timeout: 10000,
      });

      // axe가 로드될 때까지 명시적으로 대기
      const axeLoaded = await waitForAxeLoad(page, 5000);

      if (!axeLoaded) {
        console.error(
          chalk.default.red("axe-core 라이브러리가 로드되지 않았습니다")
        );
        return {
          passes: [],
          violations: [],
          incomplete: [],
          inapplicable: [],
        };
      }

      // DOM이 안정화될 때까지 대기
      await waitForDOMStable(page);

      // axe 검사 실행
      const results = await page
        .evaluate(() => {
          return new Promise((resolve, reject) => {
            const timeoutId = setTimeout(() => {
              reject(new Error("axe-core 검사 실행 타임아웃"));
            }, 15000);

            axe.run(
              document.body,
              {
                runOnly: ["wcag2a", "wcag2aa", "wcag21a", "wcag21aa"],
                resultTypes: ["violations", "passes", "incomplete"],
              },
              (err, results) => {
                clearTimeout(timeoutId);
                if (err) reject(err);
                else resolve(results);
              }
            );
          });
        })
        .catch((err) => {
          console.error(
            chalk.default.yellow("axe-core 실행 중 오류:"),
            err.message
          );
          return {
            error: err.message,
            passes: [],
            violations: [],
            incomplete: [],
            inapplicable: [],
          };
        });

      return results;
    } catch (scriptError) {
      console.error(
        chalk.default.red("axe-core 스크립트 로드 실패:"),
        scriptError
      );
      return {
        passes: [],
        violations: [],
        incomplete: [],
        inapplicable: [],
      };
    }
  } catch (error) {
    console.error(
      chalk.default.red("axe-core 접근성 검사 중 오류가 발생했습니다:"),
      error
    );
    return {
      passes: [],
      violations: [],
      incomplete: [],
      inapplicable: [],
    };
  }
}

// axe가 로드될 때까지 대기
async function waitForAxeLoad(page, maxWaitTime) {
  const startTime = Date.now();
  while (Date.now() - startTime < maxWaitTime) {
    const axeLoaded = await page.evaluate(() => {
      return typeof axe !== "undefined";
    });

    if (axeLoaded) return true;
    await new Promise((resolve) => setTimeout(resolve, 100));
  }
  return false;
}

// DOM이 안정화될 때까지 대기
async function waitForDOMStable(
  page,
  checkInterval = 100,
  stabilityDuration = 300,
  maxWaitTime = 3000
) {
  let lastHTMLSnapshot = "";
  let stableStartTime = null;
  const startTime = Date.now();

  while (Date.now() - startTime < maxWaitTime) {
    const currentHTML = await page.evaluate(() => document.body.innerHTML);

    if (currentHTML === lastHTMLSnapshot) {
      if (!stableStartTime) {
        stableStartTime = Date.now();
      } else if (Date.now() - stableStartTime >= stabilityDuration) {
        return true;
      }
    } else {
      lastHTMLSnapshot = currentHTML;
      stableStartTime = null;
    }

    await new Promise((resolve) => setTimeout(resolve, checkInterval));
  }

  return true; // 타임아웃이더라도 계속 진행
}

// JSX 컴포넌트 생성 함수
function generateReportComponent(results, componentName) {
  const { passes = [], violations = [], incomplete = [] } = results || {};

  // 컴포넌트 코드 생성
  let jsxContent = `import React from 'react';
import './a11y-report.css';

/**
 * ${componentName} 컴포넌트 접근성 검사 결과를 표시하는 컴포넌트
 */
const A11yReport = () => {
  return (
    <div className="a11y-report">
      <h2>${componentName} 컴포넌트 접근성 검사 결과</h2>
      <p className="a11y-timestamp">검사 일시: ${new Date().toLocaleString()}</p>
      
      <h3>요약</h3>
      <div className="a11y-summary">
        <div className={passes.length > 0 ? "a11y-pass" : ""}>
          <strong>통과한 항목:</strong> ${passes.length}개
        </div>
        <div className={violations.length > 0 ? "a11y-fail" : ""}>
          <strong>위반 항목:</strong> ${violations.length}개
        </div>
        <div>
          <strong>검토 필요 항목:</strong> ${incomplete.length}개
        </div>
      </div>
`;

  // 위반 항목이 있는 경우
  if (violations.length > 0) {
    jsxContent += `
      <h2>위반 항목</h2>
      <div className="a11y-violations">
        ${violations
          .map(
            (violation, index) => `
        <div className="a11y-violation" key="${index}">
          <h3>${index + 1}. ${violation.id || "알 수 없음"}</h3>
          <div className="a11y-violation-details">
            <p><strong>영향도:</strong> ${violation.impact || "정보 없음"}</p>
            <p><strong>설명:</strong> ${
              violation.description || violation.help || "정보 없음"
            }</p>
            <p><strong>도움말:</strong> <a href="${
              violation.helpUrl || "#"
            }" target="_blank" rel="noopener noreferrer">자세히 보기</a></p>
          </div>
          ${
            violation.nodes && violation.nodes.length > 0
              ? `
          <div className="a11y-violation-nodes">
            <h4>문제 요소</h4>
            ${violation.nodes
              .map(
                (node, nodeIndex) => `
            <div className="a11y-violation-node" key="node-${nodeIndex}">
              <h5>요소 ${nodeIndex + 1}</h5>
              <pre className="a11y-code">${node.html || "코드 없음"}</pre>
              <p><strong>해결 방법:</strong> ${
                node.failureSummary || "정보 없음"
              }</p>
            </div>`
              )
              .join("")}
          </div>`
              : ""
          }
        </div>`
          )
          .join("")}
      </div>
    `;
  }

  // 검토 필요 항목
  if (incomplete.length > 0) {
    jsxContent += `
      <h2>검토 필요 항목</h2>
      <ul className="a11y-incomplete">
        ${incomplete
          .map(
            (item, index) => `
        <span key="${index}">
          <strong>${item.id || "알 수 없음"}:</strong> ${
              item.description || item.help || "정보 없음"
            }
        </span>`
          )
          .join("")}
      </ul>
    `;
  }

  jsxContent += `
    </div>
  );
};

export default A11yReport;
`;

  return jsxContent;
}

// 접근성 보고서를 텍스트로 변환하는 함수 (순수 마크다운 형식 - HTML 태그 없음)
function generateSimpleTextReport(results, componentName) {
  // axe-core 결과 객체에서 필요한 데이터 추출
  const {
    passes = [],
    violations = [],
    incomplete = [],
    inapplicable = [],
  } = results || {};

  let reportText = `# ${componentName} 접근성 검사 결과\n\n`;
  reportText += `**검사 일시**: ${new Date().toLocaleString()}\n\n`;

  // 요약 정보
  reportText += `## 요약\n\n`;
  reportText += `- 통과한 항목: ${passes.length}개\n`;
  reportText += `- 위반 항목: ${violations.length}개\n`;
  reportText += `- 검토 필요 항목: ${incomplete.length}개\n`;
  reportText += `- 적용 불가 항목: ${inapplicable.length}개\n\n`;

  // 위반 항목
  if (violations.length > 0) {
    reportText += `## 위반 항목\n\n`;

    violations.forEach((violation, index) => {
      reportText += `### ${index + 1}. ${violation.id}\n\n`;
      reportText += `- **영향도**: ${violation.impact || "정보 없음"}\n`;
      reportText += `- **설명**: ${
        violation.description || violation.help || "정보 없음"
      }\n`;
      reportText += `- **도움말**: [자세히 보기](${
        violation.helpUrl || "#"
      })\n\n`;

      if (violation.nodes && violation.nodes.length > 0) {
        reportText += `#### 문제 요소\n\n`;

        violation.nodes.forEach((node, nodeIndex) => {
          const html = node.html || "코드 없음";

          reportText += `**요소 ${nodeIndex + 1}**:\n\n`;
          reportText += "```\n" + html + "\n```\n\n";
          reportText += `- **해결 방법**: ${
            node.failureSummary || "정보 없음"
          }\n\n`;
        });
      }
    });
  }

  // 통과 항목
  if (passes.length > 0) {
    reportText += `## 통과한 항목\n\n`;

    passes.forEach((pass, i) => {
      reportText += `- **${pass.id || "알 수 없음"}**: ${
        pass.description || pass.help || "정보 없음"
      }\n`;
    });
    reportText += "\n";
  }

  // 검토 필요 항목
  if (incomplete.length > 0) {
    reportText += `## 검토 필요 항목\n\n`;

    incomplete.forEach((item, i) => {
      reportText += `- **${item.id || "알 수 없음"}**: ${
        item.description || item.help || "정보 없음"
      }\n`;
    });
    reportText += "\n";
  }

  return reportText;
}

// 접근성 보고서 파일 저장
async function saveA11yReport(
  componentName,
  jsxContent,
  cssContent,
  reportText,
  axeResults
) {
  try {
    // 컴포넌트 경로 분석 및 정리 - 백슬래시와 공백 제거
    const cleanComponentName = componentName.replace(/[\\\/\s]+$/, "").trim();
    const pathParts = cleanComponentName.split("/").map((part) => part.trim());

    // 경로 구조 분석: Button/variant/Button 형식 예상
    if (pathParts.length < 2) {
      throw new Error('잘못된 컴포넌트 경로입니다. "컴포넌트/variant/컴포넌트이름" 형식이 필요합니다.');
    }

    // 컴포넌트 이름 (첫 번째 부분, 예: Button)
    const componentName1stPart = pathParts[0];
    
    // 실제 컴포넌트 이름 (경로의 마지막 부분)
    const actualComponentName = pathParts[pathParts.length - 1];

    // 기본 경로 설정
    const storiesPath = path.join(process.cwd(), "src", "stories");
    
    // 실제 컴포넌트 부모 폴더 찾기 (Atom, Molecule, Pages 등)
    // 가능한 부모 폴더 목록
    const possibleParentFolders = ["Atom", "Molecule", "Organism", "Pages", "Template"];
    
    let componentParentFolder = null;
    for (const parent of possibleParentFolders) {
      const possiblePath = path.join(storiesPath, parent, componentName1stPart);
      if (fs.existsSync(possiblePath)) {
        componentParentFolder = parent;
        break;
      }
    }
    
    // 부모 폴더를 찾지 못한 경우 기본값으로 Molecule 사용
    if (!componentParentFolder) {
      console.log(chalk.default.yellow(`컴포넌트 부모 폴더를 찾을 수 없습니다. 기본값 'Molecule'을 사용합니다.`));
      componentParentFolder = "Molecule";
    }
    
    // a11y 폴더 경로: src/stories/[Atom|Molecule|...]/Button/a11y
    const componentTypePath = path.join(storiesPath, componentParentFolder);
    const componentPath = path.join(componentTypePath, componentName1stPart);
    const a11yFolderPath = path.join(componentPath, "a11y"); // 소문자로 폴더명 사용

    console.log(chalk.default.yellow(`a11y 폴더 경로: ${a11yFolderPath}`));
    console.log(chalk.default.yellow(`(${componentParentFolder}/${componentName1stPart} 폴더 내에 생성)`));

    // 폴더 생성 (재귀적으로)
    await mkdir(a11yFolderPath, { recursive: true });

    // 컴포넌트명을 파일명에 포함시키기
    // CSS 파일 저장
    const cssFilePath = path.join(
      a11yFolderPath,
      `${actualComponentName}-report.css`
    );
    fs.writeFileSync(cssFilePath, cssContent);

    // 백업용 마크다운 파일 저장
    const mdFilePath = path.join(
      a11yFolderPath,
      `${actualComponentName}-report.md`
    );
    fs.writeFileSync(mdFilePath, reportText);

    // JSON 데이터 저장 - 컴포넌트명-data.json 파일로 저장
    const jsonFilePath = path.join(
      a11yFolderPath,
      `${actualComponentName}-data.json`
    );
    const jsonData = JSON.stringify(
      {
        ...axeResults,
        timestamp: new Date().toLocaleString(),
      },
      null,
      2
    );
    fs.writeFileSync(jsonFilePath, jsonData);

    // a11y 컴포넌트 생성 - 자동 생성되는 파일(동적 로드)
    const viewComponentSource = path.join(
      a11yFolderPath,
      `${actualComponentName}View.jsx`
    );
    const viewComponentContent = `import React, { useState, useEffect } from 'react';
import './${actualComponentName}-report.css';

/**
 * ${componentName} 컴포넌트의 접근성 검사 결과를 표시하는 컴포넌트
 */
const ${actualComponentName}View = () => {
  const [results, setResults] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // 컴포넌트 마운트 시 ${actualComponentName}-data.json 파일을 동적으로 가져옵니다
  useEffect(() => {
    const fetchData = async () => {
      try {
        // 접근성 검사 결과 파일을 가져옵니다
        // React에서는 동적 import를 사용하여 JSON 파일을 가져올 수 있습니다
        const data = await import('./${actualComponentName}-data.json')
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
          <pre className="a11y-code">npm run a11y ${componentName}</pre>
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
          <pre className="a11y-code">npm run a11y ${componentName}</pre>
        </div>
      </div>
    );
  }

  // 결과 표시
  const { passes = [], violations = [], incomplete = [], timestamp = new Date().toLocaleString() } = results || {};

  return (
    <div className="a11y-report">
      <h1>${componentName} 컴포넌트 접근성 검사 결과</h1>
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

export default ${actualComponentName}View;`;

    fs.writeFileSync(viewComponentSource, viewComponentContent);

    // A11yView.stories.jsx 파일 생성
    const storiesComponentPath = path.join(
      a11yFolderPath,
      `${actualComponentName}View.stories.jsx`
    );
    const storiesContent = `import React from 'react';
import ${actualComponentName}View from './${actualComponentName}View';

/**
 * ${componentName} 컴포넌트의 접근성 검사 결과를 표시하는 스토리
 */
export default {
  title: '${componentParentFolder}/${componentName1stPart}/a11y',
  component: ${actualComponentName}View,
  parameters: {
    layout: 'fullscreen',
    controls: { hideNoControlsWarning: true }
  }
};

/**
 * 접근성 검사 결과 보기
 */
export const A11yReport = () => <${actualComponentName}View />;

// 스토리 타이틀 간소화
A11yReport.storyName = '${actualComponentName} 검사 결과';`;

    fs.writeFileSync(storiesComponentPath, storiesContent);

    console.log(chalk.default.green(`접근성 보고서 파일이 생성되었습니다:`));
    console.log(chalk.default.green(`- JSON 파일: ${jsonFilePath}`));
    console.log(chalk.default.green(`- CSS 파일: ${cssFilePath}`));
    console.log(chalk.default.green(`- 마크다운 파일: ${mdFilePath}`));
    console.log(
      chalk.default.yellow(
        `a11y 폴더 위치: ${a11yFolderPath} (${componentParentFolder}/${componentName1stPart} 폴더 내에 생성됨)`
      )
    );
    console.log(
      chalk.default.blue(
        `스토리북에서 볼 수 있는 경로: ${componentParentFolder}/${componentName1stPart}/a11y/${actualComponentName} 검사 결과`
      )
    );

    return {
      storyFilePath: storiesComponentPath,
      cssFilePath,
      mdFilePath,
      jsonFilePath,
    };
  } catch (error) {
    console.error(
      chalk.default.red("접근성 보고서 저장 중 오류가 발생했습니다:"),
      error
    );
    return null;
  }
}

// 컴포넌트의 HTML 가져오기
async function getComponentHTML(componentName, storyId = "primary") {
  let browser = null;

  try {
    // 스토리북 서버가 실행 중이어야 함
    browser = await puppeteer.launch({
      headless: "new",
      args: [
        "--no-sandbox",
        "--disable-setuid-sandbox",
        "--disable-dev-shm-usage",
      ],
      timeout: 30000,
    });
    const page = await browser.newPage();

    // 페이지 타임아웃 설정
    await page.setDefaultNavigationTimeout(30000);
    await page.setDefaultTimeout(30000);

    // 특수문자 및 공백 제거 - 파일 경로 문제 해결
    const cleanComponentName = componentName.replace(/[\\\/\s]+$/, "").trim();

    // 공백 제거 및 '/'로 분리된 부분 추출
    const pathParts = cleanComponentName.split("/").map((part) => part.trim());
    
    // 컴포넌트 이름 (첫 번째 부분, 예: Button)
    const componentName1stPart = pathParts[0];
    
    // 실제 컴포넌트 부모 폴더 찾기 (Atom, Molecule, Pages 등)
    const storiesPath = path.join(process.cwd(), "src", "stories");
    const possibleParentFolders = ["Atom", "Molecule", "Organism", "Pages", "Template"];
    
    let componentParentFolder = null;
    for (const parent of possibleParentFolders) {
      const possiblePath = path.join(storiesPath, parent, componentName1stPart);
      if (fs.existsSync(possiblePath)) {
        componentParentFolder = parent;
        break;
      }
    }
    
    // 부모 폴더를 찾지 못한 경우 기본값으로 Molecule 사용
    if (!componentParentFolder) {
      console.log(chalk.default.yellow(`컴포넌트 부모 폴더를 찾을 수 없습니다. 기본값 'Molecule'을 사용합니다.`));
      componentParentFolder = "Molecule";
    }
    
    // 컴포넌트 경로를 스토리북 ID 형식으로 변환
    // 실제 파일 경로를 확인하여 올바른 ID 생성
    let formattedId;
    
    // 폴더 구조 확인
    const variantDirPath = path.join(storiesPath, componentParentFolder, componentName1stPart, 'variant');
    if (fs.existsSync(variantDirPath)) {
      // 실제 스토리북 타이틀 형식을 따름: 'Atom/Accessibility/variant'
      formattedId = `${componentParentFolder.toLowerCase()}-${componentName1stPart.toLowerCase()}-variant`;
      console.log(chalk.default.blue(`스토리 ID 변환: ${formattedId}`));
    } else {
      // 입력된 경로 그대로 사용 (기존 방식)
      formattedId = cleanComponentName.toLowerCase().replace(/\//g, "-");
      console.log(chalk.default.yellow(`경고: variant 폴더를 찾을 수 없어 입력 경로를 그대로 사용합니다: ${formattedId}`));
    }

    // 검사 순서 결정: 사용자가 storyId를 명시적으로 지정한 경우 해당 타입 먼저 검사
    let storyResult;
    
    // 사용자가 명시적으로 스토리 타입을 지정한 경우 (기본값 'primary'가 아닌 경우)
    if (storyId !== "primary") {
      // 사용자가 지정한 스토리 타입을 먼저 시도
      console.log(chalk.default.blue(`사용자가 지정한 '${storyId}' 스토리를 먼저 시도합니다.`));
      storyResult = await checkStory(page, formattedId, storyId, true);
      
      // 사용자 지정 스토리가 실패하면 violateaccessibility 시도
      if (!storyResult.success) {
        console.log(chalk.default.yellow(`'${storyId}' 스토리를 찾을 수 없습니다. 'violateaccessibility' 스토리로 시도합니다.`));
        storyResult = await checkStory(page, formattedId, "violateaccessibility", true);
      }
    } else {
      // 기본 순서: violateaccessibility 먼저, 그 다음 primary
      storyResult = await checkStory(page, formattedId, "violateaccessibility", true);
      
      if (!storyResult.success) {
        console.log(chalk.default.yellow(`'violateaccessibility' 스토리를 찾을 수 없습니다. '${storyId}' 스토리로 시도합니다.`));
        storyResult = await checkStory(page, formattedId, storyId, true);
      }
    }
    
    // 여전히 스토리를 찾지 못했으면 다른 스토리 유형 시도
    if (!storyResult.success) {
      // 다른 일반적인 스토리 유형 시도
      const commonStoryTypes = ["primary", "default", "secondary", "main", "basic"];
      
      for (const type of commonStoryTypes) {
        if (type !== storyId && type !== "violateaccessibility") { // 이미 시도한 유형은 건너뜀
          console.log(chalk.default.yellow(`'${storyId}' 스토리를 찾을 수 없습니다. '${type}' 스토리로 시도합니다.`));
          storyResult = await checkStory(page, formattedId, type, true);
          if (storyResult.success) break;
        }
      }
    }
    
    // 모든 스토리 유형 시도 후에도 실패한 경우
    if (!storyResult.success) {
      console.error(chalk.default.red("모든 일반적인 스토리 유형에서 컴포넌트를 찾을 수 없습니다."));
      console.error(chalk.default.yellow("컴포넌트 스토리 파일에서 스토리 타입을 확인하세요."));
      // 그래도 마지막으로 시도한 페이지로 진행
    }

    // axe-core를 사용하여 접근성 검사 수행
    console.log(chalk.default.blue("axe-core를 사용하여 접근성 검사 시작..."));
    const axeResults = await checkAccessibilityWithAxe(page);

    return {
      html: storyResult.html || "",
      axeResults,
    };
  } catch (error) {
    console.error(chalk.default.red("컴포넌트 HTML 가져오기 실패:"), error);
    return null;
  } finally {
    // 브라우저가 열려 있으면 닫기
    if (browser) {
      try {
        await browser.close();
        console.log(
          chalk.default.blue("브라우저 세션이 정상적으로 종료되었습니다.")
        );
      } catch (closeError) {
        console.error(
          chalk.default.yellow("브라우저 종료 중 오류 (무시됨):"),
          closeError.message
        );
      }
    }
  }
}

// 카멜 케이스를 케밥 케이스로 변환하는 함수
function camelToKebabCase(string) {
  return string
    .replace(/([a-z0-9])([A-Z])/g, '$1-$2')
    .replace(/([A-Z])([A-Z])(?=[a-z])/g, '$1-$2')
    .toLowerCase();
}

// 특정 스토리 타입을 검사하는 함수
async function checkStory(page, formattedId, storyType, withViolation = false) {
  try {
    // URL 형식 변형 시도 - 여러 가능한 형태
    const urlVariations = [
      // 원래 대소문자 유지
      `${formattedId}--${storyType}`,
      // 소문자
      `${formattedId}--${storyType.toLowerCase()}`,
      // 케밥 케이스 변환 (LoggedIn -> logged-in)
      `${formattedId}--${camelToKebabCase(storyType)}`,
    ];
    
    // 각 URL 변형 시도
    for (const formattedStoryId of urlVariations) {
      let url = `http://localhost:6007/iframe.html?id=${formattedStoryId}&viewMode=story`;
      
      // 접근성 위반 파라미터 추가 여부
      if (withViolation) {
        url += "&args=violateAccessibility:true";
      }
      
      console.log(chalk.default.blue(`스토리 확인 중... URL: ${url}`));
      
      // 페이지 로드
      await page.goto(url, {
        waitUntil: "networkidle2", 
        timeout: 15000
      });
      
      // 페이지 로딩 대기
      await new Promise((resolve) => setTimeout(resolve, 1000));
      
      // 페이지 에러 확인 (스토리를 찾을 수 없음)
      const hasError = await page.evaluate(() => {
        return document.body.textContent.includes("Couldn't find story matching") ||
               document.body.textContent.includes("Error: Unable to find story");
      });
      
      if (!hasError) {
        // 렌더링 확인
        const isRendered = await page.evaluate(() => {
          const selectors = [
            ".sb-show-main", 
            "body > div",
            "body"
          ];
          
          for (const selector of selectors) {
            if (document.querySelector(selector)) {
              return { success: true, selector };
            }
          }
          
          return { success: false };
        });
        
        if (isRendered.success) {
          console.log(chalk.default.green(`스토리를 성공적으로 찾았습니다! 사용된 ID: ${formattedStoryId}`));
          const html = await page.content();
          
          return { 
            success: true, 
            html, 
            storyType,
            formattedStoryId
          };
        }
      }
      
      console.log(chalk.default.yellow(`ID '${formattedStoryId}'로 스토리를 찾을 수 없습니다. 다른 형식 시도 중...`));
    }
    
    // 모든 URL 형식을 시도해도 실패
    console.log(chalk.default.red(`스토리 '${storyType}'를 찾을 수 없습니다. 모든 URL 형식 시도 실패.`));
    return { success: false };
  } catch (error) {
    console.error(chalk.default.yellow(`스토리 '${storyType}' 검사 중 오류:`, error.message));
    return { success: false };
  }
}

// CSS 스타일 생성 함수
function generateReportStyle() {
  return `
.a11y-report {
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif;
  max-width: 900px;
  margin: 0 auto;
  padding: 20px;
  line-height: 1.5;
  color: #333;
}

.a11y-timestamp {
  color: #666;
  font-style: italic;
}

.a11y-summary {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 16px;
  margin: 20px 0;
  padding: 16px;
  background-color: #f5f5f5;
  border-radius: 4px;
}

.a11y-pass {
  color: #2e7d32;
}

.a11y-fail {
  color: #c62828;
  font-weight: bold;
}

.a11y-violations {
  display: flex;
  flex-direction: column;
  gap: 24px;
  margin-bottom: 24px;
}

.a11y-violation {
  border: 1px solid #ffcdd2;
  border-radius: 4px;
  padding: 16px;
  background-color: #ffebee;
}

.a11y-violation h3 {
  margin-top: 0;
  color: #c62828;
}

.a11y-violation-details {
  margin-bottom: 16px;
}

.a11y-violation-nodes {
  background-color: #fff;
  border-radius: 4px;
  padding: 16px;
}

.a11y-code {
  background-color: #f5f5f5;
  padding: 12px;
  border-radius: 4px;
  overflow-x: auto;
  font-size: 14px;
  line-height: 1.4;
  font-family: monospace;
}

.a11y-passes, .a11y-incomplete {
  line-height: 1.8;
}

.a11y-passes li {
  color: #2e7d32;
}

.a11y-incomplete li {
  color: #f57c00;
}
`;
}

// 메인 함수
async function main() {
  try {
    // 명령줄 인수 확인 - 모든 인자 가져오기 (npm run a11y Accessibility/Components/Accessibility)
    const args = process.argv.slice(2);

    if (args.length === 0) {
      console.error(chalk.default.red("컴포넌트 이름을 입력하세요."));
      console.log(chalk.default.yellow("사용법: npm run a11y <컴포넌트_경로> [스토리_타입]"));
      console.log(
        chalk.default.yellow("예시: npm run a11y Button/variant/Button primary")
      );
      console.log(
        chalk.default.yellow("예시: npm run a11y Button/variant/Button violateAccessibility")
      );
      console.log(
        chalk.default.yellow(
          "중요: 실제 폴더 경로와 일치하도록 해야 합니다. 일반적으로 'Accessibility/variant/Accessibility' 형식을 사용하세요."
        )
      );
      console.log(
        chalk.default.yellow(
          "스토리 타입을 생략하면 자동으로 'violateAccessibility', 'primary', 'default' 등의 순서로 검색합니다."
        )
      );
      console.log(
        chalk.default.yellow(
          "컴포넌트의 실제 부모 폴더(Atom, Molecule, Pages 등)는 자동으로 찾아서 적용됩니다."
        )
      );
      console.log(
        chalk.default.yellow(
          "결과 파일은 src/stories/[Atom|Molecule]/컴포넌트/a11y 폴더에 생성됩니다."
        )
      );
      process.exit(1);
    }

    // 컴포넌트 경로 - 백슬래시와 끝의 공백 제거
    let componentName, storyType;
    
    // 스토리 타입이 제공되었는지 확인
    if (args.length >= 2) {
      componentName = args[0].replace(/[\\\/\s]+$/, "").trim();
      storyType = args[1].trim();
      console.log(chalk.default.blue(`지정된 스토리 타입: ${storyType}`));
    } else {
      componentName = args[0].replace(/[\\\/\s]+$/, "").trim();
      storyType = "primary"; // 기본값
    }
    
    // 경로 구조 검증
    const pathParts = componentName.split('/').filter(part => part.trim() !== '');
    if (pathParts.length < 2) {
      console.error(chalk.default.red("잘못된 컴포넌트 경로 형식입니다."));
      console.log(
        chalk.default.yellow(
          "경로는 최소 '컴포넌트/variant' 형식이어야 합니다. 예: Button/variant/Button"
        )
      );
      process.exit(1);
    }
    
    // 컴포넌트 이름 (첫 번째 부분, 예: Button)
    const componentName1stPart = pathParts[0];
    
    // 실제 컴포넌트 부모 폴더 찾기 (Atom, Molecule, Pages 등)
    const storiesPath = path.join(process.cwd(), "src", "stories");
    const possibleParentFolders = ["Atom", "Molecule", "Organism", "Pages", "Template"];
    
    let componentParentFolder = null;
    for (const parent of possibleParentFolders) {
      const possiblePath = path.join(storiesPath, parent, componentName1stPart);
      if (fs.existsSync(possiblePath)) {
        componentParentFolder = parent;
        break;
      }
    }
    
    // 부모 폴더를 찾지 못한 경우 기본값으로 Molecule 사용
    if (!componentParentFolder) {
      console.log(chalk.default.yellow(`컴포넌트 부모 폴더를 찾을 수 없습니다. 기본값 'Molecule'을 사용합니다.`));
      componentParentFolder = "Molecule";
    }

    console.log(
      chalk.default.yellow(
        `${componentName} 컴포넌트의 접근성 검사를 시작합니다...`
      )
    );
    console.log(
      chalk.default.yellow(
        `스토리북 서버가 포트 6007에서 실행 중인지 확인하세요. (npm run storybook)`
      )
    );
    console.log(
      chalk.default.yellow(
        `검사 결과는 src/stories/${componentParentFolder}/${componentName1stPart}/a11y 폴더에 저장됩니다.`
      )
    );

    // 컴포넌트 HTML 가져오기 및 axe-core로 검사
    const result = await getComponentHTML(componentName, storyType);

    if (!result) {
      console.error(
        chalk.default.red(
          "컴포넌트 HTML을 가져오지 못했습니다. 스토리북 서버가 실행 중인지 확인하세요."
        )
      );
      process.exit(1);
    }

    // 1. React 컴포넌트 생성 (백업용)
    const jsxContent = generateReportComponent(
      result.axeResults,
      componentName
    );

    // 2. CSS 스타일 생성 (백업용)
    const cssContent = generateReportStyle();

    // 3. 단순 텍스트 형식의 보고서 생성
    const textReport = generateSimpleTextReport(
      result.axeResults,
      componentName
    );

    // 파일 저장
    await saveA11yReport(
      componentName,
      jsxContent,
      cssContent,
      textReport,
      result.axeResults
    );

    console.log(chalk.default.green("접근성 검사가 완료되었습니다!"));

    // 위반 항목 수 출력
    const violations = result.axeResults.violations || [];
    if (violations.length > 0) {
      console.log(
        chalk.default.yellow(
          `경고: ${violations.length}개의 접근성 위반 항목이 발견되었습니다.`
        )
      );
      console.log(
        chalk.default.yellow("스토리북에서 접근성 보고서를 확인하세요.")
      );
    } else {
      console.log(chalk.default.green("모든 접근성 검사를 통과했습니다!"));
    }
  } catch (error) {
    console.error(
      chalk.default.red("접근성 검사 중 오류가 발생했습니다:"),
      error
    );
    process.exit(1);
  }
}

// 영어 ID에 대한 한국어 설명을 제공하는 함수
function getKoreanDescriptionForPass(id, originalDescription) {
  const koreanDescriptions = {
    "aria-hidden-body": '문서 본문에 aria-hidden="true"가 없습니다',
    "aria-hidden-focus":
      "aria-hidden 요소는 포커스 가능한 요소를 포함하지 않으며 포커스가 불가능합니다",
    "color-contrast":
      "전경색과 배경색 간의 대비가 WCAG 2 AA 최소 대비율 기준을 충족합니다",
    "link-in-text-block":
      "링크가 주변 텍스트와 색상에만 의존하지 않고 구분됩니다",
    "link-name": "모든 링크에 식별 가능한 텍스트가 있습니다",
    list: "목록이 올바르게 구조화되어 있습니다",
    listitem: "li 요소가 의미적으로 올바르게 사용되었습니다",
    "image-alt": "모든 이미지에 적절한 대체 텍스트가 제공됩니다",
    "heading-order": "헤딩 레벨이 순차적으로 증가합니다",
    label: "모든 폼 요소에 접근 가능한 레이블이 제공됩니다",
    "aria-roles": "모든 ARIA 역할이 유효합니다",
  };

  return koreanDescriptions[id] || originalDescription;
}

// 스크립트 실행
main();
