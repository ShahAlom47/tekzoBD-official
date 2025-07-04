"use client";

import { getSingleCategory, updateCategory } from "@/lib/allApiRequest/categoryRequest/categoryRequest";
import { useForm, SubmitHandler } from "react-hook-form";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useQueryClient } from "@tanstack/react-query";
import { CategoryType } from "@/Interfaces/categoryInterfaces";

interface EditCategoryProps {
  id: string;
  setOpenModal?:(value:boolean)=> void
}

const EditCategory: React.FC<EditCategoryProps> = ({ id ,setOpenModal}) => {
  const { register, handleSubmit, setValue } = useForm<CategoryType>();
  const [loading, setLoading] = useState(false);
  const queryClient = useQueryClient();

  useEffect(() => {
    const fetchCategory = async () => {
      setLoading(true);
      const res = await getSingleCategory(id);
      if (res?.success && res.data) {
        const cat = res.data as CategoryType;
        setValue("name", cat.name);
        setValue("slug", cat.slug);
        setValue("icon", cat.icon || "");
        setValue("parentCategory", cat?.parentCategory || "");
      } else {
        toast.error("Failed to load category data");
      }
      setLoading(false);
    };

    if (id) {
      fetchCategory();
    }
  }, [id, setValue]);

  const onSubmit: SubmitHandler<CategoryType> = async (data) => {
    try {
      const res = await updateCategory(id, data);
      if (res?.success) {
        toast.success(res.message || "Category updated successfully!");
        queryClient.invalidateQueries({ queryKey: ["getAllCategories"] });
        if (setOpenModal) setOpenModal(false);
      } else {
        toast.error(res.message || "Update failed");
      }
    } catch (error) {
      toast.error("Something went wrong");
      console.error(error);
    }
  };

  if (loading) return <p className="text-center py-4">Loading...</p>;

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <div>
        <label htmlFor="name" className="block mb-1 text-sm">Category Name</label>
        <input
          id="name"
          {...register("name", { required: true })}
          placeholder="e.g., Electronics"
          className="my-input w-full"
        />
      </div>

      <div>
        <label htmlFor="slug" className="block mb-1 text-sm">Slug</label>
        <input
          id="slug"
          {...register("slug", { required: true })}
          placeholder="e.g., electronics"
          className="my-input w-full"
        />
      </div>

      <div>
        <label htmlFor="icon" className="block mb-1 text-sm">Icon (emoji or image path)</label>
        <input
          id="icon"
          {...register("icon")}
          placeholder="e.g., 📱 or /icons/electronics.png"
          className="my-input w-full"
        />
      </div>

      <div>
        <label htmlFor="parentCategory" className="block mb-1 text-sm">Parent Category (optional)</label>
        <input
          id="parentCategory"
          {...register("parentCategory")}
          placeholder="e.g., main-category-id"
          className="my-input w-full"
        />
      </div>

      <button type="submit" className="btn-base w-full">🔁 Update Category</button>
    </form>
  );
};

export default EditCategory;
