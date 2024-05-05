# static rendering, dynamic rendering, cache

**프로젝트 배포**하려면
**npm run build**부터.

react 문법을 js 문법으로 바꿔주고, html 페이지도 만들어줌

**npm run start**하면 서버 실행

npm run build하면 ⬇️

```
Route (app)
┌ ○ /

├ ○ /\_not-found

├ λ /detail/[id]

├ λ /edit/[id]

├ ○ /list

└ ○ /write
```

이렇게 뜸

### ○ : 해당 페이지 static rendering 해줌 (default)

- html 페이지 그대로 유저에게 보냄
- #### 👼 장점 : 미리 페이지 완성본을 만들어놨기 때문에 전송 빠름

### λ : 해당 페이지 dynamic rendering 해줌

- 유저가 페이지 접속마다 html 새로 만들어서 보내줌
- fetch, useSearchParams, cookies, headers, [dynamic route] 사용시 자동으로 λ dynamic rendering 해줌
- #### 🥵 단점 : 다시 그려줘야하므로 서버/DB 부담 ⬆️ &rarr; **캐싱** 기능 사용하여 해결 ㄱㄱ

---

but, /list는 매번 html을 새로 그려줘야할 것 같은데 static rendering이다.
&rarr; dynamic rendering으로 고쳐주자!!!
/list/page.js에서 **export const dynamic = "force-dynamic";** 추가

---

static rendering을 dynamic rendering으로 바꾸려면

> export const dynamic = "force-dynamic";

dynamic rendering을 static rendering으로 바꾸려면

> export const dynamic = "force-static";

---

dynamic rendering으로 바꾸고 나서 다시 npm run build하면 λ /list 로 바뀐다!!

---

### **캐싱** : 데이터 결과를 잠깐 저장해두고 재사용

server component 안에서만 가능!

- 페이지나 GET 요청 결과 잠깐 저장해두고 재사용 가능
  ```javascript
  await fetch("/URL", { cache: "force-cache" });
  ```
  🟰
  ```javascript
  await fetch("/URL");
  ```
- 캐싱 싫으면(실시간 데이터가 중요하면) ⬇️ 매번 서버로 요청해서 새 거 가져옴
  ```javascript
  await fetch("/URL", { cache: "no-store" });
  ```
- 60초마다 캐싱된 데이터 갱신 ⬇️
  ```javascript
  await fetch("/URL", { next: { revalidate: 60 } });
  ```
- DB 출력 결과 캐싱 가능 O

  1. fetch()로 바꾸는 방법
  2. revalidate 예약변수 쓰면 페이지 단위 캐싱 가능 (ISR)

     ```javascript
     import { connectDB } from "@/util/database";
     import { MongoClient } from "mongodb";

     export const revalidate = 60; // 해당 페이지 방문시 60초동안 캐싱됨

     export default async function Home() {
       const db = (await connectDB).db("forum");
       let result = await db.collection("post").find().toArray();

       await fetch("/URL", { cache: "force-cache" });
       return <div>안녕</div>;
     }
     ```

     /list2 만들고 export const revalidate = 20; 추가

     ```javascript
     import { connectDB } from "@/util/database";
     import ListItem from "./ListItem";

     export const revalidate = 20;

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

     npm run build & npm run start
     
     새로운 데이터 write하면 list에는 바로 적용, list2에는 몇 초 기다린 후 적용
