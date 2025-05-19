#!/usr/bin/env node

/**
 * 간단한 HTML 접근성 검사 스크립트
 * 사용법: node scripts/simple-a11y.js <HTML_파일_경로>
 */

import fs from 'fs';
import path from 'path';
import { JSDOM } from 'jsdom';
import chalk from 'chalk';

// 수동 접근성 검사 함수
function checkAccessibility(html, filePath) {
  console.log(chalk.blue(`${filePath} 파일을 검사 중...`));
  
  try {
    // HTML 파싱
    const dom = new JSDOM(html);
    const document = dom.window.document;
    
    // 위반 및 통과 항목 초기화
    const violations = [];
    const passes = [];
    
    // 1. 이미지 alt 속성 확인
    const images = document.querySelectorAll('img');
    let hasImageAltViolation = false;
    
    images.forEach((img, index) => {
      if (!img.hasAttribute('alt')) {
        hasImageAltViolation = true;
        violations.push({
          id: 'image-alt',
          impact: 'serious',
          help: '이미지에 대체 텍스트 제공',
          description: '모든 이미지는 적절한 대체 텍스트(alt 속성)를 가져야 합니다.',
          helpUrl: 'https://dequeuniversity.com/rules/axe/4.4/image-alt',
          nodes: [{
            html: img.outerHTML,
            target: [`img:nth-of-type(${index + 1})`],
            failureSummary: '이 이미지에 alt 속성을 추가하세요.'
          }]
        });
      }
    });
    
    if (images.length > 0 && !hasImageAltViolation) {
      passes.push({
        id: 'image-alt',
        description: '모든 이미지에 적절한 대체 텍스트가 제공됩니다.'
      });
    }
    
    // 2. 버튼과 링크 접근성 확인
    const interactiveElements = [...document.querySelectorAll('a, button')];
    let hasLinkNameViolation = false;
    
    interactiveElements.forEach((element, index) => {
      if (element.textContent.trim() === '' && 
          (!element.hasAttribute('aria-label') && 
          !element.hasAttribute('aria-labelledby'))) {
        hasLinkNameViolation = true;
        violations.push({
          id: 'link-name',
          impact: 'serious',
          help: '링크와 버튼에 접근 가능한 이름 제공',
          description: '모든 링크와 버튼은 접근 가능한 이름을 가져야 합니다.',
          helpUrl: 'https://dequeuniversity.com/rules/axe/4.4/link-name',
          nodes: [{
            html: element.outerHTML,
            target: [`${element.tagName.toLowerCase()}:nth-of-type(${index + 1})`],
            failureSummary: '이 요소에 텍스트 내용이나 aria-label 속성을 추가하세요.'
          }]
        });
      }
    });
    
    if (interactiveElements.length > 0 && !hasLinkNameViolation) {
      passes.push({
        id: 'link-name',
        description: '모든 링크와 버튼에 접근 가능한 이름이 제공됩니다.'
      });
    }
    
    // 3. 폼 레이블 확인
    const formControls = document.querySelectorAll('input, select, textarea');
    let hasLabelViolation = false;
    
    formControls.forEach((control, index) => {
      if (control.type !== 'hidden' && 
          control.type !== 'button' && 
          control.type !== 'submit' && 
          control.type !== 'reset' && 
          !control.hasAttribute('aria-label') && 
          !control.hasAttribute('aria-labelledby') &&
          !document.querySelector(`label[for="${control.id}"]`)) {
        hasLabelViolation = true;
        violations.push({
          id: 'label',
          impact: 'critical',
          help: '폼 요소에 레이블 제공',
          description: '모든 폼 요소는 접근 가능한 레이블을 가져야 합니다.',
          helpUrl: 'https://dequeuniversity.com/rules/axe/4.4/label',
          nodes: [{
            html: control.outerHTML,
            target: [`${control.tagName.toLowerCase()}:nth-of-type(${index + 1})`],
            failureSummary: '이 요소에 label 요소를 연결하거나 aria-label 속성을 추가하세요.'
          }]
        });
      }
    });
    
    if (formControls.length > 0 && !hasLabelViolation) {
      passes.push({
        id: 'label',
        description: '모든 폼 요소에 접근 가능한 레이블이 제공됩니다.'
      });
    }
    
    // 4. 헤딩 구조 확인
    const headings = document.querySelectorAll('h1, h2, h3, h4, h5, h6');
    let hasHeadingOrderViolation = false;
    let prevLevel = 0;
    
    headings.forEach((heading, index) => {
      const level = parseInt(heading.tagName[1]);
      if (prevLevel > 0 && level > prevLevel + 1) {
        hasHeadingOrderViolation = true;
        violations.push({
          id: 'heading-order',
          impact: 'moderate',
          help: '헤딩 레벨이 순차적으로 증가해야 함',
          description: '헤딩 레벨은 순차적으로 증가해야 합니다 (예: h1 다음에 h3이 아닌 h2가 와야 함).',
          helpUrl: 'https://dequeuniversity.com/rules/axe/4.4/heading-order',
          nodes: [{
            html: heading.outerHTML,
            target: [`${heading.tagName.toLowerCase()}:nth-of-type(${index + 1})`],
            failureSummary: `헤딩 레벨이 ${prevLevel}에서 ${level}으로 건너뛰었습니다. 순차적으로 증가해야 합니다.`
          }]
        });
      }
      prevLevel = level;
    });
    
    if (headings.length > 0 && !hasHeadingOrderViolation) {
      passes.push({
        id: 'heading-order',
        description: '헤딩 레벨이 순차적으로 증가합니다.'
      });
    }
    
    // 5. ARIA 역할 확인
    const ariaElements = document.querySelectorAll('[role]');
    let hasAriaRoleViolation = false;
    const validRoles = [
      'alert', 'alertdialog', 'application', 'article', 'banner', 'button', 'cell', 'checkbox', 
      'columnheader', 'combobox', 'complementary', 'contentinfo', 'definition', 'dialog', 
      'directory', 'document', 'feed', 'figure', 'form', 'grid', 'gridcell', 'group', 'heading', 
      'img', 'link', 'list', 'listbox', 'listitem', 'log', 'main', 'marquee', 'math', 'menu', 
      'menubar', 'menuitem', 'menuitemcheckbox', 'menuitemradio', 'navigation', 'none', 'note', 
      'option', 'presentation', 'progressbar', 'radio', 'radiogroup', 'region', 'row', 'rowgroup', 
      'rowheader', 'scrollbar', 'search', 'searchbox', 'separator', 'slider', 'spinbutton', 
      'status', 'switch', 'tab', 'table', 'tablist', 'tabpanel', 'term', 'textbox', 'timer', 
      'toolbar', 'tooltip', 'tree', 'treegrid', 'treeitem'
    ];
    
    ariaElements.forEach((element, index) => {
      const role = element.getAttribute('role');
      if (!validRoles.includes(role)) {
        hasAriaRoleViolation = true;
        violations.push({
          id: 'aria-roles',
          impact: 'serious',
          help: '유효한 ARIA 역할 사용',
          description: 'ARIA 역할은 유효한 값을 사용해야 합니다.',
          helpUrl: 'https://dequeuniversity.com/rules/axe/4.4/aria-roles',
          nodes: [{
            html: element.outerHTML,
            target: [`[role="${role}"]:nth-of-type(${index + 1})`],
            failureSummary: `"${role}"은(는) 유효한 ARIA 역할이 아닙니다.`
          }]
        });
      }
    });
    
    if (ariaElements.length > 0 && !hasAriaRoleViolation) {
      passes.push({
        id: 'aria-roles',
        description: '모든 ARIA 역할이 유효합니다.'
      });
    }
    
    // 6. ARIA 상태 및 속성 검사
    const ariaStateElements = document.querySelectorAll('[aria-expanded], [aria-pressed], [aria-checked], [aria-selected], [aria-controls], [aria-labelledby], [aria-describedby]');
    let hasAriaStateViolation = false;
    
    ariaStateElements.forEach((element, index) => {
      // aria-controls 속성이 있는 경우 해당 ID의 요소가 존재하는지 확인
      if (element.hasAttribute('aria-controls')) {
        const controlsId = element.getAttribute('aria-controls');
        const controlledElement = document.getElementById(controlsId);
        
        if (!controlledElement) {
          hasAriaStateViolation = true;
          violations.push({
            id: 'aria-state-and-properties',
            impact: 'serious',
            help: 'ARIA 상태 및 속성의 올바른 사용',
            description: 'aria-controls 속성은 존재하는 요소의 ID를 참조해야 합니다.',
            helpUrl: 'https://dequeuniversity.com/rules/axe/4.4/aria-valid-attr-value',
            nodes: [{
              html: element.outerHTML,
              target: [`[aria-controls="${controlsId}"]:nth-of-type(${index + 1})`],
              failureSummary: `aria-controls="${controlsId}" 속성이 참조하는 요소를 찾을 수 없습니다.`
            }]
          });
        }
      }
      
      // aria-labelledby 속성이 있는 경우 해당 ID의 요소가 존재하는지 확인
      if (element.hasAttribute('aria-labelledby')) {
        const labelledbyId = element.getAttribute('aria-labelledby');
        const labellingElement = document.getElementById(labelledbyId);
        
        if (!labellingElement) {
          hasAriaStateViolation = true;
          violations.push({
            id: 'aria-state-and-properties',
            impact: 'serious',
            help: 'ARIA 상태 및 속성의 올바른 사용',
            description: 'aria-labelledby 속성은 존재하는 요소의 ID를 참조해야 합니다.',
            helpUrl: 'https://dequeuniversity.com/rules/axe/4.4/aria-valid-attr-value',
            nodes: [{
              html: element.outerHTML,
              target: [`[aria-labelledby="${labelledbyId}"]:nth-of-type(${index + 1})`],
              failureSummary: `aria-labelledby="${labelledbyId}" 속성이 참조하는 요소를 찾을 수 없습니다.`
            }]
          });
        }
      }
      
      // aria-expanded, aria-pressed, aria-checked, aria-selected의 값이 boolean 값인지 확인
      const booleanAttributes = ['aria-expanded', 'aria-pressed', 'aria-checked', 'aria-selected'];
      
      booleanAttributes.forEach(attrName => {
        if (element.hasAttribute(attrName)) {
          const attrValue = element.getAttribute(attrName).toLowerCase();
          
          if (attrValue !== 'true' && attrValue !== 'false') {
            hasAriaStateViolation = true;
            violations.push({
              id: 'aria-state-and-properties',
              impact: 'serious',
              help: 'ARIA 상태 및 속성의 올바른 사용',
              description: `${attrName} 속성은 'true' 또는 'false' 값만 가질 수 있습니다.`,
              helpUrl: 'https://dequeuniversity.com/rules/axe/4.4/aria-valid-attr-value',
              nodes: [{
                html: element.outerHTML,
                target: [`[${attrName}="${element.getAttribute(attrName)}"]:nth-of-type(${index + 1})`],
                failureSummary: `${attrName}="${element.getAttribute(attrName)}" 속성은 'true' 또는 'false' 값만 가질 수 있습니다.`
              }]
            });
          }
        }
      });
    });
    
    if (ariaStateElements.length > 0 && !hasAriaStateViolation) {
      passes.push({
        id: 'aria-state-and-properties',
        description: '모든 ARIA 상태 및 속성이 올바르게 사용되었습니다.'
      });
    }
    
    // 7. 키보드 접근성 검사
    const interactiveControls = document.querySelectorAll('a[href], button, [role="button"], [role="link"], [role="checkbox"], [role="radio"], [role="tab"], [role="menuitem"], [contenteditable="true"]');
    let hasKeyboardAccessibilityViolation = false;
    
    interactiveControls.forEach((control, index) => {
      // 역할이 버튼, 링크, 체크박스, 라디오 등인 요소는 tabindex가 필요
      if (control.hasAttribute('role') && 
          ['button', 'link', 'checkbox', 'radio', 'tab', 'menuitem'].includes(control.getAttribute('role'))) {
        if (!control.hasAttribute('tabindex') && control.tagName.toLowerCase() !== 'a' && control.tagName.toLowerCase() !== 'button') {
          hasKeyboardAccessibilityViolation = true;
          violations.push({
            id: 'keyboard-accessibility',
            impact: 'serious',
            help: '대화형 요소의 키보드 접근성 보장',
            description: `role="${control.getAttribute('role')}" 속성을 가진 요소는 키보드로 접근할 수 있어야 합니다.`,
            helpUrl: 'https://dequeuniversity.com/rules/axe/4.4/tabindex',
            nodes: [{
              html: control.outerHTML,
              target: [`[role="${control.getAttribute('role')}"]:nth-of-type(${index + 1})`],
              failureSummary: `이 요소에 tabindex 속성을 추가하세요. role="${control.getAttribute('role')}" 속성을 가진 요소는 키보드로 접근할 수 있어야 합니다.`
            }]
          });
        }
      }
      
      // 비활성화 또는 숨김 요소가 아닌 interactive 요소가 음수 tabindex를 가지면 안 됨
      if (control.hasAttribute('tabindex') && 
          parseInt(control.getAttribute('tabindex')) < 0 &&
          !control.hasAttribute('disabled') &&
          !control.hasAttribute('aria-hidden') && 
          control.style.display !== 'none' && 
          control.style.visibility !== 'hidden') {
        
        hasKeyboardAccessibilityViolation = true;
        violations.push({
          id: 'keyboard-accessibility',
          impact: 'serious',
          help: '대화형 요소의 키보드 접근성 보장',
          description: '대화형 요소는 음수 tabindex를 가지면 안 됩니다.',
          helpUrl: 'https://dequeuniversity.com/rules/axe/4.4/tabindex',
          nodes: [{
            html: control.outerHTML,
            target: [`[tabindex="${control.getAttribute('tabindex')}"]:nth-of-type(${index + 1})`],
            failureSummary: `이 요소의 tabindex 값을 0 이상으로 변경하거나 제거하세요. 음수 tabindex는 키보드 탐색 순서에서 요소를 제외합니다.`
          }]
        });
      }
    });
    
    if (interactiveControls.length > 0 && !hasKeyboardAccessibilityViolation) {
      passes.push({
        id: 'keyboard-accessibility',
        description: '모든 대화형 요소가 키보드로 접근 가능합니다.'
      });
    }
    
    // 결과 출력
    console.log(chalk.green(`검사 완료`));
    console.log(`  위반 항목: ${chalk.red(violations.length)}개`);
    console.log(`  통과 항목: ${chalk.green(passes.length)}개`);
    
    // 위반 항목이 있으면 간단히 출력
    if (violations.length > 0) {
      console.log(chalk.yellow('\n위반 항목:'));
      violations.forEach((violation, index) => {
        console.log(`  ${index + 1}. ${chalk.red(violation.id)}: ${violation.help} (중요도: ${violation.impact})`);
      });
    }
    
    // HTML 파일 경로에서 컴포넌트 디렉토리 경로 가져오기
    const componentDir = path.dirname(filePath);
    
    // a11y 폴더 경로
    const a11yDir = path.join(componentDir, 'a11y');
    
    // 필요한 디렉토리 생성
    if (!fs.existsSync(a11yDir)) {
      fs.mkdirSync(a11yDir, { recursive: true });
    }
    
    // 보고서 파일 경로 설정
    const reportFilePath = path.join(a11yDir, 'report.html');
    
    // 보고서 생성
    generateReport({ violations, passes }, reportFilePath, filePath);
    
    // MDX 보고서도 생성
    const mdxContent = generateMdxReport({ violations, passes }, filePath);
    const mdxFilePath = path.join(a11yDir, 'report.mdx');
    fs.writeFileSync(mdxFilePath, mdxContent);
    
    // 컴포넌트 이름 추출 (파일 경로의 마지막 디렉토리 이름)
    const pathParts = filePath.split(path.sep);
    const componentName = pathParts[pathParts.length - 2]; // 마지막 디렉토리 이름
    
    // stories.js 파일 자동 업데이트
    updateStoriesFile(componentName, filePath);
    
    console.log(chalk.green(`\n보고서가 생성되었습니다:`));
    console.log(`  - HTML: ${reportFilePath}`);
    console.log(`  - MDX: ${mdxFilePath}`);
    
    return { violations, passes };
    
  } catch (error) {
    console.error(chalk.red(`파일 처리 중 오류가 발생했습니다:`), error);
    return { violations: [], passes: [] };
  }
}

