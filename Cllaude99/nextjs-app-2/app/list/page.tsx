import { connectDB } from '@/utils/database';
import styles from '../../styles/List/list.module.css';
import Link from 'next/link';

export default async function List() {
  const client = await connectDB;
  const db = client.db('forum');
  let result = await db.collection('post').find().toArray();

  return (
    <div className={styles.listBg}>
      {result.map((info, index) => (
        <Link href={`/detail/${info._id}`}>
          <div className={styles.listItem} key={index}>
            <h4>{info.title}</h4>
            <p>{info.content}</p>
          </div>
        </Link>
      ))}
    </div>
  );
}
