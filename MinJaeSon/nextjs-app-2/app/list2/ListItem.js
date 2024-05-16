"use client";
import Link from "next/link";

export default function ListItem({ data }) {
  return (
    <div>
      {data.map((data) => (
        <div
          key={data._id}
          className="bg-white rounded-xl p-20 mb-5 shadow shadow-gray-300"
        >
          <Link
            href={`/detail/${data._id}`}
            className="text-[18px] font-bold m-0 text-black no-underline"
          >
            {data.title}
          </Link>
          {/* <DetailLink */}
          <br />
          <Link href={`/modify/${data._id}`}>
            <button className="bg-white border-none cursor-pointer">✏</button>
          </Link>
          <span
            onClick={
              (e) => {
                fetch("/api/post/delete", {
                  method: "DELETE",
                  body: JSON.stringify({ _id: data._id.toString() }),
                })
                  .then((res) => {
                    res.json();
                  })
                  .then((res) => {
                    e.target.parentElement.style.opacity = 0;
                    setTimeout(() => {
                      e.target.parentElement.style.display = "none";
                    }, 1000);
                  })
                  .catch((err) => {
                    console.log(err);
                  });
              }
              // fetch("/api/abc/def")
            }
          >
            &nbsp;🗑
          </span>
          <p className="text-[14px] text-gray-400 mx-0 my-1.5">
            {data.content}
          </p>
        </div>
      ))}
    </div>
  );
}
