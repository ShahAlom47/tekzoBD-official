import Banner from "@/components/Banner";
import React from "react";
import ShopPage from "./(public)/shop/page";

const Home = () => {
  return (
    <div className=" min-h-screen ">
      <Banner></Banner>
      <ShopPage searchParams={Promise.resolve({})} isHomePage={true}></ShopPage>
     <div className="  min-h-screen flex justify-center items-center">HOME</div>
     
    </div>
  );
};

export default Home;
