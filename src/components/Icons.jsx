// import React from 'react';

// export const FilterIcon = () => (
//   <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
//     <polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3"></polygon>
//   </svg>
// );

// export const SearchIcon = () => (
//   <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="search-icon">
//     <circle cx="11" cy="11" r="8"></circle>
//     <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
//   </svg>
// );

// export const UserIcon = () => (
//   <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
//     <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
//     <circle cx="12" cy="7" r="4"></circle>
//   </svg>
// );
import React from 'react';

// 🔽 Filter icon used for dropdown filters or filter buttons
export const FilterIcon = () => (
  <svg
    width="14"
    height="14"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    {/* Funnel shape for filter icon */}
    <polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3"></polygon>
  </svg>
);

// 🔍 Search icon used for search inputs or buttons
export const SearchIcon = () => (
  <svg
    width="16"
    height="16"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className="search-icon"
  >
    {/* Circle for magnifying glass */}
    <circle cx="11" cy="11" r="8"></circle>
    {/* Handle of the magnifying glass */}
    <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
  </svg>
);

// 👤 User icon usually shown beside user details or in menus
export const UserIcon = () => (
  <svg
    width="14"
    height="14"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    {/* Base line for shoulders/body */}
    <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
    {/* Circle for the head */}
    <circle cx="12" cy="7" r="4"></circle>
  </svg>
);
