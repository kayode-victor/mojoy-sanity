"use client";
import { useSelector } from "react-redux";
import { StateProps } from "../../type";
import Link from "next/link";
import { FaRegUser, FaOpencart } from "react-icons/fa6";
import { useSession, signOut } from "next-auth/react";
import Image from "next/image";
import toast, { Toaster } from "react-hot-toast";

const NavIcon = () => {
  const { productData } = useSelector((state: StateProps) => state.mojoy);
  const { data: session } = useSession();

  const handleSignOut = async () => {
    await signOut({ callbackUrl: "/" });
    toast.success("Signed out successfully");
  };

  return (
    <div className="flex gap-8 lg:gap-6">
      <Link href={"/cart"} className="relative group">
        <div className="flex justify-between items-center md:w-[62px]">
          <FaOpencart className="cursor-pointer text-2xl text-gray-800 text-[#FACA15]" />
          {productData && productData.length > 0 && (
            <p className="absolute bottom-5 left-5 bg-[#FACA15] text-[#3633112] text-xs w-4 h-4 rounded-full flex justify-center items-center">
              {productData.length}
            </p>
          )}
          <div className="text-sm hover:text-[#FACA15] -mb-3 cursor-pointer md:block hidden">
            Cart
          </div>
        </div>
      </Link>

      {/* Account */}
      <div className="flex items-center justify-between font-poppins">
        {session?.user ? (
          <div className="group relative flex items-center justify-between md:w-[87px]">
            {/* Profile Image or Fallback */}
            {session.user.image ? (
              <Image
                src={session.user.image}
                alt="User profile"
                width={30}
                height={30}
                className="rounded-full"
              />
            ) : (
              <div className="flex  h-[30px] w-[30px] md:h-[20px] md:w-[20px] items-center justify-center rounded-full bg-gray-200 md:mt-2 mt-0">
                <span className="text-sm font-medium text-gray-700">
                  {session.user.name?.charAt(0).toUpperCase() || "U"}
                </span>
              </div>
            )}
            {/* Account Label */}
            <div className="ml-2 hidden text-sm text-gray-800 hover:text-[#FACA15] md:block cursor-pointer md:mt-2 mt-0">
              Account
            </div>
            {/* Dropdown Menu */}
            <div className="absolute -right-20 md:right-0 top-6 mt-2 opacity-0 group-hover:visible group-hover:opacity-100 transition-all duration-200 w-36 rounded-md bg-white shadow-lg z-40 cursor-pointer border border-gray-200 py-1">
              <Link
                href="/auth/wishlist"
                className="block p-2 text-left text-sm text-gray-700 hover:bg-gray-100"
              >
                Wishlist
              </Link>
              <button
                onClick={handleSignOut}
                className="block w-full p-2 text-left text-sm text-gray-700 hover:bg-gray-100"
              >
                Sign Out
              </button>
            </div>
          </div>
        ) : (
          <Link
            href="/auth/signin"
            className="flex items-center justify-between md:w-[87px] mt-1"
          >
            <FaRegUser className="cursor-pointer text-xl text-gray-800 hover:text-[#FACA15]" />
            <span className="ml-2 hidden text-sm text-gray-800 hover:text-[#FACA15] md:block mt-0 md:mt-1">
              Account
            </span>
          </Link>
        )}
      </div>

      <Toaster
        position="bottom-right"
        toastOptions={{
          style: {
            background: "#000",
            color: "#fff",
          },
        }}
      />
    </div>
  );
};

export default NavIcon;
