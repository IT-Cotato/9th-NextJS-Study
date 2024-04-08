import styles from '@/styles/Edit/edit.module.css';
import { connectDB } from '@/utils/database';
import { ObjectId } from 'mongodb';
import { ChangeEvent } from 'react';

interface IEdit {
  params: { id: string };
}

export default async function Edit({ params: { id } }: IEdit) {
  const client = await connectDB;
  const db = client.db('forum');
  let result = await db.collection('post').findOne({ _id: new ObjectId(id) });

  return (
    <div className={styles.wrapper}>
      <h4>수정페이지</h4>
      <form action="/api/post/new" method="POST">
        <input
          name="title"
          type="text"
          className={styles.userInput}
          defaultValue={result?.title}
        />
        <input
          name="content"
          type="text"
          className={styles.userInput}
          defaultValue={result?.content}
        />
        <button type="submit" className={styles.btn}>
          버튼
        </button>
      </form>
    </div>
  );
}
