# 상세페이지 만들기 1 (Dynamic route)

1. 글 제목 누르면 상세페이지 이동
2. 상세페이지 방문시 DB에서 글 1개 꺼내서 HTML에 보여주기

### dynamic route 만들려면

> [폴더명] = [id]

DB에서 게시물 1개만 가져오려면 .findOne({ 찾을 document 정보 })

```javascript
let result = await db
  .collection("post")
  .findOne({ _id: new ObjectId("660baf1623aa62bb8c2ca783") });
```

&rarr; /detail/1234432 처럼 detail 뒤에 뭐가 오든 id값이 하드코딩 되어있기 때문에 다 같은 데이터 뜸

---

### ObjectId에 유저가 URL에 입력한 값이 들어오도록 !!

props로 받자

콘솔에 props 찍어보면 { params: { id: '234' }, searchParams: {} }

&rarr; [폴더명]: 유저가 URL에 입력한 값 뜸 (폴더명 = id)

&rarr; props.params.id -> 우리가 찾는 값이 나옴!

```javascript
import { connectDB } from "@/util/database";
import { ObjectId } from "mongodb";

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
    </div>
  );
}
```

---

### title 누르면 DB의 id로 연결하기 - Link

```javascript
return (
  <div className="list-bg">
    {result.map((a, i) => {
      return (
        <div className="list-item">
          <Link href={"/detail/" + result[i]._id}>
            <h4>{result[i].title}</h4>
          </Link>
          <p>1월 1일</p>
        </div>
      );
    })}
  </div>
);
```
