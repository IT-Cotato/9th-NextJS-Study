# 삭제기능 만들기 3 (query string / URL parameter)

## 애니메이션 줘보자!!

1. 애니메이션 동작 전 / 동작 후 스타일 결정
   - 박스의 opacity : 1 &rarr; opacity : 0 으로
2. 애니메이션 동작 전 스타일 넣기
3. transition도 넣기

```css
.list-item {
  opacity: 1;
  transition: all 1s; /* 1초에 걸쳐서 서서히 변화 */
}
```

ListItem.js ⬇️

```javascript
<span
  onClick={(e) => {
    fetch("/api/post/delete", {
      method: "DELETE",
      body: result[i]._id,
    })
      .then((r) => {
        if (r.status == 200) {
          return r.json();
        } else {
          // 서버가 에러코드 전송시 실행할 코드
        }
      })
      .then((result) => {
        // 성공시 실행할 코드
        e.target.parentElement.style.opacity = 0;
        setTimeout(() => {
          e.target.parentElement.style.display = "none";
        }, 1000);
      })
      .catch((error) => {
        //인터넷 문제로 실패시 실행할 코드
        console.log(error);
      });
  }}
>
  🗑️
</span>
```

> e.target.parentElement.style.opacity = 0;

onClick에 e 넣어주고, e.target 하면 클릭시 span 태그를 선택하는 것이므로 바로 부모인 div (list-item) 의 style을 변경해줌!!

> setTimeout(() => {e.target.parentElement.style.display = "none";}, 1000);

1초 뒤에 div박스 사라지게 하기

---

## 서버로 데이터 보내는 법

서버기능들 = api

- fetch는 body에 넣기
- &lt;form&gt;은 &lt;input&gt;에 넣기

---

### query string

> fetch("/api/test?name=kim&age=20");

handler에서 요청.query로 받아오기!

#### 👼 장점 : 간단함, GET 요청도 데이터 전송 가능

원래는 GET 요청할 때 body 못 넣었었는데 가능

#### 🥵 단점 : 데이터 많으면 더러움. URL에 데이터 노출됨

---

### URL 파라미터 문법 (dynamic router 이용)

> api/abc/[~].js

/api/abc/아무문자로 요청하면 [~].js 실행해줌

URL 파라미터 문법 사용해도 서버로 데이터 전송 가능

handler에서 요청.query로 받아오기!

---

### URL 파라미터 문법으로 코드 수정!

ListItem.js ⬇️

```javascript
fetch(`/api/post/delete/${result[i]._id}`, {
  method: "DELETE",
});
```

api/post/delete/[id].js ⬇️

```javascript
import { connectDB } from "@/util/database";
import { ObjectId } from "mongodb";

export default async function handler(요청, 응답) {
  if (요청.method == "DELETE") {
    try {
      const db = (await connectDB).db("forum");
      let result = await db
        .collection("post")
        .deleteOne({ _id: new ObjectId(요청.query.id) });

      if (result.deletedCount == 0) {
        응답.status(500);
      } else {
        응답.status(200).json("삭제완료");
      }
    } catch (error) {
      응답.status(500);
    }
  }
}
```
