# Button/variant/Button 접근성 검사 결과

**검사 일시**: 2025. 4. 21. 오후 3:26:07

## 요약

- 통과한 항목: 2개
- 위반 항목: 1개
- 검토 필요 항목: 0개
- 적용 불가 항목: 58개

## 위반 항목

### 1. color-contrast

- **영향도**: serious
- **설명**: Ensures the contrast between foreground and background colors meets WCAG 2 AA minimum contrast ratio thresholds
- **도움말**: [자세히 보기](https://dequeuniversity.com/rules/axe/4.8/color-contrast?application=axeAPI)

#### 문제 요소

**요소 1**:

```
<span style="font-size: 10px;">Button</span>
```

- **해결 방법**: Fix any of the following:
  Element has insufficient color contrast of 1.24 (foreground color: #888888, background color: #999999, font size: 7.5pt (10px), font weight: bold). Expected contrast ratio of 4.5:1

## 통과한 항목

- **aria-hidden-body**: Ensures aria-hidden="true" is not present on the document body.
- **aria-hidden-focus**: Ensures aria-hidden elements are not focusable nor contain focusable elements

