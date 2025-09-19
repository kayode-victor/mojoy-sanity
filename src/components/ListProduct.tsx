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
    <div className="w-full relative group flex flex-col lg:flex-row min-h-[240px] lg:min-h-[320px] lg:gap-5 items-center border-[1px] hover:shadow-lg duration-200 shadow-gray-500 rounded-md overflow-hidden group">
      <div className="block lg:w-2/3 lg:ml-2 py-4 lg:py-0">
        <div
          className={`w-full min-w-[160px] h-full flex items-center justify-center ${
            bg ? `bg-[${bg}]` : "bg-white"
          }`}
        >
          <Image
            className="w-full h-full object-contain duration-300 transition-all ease-in-out group-hover:scale-[1.1]"
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
      <div className="flex flex-col lg:mr-2 p-2 lg:p-0 gap-2">
        <div className="flex items-center justify-between">
          <h2 className="text-md text-primary font-bold">
            {(product?.title ?? "").substring(0, 55)}...
          </h2>
        </div>
        <div className="flex items-center gap-2">
          <p className="text-[#767676] text-xs line-through">
            <Price amount={product?.rowprice ?? 0} />
          </p>
          <p className="font-semibold">
            {" "}
            <Price amount={product?.price ?? 0} />
          </p>
        </div>
        <p className="text-sm max-w-2xl">{product?.description}</p>
        <div className="flex lg:flex-col items-start justify-between lg:justify-start">
          <p className="text-[#767676] text-[14px]">
            a product by{" "}
            <span className="font-semibold text-gray-700">
              {product?.brand?.title ?? ""}
            </span>
          </p>
          <div className="flex items-center gap-1">
            {/* Loop to render stars based on the rating */}
            {[...Array(product.ratings)].map((_, index) => (
              <MdOutlineStarPurple500
                key={index}
                className="text-lg text-yellow-400"
              />
            ))}
          </div>
        </div>
        <div className="flex w-full gap-5 justify-center lg:justify-start">
          <button
            onClick={() => {
              dispatch(addToCart(product));
              toast.success(
                `${(product?.title ?? "").substring(0, 12)}... added to cart`
              );
            }}
            className="bg-gray-800 w-[100px] justify-center text-gray-200 px-2 py-2 text-xs rounded-lg flex items-center gap-4 hover:bg-yellow-400 hover:text-white duration-200"
          >
            <span>
              <AiOutlineShopping />
            </span>
            Cart
          </button>
          <Link
            href={`/product/${product?.slug?.current}`}
            className="bg-gray-800 w-[100px] justify-center  text-gray-200 px-2 py-2 text-xs rounded-lg flex items-center gap-4 hover:bg-yellow-400 hover:text-white duration-200"
          >
            <span>
              <BsArrowsFullscreen />
            </span>
            Preview
          </Link>
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

export default ListProduct;
