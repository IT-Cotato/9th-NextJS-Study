# 상세페이지 만들기 1 (dynamic route)

- 글을 클릭하면 상세 페이지로 이동하기
  - /detail/1 -> 1번글 내용
  - /detail/2 -> 2번글 내용
  - /detail/3 -> 3번글 내용
  - app 라우터를 통해 라우팅 기능 만들기
- dynamic route : 폴더의 이름을 `[작명]`과 같이 해당 경로에 어떤 값이 들어와도 폴더에 있는 page.js를 렌더링

```js
import { connectDB } from "@/util/database";
import { ObjectId } from "mongodb";

export default async function Detail(props) {
  const db = (await connectDB).db("forum");
  let result = await db
    .collection("post")
    .findOne({ _id: new ObjectId(props.params.id) });

  return (
    <div>
      <h4>상세페이지임</h4>
      <h4>{result.title}</h4>
      <p>{result.content}</p>
    </div>
  );
}
```

- 폴더명 [작명]안에 들어간 '작명'은 사실 url의 변수임
  - detail/123 -> 123이 '작명'에 매칭
- id를 통해 글을 검색하기 위해 dynamic route를 id값으로 하고, 이 값은 props.params를 통해 사용 가능
- url에 입력된 id 값을 통해 db에서 글을 불러옴

<br>
<br>

# 상세페이지 만들기 2 (userRouter)

### 리스트 페이지에서 링크 만들기

```js
import { connectDB } from "@/util/database";
import Link from "next/link";

export default async function List() {
  const db = (await connectDB).db("forum");
  let result = await db.collection("post").find().toArray();

  return (
    <div className="list-bg">
      {result.map((a, i) => (
        <div className="list-item" key={i}>
          <h4>{result[i].title}</h4>
          <Link href={"/detail/" + result[i]._id}>링크</Link>
          <p>1월 1일</p>
        </div>
      ))}
    </div>
  );
}
```

- Link를 통해서 detail 페이지로 link

### useRouter

- 페이지를 이동시키는 기능
- client 컴포넌트에서만 사용 가능
- `router.push('/')` : 해당 경로로 이동
- `route.back()` : 뒤로 가기
- `route.forward()` : 앞으로 가기
- `route.refresh()` : 새로고침 (soft refresh)
- `route.prefetch('/')` : 링크에 해당하는 페이지를 미리 로드하여 페이지 전환이 빠르게 함
  - Link 태그에는 기본적으로 내장 되어 있음
  - `<Link herf={} prefetch{false}>링크</Link>

<br>

- `usePathname()` : 현재 url을 출력
- `useSearchParams()` : 쿼리 스트링을 출력
- `useParams()` : dynamic louter의 파라미터를 출력

<br>
<br>

# 글 작성기능 만들기 1 (서버기능 개발은)

### 서버 만들기

- forum 폴더에서 pages/api 폴더를 생성
- api 폴더에 api 엔드포인트를 파일 이름으로 생성
- 해당 파일에서는 api가 파일 경로와 같을 때 실행되는 서버

```js
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

- 서버로 요청을 보내는 글 작성 페이지

```js
export default function handler(요청, 응답) {
  if (요청.method == "GET") {
    응답.status(200).json({ name: "안녕" });
  }
  if (요청.method == "POST") {
    응답.status(200).json({ name: "바보" });
  }
}
```

<br>
<br>

# 글 작성기능 만들기 2

### 전송버튼 누르면 서버로 글 전송

```js
export default async function Write() {
  return (
    <div className="p-20">
      <form action="/api/post/new" method="POST">
        <input name="title" placeholder="글제목" />
        <input name="content" placeholder="글내용" />
        <button type="submit">전송</button>
      </form>
    </div>
  );
}
```

- form 태그를 통해 전송 버튼을 누르면 /api/post/new 경로로 POST 요청을 보냄

<br>

```js
import { connectDB } from "@/util/database";

export default async function handler(요청, 응답) {
  if (요청.method == "POST") {
    if (요청.body.title == "") {
      return 응답.status(500).json("제목ㄱㄱ");
    }
    let db = (await connectDB).db("forum");
    let result = db.collection("post").insertOne(요청.body);
    응답.redirect(302, "/list");
  }
}
```

- api/post/new 경로로 요청이 들어오면 실행될 서버 코드
- `insertOne()` : mongoDB에 데이터 추가
  - `요청.body`에는 form태그에서 작성한 title과 content 내용이 객체 형식으로 들어감

<br>
<br>

# 수정기능 만들기 1

### 수정페이지로 이동하기

```js
<div className="list-bg">
  {result.map((a, i) => (
    <div className="list-item" key={i}>
      <h4>{result[i].title}</h4>
      <Link href={"/detail/" + result[i]._id}>링크</Link>
      <br />
      <Link href={"edit/" + result[i]._id} clasName="list-btn">
        수정수정
      </Link>
      <p>1월 1일</p>
    </div>
  ))}
</div>
```

- 리스트 목록에 있는 수정버튼을 클리하면 'edit/[id]' 경로에 있는 페이지로 이동

<br>

### 글 수정페이지

```js
import { ObjectId } from "mongodb";
import { connectDB } from "@/util/database.js";

export default async function Edit(props) {
  let db = (await connectDB).db("forum");
  let result = await db
    .collection("post")
    .findOne({ _id: ObjectId(props.params.id) });
  return (
    <div className="write">
      <form action="어쩌구" method="POST">
        <input name="title" defaultValue={result.title} />
        <input name="content" defaultValue={result.content} />
        <button type="submit">전송</button>
      </form>
    </div>
  );
}
```

- 작성 페이지와 유사한 구조로 제작
- input에 들어갈 값을 db에서 가져옴
  - `db.collection('post').findOne({_id: ObjectId(props.params.id)})`
  - id는 dynamic route를 통해 url에 들어 있음

<br>

### MongoDB 데이터 수정

```js
await db
  .collection(컬렉션명)
  .updateOne({ 수정할게시물정보 }, { $set: { 수정할내용 } });
```

- `updateOne()` 함수 사용
  - 데이터를 구분할 id
  - $set : 데이터를 수정

<br>
<br>

# 수정기능 만들기 2

### 서버에게 수정 요청하기

```js
<div className="p-20">
  <h4>수정페이지</h4>
  <form action="/api/post/edit" method="POST">
    <input name="title" defaultValue={result.title} />
    <input name="content" defaultValue={result.content} />
    <input name="_id" defaultValue={result._id.toString()} type="hidden" />
    <button type="submit">전송</button>
  </form>
</div>
```

- form 태그에서 값을 전달할 때 input 태그를 이용해 id 값도 같이 전달

<br>

```js
import { connectDB } from "@/util/database";
import { ObjectId } from "mongodb";

export default async function handler(요청, 응답) {
  if (요청.method == "POST") {
    let 바꿀거 = { title: 요청.body.title, content: 요청.body.content };
    let db = (await connectDB).db("forum");
    let result = await db
      .collection("post")
      .updateOne({ _id: new ObjectId(요청.body._id) }, { $set: { 바꿀거 } });
    응답.redirect(302, "/list");
  }
}
```

- `updateOne()` 함수를 통해서 db에 있는 데이터를 바꿔줌
- form 태그에서 전송한 데이터 값들 (input 태그들)을 활용
