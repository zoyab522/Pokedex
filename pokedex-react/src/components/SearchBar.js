import React, { useState } from 'react';

const SearchBar = ({ onSearch }) => {
  const [searchTerm, setSearchTerm] = useState('');

  const handleSearch = (e) => {
    const value = e.target.value;
    setSearchTerm(value);
    onSearch(value);
  };

  return (
    <div className="search-bar-container">
      <input
        type="text"
        value={searchTerm}
        onChange={handleSearch}
        placeholder="Search your Pokémon!"
        className="search-input"
      />
      <div className="start-search-button">
        <img src="/assets/pokeball-icon.png" alt="Search" className="search-ball" />
      </div>
    </div>
  );
};

export default SearchBar;
