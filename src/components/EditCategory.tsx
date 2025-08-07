import { useEffect, useState } from "react";
import { getSingleCategory, updateCategory } from "@/lib/allApiRequest/categoryRequest/categoryRequest";
import { useQueryClient } from "@tanstack/react-query";
import CategoryForm from "./CategoryForm";
import toast from "react-hot-toast";

const EditCategory = ({ id, setOpenModal }) => {
  const [defaultValues, setDefaultValues] = useState(null);
  const [loading, setLoading] = useState(true);
  const queryClient = useQueryClient();

  useEffect(() => {
    (async () => {
      const res = await getSingleCategory(id);
      if (res?.success && res.data) {
        setDefaultValues(res.data);
      } else {
        toast.error("Failed to load data");
      }
      setLoading(false);
    })();
  }, [id]);

  const handleUpdate = async (data) => {
    try {
      setLoading(true);
      const res = await updateCategory(id, data);
      if (res?.success) {
        toast.success("Category updated");
        queryClient.invalidateQueries({ queryKey: ["getAllCategories"] });
        if (setOpenModal) setOpenModal(false);
      } else {
        toast.error("Update failed");
      }
    } catch {
      toast.error("Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  if (loading || !defaultValues) return <p className="text-center">Loading...</p>;

  return <CategoryForm defaultValues={defaultValues} onSubmit={handleUpdate} submitText="Update Category" loading={loading} />;
};

export default EditCategory;
