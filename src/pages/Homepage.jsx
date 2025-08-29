import React, { useEffect, useState } from "react";
import recipesData from "../data/Recipes.json";
import RecipeCard from "../components/RecipeCard";  // ✅ Correct path
import SearchBar from "../components/SearchBar";    // ✅ Correct path

export default function Homepage() {
  const [query, setQuery] = useState("");
  const [recipes, setRecipes] = useState([]);

  useEffect(() => {
    // Load recipes from JSON (simulating fetch)
    setRecipes(recipesData);
  }, []);

  const filtered = recipes.filter((r) =>
    r.name.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <div className="container homepage">
      <h1>Discover Authentic Filipino Recipes</h1>
      <p className="lead">
        Explore traditional Filipino dishes that bring the flavors of the
        Philippines to your kitchen.
      </p>

      {/* 🔍 Search bar */}
      <SearchBar value={query} onChange={setQuery} />

      {/* ✅ Grid of RecipeCards — each card will include a ❤️ button */}
      <div className="recipe-grid">
        {filtered.length ? (
          filtered.map((r) => <RecipeCard key={r.id} recipe={r} />)
        ) : (
          <p>No recipes found.</p>
        )}
      </div>
    </div>
  );
}
