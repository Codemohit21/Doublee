
// import React, { useState, useMemo, useRef, useEffect } from "react";
// import { useVirtualizer } from "@tanstack/react-virtual";
// import { allCustomers } from "./generatedata";
// import { useDebounce } from "./useDebounce";
// import "./App.css";

// // SVG Icons
// const FilterIcon = () => (
//   <svg
//     width="14"
//     height="14"
//     viewBox="0 0 24 24"
//     fill="none"
//     stroke="currentColor"
//     strokeWidth="2"
//     strokeLinecap="round"
//     strokeLinejoin="round"
//   >
//     <polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3"></polygon>
//   </svg>
// );
// const SearchIcon = () => (
//   <svg
//     width="16"
//     height="16"
//     viewBox="0 0 24 24"
//     fill="none"
//     stroke="currentColor"
//     strokeWidth="2"
//     strokeLinecap="round"
//     strokeLinejoin="round"
//     className="search-icon"
//   >
//     <circle cx="11" cy="11" r="8"></circle>
//     <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
//   </svg>
// );
// const UserIcon = () => (
//   <svg
//     width="14"
//     height="14"
//     viewBox="0 0 24 24"
//     fill="none"
//     stroke="currentColor"
//     strokeWidth="2"
//     strokeLinecap="round"
//     strokeLinejoin="round"
//   >
//     <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
//     <circle cx="12" cy="7" r="4"></circle>
//   </svg>
// );

// function App() {
//   const [searchTerm, setSearchTerm] = useState("");
//   const [sortConfig, setSortConfig] = useState({
//     key: "name",
//     direction: "asc",
//   });
//   const [isFilterOpen, setIsFilterOpen] = useState(false);
//   const [isSorting, setIsSorting] = useState(false);

//   const filterContainerRef = useRef(null);
//   const debouncedSearchTerm = useDebounce(searchTerm, 250);

//   const filteredAndSortedCustomers = useMemo(() => {
//     let result = [...allCustomers];
//     if (debouncedSearchTerm) {
//       const lowercasedFilter = debouncedSearchTerm.toLowerCase();
//       result = result.filter(
//         (customer) =>
//           customer.name.toLowerCase().includes(lowercasedFilter) ||
//           customer.email.toLowerCase().includes(lowercasedFilter) ||
//           customer.phone.includes(lowercasedFilter)
//       );
//     }
//     if (sortConfig.key) {
//       result.sort((a, b) => {
//         if (a[sortConfig.key] < b[sortConfig.key])
//           return sortConfig.direction === "asc" ? -1 : 1;
//         if (a[sortConfig.key] > b[sortConfig.key])
//           return sortConfig.direction === "asc" ? 1 : -1;
//         return 0;
//       });
//     }
//     return result;
//   }, [debouncedSearchTerm, sortConfig]);

//   const handleSort = (key) => {
//     setIsSorting(true);
//     setTimeout(() => {
//       setSortConfig((prevConfig) => ({
//         key,
//         direction:
//           prevConfig.key === key && prevConfig.direction === "asc"
//             ? "desc"
//             : "asc",
//       }));
//     }, 0);
//   };

//   useEffect(() => {
//     if (isSorting) {
//       setIsSorting(false);
//     }
//   }, [filteredAndSortedCustomers]);

//   useEffect(() => {
//     const handleClickOutside = (event) => {
//       if (
//         filterContainerRef.current &&
//         !filterContainerRef.current.contains(event.target)
//       ) {
//         setIsFilterOpen(false);
//       }
//     };
//     document.addEventListener("mousedown", handleClickOutside);
//     return () => {
//       document.removeEventListener("mousedown", handleClickOutside);
//     };
//   }, []);

//   const parentRef = useRef(null);
//   const rowVirtualizer = useVirtualizer({
//     count: filteredAndSortedCustomers.length,
//     getScrollElement: () => parentRef.current,
//     estimateSize: () => 43,
//     overscan: 10,
//   });

