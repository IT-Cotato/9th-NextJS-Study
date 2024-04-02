# Next.js에서 MongoDB 사용하기

- Database는 하나의 프로젝트
- Collection은 하나의 폴더
- document는 하나의 메모장 파일. 이 안에 데이터 넣기!

```shell
npm install mongodb
```

### MongoDB 연결

```javascript
import { MongoClient } from "mongodb";

export default async function Home() {
  const client = await MongoClient.connect(
    "mongodb+srv://admin:qwer1234@cluster0.nspqljz.mongodb.net/",
    { useNewUrlParser: true }
  );
  const db = client.db("forum");
  db.collection("post").find();

  return <div>안녕</div>;
}
```

**async** function 안에서만 **await** 사용가능

but, .conntect() 자주 실행하면 DB 부담,, &rarr; Next.js 서버 띄울 때 1번만 실행하면 좋음

&rarr; 변수에 저장해놓고 쓰면 매번 실행 안 되고 좋음

> util 폴더에 database.js 만들기

```javascript
import { MongoClient } from "mongodb";
const url = "mongodb+srv://admin:qwer1234@cluster0.nspqljz.mongodb.net/";
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

> Collection의 모든 document 꺼내오려면

```javascript
import { connectDB } from "@/util/database";
import { MongoClient } from "mongodb";

export default async function Home() {
  const client = await connectDB;
  const db = client.db("forum");
  await db.collection("post").find().toArray();

  return <div>안녕</div>;
}
```

DB 입출력 코드는 server component 안에서만 쓰자 ❗
