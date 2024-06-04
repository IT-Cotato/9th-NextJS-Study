# Next.js의 Server actions 기능

server actions 기능 쓰면 page.js 안에서 서버기능까지 전부 구현 가능!

write2 폴더에 page.js 새로 만들어주기!

```javascript
export default async function Write2(){

  return (
    <div>
      <form action={}>
        <input name="title"></input>
        <button type="submit">버튼</button>
      </form>
    </div>
  )
}
```

form 전송시 동작할 서버 API 만들어야할듯? &rarr; page.js에 그대로 작성 가능!!

`use server`하면 자동으로 서버 API로 변함!
async 붙여줘야 함^^

API 만들기 귀찮으면 그냥 이렇게 써도 됨! 당연히 유저한텐 안 보임

```javascript
export default async function Write2() {
  async function handleSubmit(formData) {
    "use server";
    console.log(formData.get("title"));
  }
  return (
    <div>
      <form action={handleSubmit}>
        <input name="title"></input>
        <button type="submit">버튼</button>
      </form>
    </div>
  );
}
```

## client 컴포넌트에서 쓰려면 ?

actions.js ⬇️

```javascript
"use server";

export async function handleSubmit(formData) {
  console.log(formData.get("title"));
}
```

page.js ⬇️

```javascript
import { handleSubmit } from "./actions";

export default async function Write2() {
  return (
    <div>
      <form action={handleSubmit}>
        <input name="title"></input>
        <button type="submit">버튼</button>
      </form>
    </div>
  );
}
```

## 그냥 page.js에서 바로 하자

- DB와도 연결
- 새로고침 안 해도 되게
  > revalidateTag()
  > revalidatePath() 써보자
  > 특정 페이지 캐시 삭제 기능인데 그냥 새로고침과 같음

```javascript
import { connectDB } from "@/util/database";
import { revalidatePath } from "next/cache";

export default async function Write2() {
  const db = (await connectDB).db("forum");
  let result = await db.collection("post_test").find().toArray();

  async function handleSubmit(formData) {
    "use server";
    const db = (await connectDB).db("forum");
    await db
      .collection("post_test")
      .insertOne({ title: formData.get("title") });
    console.log(formData.get("title"));
    revalidatePath("/write2");
  }

  return (
    <div>
      <form action={handleSubmit}>
        <input name="title"></input>
        <button type="submit">버튼</button>
      </form>
      {result ? result.map((a) => <p>글제목 : {a.title}</p>) : null}
    </div>
  );
}
```
