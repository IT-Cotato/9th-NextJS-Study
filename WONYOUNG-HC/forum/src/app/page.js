import { connectDB } from "@/util/database";

export default async function Home() {
  const client = await connectDB;
  const db = client.db("forum");
  let result = db.collection("post").find().toArray();
  console.log(result);
  return <div>ㅎㅇ</div>;
}
