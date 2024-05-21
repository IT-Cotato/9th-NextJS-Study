# 댓글기능 만들기 1 (input 데이터 다루기)

client-side rendering 해보자! -> 댓글 전송했을 때 새로고침 없도록

fetch() -> client 컴포넌트

form 태그 쓰면 새로고침되므로 안 쓰고 input에 입력된 값을 state에 저장함!

onChange하면 유저가 input에 뭘 입력할 때마다 실행됨!!

detail/[id]/Comment.js ⬇️

```javascript
"use client";

import { useState } from "react";

export default function Comment() {
  let [comment, setComment] = useState("");
  return (
    <div>
      <div>댓글목록보여줄부분</div>
      <input
        onChange={(e) => {
          setComment(e.target.value);
        }}
      />
      <button
        onClick={() => {
          fetch("/URL", { method: "POST", body: comment });
        }}
      >
        댓글전송
      </button>
    </div>
  );
}
```

detail/[id]/page.js ⬇️

```javascript
import { connectDB } from "@/util/database";
import { ObjectId } from "mongodb";
import Comment from "./Comment";

export default async function Detail(props) {
  const db = (await connectDB).db("forum");
  let result = await db
    .collection("post")
    .findOne({ _id: new ObjectId(props.params.id) });

  return (
    <div>
      <h4>상세페이지</h4>
      <h4>{result.title}</h4>
      <p>{result.content}</p>
      <Comment />
    </div>
  );
}
```

---

document 1개당 최대 8MB... &rarr; 다른 collection 하나 만들자!

어떤 글의 댓글인지 알 수 있도록 parent 데이터도 넣어주기!

> DB 저장 잘 한 것 : 나중에 수정, 삭제, 출력 쉬움!
> 수정, 삭제, 출력 어려우면 다른 document로 빼서 어떤 document에 종속되었었는지 보여주자!
