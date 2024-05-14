import { connectDB } from "@/utils/database";
import { ObjectId } from "mongodb";
import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]";

export default async function handler(request, response) {
  const session = await getServerSession(request, response, authOptions);

  if (request.method === "POST") {
    const data = JSON.parse(request.body);
    let comment = {
      content: data.comment,
      author: session.user.email,
      parent: new ObjectId(data._id),
    };
    console.log(comment, "DB에 저장할 댓글 데이터");
    const db = (await connectDB).db("forum");
    const result = await db.collection("comment").insertOne(comment);
    return response.status(200).json("댓글 전송 성공");
  }
}
