# Storybook CNX
프레임워크별 컴포넌트에 대한  결과물을 하나의 UI에서 확인할 수 있도록 함.<Br />
이는 Storybook에 [Composition](https://storybook.js.org/docs/sharing/storybook-composition)을 사용함.

<br />

## Install

**./Storybook_CNX**
```javascript
npm i
```

**./Storybook_CNX/storybook-{OTHER-FRAMEWORK}**
```javascript
npm i
```
자식 스토리북 설치에 추가사항이 있다면 `README.md`파일 수정.

<br />


## usage
아래 실행 방법중 하나를 사용.

#### 1. 한번에 실행
./Storybook_CNX에서 아래 커맨드를 통해 실행가능
```javascript
npm run start
```

> 자식 스토리북이 병렬로 실행되고, 마지막(5초 뒤) 최 상단 스토리북이 실행됨. 경우에 따라 정상적으로 보이지 않을때가 있음.
그럴땐 `다른 실행`법을 사용

#### 2. 두번 시도 실행
./Storybook_CNX에서 아래 커맨드를 순서대로 진행하여 실행가능
```javascript
npm run dev

//npm run dev 실행 완료 확인 후
npm run storybook
```

> 자식 스토리북을 병렬로 실행하고, 정상 실행 확인 후 최상단 스토리북을 실행하는 방식.<br />
이를 위해, 최상단 `package.json/scripts/devs` 수정이 필요.


#### 3. 각자 실행
자식 스토리북애서 아래 커맨드를 실행한뒤, 최상단 스토리북에서 같은 커맨드를 실행하면 됨.
```javascript
npm run storybook
```

<br />


## Port number rull
> 최상위 스토리 : 6008<br />
자식 스토리 : 6007, 6006 ...

<br />

## 스토리지별 환경

<table>
  <thead>
    <tr>
      <th>위치</th>
      <th>설명</th>
      <th>프레임워크</th>
      <th>스타일</th>
      <th>비고</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>Root Storybook</td>
      <td>최상단 스토리북</td>
      <td>react-vite</td>
      <td>vanilla extract</td>
      <td>최상단에 MDX파일에 대한 스타일링을 위해 vanilla extract을 사용함</td>
    </tr>
    <tr>
      <td>../React Storybook</td>
      <td>리엑트 스토리북</td>
      <td>react-vite</td>
      <td>vanilla extract, SCSS</td>
      <td>둘다 사용할 수 있도록 함</td>
    </tr>
    <tr>
      <td>../Core Storybook</td>
      <td>코어 스토리북</td>
      <td>html-vite</td>
      <td>SCSS</td>
      <td>정적 작업물을 위한 스토리북으로, scss를 사용함</td>
    </tr>
  </tbody>
</table>

자세한 스팩은 각 스토리북의 `package.json` 참고.

<br />

## 멀티 Docs 템플릿 파일 생성법
최상단 스토리는 각 스토리북의 결과물을 한눈에 확인하기 위함.<br />
따라서, 각 스토리북에 대한 정의를 약속된 템플릿을 통해 확인할 수 있어야 함.
아래 파일을 이용해 기본 템플릿을 생성할 수 있다.
> Storybook_CNX/generator.ts

생성된 템플릿은 아래 경로에 생성됨
```json
Storybook_CNX/src/stories/
```

<br />

## 템플릿 생성 커맨드
해당 커맨드 실행전 생성할 템플릿의 정의가 필요함.
```ts
npm run generate:template
```
<br />


### DataSet
생성할 템플릿에 적용될 데이터를 작성해야함.
```ts

/* 
  // Storybook_CNX/generator.ts

  기본 data 설정 
*/
const data = {
    name : comfirmAnswer, // 컴포넌트의 이름
    path : path+comfirmAnswer, // 컴포넌트에 대한 멀티Docs 템플릿 경로
    data :  [
        {
            name : "React",
            path : {
                port : "6007",
                componentLocation : "atom-input-variant--default" 
            },
            code : [{
                extention : "tsx",
                location : "storybook-react/src/stories/Atom/Input/variant/Input.tsx"
            }]
        },
        {
            name : "Core",
            path : {
                port : "6006",
                componentLocation : "atom-input-component--default" 
            },
            code : [
                {
                    extention : "html",
                    location : "storybook-core/src/stories/Input/input.html"
                },
                {
                    extention : "css",
                    location : "storybook-core/src/stories/Input/input.css"
                },
                {
                    extention : "js",
                    location : "storybook-core/src/stories/Input/input.js"
                }
        ]
        }
    ]
};
```

<br />

아래 `data.data`는 `객체배열`로 배열의 길이만큼 생성되는 템플릿의 언어변경 탭의 갯수를 제어할 수 있음.

```ts
data.data : [{...}]
```

<br />

`data.data`의 파라미터마다의 특징이다.

<table>
  <thead>
    <tr>
      <th>이름</th>
      <th>설명</th>
      <th>타입</th>
      <th>비고</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>name</td>
      <td>자식 스토리북의 타입</td>
      <td>String</td>
      <td>해당 명칭은 템플릿에서 버튼의 이름으로 사용됨</td>
    </tr>
    <tr>
      <td>path</td>
      <td>자식 스토리북의 포트와 노출시킬 `variant`를 선언함</td>
      <td>object</td>
      <td>
      <table>
        <thead>
          <th>이름</th>
          <th>설명</th>
          <th>타입</th>
        </thead>
        <tbody>
          <tr>
            <td>port</td>
            <td>컴포넌트가 존재하는 자식스토리의 포트번호</td>
            <td>String</td>
          </tr>
          <tr>
            <td>componentLocation</td>
            <td>멀티 Docs에 iframe 형태로 노출될 컴포넌트명, 아래 예시 참고</td>
            <td>String</td>
          </tr>
        <tbody>
      </table>
      </td>
    </tr>
    <tr>
      <td>code</td>
      <td>코드삽입을 위한 컴포넌트 위치와 확장자, 기준 ->'Storybook_CNX/'</td>
      <td>object</td>
      <td>
      <table>
        <thead>
          <th>이름</th>
          <th>설명</th>
          <th>타입</th>
        </thead>
        <tbody>
          <tr>
            <td>extention</td>
            <td>파일의 확장자</td>
            <td>String</td>
          </tr>
          <tr>
            <td>location</td>
            <td>코드의 위치/컴포넌트</td>
            <td>String</td>
          </tr>
        <tbody>
      </table>
      </td>
    </tr>
    
  </tbody>
</table>


<br />