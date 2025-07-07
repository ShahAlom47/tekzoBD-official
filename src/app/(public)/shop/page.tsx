import PageHeading from "@/components/PageHeading";
import PublicPagePaginationButton from "@/components/PublicPagePaginationButton";
import ShopFilterSidebar from "@/components/ShopFilterSidebar";
import ShopProductGrid from "@/components/ShopProductGrid";
import { SortOptions } from "@/Interfaces/productInterfaces";
import { getAllProduct } from "@/lib/allApiRequest/productRequest/productRequest";

interface Props {
  searchParams: {
    page?: string;
    minPrice?: string;
    maxPrice?: string;
    category?: string;
    brand?: string;
    rating?: string;
    sort?: SortOptions; 
    searchTrim?: string;
  };
}

export default async function ShopPage({ searchParams }: Props) {
  const currentPage = Number(searchParams.page) || 1;
  const limit = 6;

  const {
    sort = "asc",
    minPrice,
    maxPrice,
    category,
    brand,
    rating,
    searchTrim,
  } = searchParams;

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

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {/* Sidebar with filtering */}
        <div className="md:col-span-1 space-y-4">
          <ShopFilterSidebar />
          {/* Future: Add Recent or Featured products here */}
        </div>

        {/* Product grid and pagination */}
        <div className="md:col-span-3 space-y-6">
          <ShopProductGrid products={products} />

          {totalPages > 1 && (
            <PublicPagePaginationButton
              currentPage={currentPage}
              totalPages={totalPages}
            />
          )}
        </div>
      </div>
    </section>
  );
}
