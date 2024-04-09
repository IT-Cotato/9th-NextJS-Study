import { connectDB } from "@/utils/database";
import { ObjectId } from "mongodb";

export default async function handler(request, response) {
  if (request.method == "POST") {
    console.log(request.body);
    let newData = {
      title: request.body.title,
      content: request.body.content,
    };

    try {
      const db = (await connectDB).db("forum");
      let data = await db
        .collection("post")
        .updateOne({ _id: new ObjectId(request.body._id) }, { $set: newData });
      return response.status(302).redirect("/list");
    } catch (error) {
      return response.status(500).json("DB 갱신 실패");
    }
  }
}
