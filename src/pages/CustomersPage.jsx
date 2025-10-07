
import React, { useState, useEffect, useCallback } from "react";
import customerService from "../services/customerService";
import { useDebounce } from "../hooks/useDebounce";
import Header from "../components/Header";
import SearchBar from "../components/SearchBar";
import FilterDropdown from "../components/FilterDropdown";
import CustomerTable from "../components/CustomerTable";

const CustomersPage = () => {
  const [customers, setCustomers] = useState([]);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [totalCount, setTotalCount] = useState(0);

  const [searchTerm, setSearchTerm] = useState("");
  const [sortConfig, setSortConfig] = useState({ key: "name", direction: "asc" });

  const debouncedSearchTerm = useDebounce(searchTerm, 250);

  // The useCallback dependencies are crucial to prevent re-creating this function unnecessarily
  const loadCustomers = useCallback(async (isNewQuery = false) => {
    if (isLoading || (!isNewQuery && !hasMore)) return;
    setIsLoading(true);

    const targetPage = isNewQuery ? 1 : page;
    const result = await customerService.getCustomers({
      page: targetPage,
      limit: 30,
      searchTerm: debouncedSearchTerm,
      sortConfig,
    });

    setCustomers(prev => isNewQuery ? result.data : [...prev, ...result.data]);
    setPage(targetPage + 1);
    setHasMore(result.hasMore);
    setTotalCount(result.total);
    setIsLoading(false);
  }, [isLoading, hasMore, page, debouncedSearchTerm, sortConfig]);

  useEffect(() => {
    // We create a separate function to call inside useEffect to avoid complexity
    const initLoad = async () => {
      await loadCustomers(true);
    };
    initLoad();
  }, [debouncedSearchTerm, sortConfig]);

  const handleSort = (key) => {
    setSortConfig((prevConfig) => ({
      key,
      direction: prevConfig.key === key && prevConfig.direction === "asc" ? "desc" : "asc",
    }));
  };

  return (
    <div className="app-shell">
      <Header />
      <main className="app-container">
        <header className="app-header">
          <h1>
            All Customers{" "}
            <span className="customer-count">
              {totalCount.toLocaleString()}
            </span>
          </h1>
        </header>
        <div className="toolbar">
          <SearchBar searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
          <FilterDropdown />
        </div>
        <CustomerTable
          customers={customers}
          onSort={handleSort}
          loadMore={loadCustomers} // Pass the memoized function directly
          hasMore={hasMore}
          isLoading={isLoading} // Pass isLoading state down
        />
      </main>
    </div>
  );
};

export default CustomersPage;