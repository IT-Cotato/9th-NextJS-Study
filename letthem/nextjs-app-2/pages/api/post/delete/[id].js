import { connectDB } from "@/util/database";
import { ObjectId } from "mongodb";

export default async function handler(요청, 응답) {
  if (요청.method == "DELETE") {
    try {
      const db = (await connectDB).db("forum");
      let result = await db
        .collection("post")
        .deleteOne({ _id: new ObjectId(요청.query.id) });

      if (result.deletedCount == 0) {
        응답.status(500);
      } else {
        응답.status(200).json("삭제완료");
      }
    } catch (error) {
      응답.status(500);
    }
  }
}
