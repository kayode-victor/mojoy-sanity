// ...existing code...
import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import "slick-carousel/slick/slick.css";
// import NavBanner from "@/components/NavBanner";
import Layout from "@/components/Layout";
import Footer from "@/components/Footer";
import WhatsAppButton from "@/components/WhatsAppButton";

export const metadata: Metadata = {
  metadataBase: new URL("https://mojoy.com/about"),
  title:
    "About Mojoy Tech Hub - Leading IT Retailer and Wholesaler Since 2001.",
  description:
    "Mojoy Tech Hub: Nigeria's trusted IT retailer. Premium laptops, computers & tech accessories at competitive prices. Fast Delivery. One-Year Warranty. Shop Now.",
  icons: { icon: "/favicon.ico" },
  robots: "index, follow",
  openGraph: {
    title:
      "About Mojoy Tech Hub - Leading IT Retailer and Wholesaler Since 2001.",
    description:
      "Mojoy Tech Hub: Nigeria's trusted IT retailer. Premium laptops, computers & tech accessories at competitive prices. Fast Delivery. One-Year Warranty. Shop Now.",
    images: ["/og-image.png"],
    url: "https://mojoy.com/about",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title:
      "About Mojoy Tech Hub - Leading IT Retailer and Wholesaler Since 2001.",
    description:
      "Mojoy Tech Hub: Nigeria's trusted IT retailer. Premium laptops, computers & tech accessories at competitive prices. Fast Delivery. One-Year Warranty. Shop Now.",
    images: ["/og-image.png"],
  },
};

export default function AboutLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <>{children}</>;
}
