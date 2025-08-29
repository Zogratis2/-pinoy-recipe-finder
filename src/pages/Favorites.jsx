import React, { useState } from "react";
import { useFavorites } from "../contexts/FavoritesContext";
import recipesData from "../data/Recipes.json";
import { Link, useNavigate } from "react-router-dom";

export default function Favorites() {
  const { favorites, removeFavorite } = useFavorites();
  const favRecipes = recipesData.filter((r) => favorites.includes(r.id));
  const navigate = useNavigate();

  // ✅ State for temporary message
  const [message, setMessage] = useState("");

  // ✅ Function to show message for 2 seconds
  const showMessage = (text) => {
    setMessage(text);
    setTimeout(() => setMessage(""), 2000);
  };

  return (
    <div className="favorites container">
      <h1>❤️ Your Favorites</h1>

      {/* 🔙 Back Button */}
      <button className="back-btn" onClick={() => navigate(-1)}>
        ⬅ Back
      </button>

      {/* ✅ Message prompt */}
      {message && <div className="favorite-message">{message}</div>}

      {favRecipes.length === 0 ? (
        <p>No favorites yet.</p>
      ) : (
        <div className="recipe-grid">
          {favRecipes.map((recipe) => (
            <div key={recipe.id} className="food-card">
              <Link to={`/recipe/${recipe.id}`}>
                <img
                  src={`/images/${recipe.image}`}
                  alt={recipe.name}
                  className="food-image"
                />
              </Link>
              <div className="food-info">
                <h3>{recipe.name}</h3>

                {/* ✅ Recipe Description */}
                <p className="recipe-description">{recipe.description}</p>

                {/* ✅ Actions row */}
                <div className="card-actions">
                  {/* ✅ View Recipe (expands) */}
                  <Link
                    to={`/recipe/${recipe.id}`}
                    className="view-recipe-btn expand"
                  >
                    View Recipe
                  </Link>

                  {/* ❤️ Favorite Button (remove only) */}
                  <button
                    className="heart-btn inline-heart active"
                    onClick={() => {
                      removeFavorite(recipe.id);
                      showMessage(`❌ Removed "${recipe.name}" from favorites`);
                    }}
                  >
                    💖
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
