# Next.js에서 이미지 넣는 법 2가지

### 일반 이미지 넣는 법

> &lt;img src="경로"/&gt;

public 안에 이미지 다운로드

```javascript
<img src="/food0.png" />
```

이런식으로 / 뒤에 바로 입력.
public 안에 있는 것들은 사이트 root 경로로 이동하기 때문!

alt 설명은 검색 이점이 있으므로 넣는 게 좋음.

### 이미지 최적화 하는 법

- lazy loading (이미지 로딩이 느린 것)
- 사이즈 최적화
- layout shift 방지

1. import Image from "next/image"
2. &lt;Image/> 사용
3. 이미지를 import 해서 경로 넣어야 함.

```javascript
import Image from "next/image"
import 작명 from "/public/food0.png"
...

<Image src={작명} />
```

### 😈 단점

- 반복해서 쓰기에 난감. src 안에 require("이미지 경로") 써야함.
- 외부이미지 사용할 때는 src="https://~" width={500} height={400} 등 width, height 속성 필요함. 그리고 next.config.js 세팅도 필요함.

### 이미지 경로 내 숫자 변경

```javascript
<img src={"/food" + i + ".png"} />
```

or

```javascript
<img src={`/food${i}.png`} />
```
