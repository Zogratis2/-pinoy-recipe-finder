import React, { createContext, useContext, useState } from 'react';

const NavigationContext = createContext();

export const NavigationProvider = ({ children }) => {
  const [currentPage, setCurrentPage] = useState('home');
  const [selectedRecipeId, setSelectedRecipeId] = useState(null);

  const navigateToHome = () => {
    setCurrentPage('home');
    setSelectedRecipeId(null);
  };

  const navigateToFavorites = () => {
    setCurrentPage('favorites');
    setSelectedRecipeId(null);
  };

  const navigateToRecipe = (recipeId) => {
    setCurrentPage('recipe');
    setSelectedRecipeId(recipeId);
  };

  return (
    <NavigationContext.Provider value={{
      currentPage,
      selectedRecipeId,
      navigateToHome,
      navigateToFavorites,
      navigateToRecipe
    }}>
      {children}
    </NavigationContext.Provider>
  );
};

export const useNavigation = () => {
  const context = useContext(NavigationContext);
  if (!context) {
    throw new Error('useNavigation must be used within a NavigationProvider');
  }
  return context;
};