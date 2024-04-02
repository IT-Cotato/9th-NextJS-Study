import { connectDB } from '@/utils/database';
import styles from '../../styles/List/list.module.css';

export default async function List() {
  const client = await connectDB;
  const db = client.db('forum');
  let result = await db.collection('post').find().toArray();

  return (
    <div className={styles.listBg}>
      {result.map((info, index) => (
        <div className={styles.listItem} key={index}>
          <h4>{info.title}</h4>
          <p>{info.content}</p>
        </div>
      ))}
    </div>
  );
}
