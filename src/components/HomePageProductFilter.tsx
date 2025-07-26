import React from 'react';
import SortFilter from './SortFiltering';
import CategoryFilter from './CategoryFilter';

const HomePageProductFilter = () => {
    return (
         <div className="flex gap-2 flex-col  md:flex-row  -mb-16">
        {/* sort  */}
        <SortFilter />
        {/* Category */}
        <CategoryFilter></CategoryFilter>
      </div>
    );
};

export default HomePageProductFilter;