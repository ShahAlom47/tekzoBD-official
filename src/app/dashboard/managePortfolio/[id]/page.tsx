"use client";

import { useParams, useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { useForm, SubmitHandler, Controller } from "react-hook-form";
import toast from "react-hot-toast";
import Select from "react-select";

import DashPageTitle from "@/components/DashPageTitle";
import MediaManager from "@/components/MediaManager";
import {
  MediaItem,
  OptionType,
  Project,
  ProjectFormInput,
} from "@/Interfaces/portfolioInterfaces";
import {
  getSinglePortfolio,
  updatePortfolio,
} from "@/lib/allApiRequest/portfolioRequest/porfolioRequest";
import { customStyles } from "@/style/formSelectStyle";

const techOptions: OptionType[] = [
  { value: "react", label: "React" },
  { value: "nextjs", label: "Next.js" },
  { value: "nodejs", label: "Node.js" },
  { value: "firebase", label: "Firebase" },
  { value: "tailwind", label: "Tailwind CSS" },
];

const tagOptions: OptionType[] = [
  { value: "frontend", label: "Frontend" },
  { value: "fullstack", label: "Full Stack" },
  { value: "portfolio", label: "Portfolio" },
  { value: "ecommerce", label: "E-commerce" },
];

const EditPortfolio: React.FC = () => {
  const { id } = useParams();
  const [loading, setLoading] = useState(true);
  const router= useRouter()

  const { register, handleSubmit, setValue, control, reset, watch } =
    useForm<ProjectFormInput>();

  useEffect(() => {
    const fetchData = async () => {
      if (!id) return;
      const res = await getSinglePortfolio(id as string);
      if (res?.success) {
        const data = res.data;
        reset(data as Project);
      } else {
        toast.error("Failed to load portfolio data");
      }
      setLoading(false);
    };
    fetchData();
  }, [id, reset]);

  const onSubmit: SubmitHandler<ProjectFormInput> = async (data) => {
   
    const res = await updatePortfolio(id as string, data as Project);
    if (res?.success) {
      toast.success(res.message || "Portfolio updated successfully");
      router.push("/dashboard/managePortfolio")

    } else {
      toast.error(res.message || "Portfolio update failed");
    }
  };

  if (loading) return <p className="text-white">Loading...</p>;

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="max-w mx-auto p-6 text-white space-y-6 min-w-[320px]"
    >
      <DashPageTitle>✏️ Edit Portfolio Project</DashPageTitle>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 ">
        <input
          {...register("title", { required: true })}
          placeholder="Project Title"
          className="input w-full"
        />
        <input
          {...register("slug", { required: true })}
          placeholder="Slug"
          className="input w-full"
        />
        <textarea
          {...register("description", { required: true })}
          placeholder="Short Description"
          className="input min-h-20  w-full "
        />
        <textarea
          {...register("content")}
          placeholder="Long Content"
          className="input min-h-20  w-full"
        />
      </div>

      <MediaManager
        folderName="portfolio"
        onChange={(media: MediaItem[]) => setValue("media", media)}
        defaultMedia={watch("media") || []}
        dataId={Array.isArray(id) ? id[0] : id}
        mediaCategory="portfolioMedia"
      />

      <Controller
        name="techStack"
        control={control}
        render={({ field }) => (
          <Select
            {...field}
            isMulti
            options={techOptions}
            styles={customStyles}
            className="react-select-container"
            classNamePrefix="react-select"
            placeholder="Select Tech Stack"
          />
        )}
      />

      <Controller
        name="tags"
        control={control}
        render={({ field }) => (
          <Select
            {...field}
            isMulti
            options={tagOptions}
            styles={customStyles}
            className="react-select-container"
            classNamePrefix="react-select"
            placeholder="Select Tags"
          />
        )}
      />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <input
          {...register("liveLink", { required: true })}
          placeholder="Live Site Link"
          className="input w-full"
        />
        <input
          {...register("repoLink", { required: true })}
          placeholder="GitHub Repo Link"
          className="input w-full"
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 items-center gap-4 w-full ">
        <div className="w-full flex items-center gap-3 bg-[#1d232a] h-full rounded-sm px-2">
          <input
            id="featured"
            type="checkbox"
            {...register("featured")}
            className="w-5 h-5 accent-blue-500 cursor-pointer"
          />
          <label htmlFor="featured" className="text-white">
            Featured Project?
          </label>
        </div>
        <div className="w-full input outline-none ">
          <label className="text-white">Sort Order:</label>
          <input
            type="number"
            {...register("order")}
            placeholder="Sort Order (e.g. 1, 2, 3)"
            className="input w-full"
          />
        </div>
      </div>

      <button
        type="submit"
        className="bg-blue-600 text-white px-4 py-2 rounded"
      >
        💾 Update Project
      </button>
    </form>
  );
};

export default EditPortfolio;
