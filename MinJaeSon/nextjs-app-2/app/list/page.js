import { connectDB } from "@/utils/database";
import Link from "next/link";
import DetailLink from "./DetailLink";

export default async function List() {
  const client = await connectDB;
  const db = client.db("forum");
  let data = await db.collection("post").find().toArray();
  console.log(data);

  return (
    <div className="bg-gray-50 p-10">
      {data.map((data) => (
        <div className="bg-white rounded-xl p-20 mb-5 shadow shadow-gray-300">
          <Link
            href={`/detail/${data._id}`}
            className="text-xl font-extrabold m-0"
          >
            {data.title}
          </Link>
          {/* <DetailLink */}
          <Link href={`/modify/${data._id}`}>
            <button>✏</button>
          </Link>
          <p className="text-gray-400 mx-0 my-1.5">{data.content}</p>
        </div>
      ))}
    </div>
  );
}
