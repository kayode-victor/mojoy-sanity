"use client";
import React from "react";
import Link from "next/link";

export default function PromoBanner() {
    return (
        <section className="w-full max-w-6xl mx-auto my-8 px-4">
            <div className="relative rounded-2xl overflow-hidden shadow-lg bg-white">
                {/* Background accent */}
                <div className="absolute inset-0 -z-10 bg-gradient-to-r from-[#1B4351]/90 via-white/0 to-[#CD661A]/10" />

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center p-6 md:p-10">

                    {/* Left Side */}
                    <div className="space-y-6">
                        <div className="flex items-center gap-3">
                            <div className="text-[14px] font-semibold uppercase tracking-wide bg-[#FFF354] text-[#1B4351] px-3 py-1 rounded-full shadow">
                                Limited Time
                            </div>
                            <div className="text-gray-500 text-sm">While stocks last</div>
                        </div>

                        <h2
                            className="text-3xl md:text-4xl font-extrabold"
                            style={{ fontFamily: "Vonique 64, Raleway, system-ui" }}
                        >
                            Big Laptop Sale — Save on top brands
                        </h2>

                        <p className="text-gray-600 max-w-xl">
                            Grab amazing discounts on laptops today. Get an extra bag free with every purchase. Fast delivery across Nigeria.
                        </p>

                        <div className="flex flex-wrap gap-3">

                            {/* HP EliteBook Badge */}
                            <div className="flex items-center gap-3 bg-white/80 backdrop-blur-sm border border-[#1B4351] rounded-lg px-4 py-3 shadow-sm">
                                <div className="text-sm font-bold text-[#1B4351]">HP EliteBook</div>
                                <div className="ml-2 text-sm font-extrabold text-[#CD661A]">₦20,000 OFF</div>
                            </div>

                            {/* Other Laptop Badge */}
                            <div className="flex items-center gap-3 bg-white/90 rounded-lg px-4 py-3 shadow-sm border border-gray-200">
                                <div className="text-sm font-bold text-gray-700">All other laptops</div>
                                <div className="ml-2 text-sm font-extrabold text-[#1B4351]">₦10,000 OFF + Free Bag</div>
                            </div>

                            {/* CTA Button using Link */}

                        </div>

                        <div className="text-xs text-gray-500">
                            T&Cs apply. Offer valid on participating models only.
                        </div>
                    </div>

                    {/* Right Side Images */}
                    <div className="grid grid-cols-2 gap-4">

                        {/* HP Image */}
                        <div className="relative rounded-xl overflow-hidden border border-gray-100 bg-white shadow-sm">
                            <img
                                src="/assets/hp-elitebook-placeholder.jpg"
                                alt="HP EliteBook"
                                className="w-full h-40 object-cover"
                            />
                            <div className="p-3">
                                <div className="text-sm font-semibold">HP EliteBook</div>
                                <div className="text-xs text-gray-500">Top business performance</div>
                            </div>
                            <div className="absolute top-3 left-3 bg-[#CD661A] text-white text-xs font-bold px-2 py-1 rounded">
                                ₦20,000 OFF
                            </div>
                        </div>

                        {/* Other Laptops */}
                        <div className="relative rounded-xl overflow-hidden border border-gray-100 bg-white shadow-sm">
                            <img
                                src="/assets/other-laptop-placeholder.jpg"
                                alt="Other laptop"
                                className="w-full h-40 object-cover"
                            />
                            <div className="p-3">
                                <div className="text-sm font-semibold">Other Laptops</div>
                                <div className="text-xs text-gray-500">Great value picks</div>
                            </div>
                            <div className="absolute top-3 left-3 bg-[#1B4351] text-white text-xs font-bold px-2 py-1 rounded">
                                ₦10,000 OFF
                            </div>
                        </div>

                        {/* Footer */}
                        <div className="col-span-2 flex items-center justify-between bg-[#f8fafb] p-3 rounded-b-xl border-t border-gray-100">
                            <div className="flex items-center gap-3">
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    className="h-6 w-6"
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    stroke="currentColor"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth="2"
                                        d="M3 3h18v4H3zM3 10h18v11H3z"
                                    />
                                </svg>
                                <div>
                                    <div className="text-sm font-semibold">Free Laptop Bag</div>
                                    <div className="text-xs text-gray-500">Included with every laptop purchase</div>
                                </div>
                            </div>

                            <div className="text-right text-xs text-gray-600">
                                Ends: 11 Jan 2026
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
