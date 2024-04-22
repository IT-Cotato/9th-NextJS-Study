# NextJS Install

1. 폴더 생성
2. Next.js 설치

   ```shell
   npx create-next-app@latest
   ```

3. 새로 만든 프로젝트로 이동
   ```shell
   cd nextjs-app-1
   ```
4. 실행
   ```shell
   npm run dev
   ```

### 폴더/파일 설명

- page.js : 메인페이지
- layout.js : page.js를 감싸는 파일 (head태그, 상단 메뉴 내용 등)
- globals.css : 모든 페이지에 적용할 css
- xxx.module.css : 특정 페이지에만 적용 가능한 css

---

- api 폴더 : 서버 기능 만드는 곳
- node_modules : 설치한 라이브러리 보관
- public 폴더 : 이미지/폰트 등 소스코드 외의 파일 보관
- package.json : 설치한 라이브러리 버전 자동 기록 / 터미널에서 쓸 수 있는 명령어
