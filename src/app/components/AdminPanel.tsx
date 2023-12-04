"use client";
import {
  Trash,
  PenSquare,
  ChevronLeft,
  ChevronRight,
  ChevronsLeft,
  ChevronsRight,
  Search,
  Save,
} from "lucide-react";
import React, { ChangeEvent } from "react";
import "../globals.css";
import Button from "./UI Components/Button";
import Input from "./UI Components/Input";
import Checkbox from "./UI Components/Checkbox";
import { useTable } from "../Hooks/useTableHook";

const AdminPanel = () => {
  const {
    // data
    data,
    // pagination
    currentPage,
    currentData,
    totalPages,
    setCurrentPage,
    handleFirstPage,
    handleLastPage,
    handleNextPage,
    handlePreviousPage,
    // selection
    selectedRows,
    handleDeleteRows,
    handleRowSelection,
    handleSelectAll,
    // search
    handleSearch,
    searchQuery,
    setSearchQuery,
    // edit
    isEditActive,
    editForm,
    setIsEditActive,
    toggleModal,
    handleSaveChanges,
    handleFormChange,
  } = useTable();

  return (
    <div className="flex flex-col items-center justify-center gap-5 h-full w-full p-5 border rounded">
      {/* search container */}
      <div className="flex justify-between w-full h-12">
        <div className="flex items-center justify-center gap-5">
          {/* search */}
          <div className="relative">
            {/* search field */}
            <Input
              type="text"
              placeholder="Search"
              value={searchQuery}
              onChange={(e: ChangeEvent<HTMLInputElement>) =>
                setSearchQuery(e.target.value)
              }
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  handleSearch(e);
                }
              }}
            />

            {/* search icon */}
            <span
              className="absolute right-3 top-[10px] cursor-pointer active:scale-95 text-stone-500"
              onClick={handleSearch}
            >
              <Search size={22} />
            </span>
          </div>
        </div>
        {/* delete all btn button */}
        <div className="delete">
          {/* delete */}
          <Button
            onClick={handleDeleteRows}
            disabled={selectedRows.length < 1}
            type="solid"
            height="h-10"
            width="w-10"
            bgColor="bg-red-500"
            borderColor="border-red-500"
            hoverColor="bg-white"
            activeColor="stroke-red-500"
            scale="95"
            color="white"
            icon={<Trash />}
          />
        </div>
      </div>

      {/* table container */}
      <div className="h-full w-full border rounded overflow-hidden xs:overflow-x-scroll sm:overflow-x-scroll md:overflow-x-scroll lg:overflow-x-scroll xl:overflow-hidden">
        {/* table */}
        <table className="h-full w-full ">
          <thead>
            <tr className="flex items-center h-12 w-full border-b text-left">
              <th className=" pl-7 w-24">
                {/* select all rows button */}
                <Checkbox
                  checked={
                    currentData.length > 0 &&
                    currentData.every((el) => selectedRows.includes(el.id))
                  }
                  onChange={handleSelectAll}
                />
              </th>
              <th className="flex items-center gap-2 md:w-[500px] lg:w-[500px] xl:w-[500px] xs:w-48 text-base text-stone-500">
                Name
              </th>
              <th className="md:w-[600px] lg:w-[600px] xl:w-[600px] xs:w-72 text-base text-stone-500">
                Email
              </th>
              <th className="md:w-80 lg:w-80 xl:w-80 text-base xs:w-48 text-stone-500">
                Role
              </th>
              <th className="text-base w-auto xs:w-48 text-stone-500">
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
            {currentData.map((el) => {
              return (
                <tr
                  key={el.id}
                  className="flex items-center xs:h-[58px] sm:h-16 w-full border-b text-left transition-all ease-in duration-100 hover:bg-gray-100"
                >
                  {/* checkboc for single selection */}
                  <td className="pl-7 w-24">
                    {/* select one row */}
                    <Checkbox
                      checked={selectedRows.includes(el.id)}
                      onChange={() => handleRowSelection(el.id)}
                    />
                  </td>
                  {/* user name */}
                  <td className="md:w-[500px] lg:w-[500px] xl:w-[500px] xs:w-48">
                    {el.name}
                  </td>
                  {/* user email */}
                  <td className="md:w-[600px] lg:w-[600px] xl:w-[600px] xs:w-72 text-base">
                    {el.email}
                  </td>
                  {/* user role */}
                  <td className="d:w-80 lg:w-80 xl:w-80 text-base xs:w-48">
                    {el.role}
                  </td>
                  {/* actions */}
                  <td className="text-base w-auto xs:w-48">
                    <div className="flex gap-5">
                      {/* edit button */}
                      <Button
                        type="secondary"
                        // disabled={selectedRows.length > 1}
                        onClick={() => toggleModal(el.id)}
                        borderColor="hover:border-green-700"
                        color="stroke-green-700"
                        height="h-8"
                        width="w-8"
                        icon={<PenSquare size={16} />}
                        scale={95}
                      />
                      {/* delete button */}
                      <Button
                        activeColor=""
                        bgColor=""
                        type="secondary"
                        disabled={selectedRows.length > 1}
                        onClick={handleDeleteRows}
                        borderColor="hover:border-red-500"
                        color="stroke-red-500"
                        height="h-8"
                        width="w-8"
                        icon={<Trash size={16} />}
                        hoverColor="border-green-700"
                        scale={95}
                      />
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {/* navigation container */}
      <div className="flex items-center xs:justify-center sm:justify-between lg:justify-between xl:justify-between h-20 w-full px-3 ">
        {/* row selection indicator */}
        <div className="xs:hidden sm:flex md:flex">
          <p className="text-sm text-gray-400">
            {selectedRows.length} of {data.length} row(s) selected.
          </p>
        </div>

        {/* pagination */}
        <div className="flex items-center gap-10">
          {/* rendering the current page and total number of pages */}
          <div className="hidden sm:hidden md:block lg:block xl:block">
            <p className="text-sm font-medium">
              Page {currentData.length < 1 ? 0 : currentPage} of {totalPages}
            </p>
          </div>

          <div className="flex items-center justify-center gap-3">
            {/*navigates to first page */}
            <Button
              type="secondary"
              borderColor=""
              color="black"
              height="h-8"
              width="w-8"
              responsive="xs:hidden sm:hidden md:flex lg:flex xl:flex"
              scale={95}
              onClick={handleFirstPage}
              icon={<ChevronsLeft size={16} />}
            />
            {/* navigates to previous page */}
            <Button
              type="secondary"
              borderColor=""
              color="black"
              height="h-8"
              width="w-8"
              responsive="xs:hidden sm:flex md:flex lg:flex xl:flex"
              scale={95}
              onClick={handlePreviousPage}
              icon={<ChevronLeft size={16} />}
            />
            {/* page number 👇🏻 */}
            {Array.from({ length: totalPages }, (_, index) => (
              <button
                type="button"
                key={index + 1}
                className={`flex items-center justify-center h-8 w-8 border rounded cursor-pointer transition-all duration-100 ease-in ${
                  currentPage === index + 1 &&
                  "scale-110 border-blue-500 text-blue-500"
                }`}
                onClick={() => setCurrentPage(index + 1)}
              >
                <p>{index + 1}</p>
              </button>
            ))}

            {/* navigates to next page */}
            <Button
              type="secondary"
              borderColor=""
              color="black"
              height="h-8"
              width="w-8"
              responsive="xs:hidden sm:flex md:flex lg:flex xl:flex"
              scale={95}
              onClick={handleNextPage}
              icon={<ChevronRight size={16} />}
            />
            {/* navigates to last page */}
            <Button
              type="secondary"
              borderColor=""
              color="black"
              height="h-8"
              width="w-8"
              responsive="xs:hidden sm:hidden md:flex lg:flex xl:flex"
              scale={95}
              onClick={handleLastPage}
              icon={<ChevronsRight size={16} />}
            />
          </div>
        </div>
      </div>

      {/* edit modal for the row selected by the user */}
      {isEditActive && (
        <div className="absolute left-0 top-0 flex items-center justify-center  h-full w-full">
          {/* backdrop */}
          <div
            className="h-full w-full fixed top-0 left-0 -z-0 backdrop-blur-[5px] cursor-pointer"
            onClick={() => setIsEditActive(false)}
          ></div>
          {/* modal */}
          <div className="h-96 py-8 px-10 rounded z-50 shadow-2xl border overflow-hidden bg-white">
            <form className="flex flex-col items-start justify-center h-full">
              <p className="mb-1 text-xl">Edit fields</p>
              <div className="flex flex-col gap-3">
                {/* edit name */}
                <div className="flex flex-col gap-1">
                  <label htmlFor="name" className="text-sm">
                    Name
                  </label>
                  <Input
                    name="name"
                    type="text"
                    placeholder="Name"
                    value={editForm.name}
                    onChange={(e) => handleFormChange(e)}
                  />
                </div>
                {/* edit email */}
                <div className="flex flex-col gap-1">
                  <label htmlFor="name" className="text-sm">
                    Email
                  </label>
                  <Input
                    name="email"
                    type="text"
                    placeholder="Email"
                    value={editForm.email}
                    onChange={(e) => handleFormChange(e)}
                  />
                </div>
                {/* edit role */}
                <div className="flex flex-col gap-1">
                  <label htmlFor="name" className="text-sm">
                    Role
                  </label>
                  <Input
                    name="role"
                    type="text"
                    placeholder="Role"
                    value={editForm.role}
                    onChange={(e) => handleFormChange(e)}
                  />
                </div>
                <button
                  type="submit"
                  className="flex items-center justify-center gap-2 h-10 w-[85px] border rounded active:scale-95 group isSaveActive transition-all duration-100 ease-in hover:border-green-700"
                  onClick={handleSaveChanges}
                >
                  <Save
                    size={16}
                    className=" group-[.isSaveActive] group-hover:text-green-700"
                  />
                  <span className="font-semibold group-[.isSaveActive] group-hover:text-green-700">
                    Save
                  </span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminPanel;
