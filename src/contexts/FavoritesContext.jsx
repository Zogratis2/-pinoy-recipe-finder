import React, { createContext, useContext, useEffect, useState } from "react";

const FavoritesContext = createContext();

export function FavoritesProvider({ children }) {
  // Initialize favorites from localStorage (safe parse)
  const [favorites, setFavorites] = useState(() => {
    try {
      const raw = localStorage.getItem("favorites");
      return raw ? JSON.parse(raw) : [];
    } catch {
      return [];
    }
  });

  // Persist favorites whenever they change
  useEffect(() => {
    localStorage.setItem("favorites", JSON.stringify(favorites));
  }, [favorites]);

  // Add a recipe (avoid duplicates)
  function addFavorite(id) {
    setFavorites((prev) => (prev.includes(id) ? prev : [...prev, id]));
  }

  // Remove a recipe
  function removeFavorite(id) {
    setFavorites((prev) => prev.filter((x) => x !== id));
  }

  // Check if a recipe is already favorited
  function isFavorite(id) {
    return favorites.includes(id);
  }

  return (
    <FavoritesContext.Provider
      value={{ favorites, addFavorite, removeFavorite, isFavorite }}
    >
      {children}
    </FavoritesContext.Provider>
  );
}

// Custom hook to easily access FavoritesContext
export function useFavorites() {
  const context = useContext(FavoritesContext);
  if (!context) {
    throw new Error("useFavorites must be used within a FavoritesProvider");
  }
  return context;
}
