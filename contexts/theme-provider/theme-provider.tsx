'use client';

import React from 'react';

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [mounted, setMounted] = React.useState(false);

  React.useEffect(() => {
    const savedTheme = localStorage.getItem('theme');

    if (
      savedTheme === 'dark' ||
      (!savedTheme && window.matchMedia('(prefers-color-scheme: dark)').matches)
    ) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <div className="justify-center items-center flex h-screen w-screen bg-primary">
        <h1 className="text-3xl text-white font-medium">FinanCE</h1>
        <div style={{ display: 'none' }}>{children}</div>
      </div>
    );
  }

  return <>{children}</>;
}
