import React from 'react';
import SortFilter from './SortFiltering';
import CategoryFilter from './CategoryFilter';

const HomePageProductFilter = () => {
    return (
         <div className="flex flex-col  md:flex-row md:w-fit w-full  absolute top-26 left-5">
        {/* sort  */}
        <SortFilter />
        {/* Category */}
        <CategoryFilter></CategoryFilter>
      </div>
    );
};

export default HomePageProductFilter;