"use client";
import Slider from "react-slick";
import Container from "./Container";
import Product from "./Product";
import { ProductProps } from "../../type";
import NextArrow from "./NextArrow";
import PrevArrow from "./PrevArrow";
import { motion } from "framer-motion";
interface Props {
  products: ProductProps[];
}

const NewArrival = ({ products }: Props) => {
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
    <Container className="-mt-32 relative">
      <div>
        <motion.div // Moved heading outside the conditional block
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
              Newly Arrived
            </h1>
            <hr className="border-t-2 border-[#FACA15] my-3 shadow-sm w-24" />
          </div>
        </motion.div>

        {/* Conditional Rendering and Grid Display */}
        {products.length === 0 ? (
          <div className="px-2 text-2xl capitalize text-center">
            New Products coming soon!
          </div>
        ) : (
          <div
            className={
              products.length <= 3
                ? "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 px-2"
                : ""
            }
          >
            {products.length <= 3 ? (
              products.map((item: ProductProps) => (
                <div key={item?._id}>
                  <Product product={item} />
                </div>
              ))
            ) : (
              <Slider {...settings}>
                {products.map((item: ProductProps) => (
                  <div key={item?._id} className="px-2">
                    <Product product={item} />
                  </div>
                ))}
              </Slider>
            )}
          </div>
        )}
      </div>
    </Container>
  );
};

export default NewArrival;
