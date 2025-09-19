"use client";
import { CategoryProps } from "../../type";
import { motion } from "framer-motion";
import { urlFor } from "@/lib/sanityClient";
import Image from "next/image";
import Link from "next/link";

interface Props {
  categories: CategoryProps[];
}

const Category = ({ categories }: Props) => {
  return (
    <div className="my-10 lg:my-20 xl:my-20">
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        whileInView={{
          opacity: 1,
          y: 0,
          transition: { delay: 0.5, duration: 0.9 },
        }}
        viewport={{ once: true }}
        className="my-2 lg:my-4 ml-5 lg:ml-10"
      >
        <div className="flex flex-col items-center justify-center">
          <h1 className="text-2xl text-center lg:text-3xl font-medium">Category</h1>
          <hr className="border-t-2 border-[#FACA15] my-3 shadow-sm w-24" />
        </div>
      </motion.div>
      <div className="grid grid-cols-2 md:grid-cols-3 h-[400px] lg:mx-24 mx-4 gap-4 lg:gap-18">
        {categories.map((item, index) => (
          <Link href={`/category/${item._id}`} key={index} className="relative overflow-hidden rounded-md shadow-md hover:-translate-y-2 group">
            <Image
              src={urlFor(item?.image).url()} // Assuming the images are in the public/images directory
              alt={item?.title}
              width={250}
              height={150}
              className="object-cover w-full h-full"
            />

            <div className="absolute inset-0 bg-black transition-opacity duration-300 ease-in-out opacity-80"></div>
            <p className="absolute inset-0 flex items-center justify-center text-center text-white font-light text-md lg:text-lg pointer-events-none uppercase">
              {item?.title}
            </p>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Category;
