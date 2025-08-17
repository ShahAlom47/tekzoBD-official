import React from "react";

import ContactInfo from "@/components/AboutUsComponents/ContactInfo";
import CustomerTrust from "@/components/AboutUsComponents/CustomerTrust";
import Story from "@/components/AboutUsComponents/Story";
import VisionMission from "@/components/AboutUsComponents/VisionMission";
import WhatWeOffer from "@/components/AboutUsComponents/WhatWeOffer";
import WhyChooseUs from "@/components/AboutUsComponents/WhyChooseUs";
import AboutUsSection from "@/components/HomeComponents/AboutUsSection";
import Newsletter from "@/components/HomeComponents/NewsLetter";


const About = () => {
  return (
    <div className="">
      <AboutUsSection></AboutUsSection>
      <VisionMission />
      <Story />
      <WhatWeOffer />
      <WhyChooseUs />
      <CustomerTrust />
      <Newsletter></Newsletter>
       <ContactInfo />
    </div>
  );
};

export default About;
