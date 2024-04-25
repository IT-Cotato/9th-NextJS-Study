import { authOptions } from '@/pages/api/auth/[...nextauth]';
import { connectDB } from '@/utils/database';
import { getServerSession } from 'next-auth';

export async function POST(request: Request) {
  let session = await getServerSession(authOptions);
  const formData = await request.formData();
  const title = formData.get('title');
  const content = formData.get('content');

  if (!title || !content) {
    return new Response('빈칸을 모두 채워주세요', {
      status: 500,
    });
  }

  if (session) {
    try {
      const client = await connectDB;
      const db = client.db('forum');
      await db
        .collection('post')
        .insertOne({ title, content, author: session?.user?.email });

      return new Response(null, {
        status: 302,
        headers: { Location: '/list' },
      });
    } catch (error) {
      return new Response('DB에러', {
        status: 500,
      });
    }
  }
}
