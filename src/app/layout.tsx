import type { Metadata } from 'next';
import { Geist } from 'next/font/google';
import './globals.css';
import { Toaster } from '@/components/ui/sonner';
import { VerifyHeader } from '@/components/layout/global/header/header';
import { ThemeProvider } from '../../contexts/theme-provider/theme-provider';

export const metadata: Metadata = {
  title: 'FinanCE - Controle Financeiro',
  description: 'Melhor app de controle Financeiro para você',
  icons: {
    icon: '/assets/icons/favicon.png',
  },
};

const geist_font = Geist({
  weight: ['300', '400', '500', '600'],
  subsets: ['latin'],
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR">
      <body className={`antialiased ${geist_font.className}`}>
        <ThemeProvider>
          <Toaster position="top-center" duration={2000} />
          <VerifyHeader />
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
