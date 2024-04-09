# 수정기능 만들기 2

### 그 전에 navbar 만들기 ⬇️ 

layout.js

```javascript
<div className="navbar">
  <Link href="/" className="logo">
    Appleforum
  </Link>
  <Link href="/list">List</Link>
</div>
```

```css
.navbar {
  background-color: white;
  padding: 20px;
}
.navbar a {
  margin-right: 10px;
  text-decoration: none;
  color: black;
}
.logo {
  font-weight: bold;
}
```

---

## 버튼 누르면 DB글 수정 ⬇️

유저에게 수정 원하는 글의 \_id도 보내게 함.

안 보이게 {{display: "none"}} 으로 해서 데이터만 보내게 함

> \_id같은 건 DB에서 ObjectId 등으로 싸여 있으니 문자로 풀어줘야 함. &rarr; toString()

app/edit/[id]/page.js ⬇️

```javascript
<input
  style={{ display: "none" }}
  name="_id"
  defaultValue={result._id.toString()}
/>
```

---

## 서버 통해 DB 수정 ⬇️

> \_id같은 건 DB로 보낼 때 string이 아닌 ObjectId 등으로 씌워 줘야 함. &rarr; new ObjectId(요청.body.\_id)

pages/api/post/edit.js ⬇️

```javascript
import { connectDB } from "@/util/database";
import { ObjectId } from "mongodb";

export default async function handler(요청, 응답) {
  if (요청.method == "POST") {
    let 바꿀거 = {
      title: 요청.body.title,
      content: 요청.body.content,
    };
    const db = (await connectDB).db("forum");
    let result = await db
      .collection("post")
      .updateOne({ _id: new ObjectId(요청.body._id) }, { $set: 바꿀거 });
    응답.redirect(302, "/list");
  }
}
```

---

추가 ⬇️

{$inc : 1} 하면 title이 123이었을 때 124로 변경됨!

---

### 핵심 ⬇️

1. document 수정 &rarr; updateOne()
2. 서버에 필요한 데이터가 없으면
   1. 유저에게 보내라고 하거나 ✅
   2. DB 조회
