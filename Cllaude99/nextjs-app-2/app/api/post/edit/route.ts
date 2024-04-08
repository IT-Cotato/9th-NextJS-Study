import { connectDB } from '@/utils/database';
import { ObjectId } from 'mongodb';

export async function POST(request: Request) {
  const { searchParams } = new URL(request.url);
  const id = searchParams.get('id');

  if (!id) {
    return new Response('id가 존재하지 않습니다!', {
      status: 500,
    });
  }

  const formData = await request.formData();
  const title = formData.get('title');
  const content = formData.get('content');

  if (!title || !content) {
    return new Response('빈칸을 모두 채워주세요', {
      status: 500,
    });
  }

  try {
    const client = await connectDB;
    const db = client.db('forum');
    await db
      .collection('post')
      .updateOne({ _id: new ObjectId(id) }, { $set: { title, content } });

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
