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

interface Props {
  product: ProductProps;
  bg?: string;
}

const ListProduct = ({ product, bg }: Props) => {
  const dispatch = useDispatch();
  return (
    <div className="w-full relative group flex min-h-[240px] lg:min-h-[320px] lg:gap-20 items-center border-[1px] hover:shadow-lg duration-200 shadow-gray-500 rounded-md overflow-hidden group">
      <div className="block w-3/6">
        <div
          className={`w-full min-w-[160px] h-full flex items-center justify-center ${
            bg ? `bg-[${bg}]` : "bg-white"
          }`}
        >
          <Image
            className="w-full h-full object-contain"
            src={urlFor(product?.image).url()}
            width={700}
            height={700}
            alt="demo image"
          />
        </div>
        {product?.quantity && product?.quantity < 5 && (
          <p className="absolute top-4 left-3 text-sm text-red-500">
            Only {product?.quantity} left!
          </p>
        )}
        {product?.isnew && (
          <div className="absolute top-2 right-2 z-50">
            <p className="bg-yellow-400 px-4 py-1 text-primary flex justify-center items-center text-sm font-semibold hover:bg-gray-800 hover:text-yellow-400 duration-300 cursor-pointer rounded-md">
              New
            </p>
          </div>
        )}
      </div>
      <div className="py-3 flex flex-col gap-2">
        <div className="flex items-center justify-between">
          <h2 className="text-lg text-primary font-bold">
            {product?.title.substring(0, 15)}
          </h2>
        </div>
        <div className="flex items-center gap-2">
          <p className="text-[#767676] text-xs line-through">
            <Price amount={product?.rowprice} />
          </p>
          <p className="font-semibold">
            {" "}
            <Price amount={product?.price} />
          </p>
        </div>
        <p className="text-sm max-w-2xl">{product?.description}</p>
        <div className="flex items-center justify-start gap-4">
          <p className="text-[#767676] text-[14px]">
            a product by{" "}
            <span className="font-semibold text-primary">{product?.brand}</span>
          </p>
          <div className="flex items-center gap-1">
            <MdOutlineStarPurple500 className="text-lg text-yellow-500" />{" "}
            <span className="font-medium text-sm">{product?.ratings}</span>
          </div>
        </div>
      </div>
      <div className="hidden bottom-0 lg:flex w-1/6 flex-col items-center gap-5 justify-center translate-x-[110%] group-hover:-translate-x-2 transition-transform duration-300">
        <button
          onClick={() => {
            dispatch(addToCart(product));
            toast.success(
              `${product?.title.substring(0, 12)}... added to cart`
            );
          }}
          className="bg-gray-800 w-[100px] justify-center text-gray-200 px-2 py-2 text-xs rounded-full flex items-center gap-4 hover:bg-yellow-400 hover:text-white duration-200"
        >
          <span>
            <AiOutlineShopping />
          </span>
          Cart
        </button>
        <Link
          href={`/product/${product?.slug?.current}`}
          className="bg-gray-800 w-[100px] justify-center  text-gray-200 px-2 py-2 text-xs rounded-full flex items-center gap-4 hover:bg-yellow-400 hover:text-white duration-200"
        >
          <span>
            <BsArrowsFullscreen />
          </span>
          Preview
        </Link>
      </div>
      <div className="relative mt-44  flex lg:hidden translate-x-[110%] gap-4 group-hover:-translate-x-44 transition-transform duration-300">
        <button
          onClick={() => {
            dispatch(addToCart(product));
            toast.success(
              `${product?.title.substring(0, 12)}... added to cart`
            );
          }}
          className="bg-gray-800 w-[100px] justify-center text-gray-200 px-4 py-2 text-xs rounded-full flex items-center gap-4 hover:bg-yellow-400 hover:text-white duration-200"
        >
          <span>
            <AiOutlineShopping />
          </span>
          Cart
        </button>
        <Link
          href={`/product/${product?.slug?.current}`}
          className="bg-gray-800 w-[100px] justify-center  text-gray-200 px-4 py-2 text-xs rounded-full flex items-center gap-4 hover:bg-yellow-400 hover:text-white duration-200"
        >
          <span>
            <BsArrowsFullscreen />
          </span>
          Preview
        </Link>
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

export default ListProduct;
