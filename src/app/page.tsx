import Banner from "@/components/Banner";
import React from "react";
import ShopPage from "./(public)/shop/page";
import AboutUsSection from "@/components/HomeComponents/AboutUsSection";
import CategorySection from "@/components/HomeComponents/HomeCategorySection";


const Home = () => {

  return (
    <div className=" min-h-screen ">
      <Banner></Banner>
      <ShopPage searchParams={Promise.resolve({})} isHomePage={true}></ShopPage>
      <AboutUsSection></AboutUsSection>
      <CategorySection></CategorySection>
    </div>
  );
};

export default Home;
