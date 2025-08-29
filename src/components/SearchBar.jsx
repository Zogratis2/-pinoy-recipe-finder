import React from 'react'


export default function SearchBar({ value, onChange }) {
return (
<div className="searchbar">
<i className="fas fa-search" />
<input
type="search"
placeholder="Search recipes..."
value={value}
onChange={(e) => onChange(e.target.value)}
/>
</div>
)
}