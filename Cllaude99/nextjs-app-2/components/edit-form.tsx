'use client';
import styles from '@/styles/Edit/edit.module.css';
import { ChangeEvent, useState } from 'react';

interface IEditForm {
  id: string;
  title: string;
  content: string;
}

export default function EditForm({ id, title, content }: IEditForm) {
  const [userTitle, setTitle] = useState(title);
  const [userContent, setContent] = useState(content);

  const onChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.currentTarget;
    switch (name) {
      case 'title':
        setTitle(value);
        break;
      case 'content':
        setContent(value);
        break;
    }
  };

  return (
    <div className={styles.wrapper}>
      <h4>수정페이지</h4>
      <form action={`/api/post/edit?id=${id}`} method="POST">
        <input
          name="title"
          type="text"
          className={styles.userInput}
          onChange={onChange}
          value={userTitle}
        />
        <input
          name="content"
          type="text"
          className={styles.userInput}
          onChange={onChange}
          value={userContent}
        />
        <button type="submit" className={styles.btn}>
          버튼
        </button>
      </form>
    </div>
  );
}
