import { connectDB } from '@/utils/database';
import { ObjectId } from 'mongodb';

interface IDetailPage {
  params: { id: string };
}
export default async function DetailPage({ params: { id } }: IDetailPage) {
  const client = await connectDB;
  const db = client.db('forum');
  let result = await db.collection('post').findOne({ _id: new ObjectId(id) });

  return (
    <div>
      <h4>상세페이지</h4>
      <h4>{result?.title}</h4>
      <p>{result?.content}</p>
    </div>
  );
}
