import { connectDB } from "@/util/database";
import Link from "next/link";
import DetailLink from "./DetailLink";

export default async function List() {
  const db = (await connectDB).db("forum");
  let result = await db.collection("post").find().toArray();

  return (
    <div className="list-bg">
      {result.map((a, i) => (
        <div className="list-item" key={i}>
          <h4>{result[i].title}</h4>
          <Link href={"/detail/" + result[i]._id}>링크</Link>
          <br />
          <Link href={"edit/" + result[i]._id} clasName="list-btn">
            수정수정
          </Link>
          <p>1월 1일</p>
        </div>
      ))}
    </div>
  );
}
