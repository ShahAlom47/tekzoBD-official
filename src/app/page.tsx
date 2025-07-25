import Banner from "@/components/Banner";
import React from "react";
import Error from "./error";

const Home = () => {
  return (
    <div className=" min-h-screen ">
      <Banner></Banner>
<Error></Error>
     <div className="  min-h-screen flex justify-center items-center">HOME</div>
     
    </div>
  );
};

export default Home;
