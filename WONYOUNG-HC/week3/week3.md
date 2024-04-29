# Component에 데이터를 전해주려면 props

부모 컴포넌트가 자식 컴포넌트에게 값을 전달할 때 사용 <br>
역방향, 방향 관계가 없는 컴포넌트끼리 값 전달은 불가

<br>
<br>

# 좋아요 버튼 만들기 (useState, onClick)

onClick을 사용은 클라이언트 컴포넌트에서만 가능 <br>

state도 클라이언트 컴포넌트에서만 사용 가능 <br>
state 값이 변경되면, rerender <br>
state를 변경하는 방법은 set 함수를 통해 변경

<br>
<br>

# 좋아요 버튼 만들기2 (array, object state 변경하려면)

배열이나 객체인 state를 변경시키기 위해서는 spread 연산자 사용

<br>
<br>

# Next.js에서 MongoDB 사용하기

`npm install mongodb`

```js
// util/database.js
import { MongoClient } from "mongodb";
const url = "DB접속URL~~";
const options = { useNewUrlParser: true };
let connectDB;

if (process.env.NODE_ENV === "development") {
  if (!global._mongo) {
    global._mongo = new MongoClient(url, options).connect();
  }
  connectDB = global._mongo;
} else {
  connectDB = new MongoClient(url, options).connect();
}
export { connectDB };
```

```js
// page.js
import { connectDB } from "@/util/database";

export default async function Home() {
  const client = await clientDb;
  const db = client.db("forum");
  let result = await db.collection("post").find().toArray();
  return <div>{result}</div>;
}
```

# 글목록 조회기능 만들기 (DB 데이터 출력)
