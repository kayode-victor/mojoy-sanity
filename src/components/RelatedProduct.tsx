"use client";
import Container from "./Container";
import { ProductProps } from "../../type";
import Product from "./Product";
import Slider from "react-slick";
import NextArrow from "./NextArrow";
import PrevArrow from "./PrevArrow";

interface Props {
  relatedProducts: ProductProps[]; // Change the prop name to relatedProducts
}

const RelatedProduct = ({ relatedProducts }: Props) => {
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
    <div className="w-full pb-20">
      <div>
        {/* Conditional Rendering and Grid Display */}
        {relatedProducts.length === 0 ? (
          <div className="p-4 text-2xl capitalize text-center">
            No other products available.
          </div>
        ) : (
          <div
            className={
              relatedProducts.length <= 3
                ? "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 px-2"
                : ""
            }
          >
            {relatedProducts.length <= 3 ? (
              relatedProducts.map((item: ProductProps) => (
                <div key={item?._id}>
                  <Product product={item} />
                </div>
              ))
            ) : (
              <Slider {...settings}>
                {relatedProducts.map((item: ProductProps) => (
                  <div key={item?._id} className="px-2">
                    <Product product={item} />
                  </div>
                ))}
              </Slider>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default RelatedProduct;
