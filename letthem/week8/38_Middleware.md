# 서버기능 중간에 간섭하려면 Middleware

클라이언트와 서버 사이 간섭 가능!!!
요청과 응답 사이에 실행되는 코드 &rarr; middleware

middleware.js 만들면 된다!!!!

1. 유저가 GET, POST 요청시 or 페이지 접속시
2. middleware.js 코드 먼저 실행되고
3. 그 다음 서버코드 실행해줌!

middleware.js ⬇️

```javascript
import { NextResponse } from "next/server";

export function middleware(request) {
  console.log(request.nextUrl); // 유저가 요청중인 URL
  console.log(request.cookies); // 유저의 cookie
  console.log(request.headers); // 유저의 headers 정보 (이전 방문 페이지, 사용중인 OS, 브라우저, 선호하는 언어, IP, 쿠키 등)
}
```

middleware 기능 마지막엔 이거 꼭 써줘야 함!! ⬇️

```javascript
NextResponse.next(); // 통과
NextResponse.redirect(); // 다른 페이지로 강제 이동 (주소창도 변경)
NextResponse.rewrite(); // 다른 페이지로 강제 이동 (주소창은 그대로)
```

## 1. /list 페이지 접속기록 몰래 저장하기

```javascript
import { NextResponse } from "next/server";

export function middleware(request) {
  if (request.nextUrl.pathname === "/list") {
    // 현재 요청 중인 url 경로
    console.log(new Date());
    console.log(request.headers.get("sec-ch-ua-platform"));
    return NextResponse.next();
  }
}
```

/list로 시작하는 모든 URL도 검사가능!

```javascript
request.nextUrl.pathname.startsWith("/list");
```

## 2. 미로그인 유저 /write 접속시 로그인페이지로 !

JWT - getToken()

```javascript
const session = await getToken({ req: request });

if (request.nextUrl.pathname.startsWith("/write")) {
  if (session == null) {
    return NextResponse.redirect("http://localhost:3000/api/auth/signin");
  }
}
```

## 특정 페이지 접속시 쿠키 만들어보기

```javascript
import { NextResponse } from "next/server";
export async function middleware(request) {
  request.cookies.get("쿠키이름"); //출력
  request.cookies.has("쿠키이름"); //존재확인
  request.cookies.delete("쿠키이름"); //삭제

  const response = NextResponse.next();
  response.cookies.set({
    name: "mode",
    value: "dark",
    maxAge: 3600,
    httpOnly: true, // 유저 자바스크립트 조작 불가능하게
  });
  return response; //쿠키생성
}
```

## 유저가 /register 페이지 방문시 visited=true라는 쿠키 생성해줘보자

```javascript
import { NextResponse } from "next/server";
export async function middleware(request) {
  if (request.nextUrl.pathname.startsWith("/register")) {
    if (request.cookies.has("visited") == false) {
      const response = NextResponse.next();
      response.cookies.set({
        name: "visited",
        value: "true",
        maxAge: 3600,
      });
      return response;
    }
    return NextResponse.next();
  }
}
```
