"use client";
import Container from "./Container";
import { motion } from "framer-motion";
import { ProductProps } from "../../type";
import Product from "./Product";
import Image from "next/image";
import noproduct from "../assets/noproduct.png";

interface Props {
  products: ProductProps[];
  title: string;
}

const AllProduct = ({ products, title }: Props) => {
  console.log(products);
  return (
    <Container className="w-full pb-10">
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
        <h1 className="text-2xl text-center lg:text-3xl font-medium">
          All {title} Items
        </h1>
      </motion.div>
      {/* Conditional Display for Products */}
      <div className="w-full">
        {products.length === 0 ? (
          <div className="flex flex-col items-center justify-center my-8">
            <Image
              src={noproduct}
              width={200}
              height={200}
              alt="No product"
              className="w-48 h-48 mb-4"
            />
            <p className="text-gray-600 text-lg">
              No product here. Try again later.
            </p>
          </div>
        ) : (
          <div className="w-full grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-2 md:gap-5 lg:gap-10">
            {products.map((item: ProductProps) => (
              <Product key={item._id} product={item} />
            ))}
          </div>
        )}
      </div>
    </Container>
  );
};

export default AllProduct;
