import Banner2 from "@/components/Banner2";
import NewArrival from "@/components/NewArrival";
import AllProduct from "@/components/AllProduct";
import { client } from "@/lib/sanityClient";
import { groq } from "next-sanity";

export const revalidate = 10;
const bannerQuery = groq`*[_type == 'asusbanner']{
  image,
  _id
} | order(_createdAt asc)`;

const asusQuery = groq`*[_type == 'product' && brand->title =='asus']{
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
const newAsusQuery = groq`*[_type == 'product' && brand->title =='asus' && position =='new-arrival']{
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
  const banners = await client.fetch(bannerQuery);
  const asusProducts = await client.fetch(asusQuery);
  const newAsusProducts = await client.fetch(newAsusQuery);
  return (
    <main className="text-sm min-h-screen overflow-hidden">
      <Banner2
        banners={banners}
        bannerText={"Order your Asus Products here!"}
      />
      <NewArrival products={newAsusProducts} />
      <AllProduct products={asusProducts} title="Asus" />
    </main>
  );
};

export default HpPage;
