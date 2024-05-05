import { connectDB } from "@/util/database";
import { ObjectId } from "mongodb";
import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]";

export default async function handler(요청, 응답) {
  if (요청.method == "DELETE") {
    try {
      let session = await getServerSession(요청, 응답, authOptions);

      const db = (await connectDB).db("forum");
      let result = await db
        .collection("post")
        .findOne({ _id: new ObjectId(요청.body) });

      // result의 author가 session의 email과 같을 때만 삭제
      if (result.author == session.user.email) {
        let result = await db
          .collection("post")
          .deleteOne({ _id: new ObjectId(요청.body) }); // 삭제

        if (result.deletedCount == 0) {
          응답.status(500);
        } else {
          응답.status(200).json("삭제완료");
        }
      }
    } catch (error) {
      응답.status(500);
    }
  }
}
