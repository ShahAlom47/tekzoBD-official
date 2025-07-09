import MobileScreenFilteringSection from "@/components/MobileScreenFilteringSection";
import PageHeading from "@/components/PageHeading";
import ProductCountInfo from "@/components/ProductCountInfo";
import PublicPagePaginationButton from "@/components/PublicPagePaginationButton";
import RecentViewProducts from "@/components/RecentViewProducts";
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
    stock?:"in-stock"| "out-of-stock";
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
  const stock= params?.stock;

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
      stock,
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
    <section className="max-w mx-auto md:p-6 p-2 py-7 space-y-5">
      <PageHeading title="Our Product" />

      <ProductCountInfo currentPage={currentPage} perPage={limit} total={total} />

      <div className="md:hidden block">
        <MobileScreenFilteringSection></MobileScreenFilteringSection>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-12 gap-6 my-6 ">
        <div className="md:col-span-9  space-y-6">
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

        <div className=" md:block hidden col-span-3 space-y-4">
          <Suspense fallback={<div>Loading filters...</div>}>
            <ShopFilterSidebar />
          </Suspense>
        </div>
      </div>
     <div className=" block md:hidden"> 
      <RecentViewProducts></RecentViewProducts>
     </div>
    </section>
  );
}
