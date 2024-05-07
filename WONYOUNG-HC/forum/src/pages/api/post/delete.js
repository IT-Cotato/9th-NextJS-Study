import { connectDB } from "@/util/database";
import { ObjectId } from "mongodb";
import { getSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]";

export default async function handler(요청, 응답) {
  if (요청.method == "DELETE") {
    let session = await getSession(요청, 응답, authOptions);
    let db = (await connectDB).db("forum");
    let result = await db
      .collection("post")
      .findOne({ _id: new ObjectId(요청.body) });

    if (result.author === session.user.email) {
      await db.collection("post").deleteOne({ _id: new ObjectId(요청.body) });
    } else {
      return 응답.status(500).json("권한없음");
    }
  }
}
