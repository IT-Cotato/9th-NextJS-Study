# 상세페이지 만들기 2 (useRouter)

### 페이지 이동방법 - Link 대신 useRouter

= Link로 페이지 이동하는 방법 말고..! useRouter 사용해보기!!!

> useRouter는 client component &rarr; 'use client'

DetailLink 하나 새로 만들어서 'use client'

쓰고 싶은 page에 import 해주기

(쓰고 싶은 페이지가 DB 가져오는 서버 컴포넌트라 위 방법 사용)

```javascript
"use client";

import { useRouter } from "next/navigation";

export default function DetailLink() {
  let router = useRouter();
  return (
    <button
      onClick={() => {
        router.push("/list");
      }}
    >
      버튼
    </button>
  );
}
```

- 가기 : router.push("가고 싶은 경로")
- 뒤로 가기 : router.back()
- 앞으로 가기 : router.forward()
- 새로고침 : router.refresh() &larr; 바뀐 부분만 새로고침해주는 soft refresh
- 페이지 미리 로드 : router.prefetch("미리 로드하고 싶은 경로") &larr; 해당 페이지 방문하면 아주 빠름

  &rarr; Link 태그에도 prefetch 기능 내장되어 있음. but 모든 링크를 다 클릭할 거 아니면 모든 Link를 미리 로드할 필요가 없음.. 부담.

  &rarr; Link 태그 속성에 prefetch={false} 하면 됨

---

usePathname() - 현재 url 출력
useSearchParams() - Search parameter 출력
useParams() - 유저가 [dynamic route]에 입력한 것 출력
