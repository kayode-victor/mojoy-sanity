"use client";
import { ProductProps } from "../../type";
import Price from "./Price";
import { useDispatch } from "react-redux";
import { addToCart } from "@/redux/mojoySlice";
import toast, { Toaster } from "react-hot-toast";

interface Props {
  product: ProductProps;
}
const ProudctInfo = ({ product }: Props) => {
  const dispatch = useDispatch();
  return (
    <div className="flex flex-col gap-5">
      <h2 className="text-2xl font-semibold">{product?.title}</h2>
      <div className="flex flex-col lg:flex-row justify-start lg:items-center gap-4">
        <p className="text-lg font-normal text-gray-500 line-through">
          <Price amount={product?.rowprice ?? 0} />
        </p>

        <Price amount={product?.price ?? 0} className="text-lg font-bold" />

        <p className="text-sm">
          you saved{" "}
          <Price
            className="bg-green-700 text-white px-2 rounded-md"
            amount={(product?.rowprice ?? 0) - (product?.price ?? 0)}
          />
        </p>
      </div>
      <p className="text-sm tracking-wide text-gray-600">
        {product?.description}
      </p>
      <button
        onClick={() => {
          dispatch(addToCart(product));
          toast.success(
            `${(product?.title ?? "Product").substring(0, 12)}... added to cart`
          );
        }}
        className="bg-[#FACA15] font-medium text-black text-sm py-3 px-6 rounded-md hover:text-yellow-400 hover:bg-black duration-300 focus:outline-none focus:ring-offset-2 w-full md:w-auto"
      >
        Add to Cart
      </button>
      <p className="font-normal text-sm">
        <p className="font-normal text-sm">
          <span className="text-base font-medium">Category:</span>
          <span className="mx-2 font-bold text-gray-950">
            {Array.isArray(product?.category)
              ? product?.category.map((cat, idx) => (
                  <span key={idx}>
                    {cat.title}
                    {idx < (product?.category?.length ?? 0) - 1 ? ", " : ""}
                  </span>
                ))
              : product?.category}
          </span>
        </p>
        <span className="text-base font-medium">Brand:</span>
        <span className="mx-2 font-bold text-gray-950">
          {typeof product?.brand === "object" && product?.brand !== null
            ? product.brand.title
            : product?.brand}
        </span>
        <div>
          <strong>ID: </strong>
          <span className="text-md">
            {product?.productId ?? <span className="text-gray-500">N/A</span>}
          </span>
        </div>
      </p>

      <Toaster
        position="bottom-right"
        toastOptions={{
          style: {
            background: "#000",
            color: "#FFEE58",
          },
        }}
      />
    </div>
  );
};

export default ProudctInfo;
