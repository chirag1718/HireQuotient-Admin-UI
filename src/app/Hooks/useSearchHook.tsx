import { useState } from "react";
import { useData } from "./useDataHook";

/**
 * useSearch hook is used for implementing search functionality
 * @returns Custom search hook
 */
export const useSearch = () => {
  const { data, setData } = useData();
  //! state for search functionality
  const [searchQuery, setSearchQuery] = useState("");

  //! search logic
  const handleSearch = (e: any) => {
    const filteredData = data.filter(
      (el) =>
        el.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        el.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
        el.role.toLowerCase().includes(searchQuery.toLowerCase())
    );
    setData(filteredData);
  };
  return {
    searchQuery,
    setSearchQuery,
    handleSearch,
  };
};
