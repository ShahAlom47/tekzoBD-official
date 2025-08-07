import { useState } from "react";
import CategoryForm from "./CategoryForm";
import { addCategory } from "@/lib/allApiRequest/categoryRequest/categoryRequest";
import { useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";

const AddCategory = () => {
  const [loading, setLoading] = useState(false);
  const queryClient = useQueryClient();

  const handleAdd = async (data) => {
    try {
      setLoading(true);
      const res = await addCategory(data);
      if (res?.success) {
        toast.success(res.message || "Category added!");
        queryClient.invalidateQueries({ queryKey: ["getAllCategories"] });
      } else {
        toast.error(res.message || "Failed to add");
      }
    } catch {
      toast.error("Error adding category");
    } finally {
      setLoading(false);
    }
  };

  return (
    <CategoryForm onSubmit={handleAdd} loading={loading} submitText="Add Category" />
  );
};

export default AddCategory;
