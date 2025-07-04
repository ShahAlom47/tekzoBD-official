"use client";
import AddCategory from "@/components/AddCategory";
import DashPageTitle from "@/components/DashPageTitle";
import EditCategory from "@/components/EditCategory";
import PrimaryButton from "@/components/PrimaryButton";
import CustomModal from "@/components/ui/CustomModal";
import React, { useState } from "react";
import { FaPlus } from "react-icons/fa";

const ManageCategory = () => {
  const [openModal, setOpenModal] = useState<boolean>(false);
  const [modalContent, setModalContent] = useState<"add" | "edit">("add");

  const handleModal = (content: "add" | "edit") => {
    setOpenModal(true);
    setModalContent(content);
  };
  return (
    <div>
      <div className="flex justify-between mb-4">
        <DashPageTitle>Manage Category</DashPageTitle>
        <PrimaryButton
          onClick={() => handleModal("add")}
          className=" rounded-sm text-sm h-8"
        >
          <FaPlus></FaPlus> Add Category
        </PrimaryButton>
      </div>

      <div>
        <CustomModal
          open={openModal}
          onOpenChange={setOpenModal}
          title=" Add Category"
        >
          {/* Modal Content */}
         {
            modalContent==="add"?
            <AddCategory></AddCategory>
            :<EditCategory id={''}></EditCategory>
         }
        </CustomModal>
      </div>
    </div>
  );
};

export default ManageCategory;
