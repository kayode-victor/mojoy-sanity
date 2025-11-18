import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import "slick-carousel/slick/slick.css";
// import NavBanner from "@/components/NavBanner";
import Layout from "@/components/Layout";
import Footer from "@/components/Footer";
import WhatsAppButton from "@/components/WhatsAppButton";

export const metadata: Metadata = {
  metadataBase: new URL("https://mojoy.com/asus"),
  title: "Asus Laptops Nigeria - VivoBook, TUF Gaming, ZenBook | Mojoy",
  description:
    "Buy original Asus laptops in Lagos: VivoBook slim, TUF gaming, ZenBook premium, ROG gaming. Authentic Asus products Nigeria. Order today.",
  icons: { icon: "/favicon.ico" },
  robots: "index, follow",
  openGraph: {
    title: "Asus Laptops Nigeria - VivoBook, TUF Gaming, ZenBook | Mojoy",
    description:
      "Buy original Asus laptops in Lagos: VivoBook slim, TUF gaming, ZenBook premium, ROG gaming. Authentic Asus products Nigeria. Order today.",
    images: ["/og-image.png"],
    url: "https://mojoy.com/asus",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Asus Laptops Nigeria - VivoBook, TUF Gaming, ZenBook | Mojoy",
    description:
      "Buy original Asus laptops in Lagos: VivoBook slim, TUF gaming, ZenBook premium, ROG gaming. Authentic Asus products Nigeria. Order today.",
    images: ["/og-image.png"],
  },
};

export default function AsusLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <>{children}</>;
}
