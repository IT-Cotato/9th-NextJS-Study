import { connectDB } from "@/utils/database";
import { ObjectId } from "mongodb";

export default async function handler(request, response) {
  console.log(request.body);
  if (request.method == "DELETE") {
    try {
      const db = (await connectDB).db("forum");
      const filter = { _id: new ObjectId(JSON.parse(request.body)._id) };
      const data = await db.collection("post").deleteOne(filter);
      console.log(data + "삭제 완료"); //document 삭제 결과를 출력
      return response.status(200).json(data + "삭제 완료");
    } catch (error) {
      return response.status(500).json("DB 삭제 실패");
    }
  }
}
