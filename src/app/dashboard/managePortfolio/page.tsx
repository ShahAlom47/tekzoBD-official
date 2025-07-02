"use client";
import ErrorComponent from "@/app/error";
import Loading from "@/app/loading";
import DashPageTitle from "@/components/DashPageTitle";
import { CustomTable } from "@/components/ui/CustomTable";
import { DashPaginationButton } from "@/components/ui/DashPaginationButton";
import { Project } from "@/Interfaces/portfolioInterfaces";
import {
  deletePortfolio,
  getAllPortfolio,
} from "@/lib/allApiRequest/portfolioRequest/porfolioRequest";
import { queryClient } from "@/Providers/QueryProvider";
import { useQuery } from "@tanstack/react-query";
import Link from "next/link";
import React, { useState } from "react";
import toast from "react-hot-toast";

import "react-confirm-alert/src/react-confirm-alert.css";
import { useConfirm } from "@/hooks/useConfirm";
import { ObjectId } from "mongodb";
import { useAppSelector } from "@/redux/hooks/reduxHook";

const ManagePortfolio = () => {
  const { ConfirmModal, confirm } = useConfirm();
  const [page, setPage] = useState(1);
  const limit = 10; // Assuming you want to fetch 10 items per page
    const searchValue = useAppSelector((state) => state.dashSearch.dashSearchValue);

  const {
    data: portfolio,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["getAllPortfolio",searchValue],
    queryFn: async () => {
      const response = await getAllPortfolio({
        currentPage: page,
        limit: limit,
        searchTrim: searchValue ,
      });
      if (!response || !response.success) {
        throw new globalThis.Error(
          response.message || "Failed to fetch portfolio data"
        );
      }
      return response;
    },
    refetchOnWindowFocus: false,
  });

  const portfolioData = (portfolio?.data as Project[]) || [];
  const totalPages = portfolio?.totalPages || 1; // Assuming portfolio contains totalPages

  const handleDelete = async (id:ObjectId |string|undefined) => {
    const ok = await confirm({
      title: "Delete Item",
      message: "Are you sure you want to delete this item?",
      confirmText: "Yes",
      cancelText: "No",
    });

    if (ok) {
        if (!id) {
          toast.error("Invalid portfolio ID");  
            return;
        }
      try {
        const delateResponse = await deletePortfolio(id);

        if (!delateResponse || !delateResponse.success) {
          throw new Error(
            delateResponse.message || "Failed to delete portfolio"
          );
        }

        toast.success(
          delateResponse.message || "Portfolio deleted successfully!"
        );

        // 🧠 React Query cache invalidation
        queryClient.invalidateQueries({ queryKey: ["getAllPortfolio"] });
      } catch (error) {
        toast.error("Error deleting portfolio");
        console.error(error);
      }
    } else {
      console.log("❌ Cancelled");
    }
  };

  const columns = [
    { header: "Title", accessor: "title", isSummary: true },
    { header: "Live", accessor: "live" },
    { header: "Git Repo", accessor: "gitRepo" },
    { header: "Edit", accessor: "view" },
    { header: "Delate", accessor: "delete" },
  ];

  const data =
    portfolioData?.map((item) => ({
      title: item.title,
      live: item.liveLink ? (
        <Link href={item.liveLink} target="_blank" className="btn btn-sm">
          Live
        </Link>
      ) : (
        "Not Available"
      ),

      gitRepo: item.repoLink ? (
        <Link href={item.repoLink} target="_blank" className="btn btn-sm">
          Git Repo
        </Link>
      ) : (
        "Not Available"
      ),
      view: (
        <Link
          href={`/dashboard/managePortfolio/${item?._id}`}
          className="btn btn-sm"
        >
         View & Edit
        </Link>
      ),
      delete: (
        <button onClick={() => handleDelete(item?._id)} className=" btn-sm btn * bg-red-500 text-white">
          Delete
        </button>
      ),
    })) || [];

  return (
    <div className="p-4 max-w   min-h-screen  ">
      <DashPageTitle>Manage Portfolio</DashPageTitle>
      {isLoading ? (
        <Loading />
      ) : error ? (
        <ErrorComponent />
      ) : (
        <>
          <CustomTable
            columns={columns}
            data={data}
            className="shadow-2xl shadow-stone-600"
          />
          <DashPaginationButton
            currentPage={page}
            totalPages={totalPages}
            onPageChange={(newPage) => setPage(newPage)}
            className="mt-4"
          />
        </>
      )}
      {ConfirmModal}
    </div>
  );
};

export default ManagePortfolio;
