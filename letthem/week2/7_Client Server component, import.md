# Client/Server component

```javascript
export default function Cart() {
  return (
    <div>
      <h4 className="title">Cart</h4>
      <div className="cart-item">
        <p>상품명</p>
        <p>$40</p>
        <p>1개</p>
      </div>
      <div className="cart-item">
        <p>상품명</p>
        <p>$40</p>
        <p>1개</p>
      </div>
    </div>
  );
}
```

반복이 있네,,😿

map으로 반복생성해도 좋을듯?

## Component

### 길고 복잡한 HTML을 한 단어로 축약해보자 ❗️

1. function 작명(){}

   작명: 영어 대문자로 시작 &rarr; 컴포넌트 이름이 됨

   다른 function 바깥에 만드는 게 좋음

2. return (축약할 긴 HTML)

3. 원하는 위치에 <작명 /> 사용

```javascript
export default function Cart() {
  return (
    <div>
      <h4 className="title">Cart</h4>
      <CartItem />
      <CartItem />
      <CartItem />
    </div>
  );
}

function CartItem() {
  return (
    <div className="cart-item">
      <p>상품명</p>
      <p>$40</p>
      <p>1개</p>
    </div>
  );
}
```

컴포넌트도 map() 사용하여 반복 가능 ❗️

### 😇 장점

- 더러운 코드 한 단어로 축약
- 같은 코드 재사용
- page.js 만들 때

### 😈 단점

- 컴포넌트끼리 props 데이터 공유하기 힘듦.

  &rarr; 재사용이 잦은 HTML 덩어리들을 만드는 게 좋음.

<hr>

## Next.js는 컴포넌트 종류가 2개..❗️

1. server component

   아무데나 대충 만든 것

   #### 😇 장점

   - 로딩 속도 빠름
   - 검색 엔진 노출 유리

   #### 😈 단점

   - HTML에 Javascript 기능 넣기 불가능
     ex) onClick, useState, useEffect (X)

2. client component

   파일 맨 위에 'use client' 넣고 만든 것

   &rarr; 해당 파일에 있는 모든 컴포넌트는 모두 client component가 된다.

   #### 😇 장점

   - HTML에 Javascript 기능 넣기 가능
     ex) onClick, useState, useEffect (O)

   #### 😈 단점

   - 로딩 속도 느림 (자바스크립트 많이 필요, hydration 필요)
     - hydration: html 유저에게 보낸 후에 자바스크립트로 html을 다시 읽고 분석하는 일
   - 검색 엔진 노출 불리

> 큰 페이지들은 server component

> Javascript 기능 필요한 곳에만 client component

<br>

# import & export

### 다른 파일에서 현재 파일로 가져다 쓰고 싶으면

1. 내보내는 파일에서 export default 해주고
2. 현재 파일에서 import 작명 from "경로";

### 경로

- ./ : 현재 폴더에서 이동
- ../ : 부모 폴더에서 이동

### export

- export default는 파일마다 1회 사용가능

- 여러 개 export 하고 싶으면 export {age, name}
- {} 내부에는 변수나 함수 가능

- export ~~default~~ {age, name} &rarr; ERROR

- import 할 때도 import {age, name}

<hr>
  
data.js ⬇️

```javascript
let age = 20;
let name = "Sim";

export { age, name };
```

hello.js ⬇️

```javascript
let hi = "안녕하세요";

export default hi;
```

page.js ⬇️

```javascript
import { age, name } from "./data.js";
import hi from "./hello.js";

export default function Cart() {
  return (
    <div>
      <h4 className="title">Cart</h4>
      <div className="cart-item">
        <p>상품명 {age}</p>
        <p>$40</p>
        <p>1개</p>
      </div>
      <div className="cart-item">
        <p>{hi}</p>
        <p>$40</p>
        <p>1개</p>
      </div>
      <CartItem />
      <CartItem />
      <CartItem />
    </div>
  );
}

function CartItem() {
  return (
    <div className="cart-item">
      <p>상품명</p>
      <p>$40</p>
      <p>1개</p>
    </div>
  );
}
```
