import Banner from "@/components/Banner";
import React from "react";
import ShopPage from "./(public)/shop/page";
import AboutUsSection from "@/components/AboutUsSection";

const Home = () => {
  return (
    <div className=" min-h-screen ">
      <Banner></Banner>
      <ShopPage searchParams={Promise.resolve({})} isHomePage={true}></ShopPage>
      <AboutUsSection></AboutUsSection>
    </div>
  );
};

export default Home;
