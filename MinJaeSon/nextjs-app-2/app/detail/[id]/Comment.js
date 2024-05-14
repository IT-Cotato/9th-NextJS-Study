"use client";

import { useEffect, useState } from "react";

export default function Comment({ postId }, props) {
  const [comment, setComment] = useState("");
  const [list, setList] = useState([]);

  useEffect(() => {
    fetch(`api/comment/list?id=${props._id}`, { method: "GET" })
      .then((res) => {
        console.log(res, "댓글 조회 결과");
        setList(res);
    });
  }, []);

  return (
    <div>
      <div>댓글 목록</div>
      {list.length > 0 ? (
        <>
          {list.map((item, i) => {
            <p key={i}>{item}</p>;
          })}
        </>
      ) : (
        "댓글이 없습니다."
      )}
      <input onChange={(e) => setComment(e.target.value)} />
      <button
        onClick={() => {
          fetch("/api/comment/new", {
            method: "POST",
            body: JSON.stringify({ comment: comment, _id: postId }),
          });
        }}
      >
        댓글 전송
      </button>
    </div>
  );
}
