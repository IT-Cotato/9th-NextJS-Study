import 작명 from "/public/food0.png";

export default function Home() {
  let 상품 = ["토마토", "파스타", "코코넛"];

  return (
    <div>
      <h4 className="title">상품목록</h4>
      {상품.map((a, i) => {
        return (
          <div className="food" key={i}>
            <img src={`/food${i}.png`} className="food-img" />
            <h4>{a} $40</h4>
          </div>
        );
      })}
    </div>
  );
}
