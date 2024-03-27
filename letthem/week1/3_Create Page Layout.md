# Create Page Layout (React 기초 문법)

### HTML/CSS로 만든다!

next.js는 react 위에 얹혀진 프레임워크라서 react문법 사용해야 함

### react 버전 HTML (JSX) 특징 4가지

1. return () 안에 HTML 넣을 때 평행해서 html 요소를 2개 이상 넣을 수 없음. 한 개의 태그로 시작해서 끝나야 함.  
   &rarr; 보통 큰 div를 넣음!

2. class 넣고 싶으면 className이라고 써야 함! Javascript이므로 class 예약어가 있기 때문

3. HTML 안이나 HTML 속성 안에 변수 넣고 싶으면 { ... } 중괄호 내에 변수 넣어주면 됨

   &rarr; JSX의 **'데이터바인딩'**

4. style 속성 넣으려면 {{ ... : '...' }}

   Javascript object 자료형이므로
   &rarr; font-size (X) fontSize (O)

   ```jsx
   <h4 style={{ color: "red", fontSize: "20px" }}>애플후레시</h4>
   ```
