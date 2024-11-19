const BASE_URL = process.env.NEXT_PUBLIC_TMDB_BASE_URL;
const API_KEY = process.env.NEXT_PUBLIC_TMDB_API_KEY;
const IMAGE_BASE_URL = process.env.NEXT_PUBLIC_TMDB_IMAGE_BASE_URL;

export const getImageUrl = (path: string | null, size: string = 'w500') => {
  if (!path) return '/placeholder-image.png';
  return `${IMAGE_BASE_URL}/${size}${path}`;
};

export const fetchMovies = async (page: number = 1, genreId: number | null = null) => {
  const params = new URLSearchParams({
    api_key: API_KEY as string,
    page: page.toString(),
  });
console.log(genreId)
  if (genreId) {
    params.append('with_genres', genreId.toString());
  }

  const response = await fetch(
    `${BASE_URL}/movie/popular?${params.toString()}`
  );

  if (!response.ok) {
    throw new Error('Failed to fetch movies');
  }

  return response.json();
};

export const searchMovies = async (query: string, page: number = 1) => {
  const response = await fetch(
    `${BASE_URL}/search/movie?api_key=${API_KEY}&query=${encodeURIComponent(
      query
    )}&page=${page}`
  );

  if (!response.ok) {
    throw new Error('Failed to search movies');
  }

  return response.json();
};

export const fetchMovieDetails = async (id: number) => {
  const [movieResponse, creditsResponse] = await Promise.all([
    fetch(`${BASE_URL}/movie/${id}?api_key=${API_KEY}`),
    fetch(`${BASE_URL}/movie/${id}/credits?api_key=${API_KEY}`)
  ]);

  if (!movieResponse.ok || !creditsResponse.ok) {
    throw new Error('Failed to fetch movie details');
  }

  const movieData = await movieResponse.json();
  const creditsData = await creditsResponse.json();

  return {
    ...movieData,
    cast: creditsData.cast.slice(0, 10)
  };
};
