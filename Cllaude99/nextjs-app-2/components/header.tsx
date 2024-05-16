import styles from '@/styles/Header/header.module.css';
import Link from 'next/link';
import SocialLoginButton from './sociaLoign-btn';
import DarkModeBtn from './dark-mode';

export default function Header({ mode }: { mode: string | undefined }) {
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
          <DarkModeBtn initialMode={mode} />
        </ul>
      </nav>
    </header>
  );
}