// 보고서 생성 함수
function generateReport(results, outputFile, sourceFile) {
  // 컴포넌트 이름 추출 (경로 기반)
  const componentDir = path.dirname(sourceFile);
  
  // a11y 폴더 경로
  const a11yDir = path.join(componentDir, 'a11y');
  
  // 필요한 디렉토리 생성
  if (!fs.existsSync(a11yDir)) {
    fs.mkdirSync(a11yDir, { recursive: true });
  }
  
  // 보고서 파일 경로 설정
  const reportFileName = `report.html`;
  const reportFilePath = path.join(a11yDir, reportFileName);
  
  // 만약 outputFile이 지정되지 않았다면 a11y 폴더 내 report.html로 설정
  if (!outputFile) {
    outputFile = reportFilePath;
  }

  // 콘솔에 경로 표시
  console.log(chalk.green(`접근성 보고서를 저장합니다: ${outputFile}`));
  
  let htmlReport = `
    <!DOCTYPE html>
    <html lang="ko">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>간단한 접근성 테스트 보고서 - ${path.basename(sourceFile)}</title>
      <style>
        body { font-family: Arial, sans-serif; line-height: 1.6; margin: 0; padding: 20px; color: #333; }
        h1 { color: #2c3e50; border-bottom: 1px solid #eee; padding-bottom: 10px; }
        h2 { color: #3498db; margin-top: 30px; }
        .summary { background: #f8f9fa; padding: 20px; border-radius: 5px; margin: 20px 0; }
        .violation { background: #ffecec; padding: 15px; margin: 10px 0; border-left: 5px solid #e74c3c; border-radius: 3px; }
        .impact-critical { border-left-color: #e74c3c; }
        .impact-serious { border-left-color: #e67e22; }
        .impact-moderate { border-left-color: #f1c40f; }
        .impact-minor { border-left-color: #3498db; }
        .node-info { background: #f5f5f5; padding: 10px; margin: 10px 0; font-family: monospace; white-space: pre-wrap; }
        .help-info { margin-top: 15px; }
        .help-info a { color: #3498db; text-decoration: none; }
        .help-info a:hover { text-decoration: underline; }
        .pass { color: green; }
        .timestamp { color: #777; font-size: 0.9em; margin-top: 50px; }
      </style>
    </head>
    <body>
      <h1>간단한 접근성 테스트 보고서</h1>
      <p>소스 파일: ${sourceFile}</p>
      
      <div class="summary">
        <h2>요약</h2>
        <p>테스트 시간: ${new Date().toLocaleString()}</p>
        <p>위반 항목: ${results.violations.length}개</p>
        <p>통과 항목: ${results.passes.length}개</p>
        <p>${results.violations.length === 0 ? 
          '<strong class="pass">검사한 항목에 대해 접근성 문제가 발견되지 않았습니다.</strong>' : 
          '<strong>접근성 이슈가 발견되었습니다. 아래 세부 정보를 확인하세요.</strong>'}
        </p>
      </div>
      
      <h2>위반 항목 상세</h2>
  `;

  if (results.violations.length === 0) {
    htmlReport += '<p>위반 항목이 없습니다.</p>';
  } else {
    results.violations.forEach(violation => {
      htmlReport += `
        <div class="violation impact-${violation.impact}">
          <h3>${violation.help} (중요도: ${violation.impact})</h3>
          <p>${violation.description}</p>
          <p>위반 규칙: ${violation.id}</p>
          
          <h4>영향받는 요소:</h4>
          ${violation.nodes.map(node => `
            <div class="node-info">
              <p>HTML: ${node.html}</p>
              <p>위치: ${node.target.join(', ')}</p>
              <p>해결 방법: ${node.failureSummary}</p>
            </div>
          `).join('')}
          
          <div class="help-info">
            <a href="${violation.helpUrl}" target="_blank">자세한 내용 보기</a>
          </div>
        </div>
      `;
    });
  }

  htmlReport += `
      <h2>통과된 항목</h2>
      <ul>
        ${results.passes.map(pass => `<li>${pass.id}: ${pass.description}</li>`).join('')}
      </ul>
      
      <div class="timestamp">
        생성 시간: ${new Date().toLocaleString()}
      </div>
    </body>
    </html>
  `;

  fs.writeFileSync(outputFile, htmlReport);
}

