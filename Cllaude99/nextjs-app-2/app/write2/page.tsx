import { connectDB } from '@/utils/database';

export default async function Write2() {
  const db = (await connectDB).db('forum');
  let result = await db.collection('post_test').find().toArray();
  const handleSubmit = async (formData: FormData) => {
    'use server';

    const db = (await connectDB).db('forum');
    await db
      .collection('post_test')
      .insertOne({ title: formData.get('title') });
  };
  return (
    <div>
      <form action={handleSubmit}>
        <input name="title" className="border-2"></input>
        <button type="submit">버튼</button>
        {result && result.map((a) => <p>글제목 : {a.title}</p>)}
      </form>
    </div>
  );
}
