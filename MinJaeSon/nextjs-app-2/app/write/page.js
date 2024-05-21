"use client";

import { useState } from "react";

export default function Write() {
  let [src, setSrc] = useState("");

  return (
    <div>
      <h4>글 작성</h4>
      <form action="/api/post/new" method="post">
        <input type="text" name="title" placeholder="제목 입력" />
        <input type="text" name="content" placeholder="내용 입력" />
        <input
          type="file"
          accept="image/*"
          onChange={async (e) => {
            let file = e.target.files[0];
            let filename = encodeURIComponent(file.name);
            let res = await fetch(`/api/post/image?file=${filename}`);
            res = await res.json();
            console.log(res);

            //S3 업로드
            const formData = new FormData();
            Object.entries({ ...res.fields, file }).forEach(([key, value]) => {
              formData.append(key, value);
            });
            let result = await fetch(res.url, {
              method: "POST",
              body: formData,
            });
            console.log(result);

            if (result.ok) {
              setSrc(result.url + "/" + filename);
            } else {
              console.log("업로드 실패");
            }
          }}
        />
        <img src={src} />
        <button type="submit">발행</button>
      </form>
    </div>
  );
}