// MDX 보고서 생성 함수
function generateMdxReport(results, sourceFile) {
  const { violations, passes } = results;
  const currentDate = new Date().toLocaleString('ko-KR');
  
  // 마크다운 형식으로 생성
  let mdxContent = `# ${path.basename(sourceFile)} 접근성 테스트 보고서

<div style="background-color: #f8f9fa; padding: 12px; border-radius: 4px; margin: 12px 0; border-left: 5px solid #3498db;">
  <h2 style="margin: 0 0 8px 0;">요약</h2>
  <ul style="margin: 0; padding-left: 20px;">
    <li><strong>검사 대상:</strong> \`${sourceFile}\`</li>
    <li><strong>검사 일시:</strong> ${currentDate}</li>
    <li><strong>위반 항목:</strong> <span style="color: ${violations.length > 0 ? '#e74c3c' : '#27ae60'}; font-weight: bold;">${violations.length}개</span></li>
    <li><strong>통과 항목:</strong> <span style="color: #27ae60; font-weight: bold;">${passes.length}개</span></li>
  </ul>
</div>`;

  if (violations.length > 0) {
    mdxContent += `\n## 위반 항목`;
    violations.forEach((violation, index) => {
      const borderColor = 
        violation.impact === 'critical' ? '#e74c3c' :
        violation.impact === 'serious' ? '#e67e22' :
        violation.impact === 'moderate' ? '#f1c40f' : '#3498db';
      
      mdxContent += `
<div style="background-color: #fff8f8; border-left: 5px solid ${borderColor}; padding: 12px; margin: 8px 0; border-radius: 4px; box-shadow: 0 1px 3px rgba(0,0,0,0.1);">
  <h3 style="margin: 0 0 8px 0;">${index + 1}. ${violation.id}</h3>
  <ul style="margin: 0 0 8px 0; padding-left: 20px; line-height: 1.4;">
    <li><strong>중요도:</strong> ${violation.impact}</li>
    <li><strong>설명:</strong> ${violation.description}</li>
    <li><strong>해결 방법:</strong> ${violation.help}</li>
    <li><strong>참고 링크:</strong> <a href="${violation.helpUrl}" target="_blank" style="color: #3498db; text-decoration: none;">자세히 보기</a></li>
  </ul>`;
      
      violation.nodes.forEach((node, nodeIndex) => {
        mdxContent += `
  <h4 style="margin: 8px 0 4px 0;">영향받는 요소 ${nodeIndex + 1}</h4>
  <div style="background-color: #f5f5f5; padding: 8px; border-radius: 4px; font-family: monospace; overflow-x: auto; border: 1px solid #ddd; margin: 4px 0 8px 0;">
    ${node.html.replace(/</g, '&lt;').replace(/>/g, '&gt;')}
  </div>
  <p style="margin: 4px 0;"><strong>실패 요약:</strong> ${node.failureSummary}</p>`;
      });
      
      mdxContent += `\n</div>`;
    });
  }
  
  if (passes.length > 0) {
    mdxContent += `\n## 통과 항목`;
    passes.forEach((pass) => {
      mdxContent += `
<div style="background-color: #f1fff1; border-left: 5px solid #27ae60; padding: 8px 12px; margin: 6px 0; border-radius: 4px; box-shadow: 0 1px 3px rgba(0,0,0,0.1);">
  <p style="margin: 0;"><strong>${pass.id}:</strong> ${pass.description}</p>
</div>`;
    });
  }
  
  return mdxContent;
}

