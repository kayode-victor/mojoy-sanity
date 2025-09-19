"use client";
import { urlFor } from "@/lib/sanityClient";
import Image from "next/image";
import { useState } from "react";
import Link from "next/link";
import Slider from "react-slick";

const Banner = ({ banners }: any) => {
  const [dotActive, setDocActive] = useState(0);
  const settings = {
    dots: false,
    infinite: true,
    autoplay: true,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: false,
    beforeChange: (prev: any, next: any) => {
      setDocActive(next);
    },
    responsive: [
      {
        breakpoint: 576,
        settings: {
          dots: false,
          appendDots: (dots: any) => (
            <div
              style={{
                position: "absolute",
                top: "50%",
                left: "2%",
                transform: "translateY(-50%)",
              }}
            >
              <ul style={{ margin: "0px" }}> {dots} </ul>
            </div>
          ),
          customPaging: (i: any) => (
            <div
              style={
                i === dotActive
                  ? {
                      width: "25px",
                      color: "#262626",
                      borderRight: "3px #262626 solid",
                      cursor: "pointer",
                      fontSize: "12px",
                    }
                  : {
                      width: "25px",
                      color: "transparent",
                      borderRight: "3px white solid",
                      cursor: "pointer",
                      fontSize: "12px",
                    }
              }
            >
              0{i + 1}
            </div>
          ),
        },
      },
    ],
  };
  return (
    <div className="bg-red-200 h-[400px] mb-28">
      <Slider {...settings}>
        {banners?.map((item: any) => (
          <div className="relative" key={item?._id}>
            <Image
              src={urlFor(item.image).url()}
              alt="banner image"
              width={1500}
              height={1500}
              className="w-full h-[400px] object-cover md:mb-28"
            />
            <div
              className="w-full h-[400px] absolute top-0 flex justify-center items-center transition-all duration-800 ease-in-out"
              style={{ backgroundColor: "hsla(240, 50.60%, 15.90%, 0.67)" }}
            >
              <div className="flex flex-col gap-5 justify-center items-center">
                <p className="text-white text-md md:text-lg text-shadow-4xl text-center font-montserrat font-medium max-w-lg md:max-w-2xl mx-auto px-1 md:px-0">
                  <span>
                    <span className="font-bold">MOJOY </span>
                    is a leading IT retail and distribution organization
                    dedicated to delivering premium IT products at competitive
                    prices. Our vision is to become Africa&#39;s preferred ICT
                    solutions provider, prioritizing our customers&#39; business
                    achievements.
                  </span>
                </p>
                <Link href="/shop">
                  <button className="bg-[#FACA15] font-medium text-black text-sm py-3 px-6 rounded-md hover:text-yellow-400 hover:bg-black duration-300 focus:outline-none focus:ring-offset-2 w-auto">
                    Shop Now
                  </button>
                </Link>
              </div>
            </div>
          </div>
        ))}
      </Slider>
    </div>
  );
};

export default Banner;
