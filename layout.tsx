import type { Metadata } from "next";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Providers from "@/Providers/RootProvider/Providers";
import Footer from "@/components/Footer";
import ConditionalWrapper from "@/components/wrappers/ConditionalWrapper";
import MainWrapper from "@/components/wrappers/MainWrapper"; // 👈 import here

export const metadata: Metadata = {
  title: "TekzoBD",
  description: "An online marketplace for buying and selling electronics and gadgets in Bangladesh.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="bg-white">
      <body className="min-h-screen bg-white">
        <Providers>
          <ConditionalWrapper hideOn={["dashboard"]}>
            <Navbar />
          </ConditionalWrapper>
          <MainWrapper>{children}</MainWrapper>{" "}
          <ConditionalWrapper hideOn={["dashboard", "login"]}>
            <Footer />
          </ConditionalWrapper>
        </Providers>
      </body>
    </html>
  );
}
