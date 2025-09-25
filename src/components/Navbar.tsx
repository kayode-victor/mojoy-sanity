"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import logo from "@/assets/blacklogo.png";
import { FaFacebookF, FaX, FaInstagram, FaTiktok } from "react-icons/fa6";
import { usePathname } from "next/navigation";
import { HiMenuAlt2 } from "react-icons/hi";
import Search from "./Search";
import NavIcon from "./NavIcon";
import { IoCloseOutline } from "react-icons/io5";

const Navbar = () => {
  const pathname = usePathname();
  const navBarlist = [
    { title: "Home", link: "/" },
    { title: "Our Shop", link: "/shop" },
    { title: "Hp", link: "/hp" },
    { title: "Dell", link: "/dell" },
    { title: "Lenovo", link: "/lenovo" },
    { title: "Asus", link: "/asus" },
    { title: "About Us", link: "/about" },
    { title: "Contact Us", link: "/contact" },
  ];

  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  // ✅ Cleaner scroll detection
  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 5);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="flex flex-col w-full">
      {/* Top nav */}
      <div className="w-full bg-brand-accent border-b border-b-gray-100 md:block hidden">
        <ul className="flex items-center justify-end text-xs text-white font-light px-16 h-8 bg-[#1B4351]">
          <li className="border-r-white-400 px-3 -mr-4 font-semibold">
            Contact us:
          </li>
          <li className="border-r border-r-white-400 px-3 font-normal font-montserrat">
            <a href="tel:+2347066755185" className="hover:text-brand-accent">
              (+234) 706-675-5185
            </a>
          </li>
          <li className="border-r border-r-white-400 px-3 font-normal font-montserrat">
            <a
              href="mailto:shop@mojoyicl.com"
              className="hover:text- to-brand-accent"
            >
              shop@mojoyicl.com
            </a>
          </li>
          <li className="pl-5 text-[17px] hover:text-brand-accent cursor-pointer">
            <Link href="https://www.facebook.com/mojoyitechhub">
              <FaFacebookF />
            </Link>
          </li>
          <li className="pl-5 text-[17px] hover:text- to-brand-accent cursor-pointer">
            <Link href="https://www.tiktok.com/@mojoytechhub">
              <FaTiktok />
            </Link>
          </li>
          <li className="pl-5 text-[17px] to-brand-accent cursor-pointer">
            <Link href="https://twitter.com/mojoytechhub">
              <FaX />
            </Link>
          </li>
          <li className="pl-5 text-[17px] hover:brand[] cursor-pointer">
            <Link href="https://www.instagram.com/mojoytechhub/">
              <FaInstagram />
            </Link>
          </li>
        </ul>
      </div>

      {/* Main nav */}
      <div
        className={`sticky-header flex flex-col ${
          isScrolled ? "scrolled" : ""
        }`}
      >
        {/* Logo Nav */}
        <div className="w-full lg:h-20 h-16 bg-white border-b-2 border-b-gray-100">
          <nav className="flex items-center justify-between gap-2 h-full max-w-screen-xl mx-auto px-4 md:px-16">
            {/* icons */}
            <div className="lg:hidden block">
              <NavIcon />
            </div>
            {/* Logo */}
            <Link href={"/"}>
              <Image
                src={logo}
                alt="logo"
                width={200}
                height={200}
                className="w-[200px] h-auto"
              />
            </Link>
            <div className="hidden lg:flex">
              <Search />
            </div>
            {/* Account */}
            <div className="hidden lg:flex">
              <NavIcon />
            </div>
            {/* menu btn */}
            <div className="inline-flex md:hidden">
              <HiMenuAlt2
                onClick={() => setIsMenuOpen(true)}
                className="cursor-pointer w-8 h-6"
              />
            </div>
          </nav>
        </div>
        <div className="h-14 flex lg:hidden items-center justify-center py-2 w-full">
          <Search />
        </div>
      </div>

      {/* Menu list (desktop) */}
      <div className="w-full h-10 bg-[#F3F4F6] font-montserrat md:block hidden">
        <div className="flex gap-10 h-full items-center justify-center mx-auto">
          {navBarlist.map((item) => (
            <Link
              href={item.link}
              key={item.link}
              className={`flex items-center text-xs uppercase font-medium hover:font-medium text-[#333] hover:text-brand-accent hover:underline underline-offset-8 decoration-brand-accent decoration-[1px] ${
                pathname === item.link &&
                "text-gray-800 hover:text-gray-800 underline font-medium cursor-default"
              }`}
            >
              {item.title}
            </Link>
          ))}
        </div>
      </div>

      {/* Mobile menu with slide-in animation */}
      <div
        className={`lg:hidden fixed top-0 right-0 h-full bg-white z-50 transform transition-transform duration-500 ease-in-out ${
          isMenuOpen ? "translate-x-0 w-3/5" : "translate-x-full w-3/5"
        }`}
      >
        <div className="bg-tertiary border-l-4 border-rainbow w-full h-full flex flex-col justify-start p-4">
          <IoCloseOutline
            className="text-3xl my-4 cursor-pointer"
            onClick={() => setIsMenuOpen(false)}
          />
          <ul className="mt-8 text-center">
            {navBarlist.map((item) => (
              <li className="my-8" key={item.title}>
                <Link href={item.link} onClick={() => setIsMenuOpen(false)}>
                  {item.title}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
