"use client";
import React, { useEffect, useState } from "react";
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
import { signIn, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { FiTruck } from "react-icons/fi";
import { GoGift } from "react-icons/go";
import { GiReturnArrow } from "react-icons/gi";
import { PaystackButton } from "react-paystack";
import CollapsibleText from "./CollapsibleText";
import { states, lgas } from "@/data/statesData";

const Cart = () => {
  // redux state
  const { productData, totalAmount } = useSelector(
    (state: StateProps) => state.mojoy
  );
  const dispatch = useDispatch();

  // auth session
  const { data: session, status } = useSession();

  // form state
  const deliveryTypes = ["Door Delivery", "Pickup"];
  const [selectedDelivery, setSelectedDelivery] = useState<string>("");
  const [selectedState, setSelectedState] = useState<keyof typeof lgas | "">(
    ""
  );
  const [selectedLGA, setSelectedLGA] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [username, setUserName] = useState("");
  const [address, setAddress] = useState("");
  const [formError, setFormError] = useState<string>("");

  // control validation UI
  const [submitted, setSubmitted] = useState(false);

  // fees & totals
  const [vat, setVat] = useState<number>(1500); // VAT amount (fixed)
  const [deliveryFee, setDeliveryFee] = useState<number>(0);
  // NOTE: original code used extractedAmount = totalAmount - 5000 — preserved to avoid breaking current logic
  const extractedAmount = totalAmount - 5000;
  const grandTotal = extractedAmount + deliveryFee + vat;

  // paystack
  const publicKey = process.env.NEXT_PUBLIC_PAYSTACK_PUBLIC_KEY || "";
  const amount = Math.max(0, Math.round(grandTotal * 100)); // in kobo
  const router = useRouter();

  // update email from session when authenticated
  useEffect(() => {
    if (status === "authenticated" && session?.user?.email) {
      setEmail(session?.user.email ?? "");
    }
  }, [session, status]);

  // update delivery fee when state/delivery changes
  useEffect(() => {
    if (selectedDelivery === "Door Delivery" && selectedState === "Lagos") {
      setDeliveryFee(3500);
    } else {
      setDeliveryFee(0);
    }
  }, [selectedDelivery, selectedState]);

  // handle state change
  const handleStateChange = (e: any) => {
    setSelectedState(e.target.value);
    setSelectedLGA("");
  };

  // validation logic — LGA/state required only for Door Delivery
  const isFormValid = () => {
    if (!username?.trim()) return false;
    if (!email?.includes("@")) return false;
    if (!phone?.trim()) return false;
    if (!address?.trim()) return false;
    if (!selectedDelivery) return false;
    if (selectedDelivery === "Door Delivery") {
      if (!selectedState) return false;
      if (!selectedLGA) return false;
    }
    return true;
  };

  // Paystack props (fixed metadata shape)
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
            username,
            userEmail: email,
            amount,
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
        // clear form + cart
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

  // form submit (validates and triggers sign-in flow if not authenticated)
  const handleSubmit = (e: any) => {
    e.preventDefault();
    setSubmitted(true);

    if (!isFormValid()) {
      setFormError("Please fill out all required fields correctly.");
      return;
    }

    setFormError("");

    if (status !== "authenticated") {
      // triggers next-auth sign in
      signIn();
      return;
    }

    // If user is authenticated, PaystackButton will handle payment on click.
  };

  const handleReset = () => {
    const confirmed = window.confirm("Are you sure to reset your Cart?");
    if (confirmed) {
      dispatch(resetCart());
      toast.success("Cart Cleared Successfully!");
    }
  };

  return (
    <Container className="">
      {productData?.length > 0 ? (
        <div className="pb-20">
          {/* Table headings for desktop */}
          <div className="w-full py-4 bg-[#f5f7f7] text-md hidden lg:grid grid-cols-6 place-content-center px-4 font-semibold uppercase">
            <h2 className="col-span-2">Product</h2>
            <h2>Price</h2>
            <h2>Quantity</h2>
            <h2>Sub Total</h2>
            <h2>Actions</h2>
          </div>

          {/* Product items */}
          <div className="mt-5">
            {productData.map((item: any) => (
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
            {/* LEFT: Form */}
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
                {/* Delivery Type (first) */}
                <div className="mb-2">
                  <label className="text-sm font-medium block mb-1">
                    Delivery Type
                  </label>
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
                  {submitted && !selectedDelivery && (
                    <p className="text-red-500 text-sm mt-1">
                      Please select a delivery type.
                    </p>
                  )}
                </div>

                {/* Show State & LGA only if Door Delivery */}
                {selectedDelivery === "Door Delivery" && (
                  <>
                    <div className="mb-2">
                      <label className="text-sm font-medium block mb-1">
                        Select State
                      </label>
                      <select
                        id="state"
                        value={selectedState}
                        onChange={handleStateChange}
                        className="mt-1 block w-full rounded-md border-gray-300 border shadow-sm text-sm py-2 px-4"
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
                      {submitted && !selectedState && (
                        <p className="text-red-500 text-sm mt-1">
                          Please select a state for delivery.
                        </p>
                      )}
                    </div>

                    <div className="mb-2">
                      <label className="text-sm font-medium block mb-1">
                        Select LGA
                      </label>
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
                      {submitted &&
                        selectedDelivery === "Door Delivery" &&
                        !selectedLGA && (
                          <p className="text-red-500 text-sm mt-1">
                            Please select an LGA for delivery.
                          </p>
                        )}
                    </div>
                  </>
                )}

                {/* Name */}
                <div>
                  <label className="text-sm font-medium block mb-1">Name</label>
                  <input
                    type="text"
                    value={username}
                    onChange={(e) => setUserName(e.target.value)}
                    placeholder="Enter Name..."
                    className="w-full border border-gray-300 rounded-md p-2 text-sm"
                  />
                  {submitted && !username && (
                    <p className="text-red-500 text-sm mt-1">
                      Enter your name.
                    </p>
                  )}
                </div>

                {/* Email */}
                <div>
                  <label className="text-sm font-medium block mb-1">
                    Email
                  </label>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter Email..."
                    className="w-full border border-gray-300 rounded-md p-2 text-sm"
                  />
                  {submitted && (!email || !email.includes("@")) && (
                    <p className="text-red-500 text-sm mt-1">
                      Enter a valid email address.
                    </p>
                  )}
                </div>

                {/* Phone */}
                <div>
                  <label className="text-sm font-medium block mb-1">
                    Phone Number
                  </label>
                  <input
                    id="phone"
                    type="tel"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="Enter phone number..."
                    className="mt-1 block w-full rounded-md border-gray-300 border shadow-sm sm:text-sm py-2 px-4"
                  />
                  {submitted && !phone && (
                    <p className="text-red-500 text-sm mt-1">
                      Enter a phone number.
                    </p>
                  )}
                </div>

                {/* Address */}
                <div>
                  <label className="text-sm font-medium block mb-1">
                    Delivery Address
                  </label>
                  <textarea
                    id="address"
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                    placeholder="Enter delivery address..."
                    className="mt-1 block w-full rounded-md border-gray-300 border shadow-sm sm:text-sm py-2 px-4 mb-4"
                    rows={4}
                  />
                  {submitted && !address && (
                    <p className="text-red-500 text-sm mt-1">
                      Enter a delivery address.
                    </p>
                  )}
                </div>

                {/* Error summary */}
                {formError && (
                  <div className="text-red-600 text-sm mb-2">{formError}</div>
                )}

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
                        {selectedDelivery === "Door Delivery" &&
                        selectedState === "Lagos" ? (
                          <span className="font-semibold tracking-wide">
                            <Price amount={3500} />
                          </span>
                        ) : selectedDelivery === "Door Delivery" &&
                          selectedState ? (
                          <span className="font-normal tracking-wide">
                            On Request
                          </span>
                        ) : (
                          <span className="font-normal tracking-wide text-gray-400">
                            Not Applicable
                          </span>
                        )}
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
                        <span className="font-semibold tracking-wide">
                          <Price amount={vat} />
                        </span>
                      </div>
                    </div>

                    <p className="flex items-center justify-between border-gray-300 border shadow-sm py-1.5 text-md px-4 font-medium rounded-b-md">
                      Total
                      <span className="font-bold tracking-wide text-lg">
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
                      !isFormValid() ? "opacity-50 cursor-not-allowed" : ""
                    }`}
                    {...componentProps}
                    disabled={!isFormValid()}
                  />
                </div>
              </form>
            </div>

            {/* RIGHT: Delivery & returns */}
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

              <div className="flex items-start mb-3">
                <FiTruck className="text-gray-600 mr-3 text-4xl" />
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

              <div className="flex items-start mb-3">
                <GoGift className="text-gray-600 mr-3 text-4xl" />
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

              <div className="flex items-start mb-3">
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
              gadgets, accessories, electronics, etc. and make it happy.
            </p>
            <Link
              href={"/shop"}
              className="bg-[#1B4351] rounded-md cursor-pointer hover:bg-yellow-400 active:bg-yellow-500 px-8 py-2 font-semibold text-lg text-white duration-300"
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
