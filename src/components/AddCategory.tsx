"use client";

import { addCategory } from "@/lib/allApiRequest/categoryRequest/categoryRequest";
import { useForm, SubmitHandler } from "react-hook-form";
import toast from "react-hot-toast";
import { useQueryClient } from "@tanstack/react-query";
import { CategoryType } from "@/Interfaces/categoryInterfaces";

const AddCategory = () => {
  const { register, handleSubmit, reset } = useForm<CategoryType>({
    defaultValues: {
      name: "",
      slug: "",
      icon: "",
      parentCategory: null,
    },
  });

  const queryClient = useQueryClient();

  const onSubmit: SubmitHandler<CategoryType> = async (data) => {
    try {
      const res = await addCategory(data);

      if (res?.success) {
        toast.success(res.message || "Category added successfully!");
        queryClient.invalidateQueries({ queryKey: ["getAllCategories"] });
        reset();
      } else {
        toast.error(res.message || "Failed to add category");
      }
    } catch (error) {
      console.error(error);
      toast.error("Something went wrong while adding category");
    }
  };

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

      <button type="submit" className="btn-base w-full">✅ Add Category</button>
    </form>
  );
};

export default AddCategory;
