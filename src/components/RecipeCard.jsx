import React, { useEffect } from "react";
import { Link, useLocation } from "react-router-dom";

export default function RecipeCard({ recipe }) {
  const location = useLocation();

  // Method 1: Using sessionStorage to save scroll position
  const handleRecipeClick = () => {
    sessionStorage.setItem('recipeListScrollPosition', window.scrollY.toString());
  };

  // Method 2: Alternative - save scroll position to location state
  const handleRecipeClickWithState = () => {
    // This saves the current scroll position in the navigation state
    return {
      pathname: `/recipe/${recipe.id}`,
      state: { 
        scrollPosition: window.scrollY,
        from: location.pathname 
      }
    };
  };

  return (
    <div className="food-card">
      {/* Image */}
      <Link 
        to={`/recipe/${recipe.id}`}
        onClick={handleRecipeClick}
      >
        <img
          src={`/images/${recipe.image}`}
          alt={recipe.name}
          className="food-image"
        />
      </Link>

      {/* Info Section */}
      <div className="food-info-column">
        <h3>{recipe.name}</h3>
        <p className="food-description">
          {recipe.description || "No description available."}
        </p>

        <Link 
          to={`/recipe/${recipe.id}`} 
          className="view-btn"
          onClick={handleRecipeClick}
        >
          View Recipe
        </Link>
      </div>
    </div>
  );
}