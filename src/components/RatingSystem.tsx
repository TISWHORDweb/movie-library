import { useState } from 'react';
import { StarIcon as StarOutline } from '@heroicons/react/24/outline';
import { StarIcon as StarSolid } from '@heroicons/react/24/solid';

interface RatingSystemProps {
  movieId: number;
  initialRating?: number;
  onRate: (rating: number) => void;
}

export default function RatingSystem({
  movieId,
  initialRating = 0,
  onRate,
}: RatingSystemProps) {
  const [rating, setRating] = useState(initialRating);
  const [hover, setHover] = useState(0);

  const handleRate = (value: number) => {
    setRating(value);
    onRate(value);
    
    // Store rating in localStorage
    const ratings = JSON.parse(localStorage.getItem('movieRatings') || '{}');
    ratings[movieId] = value;
    localStorage.setItem('movieRatings', JSON.stringify(ratings));
  };

  return (
    <div className="flex items-center gap-1">
      {[1, 2, 3, 4, 5].map((value) => (
        <button
          key={value}
          onMouseEnter={() => setHover(value)}
          onMouseLeave={() => setHover(0)}
          onClick={() => handleRate(value)}
          className="p-1"
        >
          {value <= (hover || rating) ? (
            <StarSolid className="h-6 w-6 text-yellow-400" />
          ) : (
            <StarOutline className="h-6 w-6 text-gray-400" />
          )}
        </button>
      ))}
    </div>
  );
}