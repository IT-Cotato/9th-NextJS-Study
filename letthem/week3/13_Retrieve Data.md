# 글목록 조회 기능 만들기 (DB 데이터 출력)

### 프로그램 만들기 ⬇️

1. 프로그램에 필요한 기능 정리
2. 쉬운 기능부터 하나씩 개발

### 세부 기능 만들기 ⬇️

1. 어떤 식으로 동작하는지 상세하게 한글로 설명
2. 코드로 번역

### 게시판에 필요한 기능 ⬇️

- 글목록 조회기능
- 상세페이지
- 글발행기능
- 수정삭제기능

### 글목록페이지 기능 ⬇️

1. HTML 페이지 /list로
2. 해당 페이지 방문시 DB에서 글 꺼내오기
3. 글들을 HTML에 넣기

---

JS는 처리가 늦게되는 코드를 발견하면 기다리지 않고 다음 줄 실행함

```javascript
db.collection("post").find().toArray();
```

이런 코드가 좀 늦게 처리될텐데, 기다려줘야 안 꼬이니 await을 붙이면 잠깐 기다려주게 된다 ❗

---

### object 자료형

자료 왼쪽에다 이름을 꼭 붙여줘야 함 ❗

```javascript
let data = { name: "kim", age: 20 };
```

출력은 object.자료이름

```javascript
console.log(data.name);
```

수정은 object.자료이름 = 값

```javascript
data.age = 30;
```

## [{..:..},{..:..}] : array 안에 object 2개 있음

### 💡 시작 괄호가 [ 인 경우 array 자료형임

result[0] 이런식으로 데이터 꺼낼 수 있음

### 💡 시작 괄호가 { 인 경우 object 자료형임

result[0].title &rarr; 안녕만 뜬다!!

---

### map 함수로 작성

```javascript
import { connectDB } from "@/util/database";

export default async function List() {
  const db = (await connectDB).db("forum");
  let result = await db.collection("post").find().toArray();
  console.log(result[0].title);

  return (
    <div className="list-bg">
      {result.map((a, i) => {
        return (
          <div className="list-item">
            <h4>{result[i].title}</h4>
            <p>1월 1일</p>
          </div>
        );
      })}
    </div>
  );
}
```