//   return (
//     <div className="app-shell">
//       {isSorting && (
//         <div className="sorting-overlay">
//           <div className="sorting-indicator">Sorting Data! Please wait... </div>
//         </div>
//       )}
//       <nav className="top-nav">
//         <div className="logo">
//           <img
//             src="/doubletick-logo.png"
//             alt="DoubleTick Logo"
//             className="doubletick-logo-img"
//           />
//         </div>
//         <div className="user-menu"></div>
//       </nav>
//       <main className="app-container">
//         <header className="app-header">
//           <h1>
//             All Customers{" "}
//             <span className="customer-count">
//               {filteredAndSortedCustomers.length.toLocaleString()}
//             </span>
//           </h1>
//         </header>
//         <div className="toolbar">
//           <div className="search-wrapper">
//             <SearchIcon />
//             <input
//               type="text"
//               placeholder="Search Customers"
//               className="search-input"
//               value={searchTerm}
//               onChange={(e) => setSearchTerm(e.target.value)}
//             />
//           </div>
//           <div className="filter-container" ref={filterContainerRef}>
//             <button
//               className="filter-button"
//               onClick={() => setIsFilterOpen(!isFilterOpen)}
//             >
//               <FilterIcon />
//               <span>Add Filters</span>
//             </button>
//             {isFilterOpen && (
//               <div className="filter-dropdown">
//                 <div>Filter 1</div>
//                 <div>Filter 2</div>
//                 <div>Filter 3</div>
//                 <div>Filter 4</div>
//               </div>
//             )}
//           </div>
//         </div>
//         <div className="list-view-wrapper">
//           <div className="table-header">
//             <div className="header-cell checkbox-cell">
//               <input type="checkbox" />
//             </div>
//             <div
//               style={{ fontSize: "14px" }}
//               className="header-cell customer-cell"
//               onClick={() => handleSort("name")}
//             >
//               Customer
//             </div>
//             <div
//               className="header-cell score-cell"
//               onClick={() => handleSort("score")}
//             >
//               Score
//             </div>
//             <div
//               className="header-cell email-cell"
//               onClick={() => handleSort("email")}
//             >
//               Mail ID
//             </div>
//             <div
//               className="header-cell date-cell"
//               onClick={() => handleSort("lastMessageAt")}
//             >
//               Last message sent at
//             </div>
//             <div
//               style={{ marginRight: "5px" }}
//               className="header-cell added-by-cell"
//               onClick={() => handleSort("addedBy")}
//             >
//               Added by
//             </div>
//           </div>
//           <div ref={parentRef} className="list-container">
//             <div
//               style={{
//                 height: `${rowVirtualizer.getTotalSize()}px`,
//                 width: "100%",
//                 position: "relative",
//               }}
//             >
//               {rowVirtualizer.getVirtualItems().map((virtualItem) => {
//                 const customer = filteredAndSortedCustomers[virtualItem.index];
//                 return (
//                   <div
//                     key={customer.id}
//                     className="table-row"
//                     style={{
//                       position: "absolute",
//                       top: 0,
//                       left: 0,
//                       width: "100%",
//                       height: `${virtualItem.size}px`,
//                       transform: `translateY(${virtualItem.start}px)`,
//                     }}
//                   >
//                     <div className="row-cell checkbox-cell">
//                       <input type="checkbox" />
//                     </div>
//                     <div className="row-cell customer-cell">
//                       <img
//                         src={customer.avatar}
//                         alt="avatar"
//                         className="avatar"
//                       />
//                       <div className="customer-info">
//                         <div className="customer-name">{customer.name}</div>
//                         <div className="customer-phone">{customer.phone}</div>
//                       </div>
//                     </div>
//                     <div className="row-cell score-cell">{customer.score}</div>
//                     <div className="row-cell email-cell">{customer.email}</div>
//                     <div className="row-cell date-cell">
//                       {new Date(customer.lastMessageAt).toLocaleString(
//                         "en-US",
//                         {
//                           month: "long",
//                           day: "numeric",
//                           year: "numeric",
//                           hour: "numeric",
//                           minute: "2-digit",
//                           hour12: true,
//                         }
//                       )}
//                     </div>
//                     <div className="row-cell added-by-cell">
//                       <UserIcon />
//                       <span>{customer.addedBy}</span>
//                     </div>
//                   </div>
//                 );
//               })}
//             </div>
//           </div>
//         </div>
//       </main>
//     </div>
//   );
// }
// export default App;
import React from 'react';
import CustomersPage from './pages/CustomersPage';
import './styles/App.css'; // Import your main stylesheet

function App() {
  return (
    <CustomersPage />
  );
}

export default App;