# 회원기능 만들기 : 아이디/비번 + JWT 사용하기

### 비밀번호 암호화

npm install bcrypt

pages/api/auth/signup.js ⬇️

```javascript
import { connectDB } from "@/util/database";
import bcrypt from "bcrypt";

export default async function handler(요청, 응답) {
  if (요청.method === "POST") {
    const hash = await bcrypt.hash(요청.body.password, 10);
    요청.body.password = hash;

    let db = (await connectDB).db("forum");
    await db.collection("user_cred").insertOne(요청.body);
    응답.status(200).json("가입성공");
  }
}
```

### CredentialsProvider

pages/api/auth/[...nextauth].js ⬇️

```javascript
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
  secret: process.env.NEXTAUTH_SECRET,
};
export default NextAuth(authOptions);
```

- input 폼 추가 credentials에!
- 5. 컴포넌트 안에서 유저의 session 정보 보여줄 때 보여줄 데이터 설정

.env 파일에 secret 저장

---

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
