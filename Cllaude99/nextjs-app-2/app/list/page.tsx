import { connectDB } from '@/utils/database';
import styles from '../../styles/List/list.module.css';
import ListItem from '@/components/list-item';

export default async function List() {
  const client = await connectDB;
  const db = client.db('forum');
  const result = await db.collection('post').find().toArray();

  return (
    <div className={styles.listBg}>
      {result.map((info, index) => (
        <ListItem
          key={index}
          index={index}
          infoId={info._id}
          title={info.title}
          content={info.content}
        />
      ))}
    </div>
  );
}
