# loading.js, error.js, not-found.js

SSR의 단점 &rarr; 새로고침,,,

next.js에서는 Link 태그 써서 필요한 부분만 리렌더링하므로 부드러움!

---

## 로딩중 UI

1. loading.js 만들기
2. export default 컴포넌트

- 모든 page.js 옆에 loading.js 생성가능
- client 컴포넌트 가능

app/detail/[id]/loading.js ⬇️

```javascript
export default function Loading() {
  return <h4>로딩중!!!!!</h4>;
}
```

=

```javascript
<Suspense fallback={<div>로딩중</div>}>
  <div>보여줄 페이지</div>
</Suspense>
```

---

## error 페이지

if 쓰기 귀찮으면

1. error.js 만들기 (무조건 'use client')
2. export default 컴포넌트

해당 page.js 부분만 error.js로 바꿔줌!!

error.js 가 없어도 상위에 있는 error.js를 찾아서 보여주므로 그냥 app폴더에 넣자!

layout.js 에러는 global-error.js 만들어서 체크 가능!

app/error.js ⬇️

```javascript
"use client";

export default function Error({ error, reset }) {
  return (
    <div>
      <h4>에러남</h4>
      <button
        onClick={() => {
          reset();
        }}
      >
        버튼
      </button>
    </div>
  );
}
```

---

## 404 페이지

1. not-found.js 파일 만들기
2. 404 페이지 원할 때 notFound() 실행

app/detail/[id]/not-found.js ⬇️

```javascript
export default function Loading() {
  return <h4>404 없는 페이지임</h4>;
}
```

app/detail/[id]/page.js ⬇️

```javascript
import { connectDB } from "@/util/database";
import { ObjectId } from "mongodb";
import Comment from "./Comment";

export default async function Detail(props) {
  const db = (await connectDB).db("forum");
  let result = await db
    .collection("post")
    .findOne({ _id: new ObjectId(props.params.id) });

  if (result === null) {
    return notFound();
  }

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
