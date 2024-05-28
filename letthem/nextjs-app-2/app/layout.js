import { Inter } from "next/font/google";
import Link from "next/link";
import "./globals.css";
import LoginBtn from "./LoginBtn";
import LogoutBtn from "./LogoutBtn";
import { authOptions } from "@/pages/api/auth/[...nextauth]";
import { getServerSession } from "next-auth";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default async function RootLayout({ children }) {
  let session = await getServerSession(authOptions);

  return (
    <html lang="en">
      <body>
        <div className="navbar">
          <Link href="/" className="logo">
            Letthem Forum
          </Link>
          <Link href="/list">List</Link>
          {session ? (
            <span>
              {session.user.name}
              <LogoutBtn />
            </span>
          ) : (
            <LoginBtn />
          )}
        </div>
        {children}
      </body>
    </html>
  );
}
