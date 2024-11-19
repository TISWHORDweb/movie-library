'use client';

import { motion } from 'framer-motion';
import { useFavorites } from '@/contexts/FavoritesContext';
import MovieCard from '@/components/MovieCard';
import { HeartIcon } from '@heroicons/react/24/outline';
import Link from 'next/link';
import { ErrorBoundary } from '@/components/ErrorBoundary';

export default function FavoritesPage() {
  const { favorites } = useFavorites();

  return (
    <ErrorBoundary>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="space-y-8"
      >
        {favorites.length === 0 ? (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="flex flex-col items-center justify-center py-16"
          >
            <HeartIcon className="h-16 w-16 text-gray-400" />
            <h1 className="mt-4 text-2xl font-bold">No favorites yet</h1>
            <p className="mt-2 text-center text-gray-600">
              Start adding movies to your favorites list by clicking the heart icon on
              any movie card.
            </p>
            <Link
              href="/"
              className="mt-6 rounded-full bg-blue-500 px-6 py-2 text-white transition-colors hover:bg-blue-600"
            >
              Browse Movies
            </Link>
          </motion.div>
        ) : (
          <>
            <div className="flex items-center justify-between">
              <h1 className="text-2xl font-bold">My Favorites</h1>
              <p className="text-gray-600">
                {favorites.length} movie{favorites.length !== 1 ? 's' : ''}
              </p>
            </div>

            <motion.div
              className="grid grid-cols-2 gap-6 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5"
              initial="hidden"
              animate="show"
              variants={{
                hidden: {},
                show: {
                  transition: {
                    staggerChildren: 0.1
                  }
                }
              }}
            >
              {favorites.map((movie) => (
                <motion.div
                  key={movie.id}
                  variants={{
                    hidden: { opacity: 0, y: 20 },
                    show: { opacity: 1, y: 0 }
                  }}
                >
                  <MovieCard movie={movie} />
                </motion.div>
              ))}
            </motion.div>
          </>
        )}
      </motion.div>
    </ErrorBoundary>
  );
}