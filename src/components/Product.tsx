"use client";
import Link from "next/link";
import { ProductProps } from "../../type";
import Image from "next/image";
import { urlFor } from "@/lib/sanityClient";
import { BsArrowsFullscreen } from "react-icons/bs";
import { MdOutlineStarPurple500 } from "react-icons/md";
import { AiOutlineShopping } from "react-icons/ai";
import { useDispatch } from "react-redux";
import { addToCart } from "@/redux/mojoySlice";
import toast, { Toaster } from "react-hot-toast";
import Price from "./Price";
import WishlistButton from "./WishlistButton";
import { useSession } from "next-auth/react";

interface Props {
  product: ProductProps;
  bg?: string;
}

const Product = ({ product, bg }: Props) => {
  const dispatch = useDispatch();
  const { status } = useSession();
  return (
    <div className="w-full relative group border-[1px] border-gray-300 hover:shadow-lg duration-200 shadow-gray-500 rounded-lg overflow-hidden group">
      <div className="w-full h-64 md:h-80 flex items-center justify-center bg-white overflow-hidden">
        <div className={`relative ${bg}`}>
          <Link href={`/product/${product?.slug?.current}`}>
            {
              <div>
                <Image
                  src={urlFor(product?.image).url()}
                  alt="product image"
                  width={500}
                  height={500}
                  className="w-52 h-52 md:w-72 md:h-72 object-contain duration-300 transition-all ease-in-out group-hover:scale-[1.1] lg:group-hover:scale-[1.2]"
                />
              </div>
            }
          </Link>
          <div className="bottom-0 flex items-center gap-5 justify-center translate-y-[110%] group-hover:-translate-y-2 transition-transform duration-300">
            <button
              onClick={() => {
                dispatch(addToCart(product));
                toast.success(
                  `${
                    product?.title?.substring(0, 12) ?? "Product"
                  }... added to cart`
                );
              }}
              className="bg-gray-800 md:w-[100px] justify-center text-gray-200 p-4 md:px-4  md:py-2 text-xs rounded-full flex items-center gap-2 hover:bg-yellow-400 hover:text-white duration-200"
            >
              <span>
                <AiOutlineShopping className="text-md" />
              </span>
              <p className="flex">Cart</p>
            </button>
            <Link
              href={`/product/${product?.slug?.current}`}
              className="bg-gray-800  md:w-[100px] justify-center text-gray-200 p-4 md:px-4 md:py-2  text-xs rounded-full flex items-center gap-2 hover:bg-yellow-400 hover:text-white duration-200"
            >
              <span>
                <BsArrowsFullscreen className="text-md" />
              </span>
              <p className="flex">Preview</p>
            </Link>
          </div>
          <div className="bg-red-200"></div>
          {product?.quantity && product?.quantity < 5 && (
            <p className="absolute top-4 left-3 text-sm text-red-500">
              Only {product?.quantity} left!
            </p>
          )}
          {product?.isnew && (
            <div className="absolute top-2 left-2 z-10">
              <p className="bg-yellow-400 px-4 py-1 text-primary flex justify-center items-center text-sm font-semibold hover:bg-gray-800 hover:text-yellow-400 duration-300 cursor-pointer rounded-md">
                New
              </p>
            </div>
          )}
          {/* Wishlist Button */}
          {status === "authenticated" && (
            <div className="absolute top-2 right-2 z-10">
              <WishlistButton product={product} />
            </div>
          )}
        </div>
      </div>
      <div className="px-2 py-2 md:py-4 flex flex-col gap-1 w-full bg-slate-200">
        <Link href={`/product/${product?.slug?.current}`}>
          <div className="flex items-center justify-center">
            <h2 className="text-xs md:text-sm text-primary font-bold">
              {(product?.title ?? "No Title").substring(0, 55)}...
            </h2>
          </div>
        </Link>
        <div className="flex items-center justify-between">
          <p className="text-[#767676] text-sm">
            Product of{" "}
            <span className="font-semibold text-gray-950 capitalize">
              {typeof product?.brand === "string"
                ? product.brand
                : product?.brand?.title ?? "Unknown"}
            </span>
          </p>

          <div className="flex flex-col items-end md:items-center justify-center">
            <p className="font-normal md:font-medium line-through decoration-red-500 text-xs">
              <Price amount={product?.rowprice ?? 0} />
            </p>
            <p className="font-bold text-sm md:text-md">
              <Price amount={product?.price ?? 0} />
            </p>
          </div>
        </div>
        <div>
          <strong className="text-sm">ID: </strong>
          <span className="text-sm">
            {product?.productId ?? <span className="text-gray-500">N/A</span>}
          </span>
        </div>

        <div className="flex items-center justify-center md:justify-start gap-1">
          {/* Loop to render stars based on the rating */}
          {(typeof product?.ratings === "number" && product.ratings > 0
            ? Array.from({ length: Math.floor(product.ratings) })
            : []
          ).map((_, index) => (
            <MdOutlineStarPurple500
              key={index}
              className="text-lg text-yellow-400"
            />
          ))}
        </div>
      </div>

      <Toaster
        position="bottom-right"
        toastOptions={{
          style: {
            background: "#000",
            color: "#FFEE58",
          },
        }}
      />
    </div>
  );
};

export default Product;
