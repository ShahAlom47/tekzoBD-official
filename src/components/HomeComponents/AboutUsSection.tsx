"use client";

import { motion, Variants } from "framer-motion";
import { useEffect, useState } from "react";
import { FaCogs, FaSmile, FaRocket } from "react-icons/fa";

import image1 from "@/assets/aboutImg/about-1.png";
import image2 from "@/assets/aboutImg/about-2.jpg";
import image3 from "@/assets/aboutImg/about-3.png";
import image4 from "@/assets/aboutImg/about-4.jpg";
import HomeSecHeading from "../HomeSecHeading";
import SafeImage from "../SafeImage";

const aboutUsContent = {
  title: "About Us",
  text: "We are a tech-driven eCommerce company dedicated to bringing the latest and most reliable tech products directly to you. Our mission is to ensure the highest product quality, fast delivery, and outstanding customer support.",
  images: [image1, image2, image3, image4],
  highlights: [
    {
      icon: <FaCogs />,
      title: "Tech-Focused",
      desc: "We specialize in the latest technology solutions.",
    },
    {
      icon: <FaRocket />,
      title: "Fast & Reliable",
      desc: "Quick delivery and smooth service guaranteed.",
    },
    {
      icon: <FaSmile />,
      title: "Customer First",
      desc: "Your satisfaction is our top priority.",
    },
  ],
};

// Variants for description text
const descriptionVariants: Variants = {
  hidden: { opacity: 0, y: 30 },
  show: { opacity: 1, y: 0, transition: { duration: 0.7, ease: "easeOut" } },
};

// Variants for cards container (stagger children)
const cardsContainerVariants: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.25, delayChildren: 0.5 } },
};

// Variants for each card with scale
const cardVariants: Variants = {
  hidden: { opacity: 0, y: 30, scale: 0.8 },
  show: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.6, ease: "easeOut" },
  },
};

const AboutUsSection = () => {
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [isClient,setClient]= useState<boolean>(false)

  useEffect(()=>{
setClient(true)
  },[])

 

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % aboutUsContent.images.length);
    }, 3500);
    return () => clearInterval(interval);
  }, []);

   if(!isClient) return null

  return (
    <section
      className=" py-20 px-4 sm:px-8 md:px-16 bg-slate-100"
      id="about"
    >
      <div className="max-w mx-auto">
        <HomeSecHeading animation>{aboutUsContent.title}</HomeSecHeading>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center mt-10 bg-white p-6 rounded-lg">
          {/* Image Slideshow */}
          <motion.div
            className="relative w-full h-[280px] sm:h-[330px] md:h-[400px] rounded-3xl overflow-hidden"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6 }}
          >
            <motion.div
              key={currentIndex}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8 }}
              className="absolute w-full h-full"
            >
              <SafeImage
                src={aboutUsContent.images[currentIndex]}
                alt="About us product"
                className="w-full h-full object-contain rounded-3xl bg-white p-2 opacity-80"
              />
            </motion.div>
          </motion.div>

          {/* Text and Highlights */}
          <div className="space-y-6">
            {/* Description text with separate animation */}
            <motion.p
              className="text-base md:text-lg font-light font-serif text-gray-700 leading-relaxed"
              variants={descriptionVariants}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true }}
            >
              {aboutUsContent.text}
            </motion.p>

            {/* Cards container with stagger animation */}
            <motion.div
              className="grid grid-cols-1 md:grid-cols-1  gap-6"
              variants={cardsContainerVariants}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true }}
            >
              {aboutUsContent.highlights.map((item, i) => (
                <motion.div
                  key={i}
                  className="flex items-start gap-4 bg-white/60 backdrop-blur-sm border border-blue-100 rounded-xl p-4 shadow hover:shadow-md transition"
                  variants={cardVariants}
                >
                  <div className="text-blue-600 text-2xl">{item.icon}</div>
                  <div>
                    <h4 className="text-lg font-semibold text-blue-800">{item.title}</h4>
                    <p className="text-sm text-gray-600">{item.desc}</p>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutUsSection;
