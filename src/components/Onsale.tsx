import Link from "next/link";
import { ProductProps } from "../../type";
import Image from "next/image";
import { urlFor } from "@/lib/sanityClient";
import Price from "./Price";

interface Props {
  products: ProductProps[];
}

const Onsale = ({ products }: Props) => {
  return (
    <div className="w-[200px]">
      <div className="w-full">
        <h3 className="text-xl font-semibold mb-6 underline underline-offset-4 decoration-[1px]">
          Products on Sale
        </h3>
        {products.length === 0 ? (
          <div className="px-2 text-lg capitalize">
            No onsale products available.
          </div>
        ) : (
          <div className="flex flex-col gap-2 justify-normal">
            {products?.map((item: ProductProps) => (
              <Link
                key={item?._id}
                href={`/product/${item?.slug?.current}`}
                className="flex items-center gap-4 border-b-[1px] border-b-yellow-400 py-2"
              >
                <Image
                  src={urlFor(item?.image).url()}
                  alt="product image"
                  className="w-24 object-contain"
                  width={200}
                  height={200}
                />
                <div className="flex flex-col gap-2">
                  <p className="text-sm tracking-tighter font-medium">
                    {(item?.title ?? "").substring(0, 7)}
                  </p>
                  <p className="text-sm font-semibold">
                    <Price amount={item?.price ?? 0} />
                  </p>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Onsale;
