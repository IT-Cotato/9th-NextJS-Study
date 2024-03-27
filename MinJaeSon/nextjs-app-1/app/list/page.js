export default function List() {
  let products = ["Tomatoes", "Pasta", "Coconut"];

  return (
    <div>
      <h4 className="title">상품목록</h4>
      {products.map((product, i) => (
        <div className="food" key={i}>
          <img src={`${product}.png`} className="food-img" />
          <h4>{product} $40</h4>
        </div>
      ))}
    </div>
  );
}
