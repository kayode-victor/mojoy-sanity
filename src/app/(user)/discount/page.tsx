import Banner from "@/components/Banner";
import NewArrival from "@/components/NewArrival";
import AllProduct from "@/components/AllProduct";
import { client } from "@/lib/sanityClient";
import { groq } from "next-sanity";

export const revalidate = 10;
const bannerQuery = groq`*[_type == 'hpbanner']{
  image,
  _id
} | order(_createdAt asc)`;

const hpQuery = groq`*[_type == 'product' && brand->title =='hp']{
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
  quantity,
 
} | order(_createdAt asc)`;

const newHpQuery = groq`*[_type == 'product' && brand->title =='hp' && position =='new-arrival']{
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
  quantity,
 
} | order(_createdAt asc)`;

const HpPage = async () => {
  const hpProducts = await client.fetch(hpQuery);
  const newHpProducts = await client.fetch(newHpQuery);
  return (
    <main className="text-sm min-h-screen overflow-hidden">
      <NewArrival products={newHpProducts} />
      <AllProduct products={hpProducts} title="Hp" />
    </main>
  );
};

export default HpPage;
