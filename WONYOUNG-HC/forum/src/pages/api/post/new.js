import { connectDB } from "@/util/database";
import { getSession } from "next-auth/react";
import { authOptions } from "../auth/[...nextauth]";

export default async function handler(요청, 응답) {
  let session = await getSession(요청, 등답, authOptions);

  if (session) {
    요청.body.author = session.user.name;
  }

  if (요청.method === "POST") {
    if (요청.body.title === "") {
      return 응답.status(500).json("제목ㄱ");
    }
    const db = (await connectDB).db("forum");
    let result = await db.collection("post").insertOne(요청.body);
    return 응답.status(200).redirect("/");
  }
}
