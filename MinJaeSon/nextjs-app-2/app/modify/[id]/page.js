import { connectDB } from "@/utils/database";
import { ObjectId } from "mongodb";

export default async function ModifyDetail(props) {
  const db = (await connectDB).db("forum");
  let data = await db.collection("post").findOne({
    _id: new ObjectId(props.params.id),
  });

  return (
    <div className="p-[20px]">
      <h4 className="text-lg font-semibold mb-[20px]">수정페이지</h4>
      <form action="/api/post/modify" method="POST" className="flex flex-col gap-y-12">
        <input type="text" name="title" defaultValue={data.title} className="w-[400px] h-32 border-gray-300 outline-none"/>
        <input type="text" name="content" defaultValue={data.content} className="w-[400px] h-32 border-gray-300 outline-none" />
        <input name="_id" defaultValue={data._id.toString()} className="hidden"/>
        <button type="submit" className="w-50 h-30 bg-gray-300 rounded-md mt-[8px] border-none" >수정</button>
      </form>
    </div>
  );
}
