import { useEffect, useState } from 'react';
import { Movie } from '@/types/movie';
import MovieCard from './MovieCard';

interface MovieRecommendationsProps {
  movieId: number;
}

export default function MovieRecommendations({ movieId }: MovieRecommendationsProps) {
  const [recommendations, setRecommendations] = useState<Movie[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchRecommendations() {
      try {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_TMDB_BASE_URL}/movie/${movieId}/recommendations?api_key=${process.env.NEXT_PUBLIC_TMDB_API_KEY}`
        );
        const data = await response.json();
        setRecommendations(data.results.slice(0, 5));
      } catch (error) {
        console.error('Error fetching recommendations:', error);
      } finally {
        setLoading(false);
      }
    }
    fetchRecommendations();
  }, [movieId]);

  if (loading || recommendations.length === 0) {
    return null;
  }

  return (
    <div className="mt-12">
      <h2 className="mb-6 text-2xl font-bold">Recommended Movies</h2>
      <div className="grid grid-cols-2 gap-6 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
        {recommendations.map((movie) => (
          <MovieCard key={movie.id} movie={movie} />
        ))}
      </div>
    </div>
  );
}