"use client";

import { CategorySelect } from "@/components/CategorySelect";
import DashPageTitle from "@/components/DashPageTitle";
import MediaManager from "@/components/MediaManager";
import {
  MediaItem,
  ProductFormInput,
  ProductType,
} from "@/Interfaces/productInterfaces";
import { useRouter } from "next/navigation";
import React from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import toast from "react-hot-toast";

interface ProductFormProps {
  onSubmit: (data: ProductType) => Promise<{ success: boolean }>;
  defaultData?: Partial<ProductType>;
  mode?: "add" | "edit";
}

const ProductForm: React.FC<ProductFormProps> = ({
  onSubmit,
  defaultData = {},
  mode = "add",
}) => {
  const router = useRouter();
  const { register, handleSubmit, setValue, reset, control, watch } =
    useForm<ProductFormInput>({
      defaultValues: {
        title: "",
        slug: "",
        description: "",
        price: 0,
        stock: 0,
        media: [],
        categoryId: "",
        isPublished: false,
        discount: 0,
        offer: {
          isActive: false,
          startDate: "",
          endDate: "",
        },
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
        ...defaultData,
      },
    });

  React.useEffect(() => {
    if (mode === "edit" && defaultData) {
      reset(defaultData);
    }
  }, [defaultData, mode, reset]);

  const isOfferActive = watch("offer.isActive");

  const handleFormSubmit: SubmitHandler<ProductFormInput> = async (data) => {
    if (!data.media || data.media.length === 0) {
      toast.error("At least one media item is required");
      return;
    }

    if (!data.title || !data.slug || !data.description || !data.categoryId) {
      toast.error("All required fields must be filled");
      return;
    }

    const submitData =
      mode === "edit" && defaultData && (defaultData as ProductType)._id
        ? { ...data, _id: (defaultData as ProductType)._id }
        : data;

    const res = await onSubmit(submitData as ProductType);

    if (mode === "add" && res?.success) {
      reset();
    }
    if (mode === "edit" && res?.success) {
      router?.push("/dashboard/manageProducts");
    }
  };

  return (
    <form
      onSubmit={handleSubmit(handleFormSubmit)}
      className="max-w mx-auto p-6 space-y-6"
    >
      <DashPageTitle>
        {mode === "edit" ? "✏️ Edit Product" : "➕ Add New Product"}
      </DashPageTitle>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block mb-1 text-sm">Product Title</label>
          <input
            {...register("title", { required: true })}
            className="my-input w-full"
          />
        </div>
        <div>
          <label className="block mb-1 text-sm">Slug</label>
          <input
            {...register("slug", { required: true })}
            className="my-input w-full"
          />
        </div>
        <div className="md:col-span-2">
          <label className="block mb-1 text-sm">Description</label>
          <textarea
            {...register("description", { required: true })}
            className="my-input w-full min-h-20"
          />
        </div>
        <div>
          <label className="block mb-1 text-sm">Price</label>
          <input
            type="number"
            {...register("price", { required: true })}
            className="my-input w-full"
          />
        </div>
        <div>
          <label className="block mb-1 text-sm">Discount (%)</label>
          <input
            type="number"
            {...register("discount")}
            className="my-input w-full"
          />
        </div>
        <div>
          <label className="block mb-1 text-sm">Stock</label>
          <input
            type="number"
            {...register("stock", { required: true })}
            className="my-input w-full"
          />
        </div>
        <div>
          <label className="block mb-1 text-sm">Category</label>
          <CategorySelect<ProductFormInput>
            control={control}
            name="categoryId"
          />
        </div>
      </div>

      <MediaManager
        folderName="products"
        defaultMedia={mode === "edit" ? watch("media") : []}
        onChange={(media: MediaItem[]) => setValue("media", media)}
        dataId={mode === "edit" ? defaultData?._id : ""}
        mediaCategory={"productMedia"}
      />

      <div className="flex items-center gap-2">
        <input
          type="checkbox"
          {...register("isPublished")}
          className="w-5 h-5"
        />
        <label className="font-medium">Publish Product?</label>
      </div>

      {/* ✅ Offer Section */}
      <div className="border p-4 rounded-md space-y-3  my-input">
        <div className="flex items-center gap-2">
          <input
            type="checkbox"
            {...register("offer.isActive")}
            className="w-5 h-5"
          />
          <label className="font-medium">Activate Offer?</label>
        </div>

        {isOfferActive && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block mb-1 text-sm">Offer Start Date</label>
              <input
                type="date"
                {...register("offer.startDate")}
                className="my-input w-full bg-grayLight"
              />
            </div>
            <div>
              <label className="block mb-1 text-sm">Offer End Date</label>
              <input
                type="date"
                {...register("offer.endDate")}
                className="my-input w-full bg-grayLight"
              />
            </div>
          </div>
        )}
      </div>

      <div>
        <label className="block mb-1 text-sm">Product Source</label>
        <select
          {...register("sourceInfo.sourceType", { required: true })}
          className="my-input w-full"
        >
          <option value="self">Own Product</option>
          <option value="dropship">Dropship</option>
        </select>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <input
          {...register("sourceInfo.supplierName")}
          placeholder="Supplier Name"
          className="my-input w-full"
        />
        <input
          {...register("sourceInfo.productSourceLink")}
          placeholder="Source Link"
          className="my-input w-full"
        />
        <input
          {...register("sourceInfo.supplierProductId")}
          placeholder="Supplier Product ID"
          className="my-input w-full"
        />
        <input
          {...register("sourceInfo.deliveryTime")}
          placeholder="Delivery Time"
          className="my-input w-full"
        />
        <input
          type="number"
          {...register("sourceInfo.shippingCost")}
          placeholder="Shipping Cost"
          className="my-input w-full"
        />
        <input
          {...register("sourceInfo.returnPolicy")}
          placeholder="Return Policy"
          className="my-input w-full"
        />
        <input
          type="number"
          step="0.01"
          {...register("sourceInfo.commissionRate")}
          placeholder="Commission Rate"
          className="my-input w-full"
        />
        <div className="flex items-center gap-2">
          <input
            type="checkbox"
            {...register("sourceInfo.externalStock")}
            className="w-5 h-5"
          />
          <label>External Stock?</label>
        </div>
      </div>

      <button type="submit" className="btn-base">
        {mode === "edit" ? "✅ Update Product" : "✅ Submit Product"}
      </button>
    </form>
  );
};

export default ProductForm;
