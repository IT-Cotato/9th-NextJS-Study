import styles from '@/styles/Header/header.module.css';
import { signIn } from 'next-auth/react';
import Link from 'next/link';
import SocialLoginButton from './sociaLoign-btn';

export default function Header() {
  return (
    <header>
      <nav className={styles.navbar}>
        <ul className={styles.navLists}>
          <Link href={`/`}>
            <li>Cllaude-Forum</li>
          </Link>
          <Link href={`/list`}>
            <li>글 목록</li>
          </Link>
          <SocialLoginButton />
        </ul>
      </nav>
    </header>
  );
}
