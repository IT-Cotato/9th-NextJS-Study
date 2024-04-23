"use client";
import Link from "next/link";

export default function ListItem({ result }) {
  return (
    <div>
      {result.map((a, i) => {
        return (
          <div key={i} className="list-item">
            <Link href={"/detail/" + result[i]._id}>
              <h4>{result[i].title}</h4>
            </Link>
            <Link href={"/edit/" + result[i]._id}>🖊️</Link>
            <span
              onClick={(e) => {
                fetch(`/api/post/delete/${result[i]._id}`, {
                  method: "DELETE",
                })
                  .then((r) => {
                    if (r.status == 200) {
                      return r.json();
                    } else {
                      // 서버가 에러코드 전송시 실행할 코드
                    }
                  })
                  .then(() => {
                    // 성공시 실행할 코드
                    e.target.parentElement.style.opacity = 0;
                    setTimeout(() => {
                      e.target.parentElement.style.display = "none";
                    }, 1000);
                  })
                  .catch((error) => {
                    //인터넷 문제로 실패시 실행할 코드
                    console.log(error);
                  });
              }}
            >
              🗑️
            </span>
            <p>1월 1일</p>
          </div>
        );
      })}
    </div>
  );
}
