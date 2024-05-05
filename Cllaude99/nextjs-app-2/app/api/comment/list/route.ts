import { connectDB } from '@/utils/database';
import { ObjectId } from 'mongodb';
import { NextRequest } from 'next/server';

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const parentId = searchParams.get('parentId');
  const db = (await connectDB).db('forum');
  let result = await db
    .collection('comment')
    .find({ parent: new ObjectId(parentId?.toString()) })
    .toArray();

  return Response.json(result);
}
