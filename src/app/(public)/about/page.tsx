"use client";
import PageHeading from "@/components/PageHeading";
import { useGAnalytics } from "@/hooks/useGAnalytics";
import React from "react";

const About = () => {
  const { event } = useGAnalytics();

  const handleGoogle = async () => {
   event({
      action: "click",
      category: "button",
      label: "about_page_button3",
      value: 1,
    });


  };
  return (
    <div className=" max-w">
      <PageHeading title="About Me"></PageHeading>
      <div className="primary-hover p-6 rounded-lg shadow-md">
        <h2 className="text-2xl font-semibold mb-2 text-grayLight">
          MD. Shah Alom
        </h2>

        <button className=" my-9 btn-base" onClick={() => handleGoogle()}>
          Clik Gogle
        </button>
        <p className="text-grayDeep mb-4">
          I`m a passionate Front-End Developer based in Fujairah, UAE,
          originally from Moulvibazar, Sylhet, Bangladesh. I specialize in
          building user-friendly, responsive web applications using modern
          technologies like HTML, CSS, Tailwind, React.js, Firebase, and
          MongoDB.
        </p>
        <p className="text-grayDeep mb-4">
          I`m currently focused on strengthening my full-stack development
          skills and ultimately aim to become a software engineer. I love
          building meaningful projects, continuously learning new tools, and
          collaborating with other passionate developers.
        </p>
      </div>

      {/* Skills Card */}
      <div className="mt-8 bg-blackMid p-6 rounded-lg shadow-md border border-gray-700">
        <h2 className="text-xl font-semibold mb-2 text-grayLight">
          Technical Skills
        </h2>
        <p className="text-grayDeep">
          HTML, CSS, JavaScript, TypeScript, Tailwind CSS, React.js, Next.js,
          Node.js, Express.js, MongoDB, Firebase
        </p>
      </div>

      {/* Career Goal Card */}
      <div className="mt-8 bg-blackMid p-6 rounded-lg shadow-md border border-gray-700">
        <h2 className="text-xl font-semibold mb-2 text-grayLight">
          Career Goals
        </h2>
        <p className="text-grayDeep">
          My goal is to grow into a well-rounded full-stack developer and
          contribute to impactful projects as a software engineer. I’m always
          exploring new technologies and frameworks to stay current and improve
          the quality of my work.
        </p>
      </div>
    </div>
  );
};

export default About;
