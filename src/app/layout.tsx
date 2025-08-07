import type { Metadata } from "next";
import "./globals.css";
import "../style/animatedBorder.css";
import Navbar from "@/components/Navbar";
import Providers from "@/Providers/RootProvider/Providers";
import Footer from "@/components/Footer";
import ConditionalWrapper from "@/components/wrappers/ConditionalWrapper";
import MainWrapper from "@/components/wrappers/MainWrapper"; // 👈 import here
import ScrollTopButton from "@/components/ScrollTopButton";
import SmartChatWidget from "@/components/SmartChatWidget";

export const metadata: Metadata = {
  title: "TeckzoBD",
  description: "Shah Alom's official website",
   icons: {
    icon: "/fIcon.png",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="dar">
      <body className="min-h-screen bg-white relative">
        <Providers>
          <ConditionalWrapper hideOn={["dashboard"]}>
            <Navbar />
          </ConditionalWrapper>
          <MainWrapper>
            {children}
            <ScrollTopButton />
            <SmartChatWidget />
            
          </MainWrapper>
          <ConditionalWrapper hideOn={["dashboard", "login"]}>
            <Footer />
          </ConditionalWrapper>
        </Providers>
      </body>
    </html>
  );
}
