import React, { useState } from 'react';
import { PiShoppingCartThin } from "react-icons/pi";
import Drawer from './Drawer'; // তুমি যেটা কাস্টম Drawer বানিয়েছো

const NavCart = () => {
  const [isOpen, setIsOpen] = useState(false);

  const onClose = () => {
    setIsOpen(false);
  };

  const onOpen = () => {
    setIsOpen(true);
  };

  return (
    <div className="relative">
      {/* Cart Button */}
      <button
        onClick={onOpen}
        className="text-black text-3xl font-light relative"
      >
        <PiShoppingCartThin />
        <span className="h-5 w-5 bg-brandPrimary rounded-full absolute -top-1 -right-1 text-[10px] text-white flex items-center justify-center font-semibold shadow">
          99+
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
