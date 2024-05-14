# 댓글기능 만들기 3

1. 컴포넌트 로드시 서버에서 댓글가져옴
2. 가져온 데이터를 state에 저장해두고
3. state를 html에 꽂아서 보여줌

detail/[id]/Comment.js ⬇️

```javascript
useEffect(() => {
  fetch("/api/commet/list")
    .then(r.r.json())
    .then((result) => {});
}, []);
```

그 글에 해당하는 댓글만 가져와야 함!

글 id 같이 보내라!!

GET요청시 데이터를 함께 보내려면 URLparameter / query string

여기선 좀 더 간단한 query string을 써보자

detail/[id]/Comment.js ⬇️

```javascript
fetch("/api/commet/list?id=" + props._id);
```

result는 변수나 state에 저장은 가능함. 바로 html로 쏴줄 순 없음 ㅠ

detail/[id]/Comment.js ⬇️

```javascript
"use client";

import { useEffect, useState } from "react";

export default function Comment(props) {
  let [comment, setComment] = useState("");
  let [data, setData] = useState([]);

  useEffect(() => {
    fetch("/api/comment/list?id=" + props._id)
      .then((r) => r.json())
      .then((result) => {
        setData(result);
      });
  }, []);

  return (
    <div>
      <hr></hr>
      {data.length > 0
        ? data.map((a, i) => <p key={i}>{a.content}</p>)
        : "댓글없음"}
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

pages/api/comment/list.js ⬇️

```javascript
import { connectDB } from "@/util/database";
import { ObjectId } from "mongodb";

export default async function handler(요청, 응답) {
  const db = (await connectDB).db("forum");
  let result = await db
    .collection("comment")
    .find({ parent: new ObjectId(요청.query.id) })
    .toArray();
  응답.status(200).json(result);
}
```

---

추가,, +

author_name 도 같이 보여주고 싶음!

> MySQL 등 관계형 DB에서는 user의 이름 보여주는 것 안 좋은 관습
> MongoDB 등 비관계형 DB에서는 user의 이름 보여주는 것 좋은 관습

댓글 전송 누르면 바로 조회가능하게!
&rarr; 댓글 저장 완료시에 서버에서 댓글목록 다시 보내주자
받아온 댓글목록을 state에 저장하면 html에 보일듯!

&rarr; CSR의 장점임

---

