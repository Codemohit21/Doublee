// import React, { useState, useRef, useEffect } from 'react';
// import { FilterIcon } from './Icons';

// const FilterDropdown = () => {
//   const [isOpen, setIsOpen] = useState(false);
//   const containerRef = useRef(null);

//   useEffect(() => {
//     const handleClickOutside = (event) => {
//       if (containerRef.current && !containerRef.current.contains(event.target)) {
//         setIsOpen(false);
//       }
//     };
//     document.addEventListener("mousedown", handleClickOutside);
//     return () => document.removeEventListener("mousedown", handleClickOutside);
//   }, []);

//   return (
//     <div className="filter-container" ref={containerRef}>
//       <button className="filter-button" onClick={() => setIsOpen(!isOpen)}>
//         <FilterIcon />
//         <span>Add Filters</span>
//       </button>
//       {isOpen && (
//         <div className="filter-dropdown">
//           <div>Filter 1</div>
//           <div>Filter 2</div>
//           <div>Filter 3</div>
//           <div>Filter 4</div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default FilterDropdown;
import React, { useState, useRef, useEffect } from 'react';
import { FilterIcon } from './Icons';

const FilterDropdown = () => {
  // Track whether the dropdown is open or closed
  const [isOpen, setIsOpen] = useState(false);

  // Reference to the container to detect clicks outside
  const containerRef = useRef(null);

  useEffect(() => {
    // This function closes the dropdown if user clicks outside the container
    const handleClickOutside = (event) => {
      if (containerRef.current && !containerRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    // Listen for clicks anywhere on the page
    document.addEventListener("mousedown", handleClickOutside);

    // Cleanup the event listener when the component unmounts
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="filter-container" ref={containerRef}>
      {/* Button to toggle the dropdown open/close */}
      <button className="filter-button" onClick={() => setIsOpen(!isOpen)}>
        <FilterIcon />
        <span>Add Filters</span>
      </button>

      {/* Dropdown menu that appears when isOpen is true */}
      {isOpen && (
        <div className="filter-dropdown">
          <div>Filter 1</div>
          <div>Filter 2</div>
          <div>Filter 3</div>
          <div>Filter 4</div>
        </div>
      )}
    </div>
  );
};

export default FilterDropdown;
