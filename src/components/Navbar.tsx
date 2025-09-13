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
  const handleScroll = () => {
    const isTop = window.scrollY < 5;
    setIsScrolled(!isTop);
  };
  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);
  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <div className="flex flex-col w-full">
      {/*Top nav*/}
      <div className="w-full bg-[#FAFAFA] border-b border-b-gray-100 md:block hidden">
        <ul className="flex items-center justify-end text-xs text-[#333333] font-light px-16 h-8 bg-[#FAFAFA]">
          <li className="border-r-gray-400 px-3 -mr-4 font-semibold">
            Contact us:
          </li>
         <li className="border-r border-r-gray-400 px-3 font-normal font-montserrat">
  <a href="tel:+2348023636583" className="hover:text-blue-500">
    (+234) 802-363-6583
  </a>
</li>
<li className="border-r border-r-gray-400 px-3 font-normal font-montserrat">
  <a href="mailto:shop@mojoyicl.com" className="hover:text-blue-500">
    shop@mojoyicl.com
  </a>
</li>
          <li className="pl-5 text-[17px] hover:text-yellow-500 cursor-pointer">
            <Link href="https://www.facebook.com/mojoyitechhub">
              <FaFacebookF />
            </Link>
          </li>
          <li className="pl-5 text-[17px] hover:text-yellow-500 cursor-pointer">
            <Link href="https://www.tiktok.com/@mojoytechhub">
            <FaTiktok />
           </Link>
          </li>
          <li className="pl-5 text-[17px] hover:text-yellow-500 cursor-pointer">
            <Link href="https://twitter.com/mojoytechhub">
              <FaX />
            </Link>
          </li>
          <li className="pl-5 text-[17px] hover:text-yellow-500 cursor-pointer">
            <Link href="https://www.instagram.com/mojoytechhub/">
              <FaInstagram />
            </Link>
          </li>
        </ul>
      </div>
      {/*Main nav*/}
      <div
        className={`sticky-header flex flex-col ${
          isScrolled ? "scrolled" : ""
        }`}
      >
        {/*Logo Nav*/}
        <div className="w-full lg:h-20 h-16 bg-white border-b-2 border-b-gray-100">
          <nav className="flex items-center justify-between gap-2 h-full max-w-screen-xl mx-auto px-4 md:px-16">
            {/*icons*/}
            <div className="lg:hidden block">
              <NavIcon />
            </div>
            {/*Logo*/}
            <Link href={"/"}>
              <Image src={logo} alt="logo" className="w-24" />
            </Link>
            <div className="hidden lg:flex">
              <Search />
            </div>
            {/*Account*/}
            <div className="hidden lg:flex">
              <NavIcon />
            </div>
            {/*menu btn*/}
            <div className="inline-flex md:hidden">
              <HiMenuAlt2
                onClick={toggleMenu}
                className="cursor-pointer w-8 h-6"
              />
            </div>
          </nav>
        </div>
        <div className="h-14 flex lg:hidden items-center justify-center py-2 w-full">
          <Search />
        </div>
      </div>

      {/*Menu list*/}
      <div className="w-full h-10 bg-[#F3F4F6] font-montserrat md:block hidden">
        <div className="flex gap-10 h-full items-center justify-center mx-auto">
          {navBarlist.map((item) => (
            <Link
              href={item?.link}
              key={item?.link}
              className={`flex items-center text-xs uppercase font-medium hover:font-medium text-[#333] hover:text-yellow-400 hover:underline underline-offset-8 decoration-[#FACA15] decoration-[1px] ${
                pathname === item?.link &&
                "text-gray-800 hover:text-gray-800 underline font-medium cursor-default"
              }`}
            >
              {item?.title}
            </Link>
          ))}
        </div>
      </div>
      {/* Mobile menu */}
      <div
        className={`lg:hidden fixed top-0 right-0 h-full bg-white z-50 transition-all duration-500 ${
          isMenuOpen ? "w-3/5" : "w-0"
        }`}
        onClick={() => setIsMenuOpen(false)}
      >
        <div className="bg-tertiary border-l-4 border-rainbow w-full h-full flex flex-col justify-start p-4">
          <IoCloseOutline
            className="text-3xl my-4 cursor-pointer"
            onClick={toggleMenu}
          />
          <ul className="mt-8 text-center">
            {navBarlist.map((item) => (
              <li className="my-8" key={item?.title}>
                <Link href={item?.link}> {item.title}</Link>
              </li>
            ))}
            <li></li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
