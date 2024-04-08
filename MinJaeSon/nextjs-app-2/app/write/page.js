export default function Write() {
  return (
    <div>
      <h4>글 작성</h4>
      <form action="/api/list" method="get">
        <button type="submit">버튼</button>
      </form>
    </div>
  )
}