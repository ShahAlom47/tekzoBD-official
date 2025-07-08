import PageHeading from "@/components/PageHeading";
import PublicPagePaginationButton from "@/components/PublicPagePaginationButton";
import ShopFilterSidebar from "@/components/ShopFilterSidebar";
import ShopProductGrid from "@/components/ShopProductGrid";
import { SortOptions } from "@/Interfaces/productInterfaces";
import { getAllProduct } from "@/lib/allApiRequest/productRequest/productRequest";
import { Suspense } from "react";

interface Props {
  searchParams: Promise<{
    page?: string;
    minPrice?: string;
    maxPrice?: string;
    category?: string;
    brand?: string;
    rating?: string;
    sort?: SortOptions;
    searchTrim?: string;
  }>;
}

export default async function ShopPage({ searchParams }: Props) {
  const params = await searchParams;

  const currentPage = Number(params?.page) || 1;
  const limit = 9;

  const searchTrim = params?.searchTrim;
  const sort = (params?.sort as SortOptions) || "asc";
  const minPrice = params?.minPrice;
  const maxPrice = params?.maxPrice;
  const category = params?.category;
  const brand = params?.brand;
  const rating = params?.rating;

  let products = [];
  let total = 0;
  let totalPages = 0;
  let errorMessage = "";

  try {
    const response = await getAllProduct({
      currentPage,
      limit,
      sort,
      minPrice,
      maxPrice,
      category,
      brand,
      rating,
      searchTrim,
    });

    if (!response.success) {
      throw new Error(response.message || "Something went wrong.");
    }

    products = Array.isArray(response.data) ? response.data : [];
    total = response.totalData || 0;
    totalPages = Math.ceil(total / limit);
  } catch (error) {
    errorMessage = error instanceof Error ? error.message : "Unexpected error occurred";
  }

  return (
    <section className="max-w-6xl mx-auto p-6">
      <PageHeading title="Our Product" />

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 my-6">
        <div className="md:col-span-3 space-y-6">
          {errorMessage ? (
            <div className="text-red-600 text-lg font-semibold">
              ❌ {errorMessage}
            </div>
          ) : products.length === 0 ? (
            <div className="text-gray-600 text-lg font-medium my-6">
              No products found matching your filters.
            </div>
          ) : (
            <>
              <ShopProductGrid products={products} />
              {totalPages > 1 && (
                <PublicPagePaginationButton
                  currentPage={currentPage}
                  totalPages={totalPages}
                />
              )}
            </>
          )}
        </div>

        <div className="md:col-span-1 space-y-4">
          <Suspense fallback={<div>Loading filters...</div>}>
            <ShopFilterSidebar />
          </Suspense>
        </div>
      </div>
    </section>
  );
}
