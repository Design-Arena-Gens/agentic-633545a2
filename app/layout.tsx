import './globals.css';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { LanguageProvider } from '@/components/LanguageProvider';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Gita: Essence & Everyday Wisdom',
  description: 'Chapter-wise exploration with narration, scenarios, and daily quotes.',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <LanguageProvider>
          <div className="min-h-screen">
            <header className="border-b border-white/10 sticky top-0 z-50 backdrop-blur supports-[backdrop-filter]:bg-white/10">
              <div className="container flex items-center justify-between py-4">
                <a href="/" className="text-xl font-semibold">Gita</a>
                <nav className="flex items-center gap-2">
                  <a className="button-ghost" href="/">Home</a>
                  <a className="button-ghost" href="/chapters/1">Chapters</a>
                </nav>
              </div>
            </header>
            <main className="container py-8">{children}</main>
            <footer className="container py-10 text-sm text-white/60">
              Built for reflection, not doctrine. ? {new Date().getFullYear()}
            </footer>
          </div>
        </LanguageProvider>
      </body>
    </html>
  );
}
