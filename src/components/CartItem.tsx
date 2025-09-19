//component/cartItem.ts
"use client";
import React from "react";
import { ProductProps } from "../../type";
import Image from "next/image";
import { urlFor } from "@/lib/sanityClient";
import Link from "next/link";
import { RiDeleteBin6Line } from "react-icons/ri";

import Price from "./Price";
import toast, { Toaster } from "react-hot-toast";
import { useDispatch } from "react-redux";
import {
  decreaseQuantity,
  deleteProduct,
  increaseQuantity,
} from "@/redux/mojoySlice";

interface Props {
  item: ProductProps;
}

const CartItem = ({ item }: Props) => {
  const dispatch = useDispatch();

  return (
    <div className="w-full grid grid-cols-5 mb-4 border py-1 relative">
      <div className="flex col-span-5 md:col-span-2 items-center w-[320px] px-6">
        <RiDeleteBin6Line
          onClick={() => {
            dispatch(deleteProduct(item._id));
            toast.success(
              `${
                item?.title ? item.title.substring(0, 12) : "Product"
              }... deleted from cart`
            );
          }}
          className="absolute top-2 right-4 text-primary text-2xl text-red-500 cursor-pointer duration-300 flex md:hidden"
          title="Delete Item"
        />
        <Link href={`/product/${item?.slug?.current}`}>
          <Image
            src={urlFor(item?.image).url()}
            alt="product image"
            width={50}
            height={50}
            className="w-32 h-32 object-contain"
          />
        </Link>
        <Link href={`/product/${item?.slug?.current}`}>
          <h1 className="font-medium text-sm md:text-md">
            {(item?.title ?? "Product").substring(0, 20)}
          </h1>
        </Link>
      </div>
      <div className="w-full col-span-5 md:col-span-3 flex items-center justify-between py-4 md:py-0 px-4 lg:px-0 md:-ml-24 ml-0 md:w-[600px]">
        <p className="flex w-1/3 items-center text-md md:text-lg font-semibold">
          <Price amount={item?.price ?? 0} />
        </p>
        <div className="flex w-1/3 items-center gap-6 text-lg">
          <span
            onClick={() => {
              dispatch(decreaseQuantity({ _id: item?._id }));
              toast.success("Product reduced successully");
            }}
            className="w-6 h-6 bg-gray-100 text-xl ml-2 flex items-center justify-center hover:bg-gray-300 cursor-pointer duration-300 border-[1px] border-gray-300 hover:border-gray-500"
          >
            -
          </span>
          <p className="text-sm md:text-md">{item?.quantity}</p>
          <span
            onClick={() => {
              dispatch(
                increaseQuantity({ _id: item?._id, quantity: item?.quantity })
              );
              toast.success("Product added successully");
            }}
            className="w-6 h-6 bg-gray-100 text-xl mr-2 flex items-center justify-center hover:bg-gray-300 cursor-pointer duration-300 border-[1px] border-gray-300 hover:border-gray-500"
          >
            +
          </span>
        </div>
        <div className="w-1/3 flex items-center font-titleFont font-bold text-md md:text-lg">
          <Price amount={(item?.quantity ?? 0) * (item?.price ?? 0)} />
        </div>
        <RiDeleteBin6Line
          onClick={() => {
            dispatch(deleteProduct(item._id));
            toast.success(
              `${(item?.title ?? "Product").substring(
                0,
                12
              )}... deleted from cart`
            );
          }}
          className="text-primary text-2xl text-red-500 cursor-pointer duration-300 md:flex hidden"
          title="Delete Item"
        />
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

export default CartItem;
