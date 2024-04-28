import { connectDB } from '@/utils/database';

export default async function Home() {
  const client = await connectDB;
  const db = client.db('forum');
  let result = await db.collection('post').find().toArray();

  return <h1>Home</h1>;
}
