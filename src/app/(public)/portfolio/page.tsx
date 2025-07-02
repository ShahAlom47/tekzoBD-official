import { getAllPortfolio } from "@/lib/allApiRequest/portfolioRequest/porfolioRequest";
import { Project } from "@/Interfaces/portfolioInterfaces";
import PublicPagePaginationButton from "@/components/PublicPagePaginationButton";
import PageHeading from "@/components/PageHeading";
import PortfolioCard from "@/components/PortfolioCard";

interface Props {
  searchParams: {
    page?: string;
  };
}

export default async function PortfolioPage({ searchParams }: Props) {
  const currentPage = Number(searchParams?.page) || 1;
  const limit = 6;

  const response = await getAllPortfolio({ currentPage, limit });

  const portfolioData = response?.data as Project[] || [];
  const total = response?.totalData || 0;

  const totalPages = Math.ceil(total / limit);

  return (
    <section className="max-w-6xl mx-auto p-6 ">
     <PageHeading
        title="My Portfolio"
        subtitle="Visit my portfolio and keep your feedback"
      ></PageHeading>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 ">
        {portfolioData.map((portfolio) => (
          <div
            key={String(portfolio._id)}
            className=""
          >
          <PortfolioCard portfolio={portfolio}></PortfolioCard>
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
