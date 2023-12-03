import { useEffect, useState } from "react";

export interface Users {
  id: number;
  name: string;
  email: string;
  role: string;
}

/**
 * This hook is used for all the logic and state in table
 * @returns Functions and State logic
 */
export const useTable = () => {
  //! state for data fetching
  const [data, setData] = useState<Users[]>([]);

  //! state for current page in pagination
  const [currentPage, setCurrentPage] = useState(1);

  //! state for selecting row
  const [selectedRows, setSelectedRows] = useState<number[]>([]);

  //! state for search functionality
  const [searchQuery, setSearchQuery] = useState("");

  //! state for toggle edit state and render modal
  const [isEditActive, setIsEditActive] = useState<boolean>(false);
  const [isToggleModal, setToggleModal] = useState<boolean[]>([]);

  //! state for editing selected rows
  const [selectedUserId, setSelectedUserId] = useState<number | null>(null);
  const [editedName, setEditedName] = useState<string>("");
  const [editedEmail, setEditedEmail] = useState<string>("");
  const [editedRole, setEditedRole] = useState<string>("");

  //! user data fetching
  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch(
          "https://geektrust.s3-ap-southeast-1.amazonaws.com/adminui-problem/members.json"
        );

        if (!res.ok) {
          throw new Error("failed to fetched data");
        }

        const results = await res.json();
        setData(results);
      } catch (error) {}
    };
    fetchData();
  }, []);

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

  //! toggle modal for selected row
  const toggleModal = (index: number) => {
    setToggleModal((prevSelectedModal) => {
      const updatedSelection = [...prevSelectedModal];
      updatedSelection[index] = !updatedSelection[index];
      return updatedSelection;
    });
    // set the edit active state to true
    setIsEditActive(true);

    // find selected user id
    const selectedUser = data.find((user) => user.id === index);

    // if select user is present then set the state
    if (selectedUser) {
      setSelectedUserId(selectedUser.id);
      setEditedName(selectedUser.name);
      setEditedEmail(selectedUser.email);
      setEditedRole(selectedUser.role);
    }
  };

  //! handle saving edited field logic
  const handleSaveChanges = () => {
    // Find the selected user index in the data array
    const selectedIndex = data.findIndex((user) => user.id === selectedUserId);

    // Update the data with the edited fields
    if (selectedIndex !== -1) {
      const newData = [...data];
      newData[selectedIndex] = {
        id: selectedUserId!,
        name: editedName,
        email: editedEmail,
        role: editedRole,
      };
      setData(newData);
    }

    // Reset the editing state
    setIsEditActive(false);
    setSelectedUserId(null);
    setEditedName("");
    setEditedEmail("");
    setEditedRole("");
  };

  return {
    // data
    data,
    setData,
    // navigation
    currentData,
    currentPage,
    totalPages,
    handleFirstPage,
    handlePreviousPage,
    setCurrentPage,
    handleNextPage,
    handleLastPage,
    // search
    searchQuery,
    setSearchQuery,
    handleSearch,
    // selection
    selectedRows,
    setSelectedRows,
    handleRowSelection,
    handleDeleteRows,
    handleSelectAll,
    // edit
    isEditActive,
    editedName,
    editedEmail,
    editedRole,
    toggleModal,
    setIsEditActive,
    setEditedName,
    setEditedEmail,
    setEditedRole,
    handleSaveChanges,
  };
};
