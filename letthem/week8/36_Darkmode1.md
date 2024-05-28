# Dark mode 기능 1 (cookies/ localStorage)

참고 - prefers-color-scheme : 유저의 OS 테마에 맞춰서 CSS 적용해줌!

### 동적으로 바뀌는 UI 만들기

1. state 만들고 현재 UI 상태 보관
2. state 따라서 UI가 어떻게 보일지 작성
3. 원할 때 state 변경

but, state 단점 : 새로고침시 기본값으로 리셋됨!!!!ㅜㅜ
&rarr; 다크모드 여부를 DB에 저장하자 !

- 페이지 접속시 DB에서 다크모드 여부 꺼냄
- '다크'인 경우 배경 까매지는 class 추가함

## Session Storage

Local Storage와 다른 건 동일하지만, 브라우저 끄면 날아감

## Local Storage

자료이름(key) : 값(value)
5MB까지. 문자/숫자/JSON 저장가능
브라우저 껐다 켜도 남아있음!

- 저장: localStorage.setItem(~)
- 가져오기: localStorage.getItem(~)
- 지우기: localStorage.removeItem(~)

=> client 컴포넌트에서 써야함

useEffect로 써줘야 함.
현재 위치가 브라우저인지 서버인지 확인하는 조건문 필요.
HTML 렌더링 된 이후 동작,, 느리게 반응한다는 단점이 있음 ㅜ

```javascript
useEffect(() => {
  if (typeof window != "undefined") {
    localStorage.getItem("모드");
  }
}, []);
```

cookie 쓰면 좀 더 나을수도..!

## cookie

사이트당 보통 50개까지, 총 4KB까지
쿠키마다 유효기간 설정 가능
GET, POST 요청시 자동으로 서버로 보내짐

- 쿠키 데이터 저장 : document.cookie = '쿠키이름=값'
- 유효기간까지 설정 : document.cookie = '쿠키이름=값; max-age=3600;' - 1시간! 최대 400일까지 가능
- 유효기간 설정 안 하면 브라우저 끄면 사라짐 !

> cookie는 server 컴포넌트에서 출력가능!!!
> localStorage는 client 컴포넌트에서 출력가능!!!

```javascript
import { cookies } from "next/headers";

let res = cookies().get("name");
console.log(res);
```

&rarr; 다크모드도 쿠키 이용해서 만들어보면 좋을듯!!
