"use client";
import Container from "@/components/Container";
import { resetCart } from "@/redux/mojoySlice";
import Link from "next/link";
import { redirect } from "next/navigation";
import React, { useEffect } from "react";
import { useDispatch } from "react-redux";

const SucessPage = ({ searchParams }: any) => {
  const dispatch = useDispatch();

  // useEffect(() => {
  //   !searchParams?.session_id ? redirect("/") : dispatch(resetCart());
  // }, [dispatch, searchParams?.session_id]);
  return (
    <Container className="flex items-center justify-center py-20">
      <div className="min-h-[400px] flex flex-col ">
        <div>
          <div>{/*order*/}</div>
          <div>{/*download order code*/}</div>
        </div>
        <div className="flex flex-col items-center justify-center gap-y-5">
          <h2 className="lg:text-4xl text-2xl text-center font-bold">
            Your Payment Accepted by Mojoy
          </h2>
          <Link
            href={"/"}
            className="bg-yellow-400 text-slate-100 w-44 h-12 flex items-center justify-center rounded-full text-base font-semibold hover:bg-gray-950 duration-300"
          >
            Continue Shopping
          </Link>
        </div>
      </div>
    </Container>
  );
};

export default SucessPage;
