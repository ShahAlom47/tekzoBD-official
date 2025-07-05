/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState, useCallback } from "react";
import { getAllCategories } from "@/lib/allApiRequest/categoryRequest/categoryRequest";
import { useAppDispatch, useAppSelector } from "@/redux/hooks/reduxHook";
import { setCategories } from "@/redux/features/category/categorySlice";
import { CategoryType } from "@/Interfaces/categoryInterfaces";



export const useCategories = () => {
  const dispatch = useAppDispatch();
  const categories = useAppSelector(state => state.categories.list);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const loadCategories = useCallback(async () => {
    if (categories.length === 0) {
      setLoading(true);
      try {
        const data = await getAllCategories({currentPage:1,limit:100,searchTrim:''});
        dispatch(setCategories(data?.data as CategoryType[]));
        setError(null);
      } catch (err: any) {
        setError(err.message || "Network error");
      } finally {
        setLoading(false);
      }
    }
  }, [categories.length, dispatch]);

  const restoreCategories = useCallback(async () => {
    setLoading(true);
    try {
       const data = await getAllCategories({currentPage:1,limit:100,searchTrim:''});
        dispatch(setCategories(data?.data as CategoryType[]));
      setError(null);
    } catch (err: any) {
      setError(err.message || "Network error");
    } finally {
      setLoading(false);
    }
  }, [dispatch]);

  useEffect(() => {
    loadCategories();
  }, [loadCategories]);

  return {
    categories,
    loading,
    error,
    loadCategories,
    restoreCategories,
  };
};
