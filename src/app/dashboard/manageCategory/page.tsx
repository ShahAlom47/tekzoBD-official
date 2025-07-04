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
import {
  deleteCategory,
  getAllCategories,
} from "@/lib/allApiRequest/categoryRequest/categoryRequest";
import { useConfirm } from "@/hooks/useConfirm";
import toast from "react-hot-toast";
import { ObjectId } from "mongodb";

const ManageCategory = () => {
  const { confirm, ConfirmModal } = useConfirm();
  const [openModal, setOpenModal] = useState<boolean>(false);
  const [modalContent, setModalContent] = useState<"add" | "edit">("add");
  const [selectedId, setSelectedId] = useState<string | undefined>("");
  const searchValue = useAppSelector(
    (state) => state.dashSearch.dashSearchValue
  );
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
    refetch
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

  const handleDelete = async (id: string |ObjectId) => {
    const ok = await confirm({
      title: "Delete Category",
      message: "Are you sure you want to delete this category?",
      confirmText: "Yes, Delete",
      cancelText: "Cancel",
    });

    if (ok) {
      const res = await deleteCategory(id);
      if (res?.success) {
        toast.success("Category deleted!");
        refetch()
      } else {
        toast?.error(res?.message || "Failed to delete");
      }
    } else {
      console.log("User cancelled delete");
    }
  };

  const columns = [
    { header: "Name", accessor: "name" },
    { header: "Slug", accessor: "slug" },
    { header: "Parent", accessor: "parentCategory" },
    { header: "Edit", accessor: "edit" },
    { header: "Delete", accessor: "delete" },
  ];

  const data =
    (category?.data as CategoryType[] | undefined)?.map((cat) => ({
      name: cat.name,
      slug: cat.slug,
      parentCategory: cat.parentCategory || "—",
      edit: (
        <button
          className="btn-bordered"
          onClick={() =>
            handleModal(
              "edit",
              typeof cat._id === "string" ? cat._id : cat._id.toString()
            )
          }
        >
          Edit
        </button>
      ),
      delete: (
        <button className="btn-bordered border-red-700 hover:bg-red-700" onClick={() => handleDelete(cat?._id)}>
          Delete
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
          <CustomTable columns={columns} data={data} className="shadow-md" />
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
          <EditCategory id={selectedId || ""} setOpenModal={setOpenModal} />
        )}
      </CustomModal>
      {ConfirmModal}
    </div>
  );
};

export default ManageCategory;
