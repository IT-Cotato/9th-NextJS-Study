# 수정기능 만들기 1

1. 글마다 수정버튼, 누르면 수정페이지 이동
2. 수정페이지 만들기 (글 가져와서 채워놔야 함)
3. 발행 누르면 DB에 있던 글 수정

---

## list/page.js

수정페이지 Link 생성

```javascript
<Link href={"/edit/" + result[i]._id}>🖊️</Link>
```

---

app/edit/[id]/page.js

## 수정페이지 UI 작성 ⬇️ 

```javascript
export default function Edit() {
  return (
    <div className="p-20">
      <h4>수정페이지</h4>
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

## 글 DB에서 가져와서 채워 넣기 ⬇️ 

```javascript
import { connectDB } from "@/util/database";
import { ObjectId } from "mongodb";

export default async function Edit(props) {
  const db = (await connectDB).db("forum");
  let result = await db
    .collection("post")
    .findOne({ _id: new ObjectId(props.params.id) });

  return (
    <div className="p-20">
      <h4>수정페이지</h4>
      <form action="/api/post/new" method="POST">
        <input name="title" defaultValue={result.title} />
        <input name="content" defaultValue={result.content} />
        <button type="submit">버튼</button>
      </form>
    </div>
  );
}
```

---

> document 수정 - updateOne()

```javascript
await db.collection('post').updateOne({수정할 게시물 정보}, {$set : {수정할 내용}})
```

ex ⬇️

```javascript
await db
  .collection("post")
  .updateOne({ _id: 1 }, { $set: { title: "바보", content: "바보2" } });
```

---

연산자 종류 ⬇️

- $set - 기존 값을 바꿔줌. 만약에 없으면 추가해줌

- $unset - 기존에 있던 키값을 제거해줌

- $inc - 기존 값이 숫자면 거기에 숫자를 더하거나 뺄 때 사용
