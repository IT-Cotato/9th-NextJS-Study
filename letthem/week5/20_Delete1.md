# 삭제기능 만들기 1 (Ajax)

- 삭제버튼 누르면 삭제됨
- 박스가 서서히 사라지는 애니메이션 추가
  &rarr; JS 필요할듯,,

list 페이지를 use client로 바꿔보자

but, 검색이점 없어지므로 큰 페이지는 서버컴포넌트로 남겨놔야 함.

**JS 기능 넣을 부분만 클라이언트 컴포넌트로 만들자!**

---

### 글 목록 (ListItem)을 client component로 만들자

> ❗ result가 부모(List)에 있고 자식(ListItem)에 없어서 에러 뜸

- 해결법 1 : props 전달

- 해결법 2 : let result = DB에서 게시물 가져오기 ✅

복잡할 땐 DB에서 가져오는 게 좋음

client component에서 DB 데이터 가져오려면 ❓

useEffect 사용해서 서버에게 데이터 요청하는 방식 가능

but, 검색노출 어려울 수도.

useEffect는 HTML 다 실행되고 나서야 실행되므로 user(=검색엔진 봇)한테 늦게 뜸

---

### server component(List) 안에 client component(ListItem) 있고, client component가 DB 데이터 필요한 상황

1. server component(List)에서 let result = DB 게시물 가져오기

```javascript
import { connectDB } from "@/util/database";
import ListItem from "./ListItem";

export default async function List() {
  const db = (await connectDB).db("forum");
  let result = await db.collection("post").find().toArray();

  return (
    <div className="list-bg">
      <ListItem result={result} />
    </div>
  );
}
```

2. props로 (ListItem)에 전송

   > props로 받아서 props.result로 써도 됨.

   > but, 간편하게 **destructuring 문법**으로 {result}로 바로 받아와서 result로 쓰기!

```javascript
"use client";
import Link from "next/link";

export default function ListItem({ result }) {
  return (
    <div>
      {result.map((a, i) => {
        return (
          <div className="list-item">
            <Link href={"/detail/" + result[i]._id}>
              <h4>{result[i].title}</h4>
            </Link>
            <Link href={"/edit/" + result[i]._id}>🖊️</Link>
            <p>1월 1일</p>
          </div>
        );
      })}
    </div>
  );
}
```

---

### 삭제 기능 만들기

form 태그 말고도 get, post요청 (서버 요청) 할 수 있는 방법이 있음..!!

> # Ajax

client component 안에서만 쓸 수 있음
fetch() 함수 써야해서ㅠ

- ### GET 요청 : fetch('/url')

- ### GET 요청 : fetch('/url', { method : 'GET'})

- ### POST 요청 : fetch('/url', { method : 'POST'}, body : '데이터')

  - array를 데이터로 보낼 때 - **body : JSON.stringify( [1,2,3] )**
  - object를 데이터로 보낼 때 - **body : JSON.stringify( {name : 'kim'} )** 이런식으로 전송
  - JSON에 붙은 따옴표 제거하고 싶을 때 (다시 객체나 배열로) - **JSON.parse()**

- ### PUT 요청 : fetch('/url', { method : 'PUT'})

- ### DELETE 요청 : fetch('/url', { method : 'DELETE'})

- ### 요청 완료시 코드 실행 .then()

> form 태그로 요청하면 새로고침 O

> Ajax로 요청시 새로고침 X
