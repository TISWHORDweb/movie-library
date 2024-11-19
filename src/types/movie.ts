export interface Movie {
    id: number;
    title: string;
    poster_path: string;
    release_date: string;
    vote_average: number;
    overview: string;
    genres: Genre[];
  }
  
  export interface Genre {
    id: number;
    name: string;
  }
  
  export interface Cast {
    id: number;
    name: string;
    character: string;
    profile_path: string | null;
  }
  
  export interface MovieDetails extends Movie {
    cast: Cast[];
  }
  
  export interface MoviesResponse {
    page: number;
    results: Movie[];
    total_pages: number;
    total_results: number;
  }