import React, { useState } from 'react';
import { PiShoppingCartThin } from "react-icons/pi";
import Drawer from './Drawer'; // তুমি যেটা কাস্টম Drawer বানিয়েছো
import { useCart } from '@/hooks/useCart';

const NavCart = () => {
  const [isOpen, setIsOpen] = useState(false);
   const { itemCount } = useCart();
  const cartCount = (): string =>
  !itemCount || itemCount <= 0 ? "0" : itemCount > 99 ? "+99" : itemCount.toString();

  const onClose = () => {
    setIsOpen(false);
  };

  const onOpen = () => {
    setIsOpen(true);
  };

  return (
    <div className="relative flex items-center ">
      {/* Cart Button */}
      <button
        onClick={onOpen}
        title="Your Cart"
        className="text-black md:text-3xl text-2xl font-light relative hover:scale-90 "
      >
        <PiShoppingCartThin />
        <span className="md:h-5 md:w-5 h-4 w-4 p-1 bg-brandPrimary rounded-full absolute -top-2 -right-2 md:text-[9px] text-[8px] text-white flex items-center justify-center font-semibold shadow">
        {cartCount()}
        </span>
      </button>

      {/* Drawer */}
      <Drawer isOpen={isOpen} onClose={onClose} direction="right" width='w-[50%]'>
        <div className="p-4">
          <h3 className="text-lg font-semibold mb-2">Your Cart</h3>
          <p className="text-sm text-gray-500">Cart content will go here.</p>
        </div>
      </Drawer>
    </div>
  );
};

export default NavCart;
