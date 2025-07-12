import React, { useState } from "react";
import Drawer from "./Drawer"; // তুমি যেটা কাস্টম Drawer বানিয়েছো
import { BsBookmarkHeart } from "react-icons/bs";
import { useWishlist } from "@/hooks/useWishlist";

const NavWihList = () => {
  const [isOpen, setIsOpen] = useState(false);


  const {wishlistIds}= useWishlist()
  console.log(wishlistIds,"redux")

const wishCount = () => {
  const count = wishlistIds?.length || 0;
  return count > 98 ? "99+" : `${count}`;
};


  return (
    <div className="relative flex items-center ">
      {/* Cart Button */}
      <button
        onClick={() => setIsOpen(true)}
        className="text-gray-700 md:text-3xl text-xl font-light relative hover:scale-90 "
        title="Wishlist"
      >
        <BsBookmarkHeart />

        <span className="md:h-5 md:w-5 h-4 w-4 p-1 bg-brandPrimary rounded-full absolute -top-2 -right-2 md:text-[9px] text-[8px] text-white flex items-center justify-center font-semibold shadow">
         {wishCount()}
        </span>
      </button>

      {/* Drawer */}
      <Drawer
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        direction="right"
        width="w-[50%]"
      >
        <div className="p-4">
          <h3 className="text-lg font-semibold mb-2">Your wishlist</h3>
          <p className="text-sm text-gray-500">Cart content will go here.</p>
        </div>
      </Drawer>
    </div>
  );
};

export default NavWihList;
