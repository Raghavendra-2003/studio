import type { Metadata } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
import './globals.css';
import { Toaster } from '@/components/ui/toaster';
import { MainLayout } from '@/components/layout/main-layout';
import { QueryProvider } from '@/components/providers/query-provider';


const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

export const metadata: Metadata = {
  title: 'SkillSync - Live Skills Tracker',
  description: 'Track, verify, and showcase your ongoing skill development and micro-learnings.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        <QueryProvider>
            <MainLayout>
            {children}
            </MainLayout>
            <Toaster />
        </QueryProvider>
      </body>
    </html>
  );
}
