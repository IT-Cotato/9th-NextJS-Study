"use client";

import { useEffect, useState } from "react";

export default function List() {
  const products = ["Tomatoes", "Pasta", "Coconut"];
  const [count, setCount] = useState([0, 0, 0]);

  useEffect(() => {
    console.log(count);
  }, [count]);

  return (
    <div>
      <h4 className="title">상품목록</h4>
      {products.map((product, i) => (
        <div className="food" key={i}>
          <img src={`${product}.png`} className="food-img" />
          <h4>{product} $40</h4>
          <button
            onClick={() => {
              let newCount = [...count];
              newCount[i]--;
              setCount(newCount);
            }}
          >
            -
          </button>
          <span> {count[i]} </span>
          <button onClick={() => {
            let newCount = [...count];
            newCount[i]++;
            setCount(newCount);
          }}>+</button>
        </div>
      ))}
    </div>
  );
}
