import EditForm from '@/components/edit-form';
import { connectDB } from '@/utils/database';
import { ObjectId } from 'mongodb';

interface IEdit {
  params: { id: string };
}

export default async function Edit({ params: { id } }: IEdit) {
  const client = await connectDB;
  const db = client.db('forum');
  let result = await db.collection('post').findOne({ _id: new ObjectId(id) });

  return <EditForm id={id} title={result?.title} content={result?.content} />;
}
