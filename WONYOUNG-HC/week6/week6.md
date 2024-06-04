# 회원기능 만들기 : 아이디/비번 + JWT 사용하기

### 회원가입 기능 만들기

```js
// (pages/api/auth/signup.js)

import { connectDB } from "@/util/database";
import bcrypt from "bcrypt";

export default async function handler(요청, 응답) {
  if (요청.method === "POST") {
    const hash = await bcrypt.hash(요청.body.password, 10);
    요청.body.password = hash;

    let db = (await connectDB).db("forum");
    await db.collection("user_cred").insertOne(요청.body);
    응답.status(200).json("성공");
  }
}
```

- 유저의 비밀번호는 `bcrypt`를 사용해서 암호화

<br>

```js
import { connectDB } from "@/util/database";
import { MongoDBAdapter } from "@next-auth/mongodb-adapter";
import NextAuth from "next-auth";
import GithubProvider from "next-auth/providers/github";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcrypt";

export const authOptions = {
  providers: [
    GithubProvider({
      clientId: "Github에서 발급받은 ID",
      clientSecret: "Github에서 발급받은 Secret",
    }),

    CredentialsProvider({
      //1. 로그인페이지 폼 자동생성해주는 코드
      name: "credentials",
      credentials: {
        email: { label: "email", type: "text" },
        password: { label: "password", type: "password" },
      },

      //2. 로그인요청시 실행되는코드
      //직접 DB에서 아이디,비번 비교하고
      //아이디,비번 맞으면 return 결과, 틀리면 return null 해야함
      async authorize(credentials) {
        let db = (await connectDB).db("forum");
        let user = await db
          .collection("user_cred")
          .findOne({ email: credentials.email });
        if (!user) {
          console.log("해당 이메일은 없음");
          return null;
        }
        const pwcheck = await bcrypt.compare(
          credentials.password,
          user.password
        );
        if (!pwcheck) {
          console.log("비번틀림");
          return null;
        }
        return user;
      },
    }),
  ],

  //3. jwt 써놔야 잘됩니다 + jwt 만료일설정
  session: {
    strategy: "jwt",
    maxAge: 30 * 24 * 60 * 60, //30일
  },

  callbacks: {
    //4. jwt 만들 때 실행되는 코드
    //user변수는 DB의 유저정보담겨있고 token.user에 뭐 저장하면 jwt에 들어갑니다.
    jwt: async ({ token, user }) => {
      if (user) {
        token.user = {};
        token.user.name = user.name;
        token.user.email = user.email;
      }
      return token;
    },
    //5. 유저 세션이 조회될 때 마다 실행되는 코드
    session: async ({ session, token }) => {
      session.user = token.user;
      return session;
    },
  },

  adapter: MongoDBAdapter(connectDB),
  secret: "qwer1234",
};
export default NextAuth(authOptions);
```

- jwt 생성을 위한 세팅

<br>
<br>

# 댓글기능 만들기 1 (input 데이터 다루기)

```js
// (/detail/[]/page.js)

import Comment from "./Comment.js";

export default async function Detail(props) {
  return (
    <div>
      (생략)
      <Comment />
    </div>
  );
}
```

```js
"use client";

import { useState } from "react";

export default function Comment(props) {
  let [comment, setComment] = useState("");
  return (
    <div>
      <div>댓글목록</div>
      <input
        onChange={(e) => {
          e.target.value;
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

- 클라이언트 컴포넌트에서 댓글 입력을 받고 렌더링
- 댓글을 전송하면 서버에서 저장

<br>
<br>

# 댓글기능 만들기 2 (useEffect)

```js
// (api/comment/new.js)

import { connectDB } from "@/util/database";
import { ObjectId } from "mongodb";
export default async function handler(요청, 응답) {
  if (요청.method == "POST") {
    let 저장할거 = {
      content: "댓글내용",
      parent: "부모게시물_id",
      author: "유저이메일",
    };
    let db = (await connectDB).db("forum");
    let result = await db.collection("comment").insertOne(저장할거);
    응답.status(200).json("저장완료");
  }
}
```

- 댓글내용, 게시글 id, 유저 정보를 컬럼으로 comment 다큐먼트에 저장

<br>

```js
"use client";
import { useEffect, useState } from "react";

export default function Comment(props) {
  let [data, setData] = useState([]);
  useEffect(() => {
    fetch("/api/comment/list")
      .then((r) => r.json())
      .then((result) => {
        setData(result);
      });
  }, []);
}
```

- `useEffect`에서 댓글 리스트를 가져와서 표시

<br>
<br>

# loading.js, error.js, not-found.js

### 로딩중 페이지

```js
// loading.js

export default function Loading() {
  return <h4>로딩중임</h4>;
}
```

- 파일명을 loading.js로 하면 자동으로 표출

<br>

### 에러 페이지

```js
// error.js

"use client";

export default function Error({ error, reset }) {
  return (
    <div>
      <h4>오 이런 에러남</h4>
      <button
        onClick={() => {
          reset();
        }}
      >
        다시시도
      </button>
    </div>
  );
}
```

- 클라이언트 컴포넌트에서만 가능
- `reset` 함수는 새로고침 하는 함수임

<br>

### not-found 페이지
