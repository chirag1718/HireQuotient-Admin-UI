import { useState } from "react";
import { useData } from "./useDataHook";
import { usePagination } from "./usePaginationHook";

/**
 * useSelection hook is used to select a specific row
 * @returns Custom selection hook
 */
export const useSelection = () => {
  //! custom hooks
  const { data, setData } = useData();
  const { currentData } = usePagination();
  //! state for selecting row
  const [selectedRows, setSelectedRows] = useState<number[]>([]);

  //! selection logic
  const handleRowSelection = (rowId: number) => {
    setSelectedRows((prevSelectedRows) => {
      if (prevSelectedRows.includes(rowId)) {
        return prevSelectedRows.filter((id) => id !== rowId);
      } else {
        return [...prevSelectedRows, rowId];
      }
    });
  };

  const handleSelectAll = () => {
    const currentPageIds = currentData.map((el) => el.id);

    if (selectedRows.length === currentPageIds.length) {
      // If all rows on the current page are already selected, unselect all
      setSelectedRows([]);
    } else {
      // If not all rows on the current page are selected, select all on the current page
      setSelectedRows([...selectedRows, ...currentPageIds]);
    }
  };

  //! delete row logic
  const handleDeleteRows = () => {
    const newData = data.filter((el) => !selectedRows.includes(el.id));
    setData(newData);
    setSelectedRows([]);
  };

  return {
    selectedRows,
    setSelectedRows,
    handleRowSelection,
    handleDeleteRows,
    handleSelectAll,
  };
};
