import React from "react";
import PageHeading from "@/components/PageHeading";
import ContactInfo from "@/components/AboutUsComponents/ContactInfo";
import SafeImage from "@/components/SafeImage";

const ContactUs = () => {
  return (
    <div className="p-4 py-8 max-w-7xl mx-auto">
      {/* Heading */}
      <PageHeading />

      {/* Content Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-10">
        {/* Left Side */}
        <div className="space-y-6">
          {/* Map */}
          <div className="w-full h-64 rounded-xl overflow-hidden shadow-md">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3651.902166322506!2d90.39104987508402!3d23.750885388740327!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3755b89423f529cf%3A0xb5d87f889d98e4a2!2sDhaka!5e0!3m2!1sen!2sbd!4v1690000000000!5m2!1sen!2sbd"
              className="w-full h-full border-0"
              loading="lazy"
            ></iframe>
          </div>

          {/* Image */}
          <div className="rounded-xl overflow-hidden shadow-md">
            <SafeImage
              key="contact-us-image"
              src="https://via.placeholder.com/600x300?text=Contact+Us+Image"
              alt="Contact illustration"
              width={600}
              height={300}
              className="w-full h-auto object-cover"
            ></SafeImage>
          </div>
        </div>

        {/* Right Side - Contact Form */}
        <div className="bg-white rounded-xl shadow-lg p-6">
          <h3 className="text-2xl font-semibold mb-4">Send us a message</h3>
          <form className="space-y-4">
            <input
              type="text"
              placeholder="Your Name"
              className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500"
            />
            <input
              type="email"
              placeholder="Your Email"
              className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500"
            />
            <textarea
              placeholder="Your Message"
              rows={5}
              className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500"
            ></textarea>
            <button
              type="submit"
              className="w-full bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition"
            >
              Send Message
            </button>
          </form>

          {/* Other Contact Info */}
       <ContactInfo></ContactInfo>
        </div>
      </div>
    </div>
  );
};

export default ContactUs;
