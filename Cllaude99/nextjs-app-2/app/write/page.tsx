export default function Write() {
  return (
    <div>
      <h4>글 작성</h4>
      <form action="/api" method="POST">
        <input type="text" placeholder="이름을 입력하세요!" name="name" />
        <button type="submit">버튼</button>
      </form>
    </div>
  );
}
