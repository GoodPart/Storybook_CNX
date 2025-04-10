# 📖 RangeSlider
범위형 슬라이더 사용법 파일입니다.

## ✏️ 기존 코드
```html
<div id="rangeSliderbar_1" class="ui-slider" >
  <input type="text" class="ui-textfield" id="left_value" value=""> 
   <div class="middle">
      <div class="range-slider--multi">
          <input type="range" id="input-left" min="0" max="100" step="2" value="25" >
          <input type="range" id="input-right" min="0" max="100" step="2" value="75" >
  
          <div class="fake-form">
              <div class="track"></div>
              <div class="range"></div>
              <div class="thumb left"></div>
              <div class="thumb right"></div>
          </div>
      </div>
  </div> 
   <input type="text" class="ui-textfield" id="right_value" value=""> 
</div>
```

```javascript
const rangeSlider = new RangeSlider(getEle,{
  divisionId : "#rangeSliderbar_1",
  ioLeft : "#input-left", 
  ioRight :"#input-right",
  valueLeft :"#left_value",
  valueRight : "#right_value",
  fakeLeft : ".fake-form > .thumb.left",
  fakeRight :".fake-form > .thumb.right",
  fakeRange : ".fake-form > .range"
});

rangeSlider.init()
```

## 🛠️ 개선 코드
```html
<div id="rangeSliderbar_1" class="ui-slider" >
    <input type="range" id="input-left">
    <input type="range" id="input-right">
</div>
```
```javascript
new RangeSlider2(getEle,{
  extensionUnit : string,
  showValue : boolean,
  step : number,
  leftProps : {
    id : string,
    // disabled : boolean, //제거
    values : {
      min : number, 
      max : number, 
      currentValue : number 
    }
  },
  rightProps : {
    ...leftProps
  },
  themeOptions : {
    ... 테마 옵션
  }
})
```

## 📚 옵션별 타입-(필수 파라미터)<span style="color : red">*</span> 
<table>
<tr>
  <th>NAME</th>
  <th>TYPE / DEFAULT</th>
  <th>DESCRIPTION</th>
</tr>
<tr>
  <td>rootElement <span style="color : red">*</span></td>
  <td><strong style="color : tomato">string</strong> = ''</td>
  <td>range slider의 부모 id를 찾기 위함이며, '#'을 포함한('#rootElement')형식으로 작성해야 함</td>
</tr>
<tr>
  <td>extensionUnit</td>
  <td><strong style="color : tomato">string</strong> = ''</td>
  <td>값 뒤 @를 삽입하기 위해 사용, 16+'extensionUnit'</td>
</tr>
<tr>
  <td>showValue</td>
  <td><strong style="color : skyblue">boolean</strong> = false</td>
  <td>슬라이더의 좌우 value를 보기 위한 옵션</td>
</tr>
<tr>
  <td>step <span style="color : red">*</span></td>
  <td><strong style="color : orange">number</strong> = 1</td>
  <td>range slider의 1틱 당 값</td>
</tr>
<tr>
  <td>toolTip</td>
  <td><strong style="color : gray">object</strong> = {...}
  <td>
    <table>
        <tr>
          <th>NAME</th>
          <th>TYPE / DEFAULT</th>
          <th>DESCRIPTION</th>
        </tr>
        <tr>
          <td>direction</td>
          <td><strong style="color : tomato">string</strong> = 'top'</td>
          <td>툴팁의 방향 옵션 ['top', 'bottom']</td>
        </tr>
        <tr>
          <td>mode</td>
          <td><strong style="color : tomato">string</strong> = 'active'</td>
          <td>툴팁 정보의 노출 방법 옵션 ['active', 'hover']</td>
        </tr>
        <tr>
          <td>effect</td>
          <td><strong style="color : skyblue">boolean</strong> = false</td>
          <td>툴팁 정보의 인터렉션 사용 유무</td>
        </tr>
      </table>
  </td>
