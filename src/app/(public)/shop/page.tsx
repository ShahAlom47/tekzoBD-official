import PageHeading from "@/components/PageHeading";
import PublicPagePaginationButton from "@/components/PublicPagePaginationButton";
import ShopFilterSidebar from "@/components/ShopFilterSidebar";
import ShopProductGrid from "@/components/ShopProductGrid";
import { SortOptions } from "@/Interfaces/productInterfaces";
import { getAllProduct } from "@/lib/allApiRequest/productRequest/productRequest";

interface Props {
  // Mark searchParams as a Promise since Next.js 13.4+ expects it async now
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
  // Await searchParams here (Important: This fixes the warning/error)
  const params = await searchParams;

  const currentPage = Number(params?.page) || 1;
  const limit = 9;

  // Access params after awaiting
  const searchTrim = params?.searchTrim;
  const sort = (params?.sort as SortOptions) || "asc";
  const minPrice = params?.minPrice;
  const maxPrice = params?.maxPrice;
  const category = params?.category;
  const brand = params?.brand;
  const rating = params?.rating;

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

  const products = Array.isArray(response?.data) ? response.data : [];
  const total = response?.totalData || 0;
  const totalPages = Math.ceil(total / limit);

  return (
    <section className="max-w-6xl mx-auto p-6">
      <PageHeading title="Our Product" />

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 my-3 ">
        <div className="md:col-span-3 space-y-6">
          <ShopProductGrid products={products} />

          {totalPages > 1 && (
            <PublicPagePaginationButton
              currentPage={currentPage}
              totalPages={totalPages}
            />
          )}
        </div>

        <div className="md:col-span-1 space-y-4">
          <ShopFilterSidebar />
        </div>
      </div>
    </section>
  );
}
