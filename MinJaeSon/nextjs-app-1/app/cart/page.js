import { age, name } from "./data.js";

export default function Cart() {
  let products = ["Tomatoes", "Pasta"];

  return (
    <div>
      <h4 className="title">장바구니</h4>
      <div className="cart-wrapper">
        <CartItem item={products[0]} />
        <CartItem item={products[1]} />
      </div>
      <p>
        {name} ({age})
      </p>
    </div>
  );
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
