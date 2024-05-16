"use client";
import Link from "next/link";

export default function ListItem({ result }) {
  return (
    <div>
      {result.map((a, i) => (
        <div className="list-item" key={i}>
          <h4>{result[i].title}</h4>
          <Link href={"/detail/" + result[i]._id}>링크</Link>
          <br />
          <Link href={"edit/" + result[i]._id} clasname="list-btn">
            수정수정
          </Link>
          <br />
          <span
            onClick={(e) => {
              fetch("/api/post/delete", {
                method: "DELETE",
                body: result[i]._id,
              })
                .then((r) => {
                  return r.json();
                })
                .then(() => {
                  e.target.parentElement.style.opacity = 0;
                  setTimeout(() => {
                    e.target.parentElement.style.display = "none";
                  }, 1000);
                });
            }}
          >
            삭제삭제
          </span>
          <p>1월 1일</p>
        </div>
      ))}
    </div>
  );
}
