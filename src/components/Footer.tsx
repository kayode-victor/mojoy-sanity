"use client";
import React from "react";
import whitelogo from "../assets/logowhite.png";
import Image from "next/image";
import { FaX, FaInstagram, FaFacebookF, FaTiktok } from "react-icons/fa6";
import Link from "next/link";

const phone = [
  { number: "(+234)8023636583", title: "(+234)802-363-6583" },
  { number: "(+234)8023230471", title: "(+234)802-323-0471" },
  { number: "(+234)8131098419", title: "(+234)813-109-8419" },
];

const navlink = [
  { href: "/shop", title: "Our Store" },
  { href: "/contact", title: "Contact Us" },
  { href: "/about", title: "About Us" },
];

const productLink = [
  { href: "/hp", title: "HP" },
  { href: "/dell", title: "Dell" },
  { href: "/lenovo", title: "Lenovo" },
  { href: "/asus", title: "Asus" },
];

const socials = [
  { icon: <FaFacebookF />, link: "https://www.facebook.com/mojoyicl/" },
  { icon: <FaX />, link: "https://twitter.com/mojoyICL" },
  { icon: <FaInstagram />, link: "https://www.instagram.com/mojoyicl/" },
  {
    icon: <FaTiktok />,
    link: "https://www.tiktok.com/@mojoy_icl?_t=ZS-8zQ2eDNlRgO&_r=1",
  },
];

const Footer = () => {
  return (
    <footer className="w-full bg-[#1B4351] text-white font-raleway relative z-50">
      <div className="container mx-auto px-6 lg:px-20 py-14">
        {/* Grid Layout */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* Logo + Address */}
          <div>
            <Image
              src={whitelogo}
              alt="Mojoy Logo"
              className="w-28 lg:w-36 mb-5"
              priority
            />
            <a
              href="https://www.google.com/maps/place/13+Oshitelu+Street,+Lagos,+Nigeria"
              target="_blank"
              rel="noopener noreferrer"
              className="block text-sm text-white hover:text-[#FFF354] transition-colors"
            >
              13 Oshitelu St, Computer Village, Lagos, Nigeria
            </a>
            <div className="flex gap-4 mt-5">
              {socials.map((social, index) => (
                <Link key={index} href={social.link}>
                  <div className="text-xl text-white hover:text-[#FFF354] transition-transform duration-300 ease-in-out hover:scale-110">
                    {social.icon}
                  </div>
                </Link>
              ))}
            </div>
          </div>

          {/* Contact Info */}
          <div>
            <h2 className="text-lg font-bold mb-4 text-[#FFF354] uppercase tracking-wide">
              Contact Us
            </h2>
            <div className="flex flex-col gap-2 text-sm text-white">
              {phone.map((phone, index) => (
                <Link
                  key={index}
                  href={`tel:${phone.number.replace(/[^+\d]/g, "")}`}
                  className="text-white hover:text-[#FFF354] transition-colors"
                >
                  {phone.title}
                </Link>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h2 className="text-lg font-bold mb-4 text-[#FFF354] uppercase tracking-wide">
              Quick Links
            </h2>
            <div className="flex flex-col gap-2 text-sm text-white">
              {navlink.map((link, index) => (
                <Link
                  key={index}
                  href={link.href}
                  className="text-white hover:text-[#FFF354] transition-colors"
                >
                  {link.title}
                </Link>
              ))}
            </div>
          </div>

          {/* Products */}
          <div>
            <h2 className="text-lg font-bold mb-4 text-[#FFF354] uppercase tracking-wide">
              Products
            </h2>
            <div className="flex flex-col gap-2 text-sm text-white">
              {productLink.map((link, index) => (
                <Link
                  key={index}
                  href={link.href}
                  className="text-white hover:text-[#FFF354] transition-colors"
                >
                  {link.title}
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Divider & Copyright */}
      <div className="border-t border-[#CD661A]/50 py-5 text-center text-sm text-white">
        © <span className="text-[#FFF354] font-semibold">Mojoy ICL</span> 2025
        — All Rights Reserved.
      </div>
    </footer>
  );
};

export default Footer;
