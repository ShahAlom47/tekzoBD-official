"use client";

import { useState } from "react";
import { IoLogoWhatsapp } from "react-icons/io5";

const SmartChatWidget: React.FC = () => {
  const [open, setOpen] = useState(false);

  const toggleChat = () => {
    setOpen(!open);
  };

  const whatsappUrl = process.env.NEXT_PUBLIC_WHATSAPP; // ⬅️ replace with your number

  return (
    <>
      {/* Chat Box */}
      {open && (
        <div className="fixed bottom-40 right-5 w-72 bg-gray-100 shadow-lg rounded-xl p-4 z-50 animate-fadeIn">
          <h4 className="text-lg font-semibold mb-2 text-gray-800">
            👋 How can I help you?
          </h4>
          <p className="text-sm text-gray-600 mb-4">
            Feel free to ask anything or start a WhatsApp chat with me.
          </p>
          <a
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="bg-green-600 cursor-pointer text-white px-4 py-2 rounded-md flex items-center justify-center gap-2 hover:bg-green-600 transition"
          >
            <IoLogoWhatsapp /> Chat on WhatsApp
          </a>
        </div>
      )}

      {/* Floating Button */}
      <button
        onClick={toggleChat}
        aria-label="Open chat"
        className="fixed bottom-24 right-5 bg-green-500 text-white w-14 h-14 rounded-full shadow-xl flex items-center justify-center hover:bg-green-700 transition z-50"
      >
      <IoLogoWhatsapp  className=" text-4xl" />
      </button>
    </>
  );
};

export default SmartChatWidget;
