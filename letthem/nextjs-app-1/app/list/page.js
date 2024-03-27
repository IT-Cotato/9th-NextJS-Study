export default function Home() {
  let 상품 = ["Tomatoes", "Pasta", "Coconut"];

  return (
    <div>
      <h4 className="title">상품목록</h4>
      {상품.map((a, i) => {
        return (
          <div className="food">
            <img src={`/food${i}.png`} className="food-img" />
            <h4>{상품[i]} $40</h4>
          </div>
        );
      })}
    </div>
  );
}
