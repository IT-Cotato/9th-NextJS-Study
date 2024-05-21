import { Inter } from "next/font/google";
import "./globals.css";
import Link from "next/link";
import LoginBtn from "./LoginBtn";
import { getServerSession } from "next-auth";
import { authOptions } from "@/pages/api/auth/[...nextauth]";
import LogoutBtn from "./LogoutBtn";

export default async function RootLayout({ children }) {
  const session = await getServerSession(authOptions)
  if (session) {
    console.log(session, '로그인 상태ㅇㅇ')
  } else {
    console.log('로그아웃 상태')
  }

  return (
    <html lang="en">
      <body>
        <div className="p-[20px]">
          <Link
            href="/"
            className="pr-[20px] font-semibold text-black no-underline"
          >
            Son's Forum
          </Link>
          <Link href="/list" className="text-black no-underline">
            List
          </Link>
          {session ? <LogoutBtn /> : <LoginBtn />}|
        </div>
        {children}
      </body>
    </html>
  );
}
