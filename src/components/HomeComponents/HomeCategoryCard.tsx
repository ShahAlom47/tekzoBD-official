"use client";

import { CategoryType } from "@/Interfaces/categoryInterfaces";
import SafeImage from "../SafeImage";
import { useRouter } from "next/navigation";

type Props = {
  category: CategoryType;
  key?: string;
};

const CategoryCard = ({ category, key }: Props) => {
  const router = useRouter();

  const handleClick = () => {
    router.push(`/shop?category=${category.slug}`);
  };

  return (
    <div
      key={key}
      onClick={handleClick}
      className="cursor-pointer border border-brandPrimary hover:scale-95 shadow-lg shadow-blue-800 rounded-lg transition-all duration-300 p-4 text-center"
      role="button"
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          handleClick();
        }
      }}
    >
      <SafeImage
        src={category?.icon}
        alt={category.name}
        className="w-full h-24 md:h-32 object-cover rounded-md mb-3"
      />
      <h3 className="text-sm md:text-lg font-semibold text-gray-800">{category.name}</h3>
    </div>
  );
};

export default CategoryCard;
