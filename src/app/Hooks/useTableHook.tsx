import { useData } from "./useDataHook";
import { useForm } from "./useFormHook";
import { usePagination } from "./usePaginationHook";
import { useSearch } from "./useSearchHook";
import { useSelection } from "./useSelectionHook";

/**
 * useTable hook is used for all the state, logic and functionality used in the table
 * @returns useTable hook comprises of useData, useForm, usePagination, useSearch, and useSelection hooks
 */
export const useTable = () => {
  const { data, setData } = useData();
  const {
    editForm,
    isEditActive,
    selectedUserId,
    toggleModal,
    setEditForm,
    setIsEditActive,
    setSelectedUserId,
    handleFormChange,
    handleSaveChanges,
  } = useForm();
  const {
    currentData,
    currentPage,
    totalPages,
    setCurrentPage,
    handleFirstPage,
    handleLastPage,
    handleNextPage,
    handlePreviousPage,
  } = usePagination();
  const { searchQuery, setSearchQuery, handleSearch } = useSearch();
  const {
    selectedRows,
    setSelectedRows,
    handleRowSelection,
    handleSelectAll,
    handleDeleteRows,
  } = useSelection();
  return {
    // data
    data,
    setData,
    // form edit
    editForm,
    isEditActive,
    selectedUserId,
    toggleModal,
    setEditForm,
    setIsEditActive,
    setSelectedUserId,
    handleFormChange,
    handleSaveChanges,
    // pagination
    currentData,
    currentPage,
    totalPages,
    setCurrentPage,
    handleFirstPage,
    handleLastPage,
    handleNextPage,
    handlePreviousPage,
    // search
    searchQuery,
    setSearchQuery,
    handleSearch,
    // selection
    selectedRows,
    setSelectedRows,
    handleRowSelection,
    handleSelectAll,
    handleDeleteRows,
  };
};
