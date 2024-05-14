import { authOptions } from '@/pages/api/auth/[...nextauth]';
import { connectDB } from '@/utils/database';
import { ObjectId } from 'mongodb';
import { getServerSession } from 'next-auth';
import { redirect } from 'next/navigation';

export async function POST(request: Request) {
  let session = await getServerSession(authOptions);
  const { comment, parentId } = await request.json();

  let data = {
    comment,
    parent: new ObjectId(parentId),
    author: session?.user?.email,
  };

  const db = (await connectDB).db('forum');
  let result = await db.collection('comment').insertOne(data);

  redirect('/detail');
}
