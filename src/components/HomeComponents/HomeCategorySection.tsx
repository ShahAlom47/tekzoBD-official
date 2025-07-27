// app/components/CategorySection.tsx
import { CategoryType } from "@/Interfaces/categoryInterfaces";
import { getAllCategories } from "@/lib/allApiRequest/categoryRequest/categoryRequest";
import CategoryCarousel from "./CategoryCarousel";
import HomeSecHeading from "../HomeSecHeading";

const CategorySection = async () => {
  const res = await getAllCategories({ currentPage: 1, limit: 1000 });
  const categories = res?.data as CategoryType[];

  if (!categories || categories.length === 0) {
    return (
      <section className="py-12 bg-gray-100">
        <div className="max-w-screen-xl mx-auto px-4 text-center">
          <h2 className="text-2xl font-bold text-red-600">No Categories Found</h2>
          <p className="mt-2 text-gray-500">Please check back later for available blood donation categories.</p>
        </div>
      </section>
    );
  }

  return (
    <section className="py-12  scroll-mt-20" id="categories">
      <div className="max-w mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
        <HomeSecHeading>
              Explore Our Categories
        </HomeSecHeading>
       

        <CategoryCarousel categories={categories} />
      </div>
    </section>
  );
};

export default CategorySection;