</tr>
<tr>
  <td>leftProps <span style="color : red">*</span></td>
  <td><strong style="color : gray">object</strong> = {...}</td>
  <td>
    <table>
      <tr>
        <th>NAME</th>
        <th>TYPE / DEFAULT</th>
        <th>DESCRIPTION</th>
      </tr>
      <tr>
        <td>id <span style="color : red">*</span></td>
        <td><strong style="color : tomato">string</strong> = ''</td>
        <td>좌측 슬라이더의 id값</td>
      </tr>
      <tr style="text-decoration : line-through">
        <td >disabled</td>
        <td><strong style="color : skyblue">boolean</strong> = false</td>
        <td>좌측 슬라이더 disabled</td>
      </tr>
      <tr>
        <td>values <span style="color : red">*</span></td>
        <td><strong style="color : gray">object</strong> = {...}</td>
        <td>
          <table>
            <tr>
              <th>NAME</th>
              <th>TYPE / DEFAULT</th>
            </tr>
            <tr>
              <td>min <span style="color : red">*</span></td>
              <td><strong style="color : orange">number</strong> = 0</td>
            </tr>
            <tr>
              <td>max <span style="color : red">*</span></td>
              <td><strong style="color : orange">number</strong> = 0</td>
            </tr>
            <tr>
              <td>currentValue <span style="color : red">*</span></td>
              <td><strong style="color : orange">number</strong> = 0</td>
            </tr>
          </table>
        </td>
      </tr>
    </table>
  </td>
</tr>
<tr>
  <td>rightProps <span style="color : red">*</span></td>
  <td><strong style="color : gray">object</strong> = {...}</td>
  <td>same as leftProps</td>
</tr>
<tr>
  <td>themeProps</td>
  <td><strong style="color : gray">object</strong> = {...}</td>
  <td>not yet</td>
</tr>
</table>

## 📚 메소드
<table>
  <tr>
    <th>NAME</th>
    <th>TYPE / DEFAULT</th>
    <th>DESCRIPTION</th>
  </tr>
  <tr>
    <td>onChange</td>
    <td><strong style="color : violet">function</strong>(<strong style="color : tomato">string</strong>, <strong style="color : gray">event</strong>){ console.log(event) }</td>
    <td>string에['left', 'right']를 사용해 input과 value를 조회</td>
  </tr>
  <tr>
    <td>getValue</td>
    <td><strong style="color : violet">function</strong>(<strong style="color : tomato">string</strong>){ console.log(event) }</td>
    <td>string에['left', 'right']를 사용해 value를 조회</td>
  </tr>
  <tr>
    <td colspan="3">...</td>
  </tr>
</table>

<br />
<br />

# 📌 이슈 및 처리
## # 슬라이더 겹침으로 인한 사용자 경험 이슈
슬라이더의 z-index는 서로 같아 `동일값(겹침)`은 `handleBar`가 겹쳐 우측 슬라이더 밖에 조작할 수 없음.

#### 해결
> input.addEventListener("focus")와 input.addEventListener("blur")를 사용해 z-index 변경

## # 0이하 소수로 넘어갈 경우 계산식
현재 `소수(0 이하)`를 지원하지 않음.

#### 수정 예정
> Math.toFixed(number)를 이용해 원하는 자리수 까지 노출될 수 있도록 수정

## # 좌, 우측 input에 id가 강제 됨
```html
<div id="rangeSliderbar_1" class="ui-slider"  style="padding : 40px">
  <input type="range" id="input-left"> <!-- 요기 -->
  <input type="range" id="input-right"> <!-- 요기 -->
</div>
```
`id`에 `input-left, input-right`값이 강제되고 있다.


#### 수정 예정
> 해당값은 사용자에 의해 변경될 수 있도록 해야 함. 따라서, `id`는 최상단 `rangeSliderbar_1`만 사용하여 하위 요소들의 `id`를 생성할 필요가 있음
> disabled 옵션은 사용하지 않는다고함. (제거) - 2025.04.07
> 기존 JS에서 TS로 변경 - 2025.04.07