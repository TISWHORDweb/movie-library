import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import MovieCard from './MovieCard';
import { FavoritesProvider } from '@/contexts/FavoritesContext';

const mockMovie = {
  id: 1,
  title: 'Test Movie',
  poster_path: '/test.jpg',
  release_date: '2024-01-01',
  vote_average: 8.5,
  overview: 'Test overview',
  genres: [],
};

describe('MovieCard', () => {
  it('renders movie information correctly', () => {
    render(
      <FavoritesProvider>
        <MovieCard movie={mockMovie} />
      </FavoritesProvider>
    );

    expect(screen.getByText('Test Movie')).toBeInTheDocument();
    expect(screen.getByText('2024')).toBeInTheDocument();
    expect(screen.getByText('8.5')).toBeInTheDocument();
  });

  it('handles favorite toggle', () => {
    render(
      <FavoritesProvider>
        <MovieCard movie={mockMovie} />
      </FavoritesProvider>
    );

    const favoriteButton = screen.getByRole('button');
    fireEvent.click(favoriteButton);
    
    // Check if the movie is added to favorites
    const favoriteIcon = screen.getByRole('button').querySelector('svg');
    expect(favoriteIcon).toHaveClass('text-red-500');
  });
});