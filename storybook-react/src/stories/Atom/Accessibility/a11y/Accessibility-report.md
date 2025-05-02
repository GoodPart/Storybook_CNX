# Accessibility/variant/Accessibility 접근성 검사 결과

**검사 일시**: 2025. 4. 21. 오후 3:25:25

## 요약

- 통과한 항목: 20개
- 위반 항목: 6개
- 검토 필요 항목: 1개
- 적용 불가 항목: 41개

## 위반 항목

### 1. aria-roles

- **영향도**: critical
- **설명**: Ensures all elements with a role attribute use a valid value
- **도움말**: [자세히 보기](https://dequeuniversity.com/rules/axe/4.8/aria-roles?application=axeAPI)

#### 문제 요소

**요소 1**:

```
<div role="invalid-role">잘못된 ARIA 역할을 가진 요소</div>
```

- **해결 방법**: Fix all of the following:
  Role must be one of the valid ARIA roles: invalid-role

### 2. button-name

- **영향도**: critical
- **설명**: Ensures buttons have discernible text
- **도움말**: [자세히 보기](https://dequeuniversity.com/rules/axe/4.8/button-name?application=axeAPI)

#### 문제 요소

**요소 1**:

```
<button class="empty-button"></button>
```

- **해결 방법**: Fix any of the following:
  Element does not have inner text that is visible to screen readers
  aria-label attribute does not exist or is empty
  aria-labelledby attribute does not exist, references elements that do not exist or references elements that are empty
  Element has no title attribute
  Element's default semantics were not overridden with role="none" or role="presentation"

### 3. color-contrast

- **영향도**: serious
- **설명**: Ensures the contrast between foreground and background colors meets WCAG 2 AA minimum contrast ratio thresholds
- **도움말**: [자세히 보기](https://dequeuniversity.com/rules/axe/4.8/color-contrast?application=axeAPI)

#### 문제 요소

**요소 1**:

```
<p style="color: rgb(153, 153, 153); background-color: rgb(238, 238, 238);">WCAG 가이드라인을 준수하는 접근성 검사 컴포넌트입니다.</p>
```

- **해결 방법**: Fix any of the following:
  Element has insufficient color contrast of 2.45 (foreground color: #999999, background color: #eeeeee, font size: 12.0pt (16px), font weight: normal). Expected contrast ratio of 4.5:1

**요소 2**:

```
<p class="low-contrast">이 텍스트는 배경과 색상 대비가 충분하지 않습니다.</p>
```

- **해결 방법**: Fix any of the following:
  Element has insufficient color contrast of 2.18 (foreground color: #aaaaaa, background color: #f8f8f8, font size: 12.0pt (16px), font weight: normal). Expected contrast ratio of 4.5:1

**요소 3**:

```
<div role="button" tabindex="0" class="aria-button">ARIA 역할을 가진 버튼</div>
```

- **해결 방법**: Fix any of the following:
  Element has insufficient color contrast of 3.12 (foreground color: #ffffff, background color: #2196f3, font size: 12.0pt (16px), font weight: normal). Expected contrast ratio of 4.5:1

**요소 4**:

```
<button type="button" class="a11y-button">키보드로 접근 가능한 버튼</button>
```

- **해결 방법**: Fix any of the following:
  Element has insufficient color contrast of 2.29 (foreground color: #ffffff, background color: #00bcd4, font size: 10.0pt (13.3333px), font weight: normal). Expected contrast ratio of 4.5:1

**요소 5**:

```
<div class="keyboard-trap">키보드로 접근할 수 없는 요소</div>
```

- **해결 방법**: Fix any of the following:
  Element has insufficient color contrast of 3.16 (foreground color: #ffffff, background color: #ff5722, font size: 12.0pt (16px), font weight: normal). Expected contrast ratio of 4.5:1

### 4. image-alt

- **영향도**: critical
- **설명**: Ensures <img> elements have alternate text or a role of none or presentation
- **도움말**: [자세히 보기](https://dequeuniversity.com/rules/axe/4.8/image-alt?application=axeAPI)

#### 문제 요소

**요소 1**:

```
<img src="https://picsum.photos/300/200?random=1">
```

- **해결 방법**: Fix any of the following:
  Element does not have an alt attribute
  aria-label attribute does not exist or is empty
  aria-labelledby attribute does not exist, references elements that do not exist or references elements that are empty
  Element has no title attribute
  Element's default semantics were not overridden with role="none" or role="presentation"

### 5. label

- **영향도**: critical
- **설명**: Ensures every form element has a label
- **도움말**: [자세히 보기](https://dequeuniversity.com/rules/axe/4.8/label?application=axeAPI)

#### 문제 요소

**요소 1**:

```
<input required="" type="checkbox">
```

- **해결 방법**: Fix any of the following:
  Form element does not have an implicit (wrapped) <label>
  Form element does not have an explicit <label>
  aria-label attribute does not exist or is empty
  aria-labelledby attribute does not exist, references elements that do not exist or references elements that are empty
  Element has no title attribute
  Element has no placeholder attribute
  Element's default semantics were not overridden with role="none" or role="presentation"

### 6. link-name

- **영향도**: serious
- **설명**: Ensures links have discernible text
- **도움말**: [자세히 보기](https://dequeuniversity.com/rules/axe/4.8/link-name?application=axeAPI)

#### 문제 요소

**요소 1**:

```
<a href="#" class="empty-link"></a>
```

- **해결 방법**: Fix all of the following:
  Element is in tab order and does not have accessible text

Fix any of the following:
  Element does not have text that is visible to screen readers
  aria-label attribute does not exist or is empty
  aria-labelledby attribute does not exist, references elements that do not exist or references elements that are empty
  Element has no title attribute

## 통과한 항목

- **aria-allowed-attr**: Ensures an element's role supports its ARIA attributes
- **aria-command-name**: Ensures every ARIA button, link and menuitem has an accessible name
- **aria-conditional-attr**: Ensures ARIA attributes are used as described in the specification of the element's role
- **aria-deprecated-role**: Ensures elements do not use deprecated roles
- **aria-hidden-body**: Ensures aria-hidden="true" is not present on the document body.
- **aria-hidden-focus**: Ensures aria-hidden elements are not focusable nor contain focusable elements
- **aria-prohibited-attr**: Ensures ARIA attributes are not prohibited for an element's role
- **aria-required-attr**: Ensures elements with ARIA roles have all required ARIA attributes
- **aria-roles**: Ensures all elements with a role attribute use a valid value
- **aria-valid-attr-value**: Ensures all ARIA attributes have valid values
- **aria-valid-attr**: Ensures attributes that begin with aria- are valid ARIA attributes
- **avoid-inline-spacing**: Ensure that text spacing set through style attributes can be adjusted with custom stylesheets
- **button-name**: Ensures buttons have discernible text
- **color-contrast**: Ensures the contrast between foreground and background colors meets WCAG 2 AA minimum contrast ratio thresholds
- **duplicate-id-aria**: Ensures every id attribute value used in ARIA and in labels is unique
- **form-field-multiple-labels**: Ensures form field does not have multiple label elements
- **image-alt**: Ensures <img> elements have alternate text or a role of none or presentation
- **label**: Ensures every form element has a label
- **link-name**: Ensures links have discernible text
- **nested-interactive**: Ensures interactive controls are not nested as they are not always announced by screen readers or can cause focus problems for assistive technologies

## 검토 필요 항목

- **color-contrast**: Ensures the contrast between foreground and background colors meets WCAG 2 AA minimum contrast ratio thresholds

