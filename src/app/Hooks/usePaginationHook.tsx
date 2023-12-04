import { useState } from "react";
import { useData } from "./useDataHook";

/**
 * usePagination hook is used for implementing pagination logic
 * @returns Custom pagination hook
 */
export const usePagination = () => {
  const { data, setData } = useData();
  //! state for current page in pagination
  const [currentPage, setCurrentPage] = useState(1);
  //! pagination logic
  const itemsPerPage = 10; // total items per page
  const startIndex = (currentPage - 1) * itemsPerPage; // starting index of the page
  const endIndex = startIndex + itemsPerPage; // end index of the page
  const currentData = data.slice(startIndex, endIndex); // page range
  const totalPages = Math.ceil(data.length / itemsPerPage); // total number of pages

  //! handlePreviousPage navigates to the previous page
  const handlePreviousPage = () => {
    setCurrentPage((prevPage) => Math.max(prevPage - 1, 1));
  };

  //! handleNextPage navigates to the next page
  const handleNextPage = () => {
    setCurrentPage((prevPage) => Math.min(prevPage + 1, totalPages));
  };

  //! handleFistPage navigates to the first page
  const handleFirstPage = () => {
    setCurrentPage(1);
  };

  //! handleLastPage navigates to the last page
  const handleLastPage = () => {
    setCurrentPage(totalPages);
  };

  return {
    // navigation
    currentData,
    currentPage,
    totalPages,
    handleFirstPage,
    handlePreviousPage,
    setCurrentPage,
    handleNextPage,
    handleLastPage,
  };
};
