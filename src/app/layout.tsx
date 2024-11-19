import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import Link from 'next/link';
import './globals.css';
import { FavoritesProvider } from '@/contexts/FavoritesContext';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Movie Library',
  description: 'Browse and manage your favorite movies',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <FavoritesProvider>
          <div className="min-h-screen bg-gray-50">
            <nav className="bg-[#6f6af8] shadow">
              <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                <div className="flex h-16 justify-between">
                  <div className="flex">
                    <Link
                      href="/"
                      className="flex items-center text-xl font-bold text-white"
                    >
                      MovieHive
                    </Link>
                  </div>
                  <div className="flex items-center">
                    <Link
                      href="/favorites"
                      className="rounded-md px-3 py-2 text-sm font-medium text-gray-900 hover:text-[#000] text-[#6f6af8] bg-gray-100"
                    >
                      Favorites
                    </Link>
                  </div>
                </div>
              </div>
            </nav>
            <main className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
              {children}
            </main>
          </div>
        </FavoritesProvider>
      </body>
    </html>
  );
}