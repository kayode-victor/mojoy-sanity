"use client";
import { urlFor } from "@/lib/sanityClient";
import Image from "next/image";
import { useState } from "react";
import Slider from "react-slick";

type Banner2Props = {
  banners: { _id: string; image: any }[];
  bannerText: string;
};

const Banner2 = ({ banners = [], bannerText }: Banner2Props) => {
  const [dotActive, setDocActive] = useState(0);
  const settings = {
    dots: true,
    infinite: true,
    autoplay: true,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: false,
    beforeChange: (_prev: any, next: any) => {
      setDocActive(next);
    },
    responsive: [
      {
        breakpoint: 576,
        settings: {
          dots: true,
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
                      color: "",
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
    <div className="bg-red-200 h-[300px] mb-28">
      <Slider {...settings}>
        {banners.map((item) => (
          <div className="relative" key={item._id}>
            <Image
              src={urlFor(item.image).url()}
              alt="banner image"
              width={1900}
              height={1500}
              className="w-full h-[300px] object-cover md:mb-28"
            />
            <div className="w-full h-[300px] absolute top-0 flex justify-center items-center">
              <div className="flex flex-col gap-5 justify-center items-center">
                <p className="text-white text-md md:text-5xl text-shadow-4xl text-center font-montserrat max-w-lg md:max-w-2xl mx-auto font-semibold ">
                  {bannerText}
                </p>
              </div>
            </div>
          </div>
        ))}
      </Slider>
    </div>
  );
};

export default Banner2;
