import type { Metadata } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
import './globals.css';
import { Providers } from './providers';
import Nav from '@/components/nav/Nav';
import 'toastr/build/toastr.min.css';

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

export const metadata: Metadata = {
  title: 'React Assignment',
  description: 'Developed by Md. Abu Nasib',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <Nav />
        <Providers>
          <main className="bg-white relative z-10 pt-16 mb-[-32px]">
            {children}
          </main>
        </Providers>
      </body>
    </html>
  );
}
