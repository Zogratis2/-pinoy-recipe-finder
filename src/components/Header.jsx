import React from 'react'
import { Link } from 'react-router-dom'
import { useFavorites } from '../contexts/FavoritesContext'


export default function Header() {
const { favorites } = useFavorites()


return (
<header className="site-header">
<div className="container">
<Link to="/" className="brand">Filipino Cookbook</Link>
<nav>
<Link to="/favorites" className="fav-link">
<i className="fas fa-heart"></i> Favorites ({favorites.length})
</Link>
</nav>
</div>
</header>
)
}