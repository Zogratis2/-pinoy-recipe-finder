import React, { useEffect } from "react";
import { useLocation } from "react-router-dom";
import RecipeCard from "./RecipeCard";

export default function RecipeList({ recipes }) {
  const location = useLocation();

  // Method 1: Restore scroll position from sessionStorage
  useEffect(() => {
    const savedScrollPosition = sessionStorage.getItem('recipeListScrollPosition');
    if (savedScrollPosition) {
      // Use setTimeout to ensure DOM is fully rendered
      setTimeout(() => {
        window.scrollTo(0, parseInt(savedScrollPosition));
        // Clear the stored position after using it
        sessionStorage.removeItem('recipeListScrollPosition');
      }, 100);
    }
  }, []);

  // Method 2: Alternative - restore from location state
  useEffect(() => {
    if (location.state?.scrollPosition) {
      setTimeout(() => {
        window.scrollTo(0, location.state.scrollPosition);
      }, 100);
    }
  }, [location.state]);

  return (
    <div className="recipe-list">
      {recipes.map((recipe) => (
        <RecipeCard key={recipe.id} recipe={recipe} />
      ))}
    </div>
  );
}