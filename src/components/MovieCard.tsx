import Image from 'next/image';
import Link from 'next/link';
import { StarIcon } from '@heroicons/react/24/solid';
import { HeartIcon } from '@heroicons/react/24/outline';
import { HeartIcon as HeartSolidIcon } from '@heroicons/react/24/solid';
import { Movie } from '@/types/movie';
import { getImageUrl } from '@/utils/api';
import { useFavorites } from '@/contexts/FavoritesContext';

interface MovieCardProps {
  movie: Movie;
}

export default function MovieCard({ movie }: MovieCardProps) {
  const { isFavorite, addToFavorites, removeFromFavorites } = useFavorites();
  const favorited = isFavorite(movie.id);

  const handleFavoriteClick = (e: React.MouseEvent) => {
    e.preventDefault();
    if (favorited) {
      removeFromFavorites(movie.id);
    } else {
      addToFavorites(movie);
    }
  };

  return (
    <Link href={`/movie/${movie.id}`} className="group relative">
      <div className="relative aspect-[2/3] overflow-hidden rounded-lg bg-gray-100">
        <Image
          src={getImageUrl(movie.poster_path)}
          alt={movie.title}
          fill
          className="object-cover transition-transform duration-200 group-hover:scale-105"
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
        />
        <button
          onClick={handleFavoriteClick}
          className="absolute right-2 top-2 rounded-full bg-black/50 p-2 transition-colors hover:bg-black/70"
        >
          {favorited ? (
            <HeartSolidIcon className="h-5 w-5 text-red-500" />
          ) : (
            <HeartIcon className="h-5 w-5 text-white" />
          )}
        </button>
      </div>
      <div className="mt-2 space-y-1">
        <h3 className="text-lg font-semibold line-clamp-1">{movie.title}</h3>
        <div className="flex items-center justify-between text-sm text-gray-600">
          <span>{new Date(movie.release_date).getFullYear()}</span>
          <div className="flex items-center gap-1">
            <StarIcon className="h-4 w-4 text-yellow-400" />
            <span>{movie.vote_average.toFixed(1)}</span>
          </div>
        </div>
      </div>
    </Link>
  );
}