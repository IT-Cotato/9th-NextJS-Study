# 다크모드 기능 구현하기

회원가입, 글 작성하기, 댓글 달기 등등 기본적인 기능들은 이제 다 구현을 해보았으니 다크모드 기능을 한 번 구현해보려 한다. <br/>

<strong>state를 통해 다크모드인지 라이트모드인지를 관리하면 된다</strong>는 것은 누구나 쉽게 떠올릴 수 있을 것이다. 리액트 사용자였다면 특히 여기서 자연스럽게 useState를 생각하게 될텐데, useState 사용 시 새로고침 시 상태가 초기화되기 때문에 다크모드의 상태를 관리하기에는 적절하지 않다. <br/>

상태 데이터를 DB에 저장할 수도 있지만 간단하게 브라우저의 저장공간에 저장해보자. <br/>

## 1. localStorage에 저장하기

```javascript
localStorage.setItem("저장할 이름", "값"); // 저장하기
localStorage.getItem("저장할 이름"); // 가져오기
localStorage.removeItem("저장할 이름"); // 삭제하기
```

```javascript
export default function () {
  useEffect(() => {
    if (typeof window != "undefined") {
      let res = localStorage.setItem("이름", "kim");
    }
  }, []);

  return 생략;
}
```

이와 같이 간단하게 브라우저의 로컬 스토리지에서 데이터를 관리할 수 있다. <br/>
다만 useEffect 안에서 코드를 작성해주어야 하기 때문에 이 방식 또한 다크모드 기능을 구현하기에는 적절하지 않아보인다. <br/>

> ❓ useEffect 안의 코드는 HTML이 브라우저에 다 그려진 후에 실행되기 때문에, 로컬 스토리지에 다크모드인 상태가 저장되어 있어도 라이트모드가 먼저 보여지고 곧바로 다크모드로 바뀌게 될 것이다.

<br/>

## 2. cookie에 저장하기

로컬 스토리지에 저장된 데이터는 클라이언트 컴포넌트에서만 사용이 가능한 것에 반해, 쿠키는 <strong>서버 컴포넌트에서도 쉽게 접근할 수 있다</strong>는 점에서 SSR에서 유용하다. <br/>

> ✅ 쿠키 사용 시 유의사항
>
> - 단순 문자열만 저장 가능
> - GET, POST 요청 시마다 서버에 전달되므로 네트워크 호스팅 비용 증가

<br/>

쿠키를 생성할 때의 코드는 다음과 같다.

```javascript
document.cookie = "쿠키이름=값; max-age=3600";
```

- `max-age` : 쿠키의 유효기간 (미설정 시 브라우저 종료와 함께 쿠키는 자동 삭제됨)

<br/>

서버 컴포넌트에서 쿠키를 가져올 때는 다음과 같이 키값으로 값을 가져오면 된다.

```javascript
const result = cookies().get("쿠키이름");
```

<br/>

## 💻 전체 코드

```javascript
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

const ThemeBtn = () => {
  const [theme, setTheme] = useState("light");

  const router = useRouter();

  useEffect(() => {
    const mode = ("; " + document.cookie).split(`; mode=`).pop().split(";")[0];
    if (mode == "") document.cookie = "mode=light; max-age=" + 60 * 60 * 30;
  }, []);

  const handleDarkMode = () => {
    document.cookie = "mode=dark; max-age=" + 60 * 60 * 30;
    setTheme("dark");
    router.refresh();
  };

  const handleLightMode = () => {
    document.cookie = "mode=light; max-age=" + 60 * 60 * 30;
    setTheme("light");
    router.refresh();
  };

  return (
    <div>
      {theme == "dark" ? (
        <span onClick={handleLightMode}>🌞</span>
      ) : (
        <span onClick={handleDarkMode}>🌛</span>
      )}
    </div>
  );
};

export default ThemeBtn;
```

<br/>

```javascript
import { cookies } from "next/headers";

export default async function RootLayout({ children }) {
  const mode = cookies().get("mode"); // 쿠키에 저장된 값 가져오기
  console.log(mode, "mode");

  return (
    <html lang="en">
      <body>
        {/* 가져온 값(mode)이 'dark'이면 다크모드 css 입히기 */}
        <div className={"p-[20px] " + `${mode.value == "dark" && "dark-mode"}`}>
          <div className="navbar">
            <Link
              href="/"
              className="pr-[20px] font-semibold text-black no-underline"
            >
              Home
            </Link>
            <Link href="/list" className="text-black no-underline">
              List
            </Link>
            {session ? <LogoutBtn /> : <LoginBtn />}
            <ThemeBtn />
          </div>
        </div>
        {children}
      </body>
    </html>
  );
}
```

<br/>

```css
.dark-mode .navbar {
  background: #222;
}
.dark-mode .navbar a {
  color: #fff;
}
```

<br/>
<br/>

# Next.js Middleware

> Middleware allows you to run code before a request is completed. Then, based on the incoming request, you can modify the response by rewriting, redirecting, modifying the request or response headers, or responding directly.

