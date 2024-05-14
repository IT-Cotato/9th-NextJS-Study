import { connectDB } from "@/utils/database";
import { ObjectId } from "mongodb";

export default async function handler(request, response) {
  console.log(request.query, "쿼리");
  if (request.method === "GET") {
    const db = (await connectDB).db("forum");
    let result = await db.collection("comment")
      .find({ parent: new ObjectId(request.query.id)}).toArray();
    console.log(result);
    return response.staus(200).json("댓글 조회 성공");
  }
}
