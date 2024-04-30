export default function Write() {
  return (
    <div>
      <h4>글 작성</h4>
      <form action="/api/post/new" method="post">
        <input type="text" name="title" placeholder="제목 입력" />
        <input type="text" name="content" placeholder="내용 입력" />
        <button type="submit">발행</button>
      </form>
    </div>
  )
}