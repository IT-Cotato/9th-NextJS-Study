import { connectDB } from "@/utils/database";

export default async function handler(request, response) {  
  if (request.method == "POST") {
    if (request.body.title == "") {
      return response.status(400).json("제목을 입력해주세요.");
    } else if (request.body.content == "") {
      return response.status(400).json("내용을 입력해주세요.");
    }
    
    try {
      const db = (await connectDB).db("forum");
      let data = await db.collection("post").insertOne(request.body);
      return response.status(200).redirect("/list");
    } catch (error) {
      return response.status(500).json("DB 저장 실패");
    }
  }
}
