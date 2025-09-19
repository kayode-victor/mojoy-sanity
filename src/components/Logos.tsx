"use client";
import Image from "next/image";
import Marquee from "react-fast-marquee";
import { motion } from "framer-motion";
import Container from "./Container";
import logo1 from "@/assets/brand-01.png";
import logo2 from "@/assets/brand-02.png";
import logo3 from "@/assets/brand-03.png";
import logo4 from "@/assets/brand-04.png";
import logo5 from "@/assets/brand-05.png";
import logo6 from "@/assets/brand-06.png";
import logo7 from "@/assets/brand-07.png";
import logo8 from "@/assets/brand-08.png";
import logo9 from "@/assets/brand-09.png";
import logo10 from "@/assets/brand-10.png";

const logos = [
  { id: 1, src: logo1, alt: "Logo" },
  { id: 2, src: logo2, alt: "Logo" },
  { id: 3, src: logo3, alt: "Logo" },
  { id: 4, src: logo4, alt: "Logo" },
  { id: 5, src: logo5, alt: "Logo" },
  { id: 6, src: logo6, alt: "Logo" },
  { id: 7, src: logo7, alt: "Logo" },
  { id: 8, src: logo8, alt: "Logo" },
  { id: 9, src: logo9, alt: "Logo" },
  { id: 10, src: logo10, alt: "Logo" },
  { id: 11, src: logo1, alt: "Logo" },
  { id: 12, src: logo2, alt: "Logo" },
  { id: 13, src: logo3, alt: "Logo" },
  { id: 14, src: logo4, alt: "Logo" },
  { id: 15, src: logo5, alt: "Logo" },
  { id: 16, src: logo6, alt: "Logo" },
  { id: 17, src: logo7, alt: "Logo" },
  { id: 18, src: logo8, alt: "Logo" },
  { id: 19, src: logo9, alt: "Logo" },
  { id: 20, src: logo10, alt: "Logo" },
];

const Logos = () => {
  return (
    <Container className="flex flex-col my-10 justify-center items-center">
      <div className="mb-10">
        <Marquee gradient={false} speed={50}>
          {logos.map((logo) => (
            <div key={logo.id} className="mx-5 lg:mx-14">
              <Image
                src={logo.src}
                width={200} // increased from 150 to 200
                height={200} // increased from 150 to 200
                alt={logo.alt}
                className="object-contain w-[200px] h-[200px] hover:scale-90" // increased from w-24 h-24 (96px) to 200px
              />
            </div>
          ))}
        </Marquee>
      </div>
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        whileInView={{
          opacity: 1,
          y: 0,
          transition: { delay: 0.5, duration: 0.9 },
        }}
        viewport={{ once: true }}
        className="flex flex-col text-center mt-4 mx-10"
      >
        <h1 className="text-2xl lg:text-3xl font-medium">
          We proudly work with
        </h1>
        <p className="text-gray-600 text-lg">
          Our brand partners include a diverse range of industry-leading
          <br />
          companies, trusted by millions worldwide.
        </p>
      </motion.div>
    </Container>
  );
};

export default Logos;
