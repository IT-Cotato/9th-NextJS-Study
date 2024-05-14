# 댓글기능 만들기 2 (useEffect)

부모 게시글은 유저에게 보내라고 하자!

Detail 컴포넌트에서 result.\_id.toString()을 props로 보내주자!

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
      <Comment _id={result._id.toString()} />
    </div>
  );
}
```

detail/[id]/Comment.js ⬇️

```javascript
"use client";

import { useState } from "react";

export default function Comment(props) {
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
          fetch("/api/comment/new", {
            method: "POST",
            body: JSON.stringify({ comment: comment, _id: props._id }),
          });
        }}
      >
        댓글전송
      </button>
    </div>
  );
}
```

api/comment/new.js ⬇️

```javascript
import { connectDB } from "@/util/database";
import { ObjectId } from "mongodb";
import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]";

export default async function handler(요청, 응답) {
  let session = await getServerSession(요청, 응답, authOptions);
  if (요청.method == "POST") {
    요청.body = JSON.parse(요청.body);
    let 저장할거 = {
      content: 요청.body.comment,
      parent: new ObjectId(요청.body._id),
      author: session.user.email,
    };
    let db = (await connectDB).db("forum");
    let result = await db.collection("comment").insertOne(저장할거);
    응답.status(200).json("저장완료");
  }
}
```

### 댓글 DB 저장 완료!!!! (전송 아주 굳굳)

---

## 댓글 조회 기능

1. 부모에게서 props로 댓글 가져오기
2. 직접 DB 데이터로 댓글 가져오기 &larr; 이걸로 해보자

Comment.js는 client 컴포넌트이므로 DB 출력문법 작성 불가.
서버에게 GET 요청으로 부탁해야 함!!

client 컴포넌트라서 새로고침 없이 댓글을 생성, 수정 가능!!

이런 경우 useEffect() 안에 fetch() 갖다씀.
useEffect()는 쓸데없는 ajax, 타이머 등 보관함.

### useEffect 특징

1. html 로드/리렌더링될 때마다 실행됨
   html 로드될 때 1회만 실행되고 싶으면 deps를 [] 이렇게 넣어주면 됨!
2. html 보여준 후 늦게 실행시작 - 텅 빈 html 일부분이라도 보여주는 게 낫다
