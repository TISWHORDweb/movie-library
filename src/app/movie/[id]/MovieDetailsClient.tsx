'use client';

import { useState } from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { StarIcon } from '@heroicons/react/24/solid';
import { HeartIcon } from '@heroicons/react/24/outline';
import { HeartIcon as HeartSolidIcon } from '@heroicons/react/24/solid';
import { MovieDetails } from '@/types/movie';
import { getImageUrl } from '@/utils/api';
import { useFavorites } from '@/contexts/FavoritesContext';
import RatingSystem from '@/components/RatingSystem';
import MovieRecommendations from '@/components/MovieRecommendations';

interface MovieDetailsClientProps {
  initialMovie: MovieDetails;
}

export default function MovieDetailsClient({ initialMovie }: MovieDetailsClientProps) {
  const [movie] = useState(initialMovie);
  const { isFavorite, addToFavorites, removeFromFavorites } = useFavorites();
  const favorited = isFavorite(movie.id);

  const handleFavoriteClick = () => {
    if (favorited) {
      removeFromFavorites(movie.id);
    } else {
      addToFavorites(movie);
    }
  };

  const handleRate = (rating: number) => {
    console.log(`Rated ${movie.title} ${rating} stars`);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-8"
    >
      <div className="grid gap-8 md:grid-cols-[300px,1fr]">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="relative aspect-[2/3] overflow-hidden rounded-lg"
        >
          <Image
            src={getImageUrl(movie.poster_path)}
            alt={movie.title}
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, 300px"
            priority
          />
        </motion.div>

        <div className="space-y-4">
          <div className="flex items-start justify-between">
            <div>
              <h1 className="text-3xl font-bold">{movie.title}</h1>
              <p className="text-gray-600">
                {new Date(movie.release_date).getFullYear()}
              </p>
            </div>
            <button
              onClick={handleFavoriteClick}
              className="rounded-full bg-gray-100 p-2 hover:bg-gray-200"
            >
              {favorited ? (
                <HeartSolidIcon className="h-6 w-6 text-red-500" />
              ) : (
                <HeartIcon className="h-6 w-6" />
              )}
            </button>
          </div>

          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <StarIcon className="h-5 w-5 text-yellow-400" />
              <span>{movie.vote_average.toFixed(1)}</span>
            </div>
            <RatingSystem
              movieId={movie.id}
              onRate={handleRate}
              initialRating={
                JSON.parse(localStorage.getItem('movieRatings') || '{}')[movie.id]
              }
            />
          </div>

          <div className="flex flex-wrap gap-2">
            {movie.genres.map((genre) => (
              <span
                key={genre.id}
                className="rounded-full bg-gray-100 px-3 py-1 text-sm"
              >
                {genre.name}
              </span>
            ))}
          </div>

          <p className="text-gray-600">{movie.overview}</p>

          {movie.cast && movie.cast.length > 0 && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
            >
              <h2 className="mb-3 text-xl font-semibold">Cast</h2>
              <div className="flex flex-wrap gap-4">
                {movie.cast.map((person) => (
                  <motion.div
                    key={person.id}
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="text-center"
                  >
                    <div className="relative mb-2 h-24 w-24 overflow-hidden rounded-full">
                      <Image
                        src={
                          person.profile_path
                            ? getImageUrl(person.profile_path, 'w185')
                            : '/placeholder-avatar.png'
                        }
                        alt={person.name}
                        fill
                        className="object-cover"
                      />
                    </div>
                    <p className="font-medium">{person.name}</p>
                    <p className="text-sm text-gray-600">{person.character}</p>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          )}
        </div>
      </div>

      <MovieRecommendations movieId={movie.id} />
    </motion.div>
  );
}