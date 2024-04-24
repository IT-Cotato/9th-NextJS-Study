import { connectDB } from '@/utils/database';
import styles from '../../styles/List/list.module.css';
import ListItem from '@/components/list-item';

export default async function List() {
  const client = await connectDB;
  const db = client.db('forum');
  let result = await db.collection('post').find().toArray();

  return (
    <div className={styles.listBg}>
      <ul>
        <ListItem result={result} />
      </ul>
    </div>
  );
}
