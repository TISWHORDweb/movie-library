import { useEffect, useState } from 'react';
import { Genre } from '@/types/movie';

interface GenreFilterProps {
  onGenreSelect: (genreId: number | null) => void;
  selectedGenreId: number | null;
}

export default function GenreFilter({ onGenreSelect, selectedGenreId }: GenreFilterProps) {
  const [genres, setGenres] = useState<Genre[]>([]);

  useEffect(() => {
    async function fetchGenres() {
      try {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_TMDB_BASE_URL}/genre/movie/list?api_key=${process.env.NEXT_PUBLIC_TMDB_API_KEY}`
        );
        const data = await response.json();
        setGenres(data.genres);
      } catch (error) {
        console.error('Error fetching genres:', error);
      }
    }
    fetchGenres();
  }, []);

  return (
    <div className="flex flex-wrap gap-2">
      <button
        onClick={() => onGenreSelect(null)}
        className={`rounded-full px-4 py-2 text-sm transition-colors ${
          selectedGenreId === null
            ? 'bg-blue-500 text-white'
            : 'bg-gray-100 hover:bg-gray-200'
        }`}
      >
        All
      </button>
      {genres.map((genre) => (
        <button
          key={genre.id}
          onClick={() => onGenreSelect(genre.id)}
          className={`rounded-full px-4 py-2 text-sm transition-colors ${
            selectedGenreId === genre.id
              ? 'bg-blue-500 text-white'
              : 'bg-gray-100 hover:bg-gray-200'
          }`}
        >
          {genre.name}
        </button>
      ))}
    </div>
  );
}