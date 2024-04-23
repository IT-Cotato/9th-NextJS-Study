"use client";

import { signIn, signOut } from "next-auth/react";

export default function LoginBtn() {
  return (
    <button
      onClick={() => {
        signOut();
      }}
    >
      로그아웃
    </button>
  );
}
