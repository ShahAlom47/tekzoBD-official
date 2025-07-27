import Banner from "@/components/Banner";
import React from "react";
import ShopPage from "./(public)/shop/page";
import CategorySection from "@/components/HomeComponents/HomeCategorySection";
import TopRatedProducts from "@/components/HomeComponents/TopRatedProducts";
import ActiveOfferProducts from "@/components/HomeComponents/ActiveOfferProducts";
import { getHomeData } from "@/lib/allApiRequest/homeDataRequest/homeDataRequest";


const Home = async() => {
  const homeData= await getHomeData()
  console.log(homeData)


  //  after  order complete   data  update bugs  thik koraa lagbe   

  return (
    <div className=" min-h-screen ">
      <Banner></Banner>
      <ShopPage searchParams={Promise.resolve({})} isHomePage={true}></ShopPage>
      <CategorySection></CategorySection>
      <TopRatedProducts products={[]}></TopRatedProducts>
      {/* <AboutUsSection></AboutUsSection> */}
      <ActiveOfferProducts products={[]}></ActiveOfferProducts>

    </div>
  );
};

export default Home;
