import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import "slick-carousel/slick/slick.css";
import Footer from "@/components/Footer";
// import NavBanner from "@/components/NavBanner";
import Layout from "@/components/Layout";
import WhatsAppButton from "@/components/WhatsAppButton";

export const metadata: Metadata = {
  metadataBase: new URL("https://mojoy.com/lenovo"),
  title: "Lenovo Laptops Nigeria - IdeaPad, ThinkPad, Legion | Mojoy",
  description:
    "Shop genuine Lenovo laptops Lagos: IdeaPad for students, ThinkPad for professionals, Legion gaming. Best Lenovo prices Nigeria. Fast delivery.",
  icons: { icon: "/favicon.ico" },
  robots: "index, follow",
  openGraph: {
    title: "Lenovo Laptops Nigeria - IdeaPad, ThinkPad, Legion | Mojoy",
    description:
      "Shop genuine Lenovo laptops Lagos: IdeaPad for students, ThinkPad for professionals, Legion gaming. Best Lenovo prices Nigeria. Fast delivery.",
    images: ["/og-image.png"],
    url: "https://mojoy.com/lenovo",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Lenovo Laptops Nigeria - IdeaPad, ThinkPad, Legion | Mojoy",
    description:
      "Shop genuine Lenovo laptops Lagos: IdeaPad for students, ThinkPad for professionals, Legion gaming. Best Lenovo prices Nigeria. Fast delivery.",
    images: ["/og-image.png"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <>{children}</>;
}
