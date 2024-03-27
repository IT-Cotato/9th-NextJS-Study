# Create Multipla Pages (Routing)

### Routing : url로 페이지들을 나누는 행위

기존에는 누가 /list로 접속하면 상품목록.html 보내라는 코드를 짰어야 했음.

그러나 next는 **자동 라우팅 기능**이 있어서 폴더 하나만 만들면 라우팅 끝!

### url과 페이지 만들고 싶으면 ❗️

1. app에다 url명의 폴더 생성
2. 폴더 안에 page.js 생성

### page.js 만드는 법 ❗️

Component를 만들어서 export default 하면 됨

1. function 작명 () {}
   - 작명 : 폴더명(url명)과 유사
2. return ( HTML ~ )
3. function 왼쪽에 export default 붙이기

### Link 연결하고 싶으면

a 태그 대신 Link 태그 사용

부드럽게 페이지 전환 가능

```html
<Link href="/list">List</Link>
```

### 상단바처럼 모든 페이지에 보일 UI(HTML)가 있으면 **layout.js**에 작성!

layout.js에 {children} 이 바로 page.js가 들어가는 부분임 ❗️

#### page.js를 보여줄 때 :

1. 옆에 layout.js 있으면 그걸로 page.js 감싼다.
2. 상위 폴더에 layout.js 있으면 그걸로 1번 감싼다.
3. 상위상위 폴더에 layout.js 있으면 그걸로 2번 감싼다.

&rarr; page.js 보여줄 때는 옆이나 상위에 있는 모든 layout.js를 함쳐서 보여줌❗️
