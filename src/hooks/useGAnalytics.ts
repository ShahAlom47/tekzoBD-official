
"use client";

interface EventParams {
  action: "checkout"| "add_to_cart";
  category: string;
  label?: string;
  value?: number;
}

export function useGAnalytics() {
  // custom event পাঠানোর ফাংশন
  const event = ({ action, category, label, value }: EventParams) => {
    if (typeof window.gtag !== "function") {
      console.warn("GA not initialized");
      return;
    }
    window.gtag("event", action, {
      event_category: category,
      event_label: label,
      value,
    });
  };

  return { event };
}




// // use  
// import { useGAnalytics } from "@/lib/googleAnalytics/useGAnalytics";

// function MyButton() {
//   const { event } = useGAnalytics();

//   const handleClick = () => {
//     event({
//       action: "click",
//       category: "button",
//       label: "signup_button",
//       value: 1,
//     });
//   };

//   return <button onClick={handleClick}>Sign Up</button>;
// }