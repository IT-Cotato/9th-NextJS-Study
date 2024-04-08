import { connectDB } from "@/utils/database"

export default async function handler(request, response) {
  const db = (await connectDB).db("forum")
  let data = await db.collection("post").insertOne(request.body)
  return response.status(200).json("요청 성공")
}