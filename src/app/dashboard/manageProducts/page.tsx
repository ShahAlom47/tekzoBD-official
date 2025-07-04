import DashPageTitle from '@/components/DashPageTitle';
import PrimaryButton from '@/components/PrimaryButton';
import React from 'react';
import { FaPlus } from 'react-icons/fa';

const ManageProducts = () => {
    return (
        <div>
          <div className='flex justify-between'>
              <DashPageTitle >Manage Products</DashPageTitle>
              <PrimaryButton href={"/dashboard/manageProducts/addProducts"} className=' rounded-sm text-sm h-8'><FaPlus></FaPlus> Add Products</PrimaryButton>
          </div>
            ManageProducts
        </div>
    );
};

export default ManageProducts;