# Component에 데이터 전해주려면 props

> props는 함수 파라미터와 유사

- 파라미터 - 매번 약간 다른 내용으로 function을 실행하고 싶을 때 사용

- props - 매번 약간 다른 내용으로 컴포넌트를 만들고 싶을 때 사용

❗️ Javascript에서 function 안에 만든 변수는 function 안에서만 사용 가능하다 !

```javascript
Cart: 부모;
CartItem: 자식;
```

## 부모 컴포넌트에 있던 변수나 데이터를 **props**를 사용해서 자식 컴포넌트가 사용하게 할 수 있다

1. 부모에 <자식Component 작명="전할데이터">
   - 전할 데이터에 변수, 함수 넣고 싶으면 {...}
2. 자식에 props 넘겨주고, '{props.작명}'으로 사용

```javascript
export default function Cart() {
  let 장바구니 = ["Tomatoes", "Pasta"];
  return (
    <div>
      <h4 className="title">Cart</h4>
      <CartItem item={장바구니[0]} />
      <CartItem item={장바구니[1]} />
      <Banner content="롯데카드" />
      <Banner content="현대카드" />
      <Btn color="red"></Btn>
    </div>
  );
}

function Banner(props) {
  return <h5>{props.content} 결제 행사중</h5>;
}

function Btn(props) {
  return <button style={{ backgroundColor: props.color }}>버튼</button>;
}

function CartItem(props) {
  return (
    <div className="cart-item">
      <p>{props.item}</p>
      <p>$40</p>
      <p>1개</p>
    </div>
  );
}
```

### ❗️ 주의

> 부모 &rarr; 자식 : 전송 O <br> 자식 &rarr; 부모 : 전송 X <br> 부모-자식 관계 X(옆집) : 전송 X

&rarr; **많은 컴포넌트**에서 데이터가 필요하면 그들 중 최고 부모 컴포넌트에 보관하는 게 좋음

### ❓ 그럼 그냥 자식컴포넌트에 데이터 넣는게 좋지 않나?

&rarr; 계속 실행되어서 코드 비효율적

but, next.js에서는 보통 fetch()로 DB데이터 가져오는데<br> 같은 데이터 요청이 여러 개면 **1개로 압축**해줌

&rarr; **deduplication** 기능
