"use client";

import { useEffect, useState } from "react";
import { FiArrowUp } from "react-icons/fi";

const ScrollTopButton: React.FC = () => {
  const [visible, setVisible] = useState<boolean>(false);
  const [scrollPercent, setScrollPercent] = useState<number>(0);

  useEffect(() => {
    const handleScroll = (): void => {
      const scrollTop = window.scrollY || document.documentElement.scrollTop;
      const windowHeight = window.innerHeight;
      const docHeight = document.documentElement.scrollHeight;

      const totalScroll = (scrollTop / (docHeight - windowHeight)) * 100;
      setScrollPercent(totalScroll);

      setVisible(scrollTop > 3);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToTop = (): void => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  if (!visible) return null;

  const radius = 24;
  const stroke = 4;
  const normalizedRadius = radius - stroke * 0.5;
  const circumference = 2 * Math.PI * normalizedRadius;
  const strokeDashoffset =
    circumference - (scrollPercent / 100) * circumference;

  return (
    <button
      onClick={scrollToTop}
      aria-label="Scroll to top"
      className="fixed bottom-5 right-5 w-14 h-14 rounded-full flex items-center justify-center bg-brandPrimary shadow-lg z-50 animate-bounce delay-700"
    >
      {/* SVG circular progress ring */}
      <svg
        className="absolute -rotate-45"
        height={radius * 2}
        width={radius * 2}
      >
        <circle
          stroke="#3b82f6" // Tailwind's gray-200
          fill="transparent"
          strokeWidth={stroke}
          r={normalizedRadius}
          cx={radius}
          cy={radius}
        />
        <circle
          stroke="#ffff" // Tailwind's blue-500
          fill="transparent"
          strokeWidth={stroke}
          strokeLinecap="round"
          strokeDasharray={circumference}
          strokeDashoffset={strokeDashoffset}
          r={normalizedRadius}
          cx={radius}
          cy={radius}
        />
      </svg>

      {/* Icon */}
      <FiArrowUp className="text-white text-xl z-10" />
    </button>
  );
};

export default ScrollTopButton;
