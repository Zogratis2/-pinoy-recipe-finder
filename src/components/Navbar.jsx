import React from "react";
import { Link } from "react-router-dom";
import { useFavorites } from "../contexts/FavoritesContext";

export default function Navbar() {
  const { favorites } = useFavorites();

  return (
    <nav className="navbar">
      <div className="container nav-container">
        {/* Logo */}
        <h1 className="logo">Onin's Carinderia</h1>

        {/* Links */}
        <ul className="nav-links">
          <li>
            {/* ✅ Scroll to top when Home is clicked */}
            <Link
              to="/"
              onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            >
              Home
            </Link>
          </li>
          <li>
            <Link to="/favorites" className="fav-link">
              ❤️ Favorites{" "}
              {favorites.length > 0 && (
                <span className="fav-count">({favorites.length})</span>
              )}
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  );
}
