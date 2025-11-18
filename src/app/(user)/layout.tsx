import type { Metadata } from "next";
import "../../styles/globals.css";
import Navbar from "@/components/Navbar";
import "slick-carousel/slick/slick.css";
import Footer from "../../components/Footer";
// import NavBanner from "@/components/NavBanner";
import Layout from "@/components/Layout";
import WhatsAppButton from "@/components/WhatsAppButton";

export const metadata: Metadata = {
  metadataBase: new URL("https://mojoy.com/"),
  title: "Mojoy Tech Hub: New HP Dell Lenovo Asus Laptops Nigeria",
  description:
    "Buy HP, Dell, Lenovo, Asus laptops and tech products in Nigeria with fast delivery and secure payments.",
  icons: { icon: "/favicon.ico" },
  robots: "index, follow",
  openGraph: {
    title: "Mojoy Tech Hub: New HP Dell Lenovo Asus Laptops Nigeria",
    description:
      "Buy HP, Dell, Lenovo, Asus laptops and tech products in Nigeria with fast delivery and secure payments.",
    images: ["/og-image.png"],
    url: "https://mojoy.com/",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Mojoy Tech Hub: New HP Dell Lenovo Asus Laptops Nigeria",
    description:
      "Buy HP, Dell, Lenovo, Asus laptops and tech products in Nigeria with fast delivery and secure payments.",
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
          <Navbar />
          {children}
          <Footer />
          <WhatsAppButton />
        </Layout>
      </body>
    </html>
  );
}
