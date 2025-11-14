import type { Metadata } from "next";
import "../../styles/globals.css";
// ...existing code...
// remove: import Head from "next/head";
import Navbar from "@/components/Navbar";
import "slick-carousel/slick/slick.css";
import Footer from "../../components/Footer";
import Layout from "@/components/Layout";
import WhatsAppButton from "@/components/WhatsAppButton";

export const metadata: Metadata = {
  title: "Mojoy Tech Hub: New HP Dell Lenovo Asus Laptops Nigeria",
  description:
    "Shop new laptop computers, monitors, inverters and other tech accessories. Best place to buy laptops in Nigeria. Best laptop prices in Lagos. Fast delivery.",
  icons: { icon: "/favicon.ico" },
  robots: "index, follow",
  openGraph: {
    title: "Mojoy Tech Hub: New HP Dell Lenovo Asus Laptops Nigeria",
    description:
      "Shop new laptop computers, monitors, inverters and other tech accessories. Best place to buy laptops in Nigeria. Best laptop prices in Lagos. Fast delivery.",
    url: "https://mojoy.com/",
    siteName: "Mojoy Tech Hub",
    images: ["/og-image.png"],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Mojoy Tech Hub",
    description:
      "Shop new laptop computers, monitors, inverters and other tech accessories.",
    images: ["/og-image.png"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="font-poppins bg-white text-gray-900 antialiased">
        <Layout>
          {/* <NavBanner /> */}
          <Navbar />
          {children}
          <Footer />
          <WhatsAppButton />
        </Layout>
      </body>
    </html>
  );
}
//export default RootLayout;
