import Providers from '@/components/layout/providers';
import type { Metadata } from 'next';
import NextTopLoader from 'nextjs-toploader';
import { Inter } from 'next/font/google';
import './globals.css';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'R-Info 2.0',
  description:
    'R-Info recargado, ahora mas r-info que nunca. Un lenguaje de programación para robots.'
};

export default async function RootLayout({
  children
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${inter.className} `}>
        <NextTopLoader color="blue" />
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
