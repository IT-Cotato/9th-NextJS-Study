'use client';

import { GlobalStyles } from '@/styles/global-style';
import { theme } from '@/styles/theme';
import { ThemeProvider } from 'styled-components';

export default function Setting({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider theme={theme}>
      <GlobalStyles />
      {children}
    </ThemeProvider>
  );
}
