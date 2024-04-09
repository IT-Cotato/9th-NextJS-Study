import { connectDB } from "@/utils/database";
import { ObjectId } from "mongodb";

export default async function ModifyDetail(props) {
  const db = (await connectDB).db("forum");
  let data = await db.collection("post").findOne({
    _id: new ObjectId(props.params.id),
  });

  return (
    <div>
      <h4>수정페이지</h4>
      <form action="/api/post/modify" method="POST">
        <input type="text" name="title" defaultValue={data.title} />
        <input type="text" name="content" defaultValue={data.content} />
        <input name="_id" defaultValue={data._id.toString()} />
        <button type="submit">수정</button>
      </form>
    </div>
  );
}
