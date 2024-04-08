import { connectDB } from "@/utils/database";
import { ObjectId } from "mongodb";

export default async function Detail(props) {
  const db = (await connectDB).db("forum");
  let data = await db.collection("post").findOne({ 
    _id: new ObjectId(props.params.id)})

  return (
    <div>
      <h4>상세페이지</h4>
      <h4>{data.title}</h4>
      <p>{data.content}</p>
    </div>
  );
}
