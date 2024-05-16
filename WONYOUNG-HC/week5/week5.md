# 삭제기능 만들기 1 (Ajax)

### 글 목록 코드 분리

```js
import { connectDB } from "@/util/database";
import ListItem from "@/app/list/ListItem";

export default async function List() {
  const db = (await connectDB).db("forum");
  let result = await db.collection("post").find().toArray();

  return (
    <div className="list-bg">
      <ListItem result={result} />
    </div>
  );
}
```

```js
"use client";
import Link from "next/link";

export default function ListItem({ result }) {
  return (
    <div>
      {result.map((a, i) => (
        <div className="list-item" key={i}>
          <h4>{result[i].title}</h4>
          <Link href={"/detail/" + result[i]._id}>링크</Link>
          <br />
          <Link href={"edit/" + result[i]._id} clasName="list-btn">
            수정수정
          </Link>
          <br />
          <span>삭제삭제</span>
          <p>1월 1일</p>
        </div>
      ))}
    </div>
  );
}
```

- 리스트 목록은 client component로 분리
- client component에서 db로 부터 데이터를 불러오면 SEO 측면에서 불리
- server component에서 db로 부터 값을 불러온 다음 client component에게 props로 값을 전달 하는것이 SEO에서 더 효율적

<br>

### Ajax

- form 태그 대신 서버에게 요청을 보내는 방법
- 새로고침 없이 요청을 보내기가 가능

```js
<buttn onClick={() => {
  fetch('/url', {method: 'POST', body: '바디'})
}}>
```

<br>
- 서버에게 array, object 전송
  - 서버와 데이터 전송은 문자와 숫자만 가능
  - JSON 타입으로 stringfy, parse 해 주어 서버와 배열, 객체 정보를 주고 받음

<br>
<br>

# 삭제기능 만들기 2 (Ajax 추가 내용과 에러처리)

### 서버에게 삭제 요청 보내기

```js
fetch("/api/post/delete", { method: "DELETE", body: result[i]._id });
```

<br>

### 서버에서 DB에게 삭제 요청 보내기

```js
import { connectDB } from "@/util/database";
import { ObjectId } from "mongodb";

export default async function handler(요청, 응답) {
  if (요청.method == "DELETE") {
    try {
      let db = (await connectDB).db("forum");
      let result = await db
        .collection("post")
        .deleteOne({ _id: new ObjectId(요청.body._id) });
    } catch (error) {
      응답.status(500);
    }

    // 만약에 result 결과가 이상하면 응답.status(500)
    // result 결과가 정상이면 응답.status(200)
  }
}
```

- `deleteOne()` 함수를 통해 db에 있는 데이터를 삭제
- `요청.body`에는 ajax에서 전송한 body
- try, catch 문을 활용하여 예외 처리
  - db에서 삭제중 예외가 발생하면 500 반환

<br>

### 클라이언트에서 서버의 결과 받기

```js
fetch("/URL")
  .then((result) => {
    //성공시 실행할코드
  })
  .catch((error) => {
    //인터넷문제 등으로 실패시 실행할코드
    console.log(error);
  });
```

- `fetch` 함수는 promise 객체이기에 then 사용 가능
- axios 라이브러리르 사용하면 ajax를 편리하게 사용 가능

<br>
<br>

# 삭제기능 만들기 3 (query string / URL parameter)

```css
.list-item {
  opacity: 1;
  transition: all 1s;
}
```

- 박스 투명도가 1에서 0으로 감소하는 애니메이션

<br>

```js
<button
  className="list-btn"
  onClick={(e) => {
    fetch("/api/post/delete", { method: "POST", body: result[i]._id }).then(
      () => {
        e.target.parentElement.style.opacity = 0;
        setTimeout(() => {
          e.target.parentElement.style.display = "none";
        }, 1000);
      }
    );
  }}
>
  🗑️
</button>
```

- `fetch()` 함수가 성공하면 opcity가 0이 되고, 1초 이후에 박스가 사라짐

<br>

### GET요청을 서버에게 데이터 전달

- query string 사용 : url에 데이터를 담음
  - /어쩌구?a=1&b=2&c=3
  - url이 지저분해지고, 민감한 정보를 담지 못함
- URL parameter 사용 : dynamic route에 사용했던 []
  - 서버를 만들때도 dynamic route 사용

<br>
<br>

# static rendering, dynamic rendering, cache

### static rendering

- Next.js에서 페이지는 기본적으로 static rendering
- build에서 생성한 html을 그대로 보여줌

<br>

### dynamic rendering

- build를 했어도 접근시 마다 html 파일을 생성
- useSearchParams(), cookies(), headers(), [dynamic route] 사용시

<br>

### static rendering / dynamic rendering 강제로 바꾸기

- λ : dynamic rendering
- o : static rendering
- 'force-dynamic'이나 'force-static' 변수를 넣어 렌더링 방식을 강제
  - `export const dynamic = 'force-dynamic'`

<br>

### 캐싱기능

- Next.js에서 캐싱 : 페이지 캐싱, GET 요청결과 캐싱

<br>

```js
fetch("/URL", { cache: "force-cache" });
```

- GET 요청에 대한 결과를 캐싱

```js
fetch("/URL", { next: { recalidate: 60 } });
```

- 캐싱 결과를 60초동안 보관

```js
fetch("/URL", { cache: "no-store" });
```

- 캐싱을 사용하지 않음

<br>

### 페이지 단위 캐싱

```js
export const revalidate = 60;
```

