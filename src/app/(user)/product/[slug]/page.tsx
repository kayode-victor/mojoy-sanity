import Container from "@/components/Container";
import Onsale from "@/components/Onsale";
import { client, urlFor } from "@/lib/sanityClient";
import { groq } from "next-sanity";
import Image from "next/image";
import { ProductProps } from "../../../../../type";
import ProductInfo from "@/components/ProductInfo";
import { PortableText } from "@portabletext/react";
import { RichText } from "@/components/RichText";
import RelatedProduct from "@/components/RelatedProduct";
import Link from "next/link";

interface Props {
  params: {
    slug: string;
  };
}
export const revalidate = 10;
export const generateStaticParams = async () => {
  const query = groq`*[_type == 'product']{
        slug
    }`;

  const slugs: any = await client.fetch(query);
  const slugRoutes = slugs.map((slug: any) => slug?.slug?.current);
  return slugRoutes?.map((slug: string) => ({
    slug,
  }));
};

const specialOffersQuery = groq`*[_type == 'product' && position == 'on-sale']{
    ...
   } | order(_createdAt asc)`;

const SinglePage = async ({ params: { slug } }: Props) => {
  const query = groq`*[_type == 'product' && slug.current == $slug][0]{
    _id,
  _type,
  _rev,
  _createdAt,
  price,
  rowprice,
  title,
  position,
  ratings,
  description,
  'brand': brand->title,
  slug,
  image,
  "category":category[0]->title,
  isnew,
  productId,  
  body,

  }`;
  const relatedProductsQuery = groq`
*[_type == 'product' && brand._ref == *[_type == 'product' && slug.current == $slug][0].brand._ref && slug.current != $slug]{
    _id,
    _type,
    _rev,
    _createdAt,
    price,
    rowprice,
    title,
    position,
    ratings,
    description,
    'brand': brand->title,
    slug,
    image,
    "category":category[0]->title,
    isnew,
    body,
}| order(_createdAt asc)`;

  const product: ProductProps = await client.fetch(query, { slug });
  const specialOffersProduct = await client.fetch(specialOffersQuery);
  const relatedProducts: ProductProps[] = await client.fetch(
    relatedProductsQuery,
    { slug }
  );
  return (
    <main className="flex flex-col my-10 w-full px-2 lg:px-20 overflow-hidden">
      <div className="flex justify-end px-4">
        <Link
          href={"/shop"}
          className="text-md underline hover:text-yellow-400 font-semibold"
        >
          Back to Shop
        </Link>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-6 gap-4 h-full bg-gray-100 p-4">
        <div>
          <Onsale products={specialOffersProduct} />
        </div>
        <div className="h-full xl:col-span-2 group">
          <Image
            src={urlFor(product?.image).url()}
            alt="product image"
            className="md:ml-8 w-full h-full object-contain duration-300 transition-all ease-in-out group-hover:scale-[1.1]"
            width={230}
            height={230}
          />
        </div>
        <div className="w-full md:col-span-2 xl:col-span-3 xl:p-14 flex flex-col gap-6 justify-center">
          <ProductInfo product={product} />
        </div>
      </div>
      <PortableText value={product?.body} components={RichText} />
      <div className="bg-gray-50 my-5">
        <h1 className="text-2xl text-center lg:text-3xl pt-5 font-medium">
          Items from{" "}
          {typeof product?.brand === "string"
            ? product.brand
            : product?.brand?.title || product?.brand?.title}
        </h1>
        <RelatedProduct relatedProducts={relatedProducts} />
      </div>
    </main>
  );
};

export default SinglePage;
