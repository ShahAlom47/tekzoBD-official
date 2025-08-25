// app/portfolio/[slug]/page.tsx --> ✅ Server Component (no "use client")

import React from "react";
import { notFound } from "next/navigation";
import { getSingleProductBySlug } from "@/lib/allApiRequest/productRequest/productRequest";
import { ProductType } from "@/Interfaces/productInterfaces";
import PageHeading from "@/components/PageHeading";
import ProductDetailsContent from "@/components/ProductDetailsContent";
import RelatedProducts from "@/components/RelatedProducts";
import ReviewContent from "@/components/ReviewContent";



export default async function Page({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params;
  const response = await getSingleProductBySlug(slug);
  const product = response?.data as ProductType;

  if (!product) {
    notFound();
  }

  return (
    <section className="max-w mx-auto p-2 pt-5  ">
      <PageHeading title="Details" isDetailsPage={true}  subTitle={product?.title} />
      <ProductDetailsContent product={product}></ProductDetailsContent>
      <ReviewContent product={product}></ReviewContent>
     <RelatedProducts productId={product?._id ? product._id.toString() : ''} />

    </section>
  );
}
