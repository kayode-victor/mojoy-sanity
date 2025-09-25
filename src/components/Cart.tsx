"use client";
import React, { useState, useEffect } from "react";
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
  const { productData, totalAmount } = useSelector(
    (state: StateProps) => state.mojoy
  );
  const dispatch = useDispatch();
  const { data: session, status } = useSession();
  const router = useRouter();

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

  const [vat] = useState(1500); // Fixed VAT
  const [deliveryFee, setDeliveryFee] = useState(0);

  useEffect(() => {
    if (status === "authenticated" && session?.user?.email) {
      setEmail(session?.user.email);
    }
  }, [session, status]);

  const extractedAmount = totalAmount - 5000; // discount logic
  const grandTotal = extractedAmount + deliveryFee + vat;

  const publicKey = process.env.NEXT_PUBLIC_PAYSTACK_PUBLIC_KEY || "";
  const amount = grandTotal * 100;

  const handleStateChange = (e: any) => {
    setSelectedState(e.target.value);
    setSelectedLGA("");
  };

  // Update delivery fee dynamically
  useEffect(() => {
    if (selectedDelivery === "Door Delivery") {
      if (selectedState === "Lagos") {
        setDeliveryFee(3500);
      } else if (selectedState) {
        setDeliveryFee(0); // show "On Request" in UI
      }
    } else {
      setDeliveryFee(0); // Pickup = free
    }
  }, [selectedDelivery, selectedState]);

  const isFormValid =
    username &&
    email &&
    email.includes("@") &&
    phone &&
    (selectedDelivery === "Pickup" ||
      (address && selectedState && selectedLGA && selectedDelivery));

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
        { display_name: "Address", variable_name: "address", value: address },
        { display_name: "State", variable_name: "state", value: selectedState },
        { display_name: "LGA", variable_name: "lga", value: selectedLGA },
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
        if (!res.ok) throw new Error(result.error || "Failed to create order");

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
    }
  };

  return (
    <Container>
      {productData?.length > 0 ? (
        <div className="pb-20">
          {/* Cart Header */}
          <div className="w-full py-4 bg-brand-light text-md hidden lg:grid grid-cols-6 place-content-center px-4 font-semibold uppercase text-brand-dark rounded-t-xl">
            <h2 className="col-span-2">Product</h2>
            <h2>Price</h2>
            <h2>Quantity</h2>
            <h2>Sub Total</h2>
            <h2>Actions</h2>
          </div>

          {/* Cart Items */}
          <div className="mt-5 space-y-4">
            {productData.map((item) => (
              <div
                key={item?._id}
                className="rounded-xl border border-gray-200 shadow-sm"
              >
                <CartItem item={item} />
              </div>
            ))}
          </div>

          {/* Reset Cart */}
          <button
            onClick={handleReset}
            className="py-2 px-3 bg-red-500 text-white text-sm uppercase mb-4 hover:bg-red-700 duration-300 rounded-md"
          >
            Clear Cart
          </button>

          {/* Checkout */}
          <div className="flex flex-col md:flex-row justify-center space-y-4 md:space-y-0 md:space-x-4 items-start min-h-screen p-4 bg-brand-light rounded-2xl">
            {/* Form */}
            <div className="bg-white rounded-2xl p-6 w-full max-w-lg border border-gray-200 shadow-md">
              <form onSubmit={handleSubmit} className="space-y-4">
                <h2 className="text-lg font-medium text-gray-800 mb-4">
                  CART CHECKOUT
                </h2>

                {/* Delivery Type */}
                <select
                  id="delivery"
                  required
                  value={selectedDelivery}
                  onChange={(e) => setSelectedDelivery(e.target.value)}
                  className="block w-full rounded-md border-gray-300 border shadow-sm text-sm py-2 px-4"
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

                {/* Show state/LGA/address if Door Delivery */}
                {selectedDelivery === "Door Delivery" && (
                  <>
                    <select
                      id="state"
                      value={selectedState}
                      onChange={handleStateChange}
                      className="block w-full rounded-md border-gray-300 border shadow-sm text-sm py-2 px-4"
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

                    <select
                      id="lga"
                      value={selectedLGA}
                      onChange={(e) => setSelectedLGA(e.target.value)}
                      className="block w-full rounded-md border-gray-300 border shadow-sm text-sm py-2 px-4"
                      disabled={!selectedState}
                      required
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

                    <textarea
                      id="address"
                      value={address}
                      onChange={(e) => setAddress(e.target.value)}
                      placeholder="Enter delivery address..."
                      className="block w-full rounded-md border-gray-300 border shadow-sm text-sm py-2 px-4"
                      rows={3}
                      required
                    />
                  </>
                )}

                {/* Common fields */}
                <input
                  type="text"
                  value={username}
                  onChange={(e) => setUserName(e.target.value)}
                  placeholder="Enter Name..."
                  className="w-full border border-gray-300 rounded-md p-2 text-sm"
                  required
                />

                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter Email..."
                  className="w-full border border-gray-300 rounded-md p-2 text-sm"
                  required
                />

                <input
                  type="tel"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="Enter Phone..."
                  className="w-full border border-gray-300 rounded-md p-2 text-sm"
                  required
                />

                {/* Totals */}
                <div className="pt-6">
                  <h1 className="text-sm font-medium mb-2">Cart Totals</h1>
                  <div className="w-full rounded-xl overflow-hidden border border-gray-200 shadow">
                    <p className="flex justify-between border-b py-2 px-4">
                      Sub Total <Price amount={extractedAmount} />
                    </p>
                    <p className="flex justify-between border-b py-2 px-4">
                      Delivery Fees{" "}
                      {selectedDelivery === "Door Delivery" ? (
                        selectedState === "Lagos" ? (
                          <Price amount={3500} />
                        ) : selectedState ? (
                          "On Request"
                        ) : (
                          "Pending"
                        )
                      ) : (
                        "₦0"
                      )}
                    </p>
                    <p className="flex justify-between border-b py-2 px-4">
                      VAT (7.5%) <Price amount={vat} />
                    </p>
                    <p className="flex justify-between py-2 px-4 font-bold text-lg bg-brand-accent/10">
                      Total <Price amount={grandTotal} />
                    </p>
                  </div>
                </div>

                {/* Checkout Button */}
                <PaystackButton
                  className={`bg-brand-accent font-medium text-black text-sm py-2 px-5 rounded-md hover:bg-brand-dark hover:text-brand-light duration-300 w-full ${
                    !isFormValid ? "opacity-50 cursor-not-allowed" : ""
                  }`}
                  {...componentProps}
                  disabled={!isFormValid}
                />
              </form>
            </div>

            {/* Delivery & Returns */}
            <div className="h-full bg-white rounded-2xl p-6 w-full max-w-xs border border-gray-200 shadow-md">
              <h2 className="text-lg font-medium text-gray-800 mb-4">
                DELIVERY & RETURNS
              </h2>
              <p className="text-sm text-gray-600 mb-4">
                The BEST products, delivered faster. Now PAY on DELIVERY, Cash
                or Bank Transfer Anywhere, No problem!
              </p>

              <div className="flex items-start mb-3">
                <FiTruck className="text-gray-600 mr-3 text-4xl" />
                <div>
                  <h2 className="font-semibold text-black mb-2">
                    Door Delivery
                  </h2>
                  <p className="text-sm text-gray-600">
                    Lagos Delivery Fee: ₦ 3,500 <br />
                    Outside Lagos: On Request
                  </p>
                </div>
              </div>

              <div className="flex items-start mb-3">
                <GoGift className="text-gray-600 mr-3 text-4xl" />
                <div>
                  <h2 className="font-semibold text-black mb-2">
                    Pickup Station
                  </h2>
                  <p className="text-sm text-gray-600">
                    Ready for pickup immediately after payment.
                  </p>
                </div>
              </div>

              <div className="flex items-start mb-3">
                <GiReturnArrow className="text-gray-600 mr-3 text-6xl" />
                <div>
                  <h2 className="font-semibold text-black mb-2">
                    Return Policy
                  </h2>
                  <CollapsibleText
                    text="Return within 7 days for ALL eligible items. Must be in exact condition received, with packaging and all tags/labels."
                    slicedAt={80}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <motion.div
          initial={{ y: 30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.4 }}
          className="flex flex-col md:flex-row justify-center items-center gap-4 pb-20"
        >
          <Image
            src={emptyCart}
            alt="emptyCart"
            className="w-80 rounded-xl p-4 mx-auto"
          />
          <div className="max-w-[500px] p-6 bg-white flex flex-col gap-4 items-center rounded-2xl shadow-lg">
            <h1 className="text-xl font-bold uppercase">
              Your Cart feels lonely.
            </h1>
            <p className="text-sm text-center px-10 -mt-2">
              Your Shopping cart lives to serve. Give it purpose - fill it with
              books, electronics, videos, etc. and make it happy.
            </p>
            <Link
              href={"/shop"}
              className="bg-brand-accent rounded-md hover:bg-brand-dark hover:text-brand-light px-8 py-2 font-semibold text-lg duration-300"
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
