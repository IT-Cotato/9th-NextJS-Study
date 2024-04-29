import { connectDB } from "@/utils/database";
import { ObjectId } from "mongodb";

export default async function Detail(props) {
  const db = (await connectDB).db("forum");
  let data = await db.collection("post").findOne({
    _id: new ObjectId(props.params.id),
  });

  return (
    <div className="p-20">
      <h4 className="text-lg font-semibold">상세페이지</h4>
      <h4 className="my-0">{data.title}</h4>
      <p>{data.content}</p>
    </div>
  );
}
