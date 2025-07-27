import { CategoryType } from "@/Interfaces/categoryInterfaces";
import SafeImage from "../SafeImage";

// app/components/CategoryCard.tsx
type Props = {
  category: CategoryType;
  key?:string;
};

const CategoryCard = ({ category,key }: Props) => {
  return (
    <div key={key} className="border border-brandPrimary rounded-lg shadow-md hover:shadow-lg transition-all duration-300 p-4 text-center">
      <SafeImage
        src={category?.icon}
        alt={category.name}
        className="w-full h-24 md:h-32 object-cover rounded-md mb-3"
      ></SafeImage>
      <h3 className=" text-sm md:text-lg font-semibold text-gray-800">{category.name}</h3>
    </div>
  );
};

export default CategoryCard;
