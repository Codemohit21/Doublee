import React from 'react';
import { SearchIcon } from './Icons';

const SearchBar = ({ searchTerm, setSearchTerm }) => {
  return (
    <div className="search-wrapper">
      <SearchIcon />
      <input
        type="text"
        placeholder="Search Customers"
        className="search-input"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
    </div>
  );
};

export default SearchBar;