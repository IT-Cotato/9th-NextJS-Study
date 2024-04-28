import Head from "next/head";
import Image from "next/image";
import { Inter } from "next/font/google";
import styles from "@/styles/Home.module.css";
import Link from "next/link";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  let name = "HOCHI";

  return (
    <div>
      <h4 className="title">애플후레시</h4>
      <p className="title-sub">by {name}</p>
    </div>
  );
}
