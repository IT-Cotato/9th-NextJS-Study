# 글 작성기능 만들기 1 (서버기능 개발은)

3-tier architecture ⬇️

유저가 쓴 글이 바로 DB에 저장되면 위험하니 중간에 서버 둬서 검사하기

---

1. 글 작성 페이지 필요
2. 버튼 누르면 서버에 글 저장해달라고 부탁
3. 서버는 부탁받으면 검사해보고 DB에 저장

---

### 서버 기능 만들려면 app/api (이제 더 신버전, but 아직 안정화X) or pages/api (이걸로 하자) 폴더 생성하자

---

> next.js에서는 자동 라우팅 기능이 있어서 간편하게 누가 api/test로 GET/POST/PUT/DELETE/PATCH 요청하면 파일 안의 코드를 실행해줌

서버는 기능 실행 후에 응답해줘야 함. 안 그러면 무한 대기ㅠ

```javascript
export default function Write() {
  return (
    <div>
      <h4>글작성</h4>
      <form action="/api/test" method="POST">
        <button type="submit">버튼</button>
      </form>
    </div>
  );
}
```

```javascript
export default function handler(요청, 응답) {
  console.log(123);
  return 응답.status(200).json("처리완료");
}
```

method에 따라 다른 응답 주고 싶으면

```javascript
if (요청.method == "POST") {
  return 응답.status(200).json("처리완료");
}
```

#### status code

status(200) - 서버 기능 처리 성공
status(400) - 서버 기능 처리 실패 (유저탓)
status(500) - 서버 기능 처리 실패

---

#### /api/list로 GET 요청시 DB에 있는 글 모두 등장

/api/list ⬇️

```javascript
import { connectDB } from "@/util/database";

export default async function handler(요청, 응답) {
  const db = (await connectDB).db("forum");
  let result = await db.collection("post").find().toArray();

  if (요청.method == "GET") {
    return 응답.status(200).json({ result });
  }
}
```

#### 유저에게 현재 날짜, 시간 보내주는 서버기능

```javascript
export default function handler(요청, 응답) {
  let now = new Date();

  if (요청.method == "GET") {
    return 응답.status(200).json({ now });
  }
}
```

참고 - https://dududweb.tistory.com/15