- 코드 상단에 `revalidate`변수를 선언하고, 캐싱할 시간을 적음

<br>
<br>

# JWT, session, OAuth 설명시간

### 회원기능 동작

- 회원가입 : db에 유저의 아이디/비번을 저장
- 로그인 : 유저의 아이디/비번을 서버에 전송하고, 서버의 db에서 입장권을 발급
- 로그인이 필요한 서버기능 : 유저는 입장권을 보여주고, 서버는 입장권을 확인하고 데이터를 보내줌

<br>

### sessoin 방식

- 유저가 로그인 하면 db에 유저의 아이디와 세션 아이디를 저장
- 유저에게는 세션 아이디만 전송
- 로그인이 필요한 서버 기능에 대해서는 세션 아이디를 통해 유저의 로그인 여부를 판단
- 서버의 부담이 큼

<br>

### token 방식

- 유저가 로그인하면 유저에게 입장권을 암호화 하여 발급
- 유저가 입장권을 제출하면 해독하여 로그인 여부를 판단
- 탈취의 부담이 있음

<br>

### OAuth

- 소셜 로그인 방식
- 다른 사이트에서 토큰을 발급

<br>

### Next-Auth 라이브러리

- jwt, OAuth를 쉽게 사용 가능하게 해주는 라이브러리
- 단 아이디와 비밀번호를 사용하는 경우 session 방식은 사용 불가

<br>
<br>

# 회원기능 만들기 : Auth.js 사용한 소셜 로그인

- github의 소셜 로그인 사용하기

`npm install next-auth`

```js
import NextAuth from "next-auth";
import GithubProvider from "next-auth/providers/github";

export const authOptions = {
  providers: [
    GithubProvider({
      clientId: "Github에서 발급받은ID",
      clientSecret: "Github에서 발급받은Secret",
    }),
  ],
  secret: "jwt생성시쓰는암호",
};
export default NextAuth(authOptions);
```

- pages/api/auth 경로에 [...nextauth].js 파일에 해당 코드 사용

<br>

### 로그인 로그아웃

```js
import { signIn, signOut } from 'next-auth/react'

<button onClick={()=>{ signIn() }}>로그인버튼</button>
<button onClick={()=>{ signOut() }}>로그아웃버튼</button>
```

- next-auth에서 제공한 `signIn()`, `signOut()` 함수 사용

<br>

```js
let session = await getServerSessoin(authOprions);
```

- server component에서 로그인 여부를 확인할 수 있는 함수

<br>
<br>

# 회원기능 만들기: OAuth + session방식 사용하기

- session 방식을 사용하기 위해서 DB adpater 기능을 사용
  - 첫 로그인시 자동으로 유저를 회원가입 시켜 DB에 유저 회원정보를 보관
  - 로그인시 자동으로 유저가 언제 로그인했는지 세션정보를 DB에 보관
  - 서버에서 지금 로그인된 유저정보가 필요하면 JWT가 아니라 DB에 있던 세션정보를 조회해서 가져옴
  - 로그아웃시 유저 세션정보는 DB에서 삭제

```js
import NextAuth from "next-auth";
import GithubProvider from "next-auth/providers/github";
import { MongoDBAdapter } from "@next-auth/mongodb-adapter";
import { connectDB } from "@/util/database";

export const authOptions = {
  providers: [
    GithubProvider({
      clientId: "Ov23li1nQacaGq6c2O4i",
      clientSecret: "3964b8eeb473961e8c40b595ec5e4a92e9a533c5",
    }),
  ],
  secret: process.env.AUTH_SECRET,
  adapter: MongoDBAdapter(connectDB),
};
export default NextAuth(authOptions);
```

- [...nextauth].js 파일에 `adpater`를 추가
- mongodb에서는 다른 데이터베이스에 컬렉션이 생성
  - database.js 파일에 있는 url에 다음과 같이 데이터베이스 이름을 추가하면 해당 데이터베이스에 생성
  - "mongodb+srv://admin:2gEDKmeBO8njZlUc@cluster0.nln1htn.mongodb.net/forum?retryWrites=true&w=majority&appName=Cluster0";

<br>

### 글 작성시 이메일 추가

```js
import { connectDB } from "@/util/database";
import { getSession } from "next-auth/react";
import { authOptions } from "../auth/[...nextauth]";

export default async function handler(요청, 응답) {
  let session = await getSession(요청, 등답, authOptions);

  if (session) {
    요청.body.author = session.user.name;
  }

  if (요청.method === "POST") {
    if (요청.body.title === "") {
      return 응답.status(500).json("제목ㄱ");
    }
    const db = (await connectDB).db("forum");
    let result = await db.collection("post").insertOne(요청.body);
    return 응답.status(200).redirect("/");
  }
}
```

- api/new 요청에서 `getSessoin` 함수를 통해 사용자의 정보를 가져옴
- db에 insert할 때 작성한 사용자의 이메일을 같이 저장

<br>

```js
import { connectDB } from "@/util/database";
import { ObjectId } from "mongodb";
import { getSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]";

export default async function handler(요청, 응답) {
  if (요청.method == "DELETE") {
    let session = await getSession(요청, 응답, authOptions);
    let db = (await connectDB).db("forum");
    let result = await db
      .collection("post")
      .findOne({ _id: new ObjectId(요청.body) });

    if (result.author === session.user.email) {
      await db.collection("post").deleteOne({ _id: new ObjectId(요청.body) });
    } else {
      return 응답.status(500).json("권한없음");
    }
  }
}
```

- email을 통해 본인이 작성한 글 만 삭제 가능
