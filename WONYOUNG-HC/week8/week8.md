# Dark mode 기능 1 (cookies / localStorage)

- state를 통해 라이트 모드 또는 다크 모드를 저장
- 모드에 맞게 css를 적용
- 사용자가 선택한 모드는 쿠키 또는 로컬스토리지에 저장

### localStorage

- 데이터를 브라우저에 저장
- `localStraoge.setItem('key', 'value')`
- `localStraoge.getItem('key')`
- `localStraoge.removeItem('value')`
- 클라이언트 컴포넌트에서 사용 가능

<br>

### cookies

- 브라우저에 저장해둘 수 있는 짧은 문자열
- 유효기간을 설정 가능

```js
document.cookie = '쿠키이름=값'; max-age=3600
```

<br>
<br>

# Dark mode 기능 2

```js
'use client'
import { useEffect } from "react"

export default function DarkMode(){
  useEffect(()=>{
    let 쿠키값 = ('; '+document.cookie).split(`; mode=`).pop().split(';')[0]
    if (쿠키값 == '') {
      document.cookie = 'mode=light; max-age=' + (3600 * 24 * 400)
    }
  },[])
  return (
  return (
    <span onClick={()=>{
      let 쿠키값 = ('; '+document.cookie).split(`; mode=`).pop().split(';')[0]
      if (쿠키값 == 'light') {
        document.cookie = 'mode=dark; max-age=' + (3600 * 24 * 400)
        router.refresh()
      } else {
        document.cookie = 'mode=light; max-age=' + (3600 * 24 * 400)
        router.refresh()
      }
     }}> 🌙 </span>
  )
}
```

- 쿠키값을 가져오고, 쿠키값에 mode가 존재하지 않은 경우에만 설정
- 모드 변경 이후 refresh를 통해 리렌더링

<br>

```js
(layout.js)

import { cookies } from 'next/headers'

export default async function RootLayout({ children }) {
  let cookie = cookies().get('mode')

  return (
    <html>
      <body className={
        cookie != undefined && cookie.value == 'dark'
          ? 'dark-mode'
          : ''
      }>
      (생략)
    </html>
  )
}
```

- 쿠키에 다크 모드로 설정된 경우 'dark-mode' 클래스네임을 다크모드로 적용

<br>
<br>

# 서버기능 중간에 간섭하려면 Middleware

### 미들웨어 만들기

```js
(/middleware.js)

import { NextResponse } from 'next/server'

export async function middleware(request) {
  console.log(request.nextUrl)  //유저가 요청중인 URL 출력해줌
  console.log(request.cookies)  //유저가 보낸 쿠키 출력해줌
  console.log(request.headers)  //유저의 headers 정보 출력해줌
  NextResponse.next()  //통과
  NextResponse.redirect()  //다른페이지 이동
  NextResponse.rewrite()  //다른페이지 이동
}
```

- 서버로 요청을 보내거나 페이지에 접속하는 경우 미들웨어가 실행

<br>

```js
(/middleware.js)

import { NextResponse } from 'next/server'

export async function middleware(request) {
  if (request.nextUrl.pathname == '/list') {
    console.log(new Date().toLocaleString())
    console.log(request.headers.get('sec-ch-ua-platform'))
    return NextResponse.next()
  }
}
```

- list 경로로 접근시 접근 시간과 사용자 OS 정보를 기록
- 미들웨어가 종료되면 `NextResposnse.next()`를 반환

<br>

```js
import { NextResponse } from "next/server";
import { getToken } from "next-auth/jwt";

export async function middleware(request) {
  if (request.nextUrl.pathname.startsWith("/write")) {
    const session = await getToken({ req: request });
    console.log("세션", session);
    if (session == null) {
      return NextResponse.redirect(new URL("/api/auth/signin", request.url));
    }
  }
}
```

- session 정보를 통해 로그인이 되지 않은 유저는 로그인 페이지로 리다이렉트

<br>
<br>

# Next.js의 Server actions 기능

- Next.js 13.4 버전 이상에서 동작
- next.config.js에서 다음과 같이 수정

```js
module.exports = {
  experimental: {
    serverActions: true,
  },
};
```

<br>

```js
import { connectDB } from "@/util/database";

export default async function Write2() {
  //DB에서 데이터 뽑아서 보여주기
  const db = (await connectDB).db("forum");
  let result = await db.collection("post_test").find().toArray();

  async function handleSubmit(formData) {
    "use server";
    const db = (await connectDB).db("forum");
    await db
      .collection("post_test")
      .insertOne({ title: formData.get("post1") });
  }

  return (
    <form action={handleSubmit}>
      <input type="text" name="post1" />
      <button type="submit">Submit</button>
      {result ? result.map((a) => <p>글제목 : {a.title}</p>) : null}
    </form>
  );
}
```

- 서버 api를 만들지 않고 함수를 통해 db에 데이터를 저장
- `use server`를 넣은 함수는 서버 API로 자동으로 변환
- 클라이언트 컴포넌트인 경우 서버 액션 파일은 분리 필요
- 폼 전송시 새로고침을 하기 위해서는 `revalidatePath()` 함수를 사용 (캐싱 데이터를 삭제하고 재생성)
