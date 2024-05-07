# 회원기능 만들기 : OAuth + session방식 사용하기

소셜로그인 기본적으로 **JWT**.

but, **session**으로 하고싶다.. &rarr; DB adapter 사용하면 가능!

DB adapter 사용시

1. 첫 로그인시 자동 회원가입 (DB에 보관)
2. 로그인시 DB에 세션 정보 보관 (이름, 이메일, 유효기간 등)
3. 현재 로그인 된 유저 정보 필요하면 DB에서 조회해봄!

---

## 1. mongodb-adapter 설치

```shell
npm uninstall mongodb
npm install mongodb@4
npm install @next-auth/mongodb-adapter 설치
```

## 2. [...nextauth].js 에 adapter 추가⬇️

```javascript
import { connectDB } from "@/util/database";
import { MongoDBAdapter } from "@next-auth/mongodb-adapter";
import NextAuth from "next-auth";
import GithubProvider from "next-auth/providers/github";

export const authOptions = {
  providers: [
    GithubProvider({
      clientId: "c876bc6181839747694f",
      clientSecret: "3754eb73569b2979690a7071ada443e5303827e6",
    }),
  ],
  secret: "qwer1234321rewq",
  adapter: MongoDBAdapter(connectDB),
};

export default NextAuth(authOptions);
```

## 3. mongodb에 들어가서 확인해보자 !

- sessions 들어가면 현재 로그인된 유저 세션 정보 저장되어있음!!!
- users에는 가입된 유저 정보. 이메일 같으면 같은 유저로 간주. ex) user1@naver.com
- accounts에는 가입된 유저의 계정정보. user1이 google로도, github로도 계정을 만들 수 있으므로! ex) document1 : Github 계정 ~ , document2 : Google 계정 ~

---

# 본인이 쓴 글만 수정/삭제하고 싶다

### 글 발행시 글쓴이 정보도 저장하자

### api/post/new.js ⬇️

서버 기능 안에서 쓸 때는 요청, 응답도 함께 넣기 ⬇️

```javascript
let session = await getServerSession(요청, 응답, authOptions);
```

요청.body에 author로 session.user.email 추가하려면 ⬇️

```javascript
요청.body.author = session.user.email;
```

전체 api/post/new.js ⬇️

```javascript
import { connectDB } from "@/util/database";
import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]";

export default async function handler(요청, 응답) {
  if (요청.method == "POST") {
    if (요청.body.title == "") {
      return 응답.status(400).json("제목을 입력하세요");
    }
    try {
      let session = await getServerSession(요청, 응답, authOptions);
      if (session) {
        요청.body.author = session.user.email;
        const db = (await connectDB).db("forum");
        let result = await db.collection("post").insertOne(요청.body);
        return 응답.redirect(302, "/list");
      }
    } catch (error) {
      return 응답.status(500).json("DB error");
    }
  }
}
```

---

### 글쓴이가 쓴 글만 삭제하기

### api/post/delete.js ⬇️

```javascript
import { connectDB } from "@/util/database";
import { ObjectId } from "mongodb";
import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]";

export default async function handler(요청, 응답) {
  if (요청.method == "DELETE") {
    try {
      let session = await getServerSession(요청, 응답, authOptions);

      const db = (await connectDB).db("forum");
      let result = await db
        .collection("post")
        .findOne({ _id: new ObjectId(요청.body) });

      // result의 author가 session의 email과 같을 때만 삭제
      if (result.author == session.user.email) {
        let result = await db
          .collection("post")
          .deleteOne({ _id: new ObjectId(요청.body) }); // 삭제

        if (result.deletedCount == 0) {
          응답.status(500);
        } else {
          응답.status(200).json("삭제완료");
        }
      }
    } catch (error) {
      응답.status(500);
    }
  }
}
```
