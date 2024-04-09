# 글 작성기능 만들기 2

1. 전송버튼 누르면 서버에 글 보냄
2. 서버는 DB에 글 저장

## UI 작성 ⬇️

```javascript
export default function Write() {
  return (
    <div className="p-20">
      <h4>글작성</h4>
      <form action="/api/post/new" method="POST">
        <input name="title" placeholder="글제목" />
        <input name="content" placeholder="글내용" />
        <button type="submit">버튼</button>
      </form>
    </div>
  );
}
```

---

<br>

> DB에 document 하나 발행하기

```javascript
let result = await db.collection("post").insertOne(요청.body);
```

> 응답과 동시에 페이지 이동시키기

```javascript
응답.redirect(302, "/경로");
```

## 서버 기능 작성 ⬇️ /api/post/new

```javascript
import { connectDB } from "@/util/database";

export default async function handler(요청, 응답) {
  if (요청.method == "POST") {
    const db = (await connectDB).db("forum");
    let result = await db.collection("post").insertOne(요청.body);
    return 응답.redirect(302, "/list");
  }
}
```

---

### 예외 처리

> 제목 빈칸일 때 글 저장 막기 & DB 내부 오류 처리 (try-catch문)

```javascript
import { connectDB } from "@/util/database";

export default async function handler(요청, 응답) {
  if (요청.method == "POST") {
    if (요청.body.title == "") {
      return 응답.status(400).json("제목을 입력하세요");
    }
    try {
      const db = (await connectDB).db("forum");
      let result = await db.collection("post").insertOne(요청.body);
      return 응답.redirect(302, "/list");
    } catch (error) {
      return 응답.status(500).json("DB error");
    }
  }
}
```
