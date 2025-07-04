"use client";

import DashPageTitle from "@/components/DashPageTitle";
import MediaManager from "@/components/MediaManager";
import { MediaItem } from "@/Interfaces/portfolioInterfaces";
import { ProductType } from "@/Interfaces/productInterfaces";
import { addProduct } from "@/lib/allApiRequest/productRequest/productRequest";
import React from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import toast from "react-hot-toast";

const AddProduct: React.FC = () => {
  const { register, handleSubmit, setValue, reset } = useForm<ProductType>({
    defaultValues: {
      title: "",
      slug: "",
      description: "",
      price: 0,
      stock: 0,
      images: [],
      category: "",
      isPublished: false,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      discount: 0,
      sourceInfo: {
        sourceType: "self",
        supplierName: "",
        productSourceLink: "",
        supplierProductId: "",
        deliveryTime: "",
        shippingCost: 0,
        returnPolicy: "",
        commissionRate: 0,
        externalStock: false,
      },
    },
  });

  const onSubmit: SubmitHandler<ProductType> = async (data) => {
    console.log(data)
    const res = await addProduct(data);

    if (!data.images || data.images.length === 0) {
      toast.error("At least one product image is required");
      return;
    }

    if (!data.title || !data.slug || !data.description || !data.category) {
      toast.error("All required fields must be filled");
      return;
    }

    if (res?.success) {
      toast.success(res.message || "Product added successfully");
      reset();
    } else {
      toast.error(res.message || "Failed to add product");
      console.warn("Server responded with success: false", res);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="max-w mx-auto p-6 space-y-6 min-w-[320px]">
      <DashPageTitle>➕ Add New Product</DashPageTitle>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label htmlFor="title" className="block mb-1 text-sm ">Product Title</label>
          <input id="title" {...register("title", { required: true })} placeholder="Product Title" className="my-input w-full" />
        </div>

        <div>
          <label htmlFor="slug" className="block mb-1 text-sm ">Slug (URL friendly)</label>
          <input id="slug" {...register("slug", { required: true })} placeholder="Slug" className="my-input w-full" />
        </div>

        <div className="md:col-span-2">
          <label htmlFor="description" className="block mb-1 text-sm ">Short Description</label>
          <textarea id="description" {...register("description", { required: true })} placeholder="Short Description" className="my-input min-h-16 w-full" />
        </div>

        <div>
          <label htmlFor="price" className="block mb-1 text-sm ">Price (TK)</label>
          <input type="number" id="price" {...register("price", { required: true })} placeholder="Price" className="my-input w-full" />
        </div>

        <div>
          <label htmlFor="discount" className="block mb-1 text-sm ">Discount (%)</label>
          <input type="number" id="discount" {...register("discount")} placeholder="Discount" className="my-input w-full" />
        </div>

        <div>
          <label htmlFor="stock" className="block mb-1 text-sm ">Stock Quantity</label>
          <input type="number" id="stock" {...register("stock", { required: true })} placeholder="Stock Quantity" className="my-input w-full" />
        </div>

        <div>
          <label htmlFor="category" className="block mb-1 text-sm ">Category</label>
          <input id="category" {...register("category", { required: true })} placeholder="Category" className="my-input w-full" />
        </div>
      </div>

      <MediaManager
        folderName="products"
        onChange={(media: MediaItem[]) =>
          setValue("images", media.map((m) => m.url))
        }
      />

      <div>
        <label htmlFor="sourceType" className="block mb-1 text-sm ">Product Source</label>
        <select id="sourceType" {...register("sourceInfo.sourceType", { required: true })} className="my-input w-full">
          <option value="self">Own Product</option>
          <option value="dropship">Dropship</option>
        </select>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 items-end">
        <div className="flex items-center gap-2 my-input  rounded-sm px-2 h-fit ">
          <input type="checkbox" id="isPublished" {...register("isPublished")} className="w-5 h-5 cursor-pointer" />
          <label htmlFor="isPublished" className="">Publish Product?</label>
        </div>

        <div>
          <label htmlFor="supplierName" className="block mb-1 text-sm ">Supplier Name (if dropship)</label>
          <input id="supplierName" type="text" {...register("sourceInfo.supplierName")} placeholder="Supplier Name" className="my-input w-full" />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label htmlFor="productSourceLink" className="block mb-1 text-sm ">Product Source Link</label>
          <input id="productSourceLink" {...register("sourceInfo.productSourceLink")} placeholder="Source Link" className="my-input w-full" />
        </div>

        <div>
          <label htmlFor="supplierProductId" className="block mb-1 text-sm ">Supplier Product ID</label>
          <input id="supplierProductId" {...register("sourceInfo.supplierProductId")} placeholder="Supplier Product ID" className="my-input w-full" />
        </div>

        <div>
          <label htmlFor="deliveryTime" className="block mb-1 text-sm ">Delivery Time</label>
          <input id="deliveryTime" {...register("sourceInfo.deliveryTime")} placeholder="5-7 Days" className="my-input w-full" />
        </div>

        <div>
          <label htmlFor="shippingCost" className="block mb-1 text-sm ">Shipping Cost</label>
          <input type="number" id="shippingCost" {...register("sourceInfo.shippingCost")} placeholder="Shipping Cost" className="my-input w-full" />
        </div>

        <div>
          <label htmlFor="returnPolicy" className="block mb-1 text-sm ">Return Policy</label>
          <input id="returnPolicy" {...register("sourceInfo.returnPolicy")} placeholder="Return Policy" className="my-input w-full" />
        </div>

        <div>
          <label htmlFor="commissionRate" className="block mb-1 text-sm ">Commission Rate (%)</label>
          <input type="number" step="0.01" id="commissionRate" {...register("sourceInfo.commissionRate")} placeholder="Commission Rate" className="my-input w-full" />
        </div>

        <div className="flex items-center gap-2 my-input h-full rounded-sm px-2">
          <input type="checkbox" id="externalStock" {...register("sourceInfo.externalStock")} className="w-5 h-5 cursor-pointer" />
          <label htmlFor="externalStock" className="">External Stock?</label>
        </div>
      </div>

      <button type="submit" className="btn-base">✅ Submit Product</button>
    </form>
  );
};

export default AddProduct;
