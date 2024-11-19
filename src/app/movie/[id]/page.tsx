'use client';

import React, { useEffect, useState, useCallback } from 'react';
import Image from 'next/image';
import { StarIcon } from '@heroicons/react/24/solid';
import { HeartIcon } from '@heroicons/react/24/outline';
import { HeartIcon as HeartSolidIcon } from '@heroicons/react/24/solid';
import { MovieDetails } from '@/types/movie';
import { fetchMovieDetails, getImageUrl } from '@/utils/api';
import { useParams } from 'next/navigation';
import { useFavorites } from '@/contexts/FavoritesContext';

export default function MovieDetailsPage() {
  const [movie, setMovie] = useState<MovieDetails | null>(null);
  const [loading, setLoading] = useState(true);
  const { isFavorite, addToFavorites, removeFromFavorites } = useFavorites();
  const params = useParams<{ id?: string }>(); 
  const { id } = params;
  const movieId = typeof id === 'string' ? parseInt(id) : undefined;

  const loadMovie = useCallback(async () => {
    if (!movieId) return; 
    try {
      const data = await fetchMovieDetails(movieId || 0);
      setMovie(data);
    } finally {
      setLoading(false);
    }
  }, [movieId]); 

  useEffect(() => {
    loadMovie();
  }, [movieId, loadMovie]);

  if (loading || !movie) {
    return (
      <div className="animate-pulse space-y-4">
        <div className="h-96 rounded-lg bg-gray-200" />
        <div className="h-8 w-1/2 rounded bg-gray-200" />
        <div className="h-4 w-1/4 rounded bg-gray-200" />
        <div className="h-40 rounded bg-gray-200" />
      </div>
    );
  }

  const favorited = isFavorite(movie.id);

  const handleFavoriteClick = () => {
    if (favorited) {
      removeFromFavorites(movie.id);
    } else {
      addToFavorites(movie);
    }
  };

  return (
    <div className="space-y-8">
      <div className="grid gap-8 md:grid-cols-[300px,1fr]">
        <div className="relative aspect-[2/3] overflow-hidden rounded-lg">
          <Image
            src={getImageUrl(movie.poster_path)}
            alt={movie.title}
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, 300px"
          />
        </div>

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

          <div className="flex items-center gap-2">
            <StarIcon className="h-5 w-5 text-yellow-400" />
            <span>{movie.vote_average.toFixed(1)}</span>
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
            <div>
              <h2 className="mb-3 text-xl font-semibold">Cast</h2>
              <div className="flex flex-wrap gap-4">
                {movie.cast.map((person) => (
                  <div key={person.id} className="text-center">
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
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