ㅡ [Next.js 공식문서](https://nextjs.org/docs/app/building-your-application/routing/middleware)

한마디로 <strong>미들웨어란 요청이 들어왔을 때 해당 요청에 대해 응답을 보내기 전 무언가를 수행할 수 있게 해주는 중간자같은 역할</strong>을 한다고 볼 수 있다.

애플리케이션의 성능과 보안성, 사용자 경험을 강화하고자 할 때 사용되는데, <br/>일반적으로 다음과 같은 경우에서 효과적으로 쓰인다 : <br/>

> - 특정 페이지로 라우팅하기 전 세션 토큰이나 사용자 권한 등을 체크하고자 할 경우
> - 페이지 또는 API에 접근하기 전 request data에 대해 정보를 확인 및 분석하고자 할 경우
> - 유저에 따라 서버 사이드로 리다이렉트 시키는 경우
> - 요청에 대한 응답을 변환시키거나 에러를 처리할 경우

<br/>

## 미들웨어가 실행되는 시점

1️⃣ 서버로 요청을 보낼 시 (서버 API 실행 직전) <br/>
2️⃣ 특정 페이지로 접속 시 (특정 페이지 로드 직전) <br/>

<br/>

## 미들웨어 사용 예시

root에 middleware.js라는 파일을 만들어 코드를 작성한다.

### 특정 페이지에 접속한 사용자 기록하기

```javascript
import { NextResponse } from "next/server";

export async function middleware(req) {
  if (req.nextUrl.pathname == "/list") {
    console.log(req.headers.get("sec-ch-ua-platform"));
    console.log(new Date());
    return NextResponse.next();
  }
}
```

- `req.nextUrl` : 사용자가 요청 중인 URL을 반환
- `req.headers` : 사용자에 대한 정보(브라우저, 언어, OS 정보 등)를 반환
- `NextResponse.next()` : 마지막에 return문에서 통과의 의미로 작성

<br/>

### 로그인 안 한 사용자의 접속 제한하기

```javascript
import { NextResponse } from "next/server";
import { getToken } from "next-auth/jwt";

export async function middleware(req) {
  if (req.nextUrl.pathname.startsWith("/write")) {
    const session = await getToken({ req: req });
    console.log("세션", session);
    if (session == null) {
      return NextResponse.redirect(new URL("/api/auth/signin", req.url));
    }
  }
}
```

- `NextResponse.redirect()` : 특정 페이지로 리다이렉션
  > 💭 <strong>`NextResponse.rewrite()` 과의 차이점? </strong><br/>
  > rewrite는 url을 유지한 채로 다른 페이지로 이동을 시켜준다!

<br/>

### 특정 페이지 접속 시 쿠키 생성하기

```javascript
import { NextResponse } from "next/server";
import { getToken } from "next-auth/jwt";

export async function middleware(req) {
  const session = await getToken({ req: req });

  if (req.nextUrl.pathname.startsWith("/register")) {
    if (req.cookies.has("visited") == false) {
      const res = NextResponse.next();
      res.cookies.set({
        name: "visited",
        value: "true",
        maxAge: 60 * 60,
        httpOnly: true,
      });
      return res;
    }
    return NextResponse.next();
  }
}
```

- `req.cookies` : 사용자가 보낸 쿠키 반환

<br/>
<br/>

예시에 나온 것들 외 request 또는 response와 관련된 함수들도 많은데, 이는 [공식문서](https://nextjs.org/docs/app/api-reference/functions/next-response#next)에 잘 나와 있으니 필요 시 직접 알아보는 것을 권장한다. <br/>

<br/>
<br/>

# Next.js Server Actions

13.4 버전 이상부터는 서버 API 기능을 page.js 안에 클라이언트 컴포넌트와 함께 작성하여 처리할 수 있게 되었다. <br/>

글을 작성하는 기능을 구현한다고 할 때, 다음과 같이 코드를 작성할 수 있다. <br/>
```javascript
import { connectDB } from "@/utils/database";

export default async function Write() {
  async function handleSubmit(formData) {
    "use server"
    const db = (await connectDB).db('forum')
    await db.collection('post_test').insertOne({title: formData.get('title')})
    revalidatePath('/write2')
  }

  return (
    <div>
      <form action={handleSubmit}>
        <input name="title"></input>
        <button type="submit">완료</button>
      </form>
    </div>
  );
}
```
- 이와 같이 클라이언트 컴포넌트가 작성된 파일에 `"use server"`라는 키워드와 함께 함수를 추가해주면, 이 함수는 서버 API 기능을 하는 함수로서(=> 서버코드) 작동한다. <br/> 
- 해당 함수를 클라이언트 사이드에서 호출할 때는 `action` 속성에 넣어서 폼 전송 시 실행되도록 하면 된다.
- `revalidatePath()` : 폼 전송 시 자동으로 새로고침이 되지 않기 때문에 사용
  - `router.refresh()`나 서버 컴포넌트일 경우 `revalidateTag()`를 사용할 수도 있지만, 이것들과 다르게 바뀐 부분만 SPA처럼 보여준다는 장점이 있다.