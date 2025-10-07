
// import React, { useRef, useEffect } from 'react';
// import { useVirtualizer } from '@tanstack/react-virtual';
// import { UserIcon } from './Icons';

// const CustomerTable = ({ customers, onSort, loadMore, hasMore, isLoading }) => {
//   const parentRef = useRef(null);
//   const itemCount = hasMore ? customers.length + 1 : customers.length;

//   const rowVirtualizer = useVirtualizer({
//     count: itemCount,
//     getScrollElement: () => parentRef.current,
//     estimateSize: () => 43,
//     overscan: 5,
//   });

//   useEffect(() => {
//     const virtualItems = rowVirtualizer.getVirtualItems();
//     if (!virtualItems || virtualItems.length === 0) return;

//     const lastItem = virtualItems[virtualItems.length - 1];
//     if (lastItem.index >= customers.length - 1 && hasMore && !isLoading) {
//       loadMore();
//     }
//   }, [hasMore, isLoading, loadMore, customers.length, rowVirtualizer.getVirtualItems()]);

//   return (
//     <div className="list-view-wrapper">
//       {/* ## HEADER: Score is now after Customer ## */}
//       <div className="table-header">
//         <div className="header-cell checkbox-cell"><input type="checkbox" /></div>
//         <div className="header-cell customer-cell" onClick={() => onSort("name")}>Customer</div>
//         <div className="header-cell score-cell" onClick={() => onSort("score")}>Score</div>
//         <div className="header-cell email-cell" onClick={() => onSort("email")}>Mail ID</div>
//         <div className="header-cell date-cell" onClick={() => onSort("lastMessageAt")}>Last message sent at</div>
//         <div className="header-cell added-by-cell" onClick={() => onSort("addedBy")}>Added by</div>
//       </div>

//       <div ref={parentRef} className="list-container">
//         <div style={{ height: `${rowVirtualizer.getTotalSize()}px`, width: "100%", position: "relative" }}>
//           {rowVirtualizer.getVirtualItems().map((virtualItem) => {
//             const isLoaderRow = virtualItem.index >= customers.length;
//             const customer = customers[virtualItem.index];
            
//             return (
//               <div
//                 key={isLoaderRow ? 'loader' : customer.id}
//                 className="table-row"
//                 style={{
//                   position: "absolute",
//                   top: 0,
//                   left: 0,
//                   width: "100%",
//                   height: `${virtualItem.size}px`,
//                   transform: `translateY(${virtualItem.start}px)`,
//                 }}
//               >
//                 {isLoaderRow ? (
//                   <div className="loader-cell">Loading more...</div>
//                 ) : (
//                   <>
//                     <div className="row-cell checkbox-cell"><input type="checkbox" /></div>
//                     <div className="row-cell customer-cell">
//                       <img src={customer.avatar} alt="avatar" className="avatar" />
//                       <div className="customer-info">
//                         <div className="customer-name">{customer.name}</div>
//                         <div className="customer-phone">{customer.phone}</div>
//                       </div>
//                     </div>
//                     {/* ## ROW: Score is now after Customer ## */}
//                     <div className="row-cell score-cell">{customer.score}</div>
//                     <div className="row-cell email-cell">{customer.email}</div>
//                     <div className="row-cell date-cell">{new Date(customer.lastMessageAt).toLocaleString()}</div>
//                     <div className="row-cell added-by-cell">
//                       <UserIcon />
//                       <span>{customer.addedBy}</span>
//                     </div>
//                   </>
//                 )}
//               </div>
//             );
//           })}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default CustomerTable;
import React, { useRef, useEffect } from 'react';
import { useVirtualizer } from '@tanstack/react-virtual';
import { UserIcon } from './Icons';

const CustomerTable = ({ customers, onSort, loadMore, hasMore, isLoading }) => {
  // A reference to the scrollable container
  const parentRef = useRef(null);

  // If there's more data to load, we add an extra "loader" row
  const itemCount = hasMore ? customers.length + 1 : customers.length;

  // Virtualizer handles rendering only the visible rows for better performance
  const rowVirtualizer = useVirtualizer({
    count: itemCount,
    getScrollElement: () => parentRef.current,
    estimateSize: () => 43, // Approximate height of each row (px)
    overscan: 5, // Render a few extra rows above and below the viewport
  });

  useEffect(() => {
    const virtualItems = rowVirtualizer.getVirtualItems();
    if (!virtualItems || virtualItems.length === 0) return;

    // Get the last rendered item
    const lastItem = virtualItems[virtualItems.length - 1];

    // If the last visible item is near the end and more data is available,
    // trigger loading of the next batch (infinite scroll)
    if (lastItem.index >= customers.length - 1 && hasMore && !isLoading) {
      loadMore();
    }
  }, [hasMore, isLoading, loadMore, customers.length, rowVirtualizer.getVirtualItems()]);

  return (
    <div className="list-view-wrapper">
      {/* ====== Table Header ====== */}
      <div className="table-header">
        <div className="header-cell checkbox-cell">
          <input type="checkbox" />
        </div>
        <div className="header-cell customer-cell" onClick={() => onSort("name")}>
          Customer
        </div>
        <div className="header-cell score-cell" onClick={() => onSort("score")}>
          Score
        </div>
        <div className="header-cell email-cell" onClick={() => onSort("email")}>
          Mail ID
        </div>
        <div className="header-cell date-cell" onClick={() => onSort("lastMessageAt")}>
          Last message sent at
        </div>
        <div className="header-cell added-by-cell" onClick={() => onSort("addedBy")}>
          Added by
        </div>
      </div>

      {/* ====== Scrollable List Container ====== */}
      <div ref={parentRef} className="list-container">
        <div
          style={{
            height: `${rowVirtualizer.getTotalSize()}px`, // Total height of all items combined
            width: "100%",
            position: "relative",
          }}
        >
          {rowVirtualizer.getVirtualItems().map((virtualItem) => {
            const isLoaderRow = virtualItem.index >= customers.length; // Check if this is the "load more" row
            const customer = customers[virtualItem.index];

            return (
              <div
                key={isLoaderRow ? 'loader' : customer.id}
                className="table-row"
                style={{
                  position: "absolute",
                  top: 0,
                  left: 0,
                  width: "100%",
                  height: `${virtualItem.size}px`,
                  transform: `translateY(${virtualItem.start}px)`, // Position each row
                }}
              >
                {isLoaderRow ? (
                  // Show loading message at the bottom
                  <div className="loader-cell">Loading more...</div>
                ) : (
                  <>
                    <div className="row-cell checkbox-cell">
                      <input type="checkbox" />
                    </div>

                    {/* Customer avatar, name, and phone */}
                    <div className="row-cell customer-cell">
                      <img src={customer.avatar} alt="avatar" className="avatar" />
                      <div className="customer-info">
                        <div className="customer-name">{customer.name}</div>
                        <div className="customer-phone">{customer.phone}</div>
                      </div>
                    </div>

                    {/* Score column */}
                    <div className="row-cell score-cell">{customer.score}</div>

                    {/* Email column */}
                    <div className="row-cell email-cell">{customer.email}</div>

                    {/* Last message date/time */}
                    <div className="row-cell date-cell">
                      {new Date(customer.lastMessageAt).toLocaleString()}
                    </div>

                    {/* Added by user info */}
                    <div className="row-cell added-by-cell">
                      <UserIcon />
                      <span>{customer.addedBy}</span>
                    </div>
                  </>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default CustomerTable;
