"use client";
import { motion } from "framer-motion";
import SafeImage from "./SafeImage";
import image from "@/assets/image/banner.png"
import HomeSecHeading from "./HomeSecHeading";

const aboutUsContent = {
  title: "About Us",
  text: "আমরা একটি প্রযুক্তি নির্ভর ই-কমার্স প্রতিষ্ঠান, যেখানে আপনি সর্বশেষ প্রযুক্তি পণ্য খুঁজে পাবেন সহজেই এবং নিশ্চিন্তে। আমাদের লক্ষ্য হচ্ছে উন্নতমানের প্রোডাক্ট ইউজারদের কাছে পৌঁছে দেওয়া এবং সর্বোচ্চ গ্রাহক সাপোর্ট নিশ্চিত করা।",
  image: image, 
};

const AboutUsSection = () => {
  return (
    <section className="bg-white py-16 px-4 sm:px-8 md:px-16" id="about">
      <div className="max-w-7xl mx-auto">
      
          <HomeSecHeading animation={true}>   {aboutUsContent.title}</HomeSecHeading>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
          >
            <SafeImage
              src={aboutUsContent.image}
              alt="About us"
              className="w-full h-auto rounded-2xl shadow-md border border-blue-200"
            ></SafeImage>
          </motion.div>

          <motion.div
            className="text-gray-700 text-lg leading-relaxed"
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
          >
            <p>{aboutUsContent.text}</p>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default AboutUsSection;
