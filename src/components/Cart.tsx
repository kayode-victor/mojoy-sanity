"use client";
import React, { use, useState } from "react";
import Container from "./Container";
import { useDispatch, useSelector } from "react-redux";
import { StateProps } from "../../type";
import CartItem from "./CartItem";
import { resetCart } from "@/redux/mojoySlice";
import toast from "react-hot-toast";
import emptyCart from "@/assets/emptyCart.png";
import Image from "next/image";
import { motion } from "framer-motion";
import Link from "next/link";
import Price from "./Price";
import { signIn, useSession, getProviders } from "next-auth/react";
import logo from "@/assets/blacklogo.png";
import { useRouter } from "next/navigation";
import { FiTruck } from "react-icons/fi";
import { GoGift } from "react-icons/go";
import { GiReturnArrow } from "react-icons/gi";
import { client } from "@/lib/sanityClient";
import { PaystackButton } from "react-paystack";
import { stat } from "fs";
import { useEffect } from "react";
import CollapsibleText from "./CollapsibleText";
import { states, lgas } from "@/data/statesData";

const Cart = () => {
  const { productData, totalAmount } = useSelector(
    (state: StateProps) => state.mojoy
  );
  const dispatch = useDispatch();
  const { data: session, status } = useSession(); // Get session and status

  // Update email state when session is available
  useEffect(() => {
    if (status === "authenticated" && session?.user?.email) {
      setEmail(session?.user.email);
    }
  }, [session, status]);

  const deliveryTypes = ["Door Delivery", "Pickup"];

  const [selectedState, setSelectedState] = useState<keyof typeof lgas | "">(
    ""
  );
  const [selectedLGA, setSelectedLGA] = useState("");
  const [selectedDelivery, setSelectedDelivery] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [username, setUserName] = useState("");
  const [address, setAddress] = useState("");
  const [formError, setFormError] = useState("");

  const [vat, setVat] = useState(1500); // VAT amount
  const [deliveryFee, setDeliveryFee] = useState(0); // Delivery fee
  const extractedAmount = totalAmount - 5000; // Amount after disc
  const grandTotal = extractedAmount + deliveryFee + vat; // Grand total
  const publicKey = process.env.NEXT_PUBLIC_PAYSTACK_PUBLIC_KEY || "";
  const amount = grandTotal * 100; // Paystack expects amount in kobo
  const router = useRouter();

  const componentProps = {
    username,
    email,
    amount,
    metadata: {
      custom_fields: [
        {
          display_name: "User Name",
          variable_name: "username",
          value: username,
        },
        {
          display_name: "Phone Number",
          variable_name: "phone_number",
          value: phone,
        },
        {
          display_name: "Address",
          variable_name: "address",
          value: address,
        },
        {
          display_name: "State",
          variable_name: "state",
          value: selectedState,
        },
        {
          display_name: "LGA",
          variable_name: "lga",
          value: selectedLGA,
        },
        {
          display_name: "Delivery Type",
          variable_name: "delivery_type",
          value: selectedDelivery,
        },
      ],
    },
    publicKey,
    text: "Proceed to Checkout",
    onSuccess: async (response: any) => {
      try {
        const res = await fetch("/api/create-order", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            username: username,
            userEmail: email,
            amount: amount,
            state: selectedState,
            lga: selectedLGA,
            deliveryType: selectedDelivery,
            reference: response.reference,
            status: "completed",
          }),
        });
        const result = await res.json();
        if (!res.ok) {
          throw new Error(result.error || "Failed to create order");
        }
        setUserName("");
        setEmail("");
        setAddress("");
        setPhone("");
        setSelectedState("");
        setSelectedLGA("");
        setSelectedDelivery("");
        dispatch(resetCart());
        router.push("/success?reference=" + response.reference);
      } catch (err) {
        console.error("Error creating order:", err);
      }
    },
    onClose: () => alert("Payment cancelled."),
  };

  const handleStateChange = (e: any) => {
    setSelectedState(e.target.value);
    setSelectedLGA(""); // Reset LGA when state changes
  };

  // Validate form fields
  const isFormValid =
    username &&
    email &&
    email.includes("@") &&
    phone &&
    address &&
    selectedState &&
    selectedLGA &&
    selectedDelivery;

  // Handle form submission
  const handleSubmit = (e: any) => {
    e.preventDefault();
    if (!isFormValid) {
      setFormError("Please fill out all required fields.");
      return;
    }
    if (status !== "authenticated") {
      signIn();
      return;
    }
    setFormError("");
  };

  const handleReset = () => {
    const confirmed = window.confirm("Are you sure to reset your Cart?");
    if (confirmed) {
      dispatch(resetCart());
      toast.success("Cart Cleared Successfully!");
    } else {
      return null;
    }
  };

  return (
    <Container className="">
      {productData?.length > 0 ? (
        <div className="pb-20">
          <div className="w-full py-4 bg-[#f5f7f7] text-md hidden lg:grid grid-cols-6 place-content-center px-4 font-semibold uppercase">
            <h2 className="col-span-2">Product</h2>
            <h2>Price</h2>
            <h2>Quantity</h2>
            <h2>Sub Total</h2>
            <h2>Actions</h2>
          </div>
          <div className="mt-5">
            {productData.map((item) => (
              <div key={item?._id}>
                <CartItem item={item} />
              </div>
            ))}
          </div>
          <button
            onClick={handleReset}
            className="py-2 px-3 bg-red-500 text-white text-sm font-sm uppercase mb-4 hover:bg-red-700 duration-300 rounded-md"
          >
            Clear Cart
          </button>

          {/* CHECKOUT */}
          <div className="flex flex-col md:flex-row mb-4 md:mb-0 justify-center space-y-4 md:space-y-0 space-x-0 md:space-x-4 items-start min-h-screen p-4 bg-[#F6F7F4] rounded-md">
            <div className="bg-white rounded-lg p-4 w-full max-w-lg border border-gray-300">
              <div className="flex items-center justify-between mb-4">
                <h2 className="hidden md:flex text-lg font-medium text-gray-800">
                  CART CHECKOUT
                </h2>
                <div>
                  <p className="text-md md:text-xs uppercase text-gray-800">
                    Fill in your details to proceed with the order
                  </p>
                </div>
              </div>

              <hr className="border-t border-gray-300 my-4 shadow-sm -mx-4" />

              <form onSubmit={handleSubmit} className="space-y-4">
                {/* State Dropdown */}
                <div className="flex items-center mb-4">
                  <h2 className="w-1/2 hidden md:block text-sm font-medium text-gray-800 mr-2">
                    Delivery Details
                  </h2>

                  <div className="w-full ">
                    <select
                      id="state"
                      value={selectedState}
                      onChange={handleStateChange}
                      className="mt-1 block w-full rounded-md border-gray-300 border shadow-sm text-sm py-2 px-4"
                      required
                    >
                      <option value="" disabled>
                        Select State
                      </option>
                      {states.map((state) => (
                        <option key={state} value={state}>
                          {state}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                {/* LGA Dropdown */}
                <div className="flex items-center justify-end mb-4">
                  <div className="w-full md:w-[65%]">
                    <select
                      id="lga"
                      value={selectedLGA}
                      onChange={(e) => setSelectedLGA(e.target.value)}
                      className="mt-1 block w-full rounded-md border-gray-300 border shadow-sm text-sm py-2 px-4"
                      disabled={!selectedState}
                    >
                      <option value="" disabled>
                        Select LGA
                      </option>
                      {selectedState &&
                        lgas[selectedState as keyof typeof lgas]?.map(
                          (lga: string) => (
                            <option key={lga} value={lga}>
                              {lga}
                            </option>
                          )
                        )}
                    </select>
                  </div>
                </div>

                {/* Delivery Type Dropdown */}
                <div className="flex items-center justify-end mb-4">
                  <div className="w-full md:w-[65%]">
                    <select
                      id="delivery"
                      required
                      value={selectedDelivery}
                      onChange={(e) => setSelectedDelivery(e.target.value)}
                      className="mt-1 block w-full rounded-md border-gray-300 border shadow-sm text-sm py-2 px-4"
                    >
                      <option value="" disabled>
                        Select Delivery Type
                      </option>
                      {deliveryTypes.map((type) => (
                        <option key={type} value={type}>
                          {type}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
                <div className="flex items-center justify-end mb-4">
                  <div className="w-full md:w-[65%]">
                    <input
                      type="username"
                      value={username}
                      onChange={(e) => setUserName(e.target.value)}
                      placeholder="Enter Name..."
                      className="w-full border border-gray-300 rounded-md p-2 text-sm"
                      required
                    />
                  </div>
                </div>

                <div className="flex items-center justify-end mb-4">
                  <div className="w-full md:w-[65%]">
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="Enter Email..."
                      className="w-full border border-gray-300 rounded-md p-2 text-sm"
                      required
                    />
                  </div>
                </div>

                {/* Phone Number Input */}
                <div className="flex items-center justify-end mb-4">
                  <div className="w-full md:w-[65%]">
                    <input
                      id="phone"
                      type="tel"
                      value={phone}
                      required
                      onChange={(e) => setPhone(e.target.value)}
                      placeholder="Enter phone number..."
                      className="mt-1 block w-full rounded-md border-gray-300 border shadow-sm sm:text-sm py-2 px-4"
                    />
                  </div>
                </div>

                {/* Delivery Address Input */}
                <div className="flex items-center justify-end mb-4 ">
                  <div className="w-full md:w-[65%]">
                    <textarea
                      id="address"
                      value={address}
                      onChange={(e) => setAddress(e.target.value)}
                      required
                      placeholder="Enter delivery address..."
                      className="mt-1 block w-full rounded-md border-gray-300 border shadow-sm sm:text-sm py-2 px-4 mb-4"
                      rows={4}
                    />
                  </div>
                </div>

                <hr className="border-t border-gray-300 my-6 shadow-sm" />

                {/* CART TOTALS */}
                <div className="w-full flex justify-between pt-3">
                  <h1 className="text-sm font-medium mt-2 hidden md:block">
                    Cart Totals
                  </h1>
                  <div className="w-full md:w-[75%]">
                    <p className="flex items-center justify-between  border-gray-300 border shadow-sm border-b-0 py-1.5 text-md px-4 font-medium rounded-t-md ">
                      Sub Total{" "}
                      <span>
                        <Price amount={extractedAmount} />
                      </span>
                    </p>
                    <p className="flex items-center justify-between border-gray-300 border shadow-sm border-b-0 py-1.5 text-md px-4 font-medium">
                      Delivery Fees
                      <div className="flex flex-col items-end">
                        {selectedState === "Lagos"
                          ? (() => {
                              if (deliveryFee !== 3500) setDeliveryFee(3500);
                              return (
                                <span className="font-semibold tracking-wide font-titleFont">
                                  <Price amount={3500} />
                                </span>
                              );
                            })()
                          : selectedState && states.includes(selectedState)
                          ? (() => {
                              if (deliveryFee !== 0) setDeliveryFee(0);
                              return (
                                <span className="font-normal tracking-wide font-titleFont">
                                  On Request
                                </span>
                              );
                            })()
                          : (() => {
                              if (deliveryFee !== 0) setDeliveryFee(0);
                              return (
                                <span className="font-normal tracking-wide font-titleFont text-gray-400">
                                  Not Available
                                </span>
                              );
                            })()}
                      </div>
                    </p>
                    <div className="flex items-center justify-between border-gray-300 border shadow-sm border-b-0 py-1.5 text-md px-4 font-medium">
                      <div className="flex space-x-3 items-center">
                        <span>VAT</span>
                        <span className="bg-[#EDF0EE] rounded-md text-[#070E20] px-2 text-sm">
                          7.5%
                        </span>
                      </div>

                      <div className="flex flex-col items-end">
                        <span className="font-semibold tracking-wide font-titleFont">
                          {/*price on state VAT*/}
                          <Price amount={vat} />
                        </span>
                      </div>
                    </div>
                    <p className="flex items-center justify-between border-gray-300 border shadow-sm py-1.5 text-md px-4 font-medium rounded-b-md">
                      Total
                      <span className="font-bold tracking-wide text-lg font-titleFont">
                        <Price amount={grandTotal} />
                      </span>
                    </p>
                  </div>
                </div>

                <div className="flex items-center justify-start w-[50%] -mt-8 md:ml-[120px]">
                  {grandTotal < 200000 && (
                    <span className="bg-[#CEFAD0] rounded-sm text-[#006400] px-3 py-1 text-xs">
                      Pay On Delivery Available
                    </span>
                  )}
                </div>

                <hr className="border-t border-gray-300 my-4 shadow-sm -mx-4" />
                {/* Checkout Button */}
                <div className="flex justify-end w-full items-center">
                  <PaystackButton
                    className={`bg-[#FACA15] font-medium text-black text-sm py-2 px-5 rounded-md hover:text-yellow-400 hover:bg-black duration-300 focus:outline-none focus:ring-offset-2 w-full md:w-auto ${
                      !isFormValid ? "opacity-50 cursor-not-allowed" : ""
                    }`}
                    {...componentProps}
                    disabled={!isFormValid}
                  />
                </div>
              </form>
            </div>

            <div className="h-full bg-white rounded-lg p-4 w-full max-w-xs border border-gray-300">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-lg font-medium text-gray-800">
                  DELIVERY & RETURNS
                </h2>
              </div>
              <hr className="border-t border-gray-300 my-4 shadow-sm -mx-4" />

              <p className="text-sm text-gray-600 mb-4">
                The BEST products, delivered faster. Now PAY on DELIVERY, Cash
                or Bank Transfer Anywhere, No problem!
              </p>
              <hr className="border-t border-gray-300 my-4 shadow-sm -mx-4" />
              {/* Delivery Section */}
              <div className="flex items-start mb-3">
                <FiTruck className="text-gray-600 mr-3 text-4xl" />
                {/* Delivery Icon */}
                <div>
                  <h2 className="text-l font-semibold text-black mb-2">
                    Door Delivery
                  </h2>
                  <div className="text-sm text-gray-600">
                    <p className="block">
                      Delivery Fees within Lagos
                      <span className="text-black font-semibold"> ₦ 3,500</span>
                    </p>
                    <p className="block">
                      while Delivery outside Lagos
                      <span className="text-black font-semibold">
                        {" "}
                        is on Request
                      </span>
                    </p>
                  </div>
                </div>
              </div>
              {/* Pickup Section */}
              <div className="flex items-start mb-3">
                <GoGift className="text-gray-600 mr-3 text-4xl" />
                {/* Pickup Icon */}
                <div>
                  <h2 className="text-l font-semibold text-black mb-2">
                    Pickup Station
                  </h2>
                  <p className="text-sm text-gray-600 mb-4">
                    Ready for pickup immediately after payment.
                  </p>
                </div>
              </div>
              <hr className="border-t border-gray-300 my-4 shadow-sm -mx-4" />

              {/* Return Section */}
              <div className="flex items-start mb-3">
                {/* Return Icon */}
                <GiReturnArrow className="text-gray-600 mr-3 text-6xl" />

                <div>
                  <h2 className="text-l font-semibold text-black mb-2">
                    Return Policy
                  </h2>
                  <p className="text-sm text-gray-600">
                    <CollapsibleText
                      text="Return within 7 days for ALL eligible items. When returning an item for any reason, you must do so in the exact condition you received it from us, with its original packaging and all tags and labels attached."
                      slicedAt={80}
                    />
                  </p>
                </div>
              </div>
            </div>
          </div>
          {/* END OF CHECKOUT */}
        </div>
      ) : (
        <motion.div
          initial={{ y: 30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.4 }}
          className="flex flex-col md:flex-row justify-center items-center gap-4 pb-20"
        >
          <div>
            <Image
              src={emptyCart}
              alt="emptyCart"
              className="w-80 rounded-lg p-4 mx-auto"
            />
          </div>
          <div className="max-w-[500px] p-4 py-8 bg-white flex flex-col gap-4 items-center rounded-md shadow-lg">
            <h1 className="text-xl font-bold uppercase">
              Your Cart feels lonely.
            </h1>
            <p className="text-sm text-center px-10 -mt-2">
              Your Shopping cart lives to serve. Give it purpose - fill it with
              books, electronics, videos, etc. and make it happy.
            </p>
            <Link
              href={"/shop"}
              className="bg-primary rounded-md cursor-pointer hover:bg-yellow-400 active:bg-yellow-500 px-8 py-2 font-semibold text-lg text-gray-200 hover:text-white duration-300"
            >
              Continue Shopping
            </Link>
          </div>
        </motion.div>
      )}
    </Container>
  );
};

export default Cart;
