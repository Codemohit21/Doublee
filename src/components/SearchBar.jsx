// import React from 'react';
// import { SearchIcon } from './Icons';

// const SearchBar = ({ searchTerm, setSearchTerm }) => {
//   return (
//     <div className="search-wrapper">
//       <SearchIcon />
//       <input
//         type="text"
//         placeholder="Search Customers"
//         className="search-input"
//         value={searchTerm}
//         onChange={(e) => setSearchTerm(e.target.value)}
//       />
//     </div>
//   );
// };

// export default SearchBar;
import React from 'react';
import { SearchIcon } from './Icons';

const SearchBar = ({ searchTerm, setSearchTerm }) => {
  return (
    // Container for the search icon and input field
    <div className="search-wrapper">
      {/* 🔍 Search icon on the left side of the input */}
      <SearchIcon />

      {/* Text input where users can type their search query */}
      <input
        type="text"
        placeholder="Search Customers"
        className="search-input"
        value={searchTerm} // Controlled input value
        onChange={(e) => setSearchTerm(e.target.value)} // Update searchTerm as user types
      />
    </div>
  );
};

export default SearchBar;
