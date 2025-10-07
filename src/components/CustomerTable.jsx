
import React, { useRef, useEffect } from 'react';
import { useVirtualizer } from '@tanstack/react-virtual';
import { UserIcon } from './Icons';

const CustomerTable = ({ customers, onSort, loadMore, hasMore, isLoading }) => {
  const parentRef = useRef(null);

  // Add 1 to the item count for the loading indicator row
  const itemCount = hasMore ? customers.length + 1 : customers.length;

  const rowVirtualizer = useVirtualizer({
    count: itemCount,
    getScrollElement: () => parentRef.current,
    estimateSize: () => 43, // The height of each row
    overscan: 5,
  });

  // *** THE FIX IS HERE ***
  // This effect now correctly detects when to load more data without causing a loop.
  useEffect(() => {
    const virtualItems = rowVirtualizer.getVirtualItems();
    if (!virtualItems || virtualItems.length === 0) {
      return;
    }

    const lastItem = virtualItems[virtualItems.length - 1];
    // We check if the last rendered item's index is near the end of the loaded data.
    // We also check that we are not already loading more data.
    if (lastItem.index >= customers.length - 1 && hasMore && !isLoading) {
      loadMore();
    }
  }, [
    hasMore,
    isLoading,
    loadMore,
    customers.length,
    rowVirtualizer.getVirtualItems(), // This dependency is necessary to re-check on scroll
  ]);

  return (
    <div className="list-view-wrapper">
      <div className="table-header">
        <div className="header-cell checkbox-cell"><input type="checkbox" /></div>
        <div className="header-cell customer-cell" onClick={() => onSort("name")}>Customer</div>
        <div className="header-cell score-cell" onClick={() => onSort("score")}>Score</div>
        <div className="header-cell email-cell" onClick={() => onSort("email")}>Mail ID</div>
        <div className="header-cell date-cell" onClick={() => onSort("lastMessageAt")}>Last message sent at</div>
        <div className="header-cell added-by-cell" onClick={() => onSort("addedBy")}>Added by</div>
      </div>

      <div ref={parentRef} className="list-container">
        <div style={{ height: `${rowVirtualizer.getTotalSize()}px`, width: "100%", position: "relative" }}>
          {rowVirtualizer.getVirtualItems().map((virtualItem) => {
            const isLoaderRow = virtualItem.index >= customers.length;
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
                  transform: `translateY(${virtualItem.start}px)`,
                }}
              >
                {isLoaderRow ? (
                  <div className="loader-cell">Loading more...</div>
                ) : (
                  <>
                    <div className="row-cell checkbox-cell"><input type="checkbox" /></div>
                    <div className="row-cell customer-cell">
                      <img src={customer.avatar} alt="avatar" className="avatar" />
                      <div className="customer-info">
                        <div className="customer-name">{customer.name}</div>
                        <div className="customer-phone">{customer.phone}</div>
                      </div>
                    </div>
                    <div className="row-cell score-cell">{customer.score}</div>
                    <div className="row-cell email-cell">{customer.email}</div>
                    <div className="row-cell date-cell">{new Date(customer.lastMessageAt).toLocaleString()}</div>
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