import PageHeading from "@/components/PageHeading";
import PublicPagePaginationButton from "@/components/PublicPagePaginationButton";
import { ProductType } from "@/Interfaces/productInterfaces";
import { getAllProduct } from "@/lib/allApiRequest/productRequest/productRequest";


interface Props {
  searchParams: {
    page?: string;
  };
}

export default async function ShopPage({ searchParams }: Props) {
  const currentPage = Number(searchParams?.page) || 1;
  const limit = 6;

  const response = await getAllProduct({ currentPage, limit });

  const portfolioData = response?.data as ProductType[] || [];
  const total = response?.totalData || 0;

  const totalPages = Math.ceil(total / limit);

  return (
    <section className="max-w-6xl mx-auto p-6 ">
     <PageHeading
        title="Our Product"
        subtitle="Visit my portfolio and keep your feedback"
      ></PageHeading>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 ">
        {portfolioData.map((portfolio) => (
          <div
            key={String(portfolio._id)}
            className=""
          >
          <p>producs</p>
          </div>
        ))}
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
      <PublicPagePaginationButton currentPage={currentPage} totalPages={totalPages}></PublicPagePaginationButton>
      )}
    </section>
  );
}
