import { connectDB } from "@/util/database";
import { MongoClient } from "mongodb";

export const revalidate = 60; // 해당 페이지 방문시 60초동안 캐싱됨

export default async function Home() {
  const db = (await connectDB).db("forum");
  let result = await db.collection("post").find().toArray();

  return <div>안녕</div>;
}
