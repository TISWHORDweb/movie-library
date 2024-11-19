"use client";

import React, { createContext, useContext, useState, useEffect } from 'react';
import { Movie } from '@/types/movie';

interface FavoritesContextType {
  favorites: Movie[];
  addToFavorites: (movie: Movie) => void;
  removeFromFavorites: (movieId: number) => void;
  isFavorite: (movieId: number) => boolean;
}

const FavoritesContext = createContext<FavoritesContextType | undefined>(undefined);

function ClientOnlyProvider({ children }: { children: React.ReactNode }) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null; 
  }

  return <>{children}</>;
}

export function FavoritesProvider({ children }: { children: React.ReactNode }) {
  const [favorites, setFavorites] = useState<Movie[]>([]);

  useEffect(() => {
    try {
      const savedFavorites = localStorage.getItem('movieFavorites');
      if (savedFavorites) {
        setFavorites(JSON.parse(savedFavorites));
      }
    } catch (error) {
      console.error('Error loading favorites:', error);
    }
  }, []);

  const addToFavorites = (movie: Movie) => {
    setFavorites((prev) => {
      const newFavorites = [...prev, movie];
      try {
        localStorage.setItem('movieFavorites', JSON.stringify(newFavorites));
      } catch (error) {
        console.error('Error saving to localStorage:', error);
      }
      return newFavorites;
    });
  };

  const removeFromFavorites = (movieId: number) => {
    setFavorites((prev) => {
      const newFavorites = prev.filter((movie) => movie.id !== movieId);
      try {
        localStorage.setItem('movieFavorites', JSON.stringify(newFavorites));
      } catch (error) {
        console.error('Error saving to localStorage:', error);
      }
      return newFavorites;
    });
  };

  const isFavorite = (movieId: number) => {
    return favorites.some((movie) => movie.id === movieId);
  };

  return (
    <FavoritesContext.Provider
      value={{
        favorites,
        addToFavorites,
        removeFromFavorites,
        isFavorite,
      }}
    >
      <ClientOnlyProvider>{children}</ClientOnlyProvider>
    </FavoritesContext.Provider>
  );
}

export function useFavorites() {
  const context = useContext(FavoritesContext);
  if (context === undefined) {
    throw new Error('useFavorites must be used within a FavoritesProvider');
  }
  return context;
}