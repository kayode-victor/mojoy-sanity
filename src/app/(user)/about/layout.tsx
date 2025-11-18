import type { Metadata } from "next";
import Head from "next/head";
import Navbar from "@/components/Navbar";
import "slick-carousel/slick/slick.css";
import Footer from "@/components/Footer";
// import NavBanner from "@/components/NavBanner";
import Layout from "@/components/Layout";
import WhatsAppButton from "@/components/WhatsAppButton";

export const metadata = {
  title:
    "About Mojoy Tech Hub - Leading IT Retailer and Wholesaler Since 2001.",
  description:
    "Mojoy Tech Hub: Nigeria's trusted IT retailer. Premium laptops, computers & tech accessories at competitive prices. Fast Delivery. One-Year Warranty. Shop Now.",
  favicon: "./favicon.ico",
  robots: "index, follow",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <html lang="en">
        <Head>
          <title>{metadata.title}</title>
          <meta name="description" content={metadata.description || ""} />
          <meta name="robots" content={metadata.robots} />
          <link rel="icon" href={metadata.favicon} />
          <meta name="viewport" content="width=device-width, initial-scale=1" />
          <meta property="og:title" content={metadata.title} />
          <meta
            property="og:description"
            content={metadata.description || ""}
          />
          <meta property="og:type" content="website" />
          <meta property="og:image" content="/og-image.png" />
          <meta property="og:url" content="https://mojoy.com/" />
          <meta name="twitter:card" content="summary_large_image" />
          <meta name="twitter:title" content={metadata.title} />
          <meta
            name="twitter:description"
            content={metadata.description || ""}
          />
          <meta name="twitter:image" content="/og-image.png" />
        </Head>
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
    </>
  );
}
