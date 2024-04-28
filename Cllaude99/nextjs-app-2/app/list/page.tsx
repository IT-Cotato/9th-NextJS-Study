import { connectDB } from '@/utils/database';
import styles from '../../styles/List/list.module.css';
import Link from 'next/link';

export default async function List() {
  const client = await connectDB;
  const db = client.db('forum');
  let result = await db.collection('post').find().toArray();

  return (
    <div className={styles.listBg}>
      <ul>
        {result.map((info, index) => (
          <li key={index} className={styles.contents}>
            <Link href={`/detail/${info._id}`}>
              <div key={index}>
                <h4>{info.title}</h4>
                <p>{info.content}</p>
              </div>
            </Link>
            <span>
              <Link href={`/edit/${info._id}`}>✏️</Link>
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
}
