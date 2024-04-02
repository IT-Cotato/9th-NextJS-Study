# Html을 반복문으로 줄이고 싶으면 Map

### Array 자료형 - 변수 하나에 여러 가지 자료 보관하고 싶을 때

array 예시 ⬇️

```javascript
let a = [20, 30, "ddfkd"];
a[0] = 100;
console.log(a[0]);
```

적용 ⬇️

```javascript
export default function Home() {
  let 상품 = ["Tomatoes", "Pasta", "Coconut"];

  return (
    <div>
      <h4 className="title">상품목록</h4>
      <div className="food">
        <h4>{상품[0]} $40</h4>
      </div>
      <div className="food">
        <h4>{상품[1]} $40</h4>
      </div>
      <div className="food">
        <h4>{상품[2]} $40</h4>
      </div>
    </div>
  );
}
```

### 반복문 사용해서 HTML 줄이기 ⬇️

- html 사이에 for이나 if 못 씀
  &rarr; **map()** 함수를 쓰자 ❗️

### map() 기능

1. 함수 안의 코드 반복 실행해줌

   ```javascript
   let 어레이 = [2, 3, 4];
   어레이.map(() => {
     console.log("안녕");
   });
   ```

   &rarr; 어레이 자료 개수만큼 반복! 안녕이 3번 반복됨

2. array 안의 자료 출력해줌

   ```javascript
   let 어레이 = [2, 3, 4];
   어레이.map((a, i) => {
     console.log(a);
   });
   ```

   &rarr; 3번 실행하면서 2, 3, 4 나옴

   ```javascript
   let 어레이 = [2, 3, 4];
   어레이.map((a, i) => {
     console.log(i);
   });
   ```

   &rarr; 3번 실행하면서 0, 1, 2 나옴

3. return에 적은 걸 array로 담아줌

   ```javascript
   let b = (어레이 = [2, 3, 4]);
   어레이.map((a) => {
     return 10;
   });
   console.log(b);
   ```

   &rarr; 10이 3번 담긴 array가 나옴. 10, 10, 10

> react가 반복되는 걸 보면 헷갈려해서 unique한 값 넣어주는 걸 좋아함
> &rarr; key={i}도 함께 삽입

### 적용 1 ⬇️

```javascript
export default function Home() {
  let 상품 = ["Tomatoes", "Pasta", "Coconut"];

  return (
    <div>
      <h4 className="title">상품목록</h4>
      {상품.map((a, i) => {
        return (
          <div className="food" key={i}>
            <h4>{상품[i]} $40</h4>
          </div>
        );
      })}
    </div>
  );
}
```

### 적용 2 ⬇️

```javascript
export default function Home() {
  let 상품 = ["Tomatoes", "Pasta", "Coconut"];

  return (
    <div>
      <h4 className="title">상품목록</h4>
      {상품.map((a) => {
        return (
          <div className="food" key={i}>
            <h4>{a} $40</h4>
          </div>
        );
      })}
    </div>
  );
}
```
