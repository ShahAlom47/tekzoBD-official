"use client";

import { useKeenSlider } from "keen-slider/react";
import "keen-slider/keen-slider.min.css";
import HomeCategoryCard from "./HomeCategoryCard";
import { CategoryType } from "@/Interfaces/categoryInterfaces";

type Props = {
  categories: CategoryType[];
};

const CategoryCarousel = ({ categories }: Props) => {
  const [sliderRef] = useKeenSlider({
    loop: true,
    slides: {
      perView: 1.5,
      spacing: 15,
    },
    breakpoints: {
      "(min-width: 640px)": {
        slides: { perView: 2.5, spacing: 20 },
      },
      "(min-width: 1024px)": {
        slides: { perView: 4, spacing: 24 },
      },
    },
    dragSpeed: 1.2,
    rubberband: true,
  });

  return (
    <div ref={sliderRef} className="keen-slider">
      {categories.map((category) => (
        <div key={category._id.toString()} className="keen-slider__slide">
          <HomeCategoryCard category={category} />
        </div>
      ))}
    </div>
  );
};

export default CategoryCarousel;
