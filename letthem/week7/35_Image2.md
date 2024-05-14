# 이미지 업로드 기능 2 (Presigned URL)

1. 서버한테 Presigned URL 달라고 GET 요청

write/page.js ⬇️

```javascript
"use client";

export default function Write() {
  return (
    <div className="p-20">
      <h4>글작성</h4>
      <form action="/api/post/new" method="POST">
        <input name="title" placeholder="글제목" />
        <input name="content" placeholder="글내용" />
        <input
          type="file"
          accept="image/*"
          onChange={async (e) => {
            let file = e.target.files[0];
            let filename = encodeURIComponent(file.name);
            await fetch("/api/post/image?file=" + filename);
            res = await res.json();
          }}
        />
        <img src="" />
        <button type="submit">버튼</button>
      </form>
    </div>
  );
}
```

2. 서버는 Presigned URL 발급

npm install aws-sdk 설치

pages/api/post/image.js ⬇️

```javascript
import aws from "aws-sdk";
export default async function handler(요청, 응답) {
  aws.config.update({
    accessKeyId: process.env.ACCESS_KEY,
    secretAccessKey: process.env.SECRET_KEY,
    region: "ap-northeast-2",
    signatureVersion: "v4",
  });

  const s3 = new aws.S3();
  const url = await s3.createPresignedPost({
    Bucket: process.env.BUCKET_NAME,
    Fields: { key: 요청.query.file },
    Expires: 60, // seconds
    Conditions: [
      ["content-length-range", 0, 1048576], //파일용량 1MB 까지 제한
    ],
  });

  응답.status(200).json(url);
}
```

- createPresignedPost 함수로 Presigned URL 발급해줌

form 태그 귀찮으면 new FormData()

write/page.js ⬇️

```javascript
"use client";
import { useState } from "react";

export default function Write() {
  let [src, setSrc] = useState("");

  return (
    <div className="p-20">
      <h4>글작성</h4>
      <form action="/api/post/new" method="POST">
        <input name="title" placeholder="글제목" />
        <input name="content" placeholder="글내용" />
        <button type="submit">전송</button>
      </form>

      <input
        type="file"
        accept="image/*"
        onChange={async (e) => {
          let file = e.target.files[0];
          let filename = encodeURIComponent(file.name);
          let res = await fetch("/api/post/image?file=" + filename);
          res = await res.json();

          //S3 업로드
          const formData = new FormData();
          Object.entries({ ...res.fields, file }).forEach(([key, value]) => {
            formData.append(key, value);
          });
          let 업로드결과 = await fetch(res.url, {
            method: "POST",
            body: formData,
          });
          console.log(업로드결과);

          if (업로드결과.ok) {
            setSrc(업로드결과.url + "/" + filename);
          } else {
            console.log("실패");
          }
        }}
      />
      <img src={src} />
    </div>
  );
}
```
