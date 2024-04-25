import { authOptions } from '@/pages/api/auth/[...nextauth]';
import { connectDB } from '@/utils/database';
import { ObjectId } from 'mongodb';
import { getServerSession } from 'next-auth';
import { redirect } from 'next/navigation';

export async function POST(request: Request) {
  let session = await getServerSession(authOptions);
  const id = await request.json();

  if (!id) {
    return new Response('id가 존재하지 않습니다!', {
      status: 500,
    });
  }

  try {
    const client = await connectDB;
    const db = client.db('forum');
    await db
      .collection('post')
      .deleteOne({ _id: new ObjectId(id + ''), author: session?.user?.email });

    redirect('/list');
  } catch (error) {
    return new Response('DB에러', {
      status: 500,
    });
  }
}
