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

  const handleScroll = () => setIsScrolled(window.scrollY > 10);

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  return (
    <div className="flex flex-col w-full font-raleway">
      {/* ==================== TOP BAR ==================== */}
      <div className="w-full bg-[#1B4351] text-white text-[10px] md:text-xs border-b border-[#CD661A]/30">
        <div className="max-w-screen-xl mx-auto flex flex-col md:flex-row items-center justify-between px-4 py-2 gap-2">
          {/* Contact */}
          <div className="flex flex-col md:flex-row items-center gap-1 md:gap-4">
            <a href="tel:+2347066755185" className="hover:text-[#FFF354]">
              (+234)706-675-5185
            </a>
            <span className="hidden md:inline text-[#FFF354]/50">|</span>
            <a href="mailto:shop@mojoyicl.com" className="hover:text-[#FFF354]">
              shop@mojoyicl.com
            </a>
          </div>

          {/* Social Icons */}
          <div className="flex items-center gap-4 text-sm md:text-[15px]">
            <Link
              href="https://www.facebook.com/mojoyitechhub"
              className="hover:text-[#FFF354]"
            >
              <FaFacebookF />
            </Link>
            <Link
              href="https://www.tiktok.com/@mojoytechhub"
              className="hover:text-[#FFF354]"
            >
              <FaTiktok />
            </Link>
            <Link
              href="https://twitter.com/mojoytechhub"
              className="hover:text-[#FFF354]"
            >
              <FaX />
            </Link>
            <Link
              href="https://www.instagram.com/mojoytechhub/"
              className="hover:text-[#FFF354]"
            >
              <FaInstagram />
            </Link>
          </div>
        </div>
      </div>

      {/* ==================== MAIN NAV ==================== */}
      <div
        className={`sticky-header flex flex-col transition-all ${isScrolled ? "scrolled shadow-md" : ""}`}
      >
        <div className="w-full bg-white border-b border-gray-200">
          <nav className="flex items-center justify-between h-16 lg:h-20 max-w-screen-xl mx-auto px-4 md:px-16">
            {/* Mobile Cart/Wishlist */}
            <div className="lg:hidden block">
              <NavIcon />
            </div>

            {/* Logo */}
            <Link href="/" className="flex items-center">
              <div className="flex items-center gap-2">
                <Image src={logo} alt="Mojoy Logo" className="w-24 md:w-28" />
                <span className="bg-[#FFF354] text-[#1B4351] text-[9px] md:text-xs font-bold px-2 py-[3px] rounded-md uppercase">
                  Black Friday
                </span>
              </div>
            </Link>

            {/* Desktop Search */}
            <div className="hidden lg:flex">
              <Search />
            </div>

            {/* Desktop Icons */}
            <div className="hidden lg:flex">
              <NavIcon />
            </div>

            {/* Mobile Menu Button */}
            <div className="inline-flex md:hidden">
              <HiMenuAlt2
                onClick={toggleMenu}
                className="cursor-pointer w-7 h-7 text-[#1B4351]"
              />
            </div>
          </nav>
        </div>

        {/* Mobile Search */}
        <div className="h-14 flex lg:hidden items-center justify-center py-2 w-full bg-[#F8F8F8]">
          <Search />
        </div>
      </div>

      {/* ==================== DESKTOP MENU LINKS ==================== */}
      <div className="hidden md:block w-full h-12 bg-white shadow-sm">
        <div className="flex gap-10 h-full items-center justify-center">
          {navBarlist.map((item) => (
            <Link
              key={item.link}
              href={item.link}
              className={`text-sm uppercase font-semibold transition-all
                ${
                  pathname === item.link
                    ? "text-[#CD661A] underline underline-offset-8 decoration-[#FFF354]"
                    : "text-[#1B4351] hover:text-[#CD661A]"
                }`}
            >
              {item.title}
            </Link>
          ))}
        </div>
      </div>

      {/* ==================== MOBILE MENU ==================== */}
      <div
        className={`lg:hidden fixed top-0 right-0 h-full bg-white z-50 transition-all duration-500 ${
          isMenuOpen ? "w-3/5" : "w-0"
        }`}
      >
        <div className="bg-[#1B4351] text-white w-full h-full flex flex-col p-6 rounded-l-2xl shadow-xl">
          <IoCloseOutline
            className="text-3xl mb-8 self-end cursor-pointer hover:text-[#FFF354]"
            onClick={toggleMenu}
          />

          <ul className="space-y-6 text-center">
            {navBarlist.map((item) => (
              <li key={item.title}>
                <Link
                  href={item.link}
                  onClick={() => setIsMenuOpen(false)}
                  className="text-lg hover:text-[#FFF354]"
                >
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
