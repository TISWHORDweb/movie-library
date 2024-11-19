'use client';

import { useEffect, useState } from 'react';
import { useInView } from 'react-intersection-observer';
import { ErrorBoundary } from '@/components/ErrorBoundary';
import AnimatedMovieGrid from '@/components/AnimatedMovieGrid';
import MovieCardSkeleton from '@/components/MovieCardSkeleton';
import SearchBar from '@/components/SearchBar';
import GenreFilter from '@/components/GenreFilter';
import { Movie } from '@/types/movie';
import { fetchMovies, searchMovies } from '@/utils/api';

export default function Home() {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedGenreId, setSelectedGenreId] = useState<number | null>(null);
  const [ref, inView] = useInView();

  const loadMovies = async (reset = false) => {
    try {
      setLoading(true);
      const currentPage = reset ? 1 : page;
      let data:  { results: Movie[] };
      
      if (searchQuery) {
        data = await searchMovies(searchQuery, currentPage);
      } else {
        data = await fetchMovies(currentPage, selectedGenreId);
      }

      setMovies((prev) => (reset ? data.results : [...prev, ...data.results]));
      setPage((p) => (reset ? 2 : p + 1));
    } catch (error) {
      console.error('Error loading movies:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadMovies(true);
  }, [searchQuery, selectedGenreId]);

  useEffect(() => {
    if (inView && !loading) {
      loadMovies();
    }
  }, [inView, loading]);

  return (
    <ErrorBoundary>
      <div className="space-y-8">
        <div className="space-y-4">
          <SearchBar onSearch={setSearchQuery} />
          <GenreFilter 
            onGenreSelect={setSelectedGenreId}
            selectedGenreId={selectedGenreId}
          />
        </div>
        
        {movies.length > 0 ? (
          <AnimatedMovieGrid movies={movies} />
        ) : !loading ? (
          <div className="text-center py-12">
            <p className="text-gray-600">No movies found</p>
          </div>
        ) : null}
        
        {loading && (
          <div className="grid grid-cols-2 gap-6 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
            {Array.from({ length: 10 }).map((_, i) => (
              <MovieCardSkeleton key={`skeleton-${i}`} />
            ))}
          </div>
        )}

        <div ref={ref} className="h-10" />
      </div>
    </ErrorBoundary>
  );
}