// stories.js 파일 업데이트 함수
function updateStoriesFile(componentName, htmlFilePath) {
  try {
    // 파일명에서 확장자 제거 (slider.html -> slider)
    const baseName = path.basename(htmlFilePath, path.extname(htmlFilePath));
    
    // stories.js 파일 경로 결정 (HTML 파일과 같은 디렉토리)
    const componentDir = path.dirname(htmlFilePath);
    const storiesFilePath = path.join(componentDir, `${baseName}.stories.js`);
    
    console.log(`스토리 파일 경로: ${storiesFilePath}`);
    
    // stories.js 파일이 존재하는지 확인
    if (!fs.existsSync(storiesFilePath)) {
      console.log(chalk.yellow(`${storiesFilePath} 파일을 찾을 수 없습니다.`));
      return;
    }
    
    // stories.js 파일 내용 읽기
    let storiesContent = fs.readFileSync(storiesFilePath, 'utf8');
    
    // 이미 a11y 관련 import가 있는지 확인
    if (storiesContent.includes('a11y/report.mdx') || storiesContent.includes('AccessibilityReport')) {
      console.log(chalk.yellow(`${storiesFilePath} 파일에 이미 a11y 보고서가 import되어 있습니다.`));
      return;
    }
    
    // import 문 추가
    const importRegex = /(import .+?from .+?['"];?\n)/g;
    const lastImportMatch = [...storiesContent.matchAll(importRegex)].pop();
    
    if (lastImportMatch) {
      const lastImport = lastImportMatch[0];
      const importPosition = lastImportMatch.index + lastImport.length;
      
      // 새로운 import 문 추가 (raw 형식으로 가져옴)
      const newImport = `import a11yReport from './a11y/report.mdx?raw';\n`;
      storiesContent = storiesContent.slice(0, importPosition) + newImport + storiesContent.slice(importPosition);
    } else {
      // import 문이 없는 경우 파일 시작 부분에 추가
      storiesContent = `import a11yReport from './a11y/report.mdx?raw';\n` + storiesContent;
    }
    
    // parameters 객체 찾기
    const parametersRegex = /parameters\s*:\s*{/g;
    const parametersMatch = parametersRegex.exec(storiesContent);
    
    if (parametersMatch) {
      // parameters 객체가 있는 경우 a11yReport 속성 추가
      const parametersPosition = parametersMatch.index + parametersMatch[0].length;
      
      const newParameters = `
    a11yReport: {
      disable: false,
      report: a11yReport
    },`;
      
      // 이미 a11yReport 속성이 있는지 확인
      if (!storiesContent.includes('a11yReport')) {
        storiesContent = storiesContent.slice(0, parametersPosition) + newParameters + storiesContent.slice(parametersPosition);
      }
    }
    
    // title 경로 추출
    const titleRegex = /title\s*:\s*['"](.+?)['"]/;
    const titleMatch = titleRegex.exec(storiesContent);
    let componentTitle = '';
    
    if (titleMatch) {
      componentTitle = titleMatch[1];
      
      // variant가 포함된 경로인지 확인
      if (componentTitle.endsWith('/variant')) {
        // /variant를 제거하여 기본 경로 추출
        componentTitle = componentTitle.replace(/\/variant$/, '');
      }
    }
    
    // AccessibilityReport 파일 생성
    const a11yStoryPath = path.join(componentDir, 'accessibility-report.stories.js');
    
    const a11yStoryContent = `import a11yReport from './a11y/report.mdx?raw';

export default {
  title: '${componentTitle}/Accessibility Report',
  parameters: {
    viewMode: 'docs',
    previewTabs: {
      canvas: { hidden: true }
    },
    options: {
      showPanel: false
    }
  }
};

export const Report = {
  name: 'Accessibility Report',
  render: () => {
    const container = document.createElement('div');
    container.className = 'a11y-report';
    container.innerHTML = \`
      <div style="padding: 20px; font-family: 'Arial', sans-serif;">
        <h1 style="color: #333; border-bottom: 1px solid #eee; padding-bottom: 10px;">접근성 보고서</h1>
        <div style="line-height: 1.6;">
          <pre style="white-space: pre-wrap; word-break: break-word;">\${a11yReport}</pre>
        </div>
      </div>
    \`;
    return container;
  }
};
`;
    
    // 접근성 보고서 스토리 파일 저장
    fs.writeFileSync(a11yStoryPath, a11yStoryContent);
    console.log(chalk.green(`${a11yStoryPath} 파일이 생성되었습니다.`));
    
    // 수정된 내용 저장
    fs.writeFileSync(storiesFilePath, storiesContent);
    console.log(chalk.green(`${storiesFilePath} 파일이 업데이트되었습니다.`));
  } catch (error) {
    console.error(chalk.red(`Stories 파일 업데이트 중 오류가 발생했습니다:`), error);
  }
}

// 메인 함수
async function main() {
  const args = process.argv.slice(2);
  if (args.length === 0) {
    console.log('사용법: node scripts/simple-a11y.js <HTML_파일_경로>');
    console.log('      또는: node scripts/simple-a11y.js --docs <컴포넌트명>');
    process.exit(1);
  }
  
  // --docs 옵션 확인
  if (args[0] === '--docs' || args[0] === '-d') {
    if (args.length < 2) {
      console.log('컴포넌트명을 입력하세요: node scripts/simple-a11y.js --docs <컴포넌트명>');
      process.exit(1);
    }
    
    const componentName = args[1];
    await checkDocsAccessibility(componentName);
    return;
  }
  
  const filePath = args[0];
  if (!fs.existsSync(filePath)) {
    console.error(chalk.red(`${filePath} 파일을 찾을 수 없습니다.`));
    process.exit(1);
  }
  
  // 모든 stories 하위 경로는 컴포넌트 폴더로 간주
  // 예: src/stories/Button, src/stories/Accessibility 등
  const isValid = filePath.includes('stories') && path.extname(filePath) === '.html';
  
  if (!isValid) {
    console.error(chalk.red(`${filePath}는 유효한 HTML 파일 경로가 아닙니다.`));
    console.log('사용법: node scripts/simple-a11y.js src/stories/컴포넌트/컴포넌트.html');
    process.exit(1);
  }
  
  try {
    const html = fs.readFileSync(filePath, 'utf8');
    checkAccessibility(html, filePath);
  } catch (error) {
    console.error(chalk.red(`파일 읽기 오류:`), error);
    process.exit(1);
  }
}

// 컴포넌트 Docs 접근성 검사 함수
async function checkDocsAccessibility(componentName) {
  try {
    // 컴포넌트명 첫 글자를 대문자로 변환
    const formattedComponentName = componentName.charAt(0).toUpperCase() + componentName.slice(1);
    
    // 가능한 stories.js 파일 경로들 확인
    const possibleStoriesPaths = [
      path.join('./src/stories', formattedComponentName, `${componentName.toLowerCase()}.stories.js`),
      path.join('./stories', formattedComponentName, `${componentName.toLowerCase()}.stories.js`)
    ];
    
    let storiesPath = null;
    for (const p of possibleStoriesPaths) {
      if (fs.existsSync(p)) {
        storiesPath = p;
        break;
      }
    }
    
    if (!storiesPath) {
      console.error(chalk.red(`스토리 파일을 찾을 수 없습니다: ${componentName}`));
      process.exit(1);
    }
    
    console.log(chalk.blue(`${formattedComponentName} 컴포넌트의 Docs를 검사 중...`));
    
    // stories.js 파일 내용 읽기
    const storiesContent = fs.readFileSync(storiesPath, 'utf8');
    
    // HTML 파일 가져오기
    const htmlMatch = /import\s+\w+Html\s+from\s+['"](.+?)['"]/.exec(storiesContent);
    if (!htmlMatch) {
      console.error(chalk.red('HTML 파일 경로를 찾을 수 없습니다.'));
      process.exit(1);
    }
    
    const htmlPath = htmlMatch[1].replace('?raw', '');
    
    // 스토리 파일이 있는 디렉토리 가져오기
    const storiesDir = path.dirname(storiesPath);
    const absoluteHtmlPath = path.join(storiesDir, htmlPath);
    
    if (!fs.existsSync(absoluteHtmlPath)) {
      console.error(chalk.red(`${absoluteHtmlPath} 파일을 찾을 수 없습니다.`));
      process.exit(1);
    }
    
    // 임시 HTML 파일 만들기 (Docs에서 사용하는 모든 컴포넌트 타입 포함)
    const tempHtmlPath = path.join(storiesDir, 'temp_docs.html');
    
    // 기본 HTML 파일 내용 가져오기
    let html = fs.readFileSync(absoluteHtmlPath, 'utf8');
    
    // 다양한 타입의 컴포넌트 예제 추출 (스토리북의 story 함수들)
    const storyMatches = [...storiesContent.matchAll(/export const (\w+) = {/g)];
    let allTypesHtml = html;
    
    // Default 스토리 외에 다른 타입들도 추가
    if (storyMatches.length > 1) {
      for (const match of storyMatches) {
        const storyName = match[1];
        if (storyName !== 'Default' && storyName !== 'AccessibilityReport') {
          // 타입별 컴포넌트를 div로 래핑하고 타입 이름을 id로 추가
          allTypesHtml += `\n<!-- ${storyName} 타입 -->\n<div id="${storyName.toLowerCase()}">${html}</div>`;
        }
      }
    }
    
    // 임시 파일 저장
    fs.writeFileSync(tempHtmlPath, allTypesHtml);
    
    // 접근성 검사 실행
    const tempHtml = fs.readFileSync(tempHtmlPath, 'utf8');
    checkAccessibility(tempHtml, absoluteHtmlPath);
    
    // 임시 파일 삭제
    fs.unlinkSync(tempHtmlPath);
    
  } catch (error) {
    console.error(chalk.red(`Docs 접근성 검사 중 오류가 발생했습니다:`), error);
    process.exit(1);
  }
}

main(); 