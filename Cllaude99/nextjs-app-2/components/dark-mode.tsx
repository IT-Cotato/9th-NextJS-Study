'use client';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

export default function DarkModeBtn({
  initialMode,
}: {
  initialMode: string | undefined;
}) {
  const [isDark, setIsDark] = useState(initialMode === 'dark');
  const router = useRouter();

  useEffect(() => {
    if (initialMode) {
      setIsDark(initialMode === 'dark');
    }
  }, []);

  const toggleMode = () => {
    const newMode = isDark ? 'light' : 'dark';
    document.cookie = `mode=${newMode}; max-age=${3600 * 24 * 400}; path=/`;
    setIsDark(!isDark);
    router.refresh(); // 페이지를 새로고침하여 모드 변경 반영
  };

  return (
    <span onClick={toggleMode} style={{ cursor: 'pointer' }}>
      {isDark ? '🌞' : '🌙'}
    </span>
  );
}
