// app/portfolio/[slug]/page.tsx --> ✅ Server Component (no "use client")

import React from "react";
import { notFound } from "next/navigation";
import { getSingleProductBySlug } from "@/lib/allApiRequest/productRequest/productRequest";
import { ProductType } from "@/Interfaces/productInterfaces";
import PageHeading from "@/components/PageHeading";
import ProductDetailsContent from "@/components/ProductDetailsContent";
import RelatedProducts from "@/components/RelatedProducts";

interface Props {
  params: {
    slug: string;
  };
}

export default async function ProductDetailPage({ params }: Props) {
  const { slug } = params;
  const response = await getSingleProductBySlug(slug);
  const product = response?.data as ProductType;

  if (!product) {
    notFound();
  }

  return (
    <section className="max-w mx-auto p-2 pt-5  ">
      <PageHeading title="Details" isDetailsPage={true}  subTitle={product?.title} />
      <ProductDetailsContent product={product}></ProductDetailsContent>
      <RelatedProducts productId={product?._id.toString()}></RelatedProducts>

    </section>
  );
}
