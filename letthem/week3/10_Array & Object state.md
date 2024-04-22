# 좋아요 버튼 만들기 2 (array, object state 변경하려면)

문제 상황 : 과일 수량 + 누르면 3개 동시에 + 됨 😭

---

array 추가하고 이렇게 하면 되지 않을까? ⬇️

```javascript
let [수량, 수량변경] = useState([0, 0, 0]);

...

<span>{수량[0]}</span>
<button onClick={()=>{
  수량[0]++
  수량변경(수량)
}}>+</button>
```

&rarr; 안 됨..!

---

그냥 하면 안 되고 **복사**를 해서 해야 함 ⬇️

```javascript
let [수량, 수량변경] = useState([0, 0, 0]);

...

<span>{수량[0]}</span>
<button
  onClick={() => {
    let copy = [...수량];
    copy[0]++;
    수량변경(copy);
  }}
>
  +
</button>
```

react에서 state 변경 함수 사용할 때(ex. 수량변경(copy)) 내부 로직이

**새 state == 기존 state 일 경우 변경해주지 않음**

&rarr; 기존의 state를 복사하고 그것을 수정한 후에 넣어줘야 함

### ❓ 그럼 let copy = 수량 은 왜 안 될까?

&rarr; copy랑 수량은 같기 때문! state 변경 안 시켜줌 😭

```javascript
let arr = [1, 2, 3];
let arr2 = arr; // [1, 2, 3]이 아니라 화살표를 복사한 것임. arr2를 수정해도 arr2는 arr와 같음
```

array나 object 자료를 만들면 변수에는 **해당 배열이 어디에 있는지 가리키는 화살표**만 저장됨

### 💡 let copy = [...수량] 은 왜 될까?

&rarr; 완전히 독립적인 array를 만들어서 복사해준 것이므로!

### 💡 ... - spread 연산자 : 괄호 벗기기

&rarr; 괄호 벗기고 다시 [] 감싸주면 새로운 array로 인식해서 화살표가 달라짐 😊

---

## 정리

> array / object인 state의 경우❗&rarr; ...로 복사해서 수정하고 state 변경함수 쓰자

- array : [...array]
- object : {...object}

> 숫자 / 문자 / boolean의 경우❗&rarr; 복사할 필요 X

## 과제

+, - 버튼 &rarr; map함수 이용

```javascript
"use client";

import { useState } from "react";

export default function List() {
  let 상품 = ["Tomatoes", "Pasta", "Coconut"];
  let [수량, 수량변경] = useState([0, 0, 0]);
  return (
    <div>
      <h4 className="title">상품목록</h4>
      {상품.map((a, i) => {
        return (
          <div className="food" key={i}>
            <img src={`/food${i}.png`} className="food-img" />
            <h4>{a} $40</h4>
            <button
              onClick={() => {
                let copy = [...수량];
                copy[i]--;
                수량변경(copy);
              }}
            >
              -
            </button>
            <span> {수량[i]} </span>
            <button
              onClick={() => {
                let copy = [...수량];
                copy[i]++;
                수량변경(copy);
              }}
            >
              +
            </button>
          </div>
        );
      })}
    </div>
  );
}
```
