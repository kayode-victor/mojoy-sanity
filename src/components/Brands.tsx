"use client";
import React from "react";
import Container from "./Container";
import { motion } from "framer-motion";
import { ProductProps } from "../../type";
import Product from "./Product";
import Slider from "react-slick";
import NextArrow from "./NextArrow";
import PrevArrow from "./PrevArrow";

interface Product {
  _id: string;
  name: string;
  price?: number;
  description?: string;
}

interface Brand {
  _id: string;
  title?: string;
  name: string;
  products: Product[];
}

interface BrandSectionProps {
  brands: Brand[];
}

const BrandSection: React.FC<BrandSectionProps> = ({ brands }) => {
  const settings = {
    infinite: true,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 1,
    nextArrow: <NextArrow />,
    prevArrow: <PrevArrow />,
    responsive: [
      {
        breakpoint: 1025,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
          infinite: true,
        },
      },
      {
        breakpoint: 769,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          infinite: true,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          infinite: true,
        },
      },
    ],
  };

  return (
    <Container className="w-full pb-20">
      <div className="space-y-8">
        {brands?.map((brand) => (
          <div key={brand._id} className="mb-12">
            {brand.products && brand.products.length > 0 && (
              <motion.div
                initial={{ opacity: 0, y: 50 }}
                whileInView={{
                  opacity: 1,
                  y: 0,
                  transition: { delay: 0.5, duration: 0.9 },
                }}
                viewport={{ once: true }}
                className="my-2 lg:my-4 ml-5 lg:ml-10 group"
              >
                <div className="flex flex-col items-center justify-center">
                  <h1 className="text-2xl text-center lg:text-3xl font-medium">
                    {brand.title
                      ? brand.title.charAt(0).toUpperCase() +
                        brand.title.slice(1) +
                        " "
                      : ""}{" "}
                    Products
                  </h1>
                  <hr className="border-t-2 border-[#FACA15] my-3 shadow-sm w-24" />
                </div>
              </motion.div>
            )}
            {brand.products && brand.products.length > 0 ? (
              <Slider {...settings}>
                {brand.products.map((product) => (
                  <div key={product._id} className=" p-4 transition">
                    <Product product={product} />
                  </div>
                ))}
              </Slider>
            ) : null}
          </div>
        ))}
      </div>
    </Container>
  );
};

export default BrandSection;
