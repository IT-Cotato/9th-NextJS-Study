# Next.js 설치와 개발환경 셋팅

### Next.js 설치

`npx create-next-app@latest --experimental-app`

13.2.4 버전으로 진행

<br>

### 폴더 구조

page.js(index.js) : main page
<br>
layout.js(\_document.js) : page.js를 감싸는 파일
<br>
global.css : 전역적인 css
<br>
api 폴더 : 서버 기능

<br>
<br>

# 여러 페이지 만들기 (라우팅)

### 페이지 만들기

Routing : url을 통해 페이지를 결정
<br>
app 폴더 안에 폴더를 만들면 자동으로 라우팅 (list/index.js는 url이 /list일 때 보여지는 페이지)

<br>

### 상단 메뉴 만들기

`Link` : Link 컴포넌트를 통해 라우팅

```jsx
<Link href="/"></Link>
```

공통된 컴포넌트는 layout.js(\_document.js)에 작성
<br>
상위 폴더에 있는 layout.js가 있으면 중첩으로 감싸서 렌더링

<br>
<br>

# 페이지 레이아웃 만들기 (React 기초문법)

### 레이아웃 만들기

리액트 문법을 사용(JSX)

- `return`안에 HTML 넣기
- 부모 태그 하나가 필수로 존재
- tag class는`clssName`을 통해 지정
- data binding을 통해 자바스크립트 변수 사용 가능
- inline style을 통해 css 적용 가능

<br>
<br>

# html을 반복문으로 줄이고 싶으면 map

### 상품 목록 불러오기

map 함수를 사용해서 배열에 있는 원소를 반복해 중복되는 HTML 코드를 제거
<br>
반복되는 코드는 key 속성을 통해 unique한 값을 가지도록 해야함

<br>
<br>

# Next.js에서 이미지 넣는 법 2개

# 이미지 넣기

`<img>` 태그에서 `src` 속성 사용
<br>
public 폴더에 있는 이미지는 루트 경로에서 접근 가능

<br>

# 이미지 최적화

### layout shift

이미지를 천천히 불러오는 방법
<br>
`<Image>` 태그 사용
<br>
사진은 반드시 import 하여 사용
<br>
외부 이미지는 정확한 `width`, `height` 지정 필요하고, next.config.js에서 경로 설정 필요

<br>
<br>

# client server component

### 컴포넌트

복잡한 html을 한 태그로 축약
<br>
컴포넌트를 만드는 단계

1. function 정의
2. return에 html 정의
3. 원하는 곳에서 사용

재사용이 많은 구조를 컴포넌트화 하여 반복 사용

<br>

### Next.js에서 컴포넌트

**Serer Component**

별다른 저정의 없이 만든 컴포넌트
<br>
html에 자바스크립트 기능 사용 불가 (onClick)
<br>
useState, useEffect 사용 불가
<br>
로딩속도가 빠르고, SEO에 유리 (SSR 특징)

**Client Component**

파일 맨 위에 'use client'로 선언
<br>
리액트에서 사용하던 컴포넌트
<br>
로딩속도가 느리고, hydractoin이 필요

**큰 페이지들은 server component, JS 기능이 필요한 곳만 client component**

<br>
<br>

# Component에 데이터를 전해주려면 props
