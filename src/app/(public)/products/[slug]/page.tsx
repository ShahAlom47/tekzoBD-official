// app/portfolio/[slug]/page.tsx --> ✅ Server Component (no "use client")

import React from "react";
import { notFound } from "next/navigation";
import { getSinglePortfolio } from "@/lib/allApiRequest/portfolioRequest/porfolioRequest";
import { Project } from "@/Interfaces/portfolioInterfaces";
import PageHeading from "@/components/PageHeading";
import PortfolioDetailContent from "@/components/PortfolioDetailsContent";

interface Props {
  params: {
    slug: string;
  };
}

export default async function PortfolioDetailPage({ params }: Props) {
  const { slug } = params;
  const response = await getSinglePortfolio(slug);
  const portfolio = response?.data as Project;

  if (!portfolio) {
    notFound();
  }

  return (
    <section className="max-w mx-auto p-6 pt-1 ">
      <PageHeading title="Project Details" />
      <PortfolioDetailContent portfolio={portfolio} />
    </section>
  );
}
