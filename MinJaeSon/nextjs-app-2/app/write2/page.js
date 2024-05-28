import { connectDB } from "@/utils/database";
import { revalidatePath } from "next/cache";

export default async function Write2() {
  async function handleSubmit(formData) {
    "use server"
    const db = (await connectDB).db('forum')
    await db.collection('post_test').insertOne({title: formData.get('title')})
    revalidatePath('/write2')
  }

  return (
    <div>
      <form action={handleSubmit}>
        <input name="title"></input>
        <button type="submit">버튼</button>
      </form>
    </div>
  );
}
