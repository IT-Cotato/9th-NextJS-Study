# Next.js 많이 쓰는 이유

client-side rendering에서 server-side rendering이 다시 유행하고 있다!

<br>

## ✔️ CSR

브라우저에서 html을 실시간으로 만드는 방법

> react, vue

### 😇 장점

- 이쁘고 부드러운 사이트 만들 수 있음
- 페이지 이동할 때 아름다운 애니메이션 보여주기 가능
- 이전 페이지에서 불러왔던 리소스를 다음 페이지로 이동할 때 재호출을 하지 않아도 됨

### 😈 단점

- 첫 페이지 로딩 속도 저하 (웹에 접속하는 모든 사람이 React나 Vue와 같은 라이브러리를 같이 다운로드 해야만 함)
- 검색 노출 어려움 (크롤러가 웹을 읽는 타이밍에 HTML을 생성하지 못해서 검색엔진이 해당 웹사이트의 요소들을 파악 못 함)
- bounce rate 지표 낮아짐
- 트래픽 잡기 위해 광고비 많이 듦

  &rarr; 투자 대비 수입 지표가 낮아짐 😭

<br>

## ✔️ SSR

서버에서 HTML 및 CSS 등을 미리 만들어 보내주는 방법

### 😇 장점

- 서버에서 html을 미리 만들어줘서 CSR의 단점들이 사라짐
- 첫 페이지 로딩 속도 빠름 (Javascript가 HTML을 생성하기도 전에 이미 만들어진 HTML을 보여줄 수 있으므로)

### 😈 단점

- HTML을 그려줄 수는 있어도 실제로 브라우저가 렌더링 한 것이 아님

  &rarr; Javascript의 코드를 DOMElement와 매칭시켜서 동적인 페이지를 구현하지는 못함

&rarr; 이렇게 메마른 웹 페이지에는 수분 공급(Hydration)이 필요함

<br>

## ⭐️ Next.js - SSR과 CSR 병행 사용!

### 😇 장점

- useState, useEffect, react-query, redux, ajax, react-router, props 필요 없어짐
- 서버 개발 쉽게 입문 가능

  &rarr; 풀스택 개발 쉽게 가능 ..❗️❗️

- 폴더 기반 자동 라우팅
- 새로 디자인 한 서버 API 기능
- 쉬운 DB 연결
- 직관적인 rendering 전략 선택 가능
- hydration 없는 SSR
- 파워풀한 캐싱
- 이미지 & 폰트 최적화
- 회원 인증 기능: Next-auth 라이브러리 쓰면 간단!
- 리액트 문법 사용 &rarr; 쉽게 입문 가능

### 😈 단점

- 리액트 라이브러리의 신문법 (client componetn, server component) 구분해서 코드 짜는 것이 불편
- WebSocket, WebRTC는 직접 Nodejs + express 서버 만들어야 함
- 자체 버그 있음
