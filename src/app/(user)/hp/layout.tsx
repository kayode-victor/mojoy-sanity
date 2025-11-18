import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import "slick-carousel/slick/slick.css";
// import NavBanner from "@/components/NavBanner";
import Layout from "@/components/Layout";
import Footer from "@/components/Footer";
import WhatsAppButton from "@/components/WhatsAppButton";

export const metadata: Metadata = {
  metadataBase: new URL("https://mojoy.com/hp"),
  title: "HP Laptops Nigeria - ProBook, Pavilion, EliteBook | Mojoy",
  description:
    "Buy new, original HP laptops in Lagos: ProBook for business, Pavilion for students, EliteBook premium, Omen gaming. Best HP prices Nigeria. Fast delivery.",
  icons: { icon: "/favicon.ico" },
  robots: "index, follow",
  openGraph: {
    title: "HP Laptops Nigeria - ProBook, Pavilion, EliteBook | Mojoy",
    description:
      "Buy new, original HP laptops in Lagos: ProBook for business, Pavilion for students, EliteBook premium, Omen gaming. Best HP prices Nigeria. Fast delivery.",
    images: ["/og-image.png"],
    url: "https://mojoy.com/hp",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "HP Laptops Nigeria - ProBook, Pavilion, EliteBook | Mojoy",
    description:
      "Buy new, original HP laptops in Lagos: ProBook for business, Pavilion for students, EliteBook premium, Omen gaming. Best HP prices Nigeria. Fast delivery.",
    images: ["/og-image.png"],
  },
};

export default function HpLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <>{children}</>;
}
