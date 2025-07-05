"use client";

import { addProduct } from "@/lib/allApiRequest/productRequest/productRequest";
import ProductForm from "@/components/ProductForm";
import toast from "react-hot-toast";
import { ProductType } from "@/Interfaces/productInterfaces";

export default function AddProduct() {
 const handleAddProduct = async (data: ProductType): Promise<{ success: boolean }> => {
    const res = await addProduct({ ...data });
    console.log(res?.message)
    if (res?.success) {
      toast.success(res.message || "Product added");
      return { success: true };
    } else {
      console.log(res?.message)
      toast.error(res.message || "Failed to add product");
      return { success: false };
    }
  };

  return <ProductForm onSubmit={handleAddProduct} mode="add" />;
}
