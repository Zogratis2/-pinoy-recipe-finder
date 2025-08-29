import React, { useState, useEffect } from "react";
import { useParams, useNavigate, useLocation } from "react-router-dom";
import recipesData from "../data/Recipes.json";
import { useFavorites } from "../contexts/FavoritesContext";

export default function RecipeDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const recipe = recipesData.find((r) => r.id === parseInt(id));

  const { isFavorite, addFavorite, removeFavorite } = useFavorites();
  const favorite = isFavorite(recipe?.id);

  // ✅ State for temporary message
  const [message, setMessage] = useState("");

  // ✅ Auto-scroll to top when component mounts or recipe changes
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [id]); // Dependency on 'id' ensures scroll happens when recipe changes

  // ✅ Function to show message for 2 seconds
  const showMessage = (text) => {
    setMessage(text);
    setTimeout(() => setMessage(""), 2000);
  };

  // ✅ Enhanced back navigation with scroll position restoration
  const handleBack = () => {
    // Check if we have a saved scroll position from when we navigated here
    const savedScrollPosition = sessionStorage.getItem('recipeListScrollPosition');
    
    if (savedScrollPosition) {
      // Navigate back to the recipe list
      navigate(-1);
      
      // Restore scroll position after a brief delay to ensure DOM is ready
      setTimeout(() => {
        window.scrollTo(0, parseInt(savedScrollPosition));
        // Clean up the stored position
        sessionStorage.removeItem('recipeListScrollPosition');
      }, 100);
    } else {
      // Fallback to normal back navigation
      navigate(-1);
    }
  };

  // Alternative method using location state
  const handleBackWithState = () => {
    const scrollPosition = location.state?.scrollPosition;
    
    if (scrollPosition !== undefined) {
      // Navigate back with the scroll position
      navigate('/', { 
        state: { 
          restoreScrollPosition: scrollPosition 
        },
        replace: false 
      });
    } else {
      navigate(-1);
    }
  };

  if (!recipe) return <p>Recipe not found.</p>;

  return (
    <div className="recipe-detail container">
      <h1>{recipe.name}</h1>

      <img
        src={`/images/${recipe.image}`}
        alt={recipe.name}
        className="recipe-detail-img"
      />

      {/* ✅ Heart Button with message */}
      <button
        onClick={() => {
          if (favorite) {
            removeFavorite(recipe.id);
            showMessage(`❌ Removed "${recipe.name}" from favorites`);
          } else {
            addFavorite(recipe.id);
            showMessage(`✅ Added "${recipe.name}" to favorites`);
          }
        }}
        className={`heart-btn ${favorite ? "active" : ""}`}
      >
        {favorite ? "💖" : "🤍"}
      </button>

      {/* ✅ Message prompt */}
      {message && <div className="favorite-message">{message}</div>}

      <p className="muted">{recipe.description}</p>

      <div className="meta">
        <p>
          <strong>⏱ Time:</strong> {recipe.time || "N/A"}
        </p>
        <p>
          <strong>👥 Servings:</strong> {recipe.servings || "N/A"}
        </p>
        {recipe.difficulty && (
          <p>
            <strong>🔥 Difficulty:</strong> {recipe.difficulty}
          </p>
        )}
        {recipe.category && (
          <p>
            <strong>📌 Category:</strong> {recipe.category}
          </p>
        )}
      </div>

      <h2>Ingredients</h2>
      <ul>
        {recipe.ingredients?.map((item, i) => (
          <li key={i}>{item}</li>
        ))}
      </ul>

      <h2>Instructions</h2>
      <ol>
        {recipe.instructions?.map((step, i) => (
          <li key={i}>{step}</li>
        ))}
      </ol>

      {/* ✅ Enhanced Back Button with scroll restoration */}
      <button onClick={handleBack} className="back-btn">
        ⬅ Back
      </button>
    </div>
  );
}