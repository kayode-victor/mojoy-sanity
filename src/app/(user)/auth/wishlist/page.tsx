"use client";

import { useEffect } from "react";
import { useSession } from "next-auth/react";
import { useDispatch, useSelector } from "react-redux";
import { setWishlist } from "@/redux/wishlistSlice";
import { ProductProps } from "../../../../../type";
import Product from "@/components/Product";
import { toast } from "react-hot-toast";
import Container from "@/components/Container";

const Wishlist = () => {
  const dispatch = useDispatch();
  const { data: session, status } = useSession();
  const wishlistItems = useSelector(
    (state: { wishlist: { items: ProductProps[] } }) => state.wishlist.items
  );

  useEffect(() => {
    if (status !== "authenticated" || !session?.user?.email) return;

    const controller = new AbortController();

    const fetchWishlist = async () => {
      try {
        const response = await fetch("/api/wishlist", {
          method: "GET",
          headers: {
            Authorization: `Bearer ${session?.user?.email}`,
            "Content-Type": "application/json",
          },
          signal: controller.signal,
        });
        if (!response.ok) throw new Error("Failed to fetch wishlist");
        const data = await response.json();
        dispatch(setWishlist(data));
      } catch (error: any) {
        if (error.name !== "AbortError") {
          console.error("Error fetching wishlist:", error);
          toast.error("Failed to load wishlist");
        }
      }
    };

    fetchWishlist();

    return () => {
      controller.abort();
    };
  }, [dispatch, status, session?.user?.email]);

  if (status === "loading") {
    return <div className="container mx-auto px-4 py-8">Loading...</div>;
  }

  if (!session) {
    return (
      <div className="container mx-auto px-4 py-8">
        Please sign in to view your wishlist
      </div>
    );
  }

  return (
    <Container className="w-full pb-10">
      <h1 className="text-3xl font-bold mb-6">Your Wishlist</h1>
      {wishlistItems.length === 0 ? (
        <p className="text-center text-gray-500">Your wishlist is empty</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          {wishlistItems.map((item) => (
            <Product key={item._id} product={item} />
          ))}
        </div>
      )}
    </Container>
  );
};

export default Wishlist;
