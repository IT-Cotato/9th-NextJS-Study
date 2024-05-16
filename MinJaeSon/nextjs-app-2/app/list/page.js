import { connectDB } from "@/utils/database";
import ListItem from "./ListItem";

export const dynamic = 'force-dynamic';

export default async function List() {
  const client = await connectDB;
  const db = client.db("forum");
  let data = await db.collection("post").find().toArray();
  data.map((item) => {
    item._id = item._id.toString();
  });

  return (
    <div className="bg-gray-50 p-10">
      <ListItem data={data} />
    </div>
  );
}
