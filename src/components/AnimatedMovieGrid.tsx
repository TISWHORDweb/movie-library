import { motion } from 'framer-motion';
import { Movie } from '@/types/movie';
import MovieCard from './MovieCard';

interface AnimatedMovieGridProps {
  movies: Movie[];
}

export default function AnimatedMovieGrid({ movies }: AnimatedMovieGridProps) {
  return (
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
      {movies.map((movie) => (
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
  );
}