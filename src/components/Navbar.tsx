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
      <div className="w-full bg-[#1B4351] text-white text-xs border-b border-[#CD661A]/30">
        <div className="w-full px-4 md:px-8 flex flex-col md:flex-row items-center justify-end py-2 gap-2 md:gap-6">
          {/* Contact Info (Right aligned) */}
          <div className="flex flex-col md:flex-row items-center gap-3 md:gap-5 text-center md:text-right">
            <a
              href="tel:+2347066755185"
              className="text-white hover:text-[#FFF354] transition-colors font-medium"
            >
              (+234)706-675-5185
            </a>
            <span className="hidden md:inline text-[#FFF354]/50">|</span>
            <a
              href="mailto:shop@mojoyicl.com"
              className="text-white hover:text-[#FFF354] transition-colors font-medium"
            >
              shop@mojoyicl.com
            </a>
            <span className="hidden md:inline text-[#FFF354]/50">|</span>
            <span className="text-[#FFF354] font-semibold">Follow Us:</span>
          </div>

          {/* Social Icons */}
          <div className="flex items-center gap-4 text-[15px]">
            <Link
              href="https://www.facebook.com/mojoyitechhub"
              className="text-white hover:text-[#FFF354] transition-colors"
            >
              <FaFacebookF />
            </Link>
            <Link
              href="https://www.tiktok.com/@mojoytechhub"
              className="text-white hover:text-[#FFF354] transition-colors"
            >
              <FaTiktok />
            </Link>
            <Link
              href="https://twitter.com/mojoytechhub"
              className="text-white hover:text-[#FFF354] transition-colors"
            >
              <FaX />
            </Link>
            <Link
              href="https://www.instagram.com/mojoytechhub/"
              className="text-white hover:text-[#FFF354] transition-colors"
            >
              <FaInstagram />
            </Link>
          </div>
        </div>
      </div>

      {/* ==================== MAIN NAV ==================== */}
      <div
        className={`sticky-header flex flex-col transition-all ${
          isScrolled ? "scrolled shadow-md" : ""
        }`}
      >
        <div className="w-full bg-white border-b border-gray-200">
          <nav className="flex items-center justify-between h-16 lg:h-24 w-full px-4 md:px-16 mt-2">
            {/* Left: Mobile Icon */}
            <div className="lg:hidden block">
              <NavIcon />
            </div>

            {/* Center: Logo */}
            <Link href="/" className="flex items-center">
              <Image
                src={logo}
                alt="Mojoy Logo"
                width={150}
                height={34}
                className="object-contain"
                priority
              />
            </Link>

            {/* Center: Search */}
            <div className="hidden lg:flex">
              <Search />
            </div>

            {/* Right: Icons */}
            <div className="hidden lg:flex">
              <NavIcon />
            </div>

            {/* Menu Button (Mobile) */}
            <div className="inline-flex md:hidden">
              <HiMenuAlt2
                onClick={toggleMenu}
                className="cursor-pointer w-8 h-6 text-[#1B4351]"
              />
            </div>
          </nav>
        </div>

        {/* Mobile Search */}
        <div className="h-14 flex lg:hidden items-center justify-center py-2 w-full bg-[#F8F8F8]">
          <Search />
        </div>
      </div>

      {/* ==================== MENU LINKS ==================== */}
      <div className="hidden md:block w-full h-12 bg-white font-raleway">
        <div className="flex gap-10 h-full items-center justify-start px-4 md:px-16">
          {navBarlist.map((item) => (
            <Link
              key={item.link}
              href={item.link}
              className={`flex items-center text-sm uppercase tracking-wide font-semibold transition-colors duration-300
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
        className={`lg:hidden fixed top-0 right-0 h-full bg-white z-50 transition-all duration-500 ease-in-out ${
          isMenuOpen ? "w-3/5" : "w-0"
        }`}
      >
        <div className="bg-[#1B4351] text-white w-full h-full flex flex-col justify-start p-6 rounded-l-2xl shadow-lg">
          <IoCloseOutline
            className="text-3xl mb-8 cursor-pointer self-end hover:text-[#FFF354]"
            onClick={toggleMenu}
          />
          <ul className="space-y-6 text-center">
            {navBarlist.map((item) => (
              <li key={item.title}>
                <Link
                  href={item.link}
                  onClick={() => setIsMenuOpen(false)}
                  className="text-lg hover:text-[#FFF354] transition-all"
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
