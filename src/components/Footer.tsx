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
  { href: "/hp", title: "Hp" },
  { href: "/dell", title: "Dell" },
  { href: "/lenovo", title: "Lenovo" },
  { href: "/asus", title: "Asus" },
];

const socials = [
  {
    icon: <FaFacebookF />,
    link: "https://www.facebook.com/mojoyicl/",
  },
  { icon: <FaX />, link: "https://twitter.com/mojoyICL" },
  { icon: <FaInstagram />, link: "https://www.instagram.com/mojoyicl/" },
  { icon: <FaTiktok />, link: "https://www.tiktok.com/@mojoy_icl?_t=ZS-8zQ2eDNlRgO&_r=1" }, 
];

const Footer = () => {
  return (
    <footer className=" bottom-0 w-full bg-[#1B4351] text-white font-poppins">
      <div className="container mx-auto p-4 lg:px-20 lg:py-14">
        <div className="flex flex-col lg:flex-row lg:gap-10 gap-5">
          {/*Info*/}
        <div className="flex flex-col lg:w-1/3 lg:items-start items-center justify-center gap-2">
  <Image src={whitelogo} alt="Logo" className="w-24 lg:w-36" />
  <a
    href="https://www.google.com/maps/place/13+Oshitelu+Street,+Lagos,+Nigeria"
    target="_blank"
    rel="noopener noreferrer"
  >
    <p className="text-center hover:text-yellow-400 lg:text-left cursor-pointer">
      13 Oshitelu St, Computer Village, Lagos, Nigeria
    </p>
  </a>
  <div className="flex gap-4">
    {socials.map((social, index) => (
      <Link key={index} href={social.link}>
        <div className="text-white hover:text-yellow-400 hover:scale-125 transition-transform duration-300 ease-in-out">
          {social.icon}
        </div>
      </Link>
    ))}
  </div>
</div>
         
          {/*contact info*/}
          <div className="flex flex-col lg:w-1/3 lg:items-start items-center  gap-2">
            <h1 className="text-2xl font-medium">Contact Us</h1>
            <div className="flex flex-col gap-2">
              {phone.map((phone, index) => (
                <Link key={index} href={`tel:${phone.number.replace(/[^+\d]/g, "")}`}>
                  <div className="text-white hover:text-yellow-400 text-sm">
                    {phone.title}
                  </div>
                </Link>
              ))}
            </div>
          </div>
          {/*Info*/}
          <div className="flex flex-col lg:w-1/3 lg:items-start items-center  gap-2">
            <h1 className="text-2xl font-medium">Quick Links</h1>
            <div className="flex flex-col gap-2">
              {navlink.map((link, index) => (
                <Link key={index} href={link.href}>
                  <div className="text-white hover:text-yellow-400 text-sm">
                    {link.title}
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
      {/* <div className="flex items-center border-b border-b-gray-300 justify-center lg:mx-32 mx-10">
        <p className="text-white opacity-70 text-sm font-light">
          ©Mojoy ICL 2024 — All Rights Not Reserved.
        </p>
      </div> */}
      <div className="flex flex-col items-center justify-center py-4">
        <hr className="border-t-1 border-white my-3 shadow-sm w-[85%]" />
        <p className="text-sm text-center font-normal">
          ©Mojoy ICL 2025 — All Rights Reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
