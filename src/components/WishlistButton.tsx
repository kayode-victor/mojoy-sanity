"use client";

import { useDispatch, useSelector } from "react-redux";
import { addToWishlist, removeFromWishlist } from "@/redux/wishlistSlice";
import { toast } from "react-hot-toast";
import { AiFillHeart, AiOutlineHeart } from "react-icons/ai";
import { ProductProps } from "../../type";

interface WishlistButtonProps {
  product: ProductProps;
}

const WishlistButton = ({ product }: WishlistButtonProps) => {
  const dispatch = useDispatch();
  const { items } = useSelector(
    (state: { wishlist: { items: ProductProps[] } }) => state.wishlist
  );

  if (!product?._id) {
    // console.error("Product does not have a valid _id");
    return null;
  }

  const isInWishlist = items.some((item) => item._id === product._id);

  const handleWishlistToggle = async () => {
    try {
      if (isInWishlist) {
        await fetch("/api/wishlist", {
          method: "DELETE",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ productId: product._id }),
        });
        dispatch(removeFromWishlist(product._id));
        toast.success(
          `${(product.title ?? "Product").substring(
            0,
            12
          )}... removed from wishlist`
        );
      } else {
        await fetch("/api/wishlist", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ productId: product._id }),
        });
        dispatch(addToWishlist(product));
        toast.success(
          `${(product.title ?? "Product").substring(
            0,
            12
          )}... added to wishlist`
        );
      }
    } catch (error) {
      toast.error("Failed to update wishlist");
    }
  };

  return (
    <button
      onClick={handleWishlistToggle}
      className="bg-gray-800 p-2 rounded-full text-white hover:bg-yellow-400 duration-200"
      aria-label={isInWishlist ? "Remove from wishlist" : "Add to wishlist"}
    >
      {isInWishlist ? (
        <AiFillHeart className="text-red-500" />
      ) : (
        <AiOutlineHeart />
      )}
    </button>
  );
};

export default WishlistButton;
