import { useState } from "react";
import { useData } from "./useDataHook";

export interface FormValues {
  name: string;
  email: string;
  role: string;
}
/**
 * useForm hook is used for editing form fields
 * @returns Custom hook for editing form fields
 */
export const useForm = () => {
  //! custom hooks
  const { data, setData } = useData();
  //! state for editing selected rows
  const [selectedUserId, setSelectedUserId] = useState<number | null>(null);
  //! state for toggle edit state and render modal
  const [isEditActive, setIsEditActive] = useState<boolean>(false);
  const [isToggleModal, setToggleModal] = useState<boolean[]>([]);
  //! state for editing fields
  const [editForm, setEditForm] = useState<FormValues>({
    name: "",
    email: "",
    role: "",
  });

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
      setEditForm({
        ...editForm,
        name: selectedUser.name,
        email: selectedUser.email,
        role: selectedUser.role,
      });
    }
  };

  //! handle edit and saving edited field logic

  const handleFormChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name } = e.target;
    setEditForm({
      ...editForm,
      [name]: e.target.value,
    });
  };

  const handleSaveChanges = () => {
    // Find the selected user index in the data array
    const selectedIndex = data.findIndex((user) => user.id === selectedUserId);

    // Update the data with the edited fields
    if (selectedIndex !== -1) {
      const newData = [...data];
      newData[selectedIndex] = {
        id: selectedUserId!,
        name: editForm.name,
        email: editForm.email,
        role: editForm.role,
      };
      setData(newData);
    }

    // Reset the editing state
    setIsEditActive(false);
    setSelectedUserId(null);
    setEditForm({
      ...editForm,
      name: "",
      email: "",
      role: "",
    });
  };
  return {
    isEditActive,
    editForm,
    selectedUserId,
    setEditForm,
    toggleModal,
    setIsEditActive,
    handleFormChange,
    handleSaveChanges,
    setSelectedUserId,
  };
};
