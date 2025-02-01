import './globals.css';

import type { Metadata } from 'next';
import localFont from 'next/font/local';

import { getVercelUrl } from '@/lib/environments/is-dev';
import { leanvilasLink } from './constants/links';

const geistSans = localFont({
  src: './fonts/GeistVF.woff',
  variable: '--font-geist-sans',
  weight: '100 900'
});
const geistMono = localFont({
  src: './fonts/GeistMonoVF.woff',
  variable: '--font-geist-mono',
  weight: '100 900'
});

export const metadata: Metadata = {
  title: 'Be Always #1',
  description: 'Schedule the First Comment on LinkedIn',
  icons: { icon: '/favicon.ico' },
  metadataBase: new URL(getVercelUrl()),
  openGraph: {
    images: ['/favicon.ico'],
    url: leanvilasLink,
    locale: 'en_US',
    type: 'website'
  },
  authors: [{ name: 'Lean Vilas' }]
};

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>{children}</body>
    </html>
  );
}
