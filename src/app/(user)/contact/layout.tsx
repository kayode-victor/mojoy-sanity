import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import "slick-carousel/slick/slick.css";
import Footer from "@/components/Footer";
// import NavBanner from "@/components/NavBanner";
import Layout from "@/components/Layout";
import WhatsAppButton from "@/components/WhatsAppButton";

export const metadata: Metadata = {
  metadataBase: new URL("https://mojoy.com/contact"),
  title:
    "Contact Mojoy Tech Hub - Computer Shop Lagos Nigeria. Call (+234) 706-675-5185 or email shop@mojoyicl.com. Best laptop shop in Lagos.",
  description:
    "Visit Mojoy Tech Hub at 13 Oshitelu St, Computer Village, Lagos, Nigeria.",
  icons: { icon: "/favicon.ico" },
  robots: "index, follow",
  openGraph: {
    title:
      "Contact Mojoy Tech Hub - Computer Shop Lagos Nigeria. Call (+234) 706-675-5185 or email shop@mojoyicl.com. Best laptop shop in Lagos.",
    description:
      "Visit Mojoy Tech Hub at 13 Oshitelu St, Computer Village, Lagos, Nigeria.",
    images: ["/og-image.png"],
    url: "https://mojoy.com/contact",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title:
      "Contact Mojoy Tech Hub - Computer Shop Lagos Nigeria. Call (+234) 706-675-5185 or email shop@mojoyicl.com. Best laptop shop in Lagos.",
    description:
      "Visit Mojoy Tech Hub at 13 Oshitelu St, Computer Village, Lagos, Nigeria.",
    images: ["/og-image.png"],
  },
};

export default function ContactLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <>{children}</>;
}
