import { connectDB } from "@/utils/database";

export default async function List() {
  const client = await connectDB;
  const db = client.db("forum");
  let posts = await db.collection("post").find().toArray();
  console.log(posts[0].title);

  return (
    <div className="bg-gray-50 p-10">
      {posts.map((post) => (
        <div className="bg-white rounded-xl p-20 mb-5 shadow shadow-gray-300">
          <h4 className="text-xl font-extrabold m-0">{post.title}</h4>
          <p className="text-gray-400 mx-0 my-1.5">{post.content}</p>
        </div>
      ))}
    </div>
  );
}
