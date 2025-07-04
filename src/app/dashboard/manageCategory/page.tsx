"use client";

import AddCategory from "@/components/AddCategory";
import DashPageTitle from "@/components/DashPageTitle";
import EditCategory from "@/components/EditCategory";
import PrimaryButton from "@/components/PrimaryButton";
import CustomModal from "@/components/ui/CustomModal";
import { CustomTable } from "@/components/ui/CustomTable";
import { DashPaginationButton } from "@/components/ui/DashPaginationButton";
import { useQuery } from "@tanstack/react-query";
import React, { useState } from "react";
import { FaPlus } from "react-icons/fa";
import { useAppSelector } from "@/redux/hooks/reduxHook";
import Loading from "@/app/loading";
import ErrorComponent from "@/app/error";
import { CategoryType } from "@/Interfaces/categoryInterfaces";
import { getAllCategories } from "@/lib/allApiRequest/categoryRequest/categoryRequest";

const ManageCategory = () => {
  const [openModal, setOpenModal] = useState<boolean>(false);
  const [modalContent, setModalContent] = useState<"add" | "edit">("add");
  const [selectedId, setSelectedId] = useState<string | undefined>("");
  const searchValue = useAppSelector((state) => state.dashSearch.dashSearchValue);
  const [page, setPage] = useState(1);
  const limit = 10;

  const handleModal = (content: "add" | "edit", id?: string) => {
    setOpenModal(true);
    setModalContent(content);
    if (id) setSelectedId(id);
  };

  const {
    data: category,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["getAllCategories", searchValue],
    queryFn: async () => {
      const response = await getAllCategories({
        currentPage: page,
        limit,
        searchTrim: searchValue,
      });
      if (!response || !response.success) {
        throw new Error(response.message || "Failed to fetch category data");
      }
      return response;
    },
    refetchOnWindowFocus: false,
  });

  const columns = [
    { header: "Name", accessor: "name" },
    { header: "Slug", accessor: "slug" },
    { header: "Parent", accessor: "parentCategory" },
    { header: "Edit", accessor: "edit" },
  ];

  const data = (category?.data as CategoryType[] | undefined)?.map((cat) => ({
    name: cat.name,
    slug: cat.slug,
    parentCategory: cat.parentCategory || "—",
    edit: (
      <button
        className="btn btn-sm bg-yellow-500 text-white"
        onClick={() => handleModal("edit", typeof cat._id === "string" ? cat._id : cat._id.toString())}
      >
        Edit
      </button>
    ),
  })) || [];

  return (
    <div>
      <div className="flex justify-between mb-4">
        <DashPageTitle>Manage Category</DashPageTitle>
        <PrimaryButton
          onClick={() => handleModal("add")}
          className=" rounded-sm text-sm h-8"
        >
          <FaPlus /> Add Category
        </PrimaryButton>
      </div>

      {isLoading ? (
        <Loading />
      ) : error ? (
        <ErrorComponent />
      ) : (
        <>
          <CustomTable
            columns={columns}
            data={data}
            className="shadow-md"
          />
          <DashPaginationButton
            currentPage={page}
            totalPages={category?.totalPages || 1}
            onPageChange={(newPage) => setPage(newPage)}
            className="mt-4"
          />
        </>
      )}

      <CustomModal
        open={openModal}
        onOpenChange={setOpenModal}
        title={modalContent === "add" ? "Add Category" : "Edit Category"}
      >
        {modalContent === "add" ? (
          <AddCategory />
        ) : (
          <EditCategory id={selectedId || ""}
          setOpenModal={setOpenModal}
          />
        )}
      </CustomModal>
    </div>
  );
};

export default ManageCategory;
