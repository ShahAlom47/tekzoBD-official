"use client";

import { addProduct } from "@/lib/allApiRequest/productRequest/productRequest";
import ProductForm from "@/components/ProductForm";
import toast from "react-hot-toast";
import { ProductFormInput } from "@/Interfaces/productInterfaces";

export default function AddProduct() {
  const handleAddProduct = async (data: ProductFormInput) => {
    const res = await addProduct({ ...data, _id: "" });
    if (res?.success) {
      toast.success(res.message || "Product added");
    } else {
      toast.error(res.message || "Failed to add product");
    }
  };

  return <ProductForm onSubmit={handleAddProduct} mode="add" />;
}
