# 좋아요 버튼 만들기 (useState, onClick)

클릭시 JS코드 실행하려면 **client component**에서만 사용 가능!

## onClick

```javascript
'use client'

...

<button onClick={()=>{...}}>+</button>
```

이벤트 종류 ⬇️

- 클릭 - onClick
- 마우스 갖다대기 - onMouseOver
- ...

---

## useState

변수 : 데이터 잠깐 저장 가능

```javascript
let 수량 = 0;
```

state : 데이터 잠깐 저장 가능

```javascript
"use client";
import { useState } from "react";

let [수량, 수량변경] = useState(0); // [state이름, state 변경 도와주는 함수이름] = state 하나 만든 것 (초기값 - 숫자, 문자, 배열 다 가능)
```

### 😇 state 장점

- state 변경되면 state 쓰는 html부분도 <span style="color: pink">**자동으로 재렌더링**</span>됨!!!!
  &rarr; **자동**으로 다시 그려줌

state 변경은 state 변경함수() 써야함

```javascript
onClick={() => {수량변경(1);}} // () 안에 들어있는 1로 기존 state를 갈아치움 - X
```

우리가 원하는 것 ⬇️

```javascript
onClick={() => {수량변경(수량 + 1);}} // 기존 수량+1 만큼 기존 state를 갈아치움 - O
```

### state 용도

- 데이터가 바뀌었을 때 바뀐 사항이 자동으로 html에 반영이 되어야 하는 상황에서 사용
