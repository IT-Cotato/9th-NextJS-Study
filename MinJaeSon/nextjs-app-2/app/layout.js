import { Inter } from "next/font/google";
import "./globals.css";
import Link from "next/link";

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <div className="p-[20px]">
        <Link href="/" className="pr-[20px] font-semibold text-black no-underline">
          Son's Forum
        </Link>
        <Link href="/list" className="text-black no-underline">List</Link>
      </div>
      {children}
    </html>
  );
}
