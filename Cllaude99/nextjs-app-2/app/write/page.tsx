import styles from '@/styles/Write/write.module.css';

export default function Write() {
  return (
    <div className={styles.wrapper}>
      <h4>글 작성</h4>
      <form action="/api/post/new" method="POST">
        <input
          name="title"
          type="text"
          placeholder="제목을 입력하세요."
          className={styles.userInput}
        />
        <input
          name="content"
          type="text"
          placeholder="내용을 입력하세요."
          className={styles.userInput}
        />
        <button type="submit" className={styles.btn}>
          버튼
        </button>
      </form>
    </div>
  );
}
