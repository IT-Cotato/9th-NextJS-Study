'use client';

import { signIn } from 'next-auth/react';

export default async function SocialLoginButton() {
  return <button onClick={() => signIn()}>로그인</button>;
}
