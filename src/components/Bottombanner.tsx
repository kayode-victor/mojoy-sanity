"use client";
import Image from "next/image";
import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import image from "@/assets/bottombanner.png.png";
import Link from "next/link";

const Bottombanner = () => {
  // Calculate the end date of the summer sales promotion (August 28th)
  const summerSalesEndDate = new Date();
  summerSalesEndDate.setMonth(6); // july (zero-based index)
  summerSalesEndDate.setDate(28); // 28th day of the month

  // Calculate the remaining days until the end of the promotion
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const calculateRemainingDays = () => {
    const currentDate = new Date();
    const timeDifference = summerSalesEndDate.getTime() - currentDate.getTime();
    const remainingDays = Math.ceil(timeDifference / (1000 * 3600 * 24));
    return remainingDays >= 0 ? remainingDays : 0;
  };

  const [remainingDays, setRemainingDays] = useState(calculateRemainingDays);

  useEffect(() => {
    const timer = setInterval(() => {
      setRemainingDays(calculateRemainingDays());
    }, 1000);

    return () => clearInterval(timer);
  }, [calculateRemainingDays]); //

  // Format the end date to a string
  const formattedEndDate = `${summerSalesEndDate.toLocaleDateString("en-US", {
    day: "numeric",
    month: "long",
    year: "numeric",
  })}`;

  return (
    <motion.section
      initial={{ opacity: 0, x: 50 }}
      whileInView={{
        opacity: 1,
        x: 0,
        transition: { delay: 0.5, duration: 0.5 },
      }}
      viewport={{ once: true }}
      className="overflow-hidden mx-0 my-2 lg:my-10 lg:mx-10 rounded-lg shadow-2xl md:grid md:grid-cols-3"
    >
      <Image
        alt="bottom banner"
        src={image}
        className="h-full w-full object-cover "
      />

      <div className="p-4 text-center bg-transparent sm:p-6 md:col-span-2 lg:p-8">
        <p className="text-sm font-semibold uppercase tracking-widest">
          Tech Summer Sales
        </p>

        <h2 className="mt-6 font-black uppercase">
          <span className="text-4xl font-black sm:text-5xl lg:text-6xl">
            {" "}
            Enjoy 10% off{" "}
          </span>

          <span className="mt-2 block text-sm">
            On your next order over $100
          </span>
        </h2>

        <Link
          className="mt-8 inline-block w-full bg-black py-4 rounded-md text-sm font-bold uppercase tracking-widest text-white hover:bg-yellow-500"
          href="/shop"
        >
          Get Discount
        </Link>

        <p className="mt-8 text-xs font-medium uppercase text-gray-400">
          Offer valid until {formattedEndDate} *
        </p>

        <p className="mt-2 text-md font-medium uppercase text-red-400 animate-pulse">
          {remainingDays} days left
        </p>
      </div>
    </motion.section>
  );
};

export default Bottombanner;
