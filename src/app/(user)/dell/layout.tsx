import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import "slick-carousel/slick/slick.css";
import Footer from "@/components/Footer";
// import NavBanner from "@/components/NavBanner";
import Layout from "@/components/Layout";
import WhatsAppButton from "@/components/WhatsAppButton";

export const metadata: Metadata = {
  metadataBase: new URL("https://mojoy.com/dell"),
  title: "Dell Laptops Nigeria - Inspiron, Latitude, XPS | Mojoy",
  description:
    "Buy authentic Dell laptops in Lagos: Inspiron for everyday use, Latitude for business, XPS premium, G-Series gaming. Original Dell Nigeria. Shop now",
  icons: { icon: "/favicon.ico" },
  robots: "index, follow",
  openGraph: {
    title: "Dell Laptops Nigeria - Inspiron, Latitude, XPS | Mojoy",
    description:
      "Buy authentic Dell laptops in Lagos: Inspiron for everyday use, Latitude for business, XPS premium, G-Series gaming. Original Dell Nigeria. Shop now",
    images: ["/og-image.png"],
    url: "https://mojoy.com/dell",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Dell Laptops Nigeria - Inspiron, Latitude, XPS | Mojoy",
    description:
      "Buy authentic Dell laptops in Lagos: Inspiron for everyday use, Latitude for business, XPS premium, G-Series gaming. Original Dell Nigeria. Shop now",
    images: ["/og-image.png"],
  },
};
// ...existing code...
export default function DellLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <>{children}</>;
}
