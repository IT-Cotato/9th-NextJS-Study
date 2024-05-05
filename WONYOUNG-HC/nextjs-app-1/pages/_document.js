import { Html, Head, Main, NextScript } from "next/document";
import Link from "next/link";

export default function Document() {
  return (
    <Html lang="en">
      <Head />
      <body>
        <div className="navbar">
          <Link href="/">홈</Link>
          <Link href="/list">List</Link>
        </div>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
