import { connectDB } from '@/utils/database';

export async function GET(request: Request) {
  const client = await connectDB;
  const db = client.db('forum');
  let result = await db.collection('post').find().toArray();

  return Response.json(result);
}
