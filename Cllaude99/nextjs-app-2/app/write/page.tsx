import styles from '@/styles/Write/write.module.css';
import { ChangeEvent, InputHTMLAttributes } from 'react';

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

      <input
        type="file"
        accept="image/*"
        onChange={async (e: ChangeEvent<HTMLInputElement>) => {
          if (e.target.files) {
            let file = e.target.files[0];
            let filename = encodeURIComponent(file.name);
            let res = await fetch('/api/post/image?file=' + filename);
            res = await res.json();
          }
        }}
      />
      <img />
    </div>
  );
}
