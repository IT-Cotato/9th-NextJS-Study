# 삭제기능 만들기 2 (Ajax 추가내용과 에러처리)

```javascript
<span
  onClick={() => {
    fetch("/api/post/delete", { method: "DELETE" }).then(() => {});
  }}
>
  🗑️
</span>
```

서버는 요청받으면 DB글 삭제

deleteOne(???) &rarr; document 1개 삭제해줌

???에 뭐가 들어가야할까
서버에 정보가 없으면

- DB에서 찾아보거나
- 유저에게 보내라고 하거나 - body:에 result[i].\_id 넣어줌

ListItem.js ⬇️

```javascript
<span
  onClick={() => {
    fetch("/api/post/delete", {
      method: "DELETE",
      body: result[i]._id,
    }).then(() => {});
  }}
>
  🗑️
</span>
```

참고 : DELETE 요청시 데이터 안 가면 POST 요청으로 바꾸면 됨

api/post/delete.js ⬇️

```javascript
import { connectDB } from "@/util/database";
import { ObjectId } from "mongodb";

export default async function handler(요청, 응답) {
  if (요청.method == "DELETE") {
    const db = (await connectDB).db("forum");
    let result = await db
      .collection("post")
      .deleteOne({ _id: new ObjectId(요청.body) });
    console.log(result);
    응답.status(200).json("삭제완료");
  }
}
```

result 콘솔에 찍어보면 deletedCount 나옴

- deletedCount: 1이면 한 개의 게시글 잘 삭제됨!
- deletedCount: 0이면 잘 안 된 것

> try catch문으로 예외처리하면 좋음

```javascript
import { connectDB } from "@/util/database";
import { ObjectId } from "mongodb";

export default async function handler(요청, 응답) {
  if (요청.method == "DELETE") {
    try {
      const db = (await connectDB).db("forum");
      let result = await db
        .collection("post")
        .deleteOne({ _id: new ObjectId(요청.body) });

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

Ajax 요청 완료시 코드 실행 : then(()=>{~~~})

Ajax 요청 완료시 서버가 보낸 데이터 ("삭제완료") 콘솔에 출력

```javascript
onClick={() => {
  fetch("/api/post/delete", {
    method: "DELETE",
    body: result[i]._id,
  })
    .then((r) => {
      return r.json();
    })
    .then((r) => {
      console.log(r);
    });
}}
```

### Ajax 에러 처리

Ajax 에러는 크게 2가지

1. 서버가 에러코드 전송시 실행할 코드 (서버에서 status(500)같은거 보낼 때)
2. 네트워크 에러

```javascript
onClick={() => {
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
      console.log(result);
    })
    .catch((error) => {
      //인터넷 문제로 실패시 실행할 코드
      console.log(error);
    });
}}
```

axios 사용하면 이 긴 코드 짧게 가능!!!
