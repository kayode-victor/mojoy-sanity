import Banner2 from "@/components/Banner2";
import NewArrival from "@/components/NewArrival";
import AllProduct from "@/components/AllProduct";
import { client } from "@/lib/sanityClient";
import { groq } from "next-sanity";

export const revalidate = 10;
const bannerQuery = groq`*[_type == 'dellbanner']{
  image,
  _id
} | order(_createdAt asc)`;

const dellQuery = groq`*[_type == 'product' && brand->title =='dell']{
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
const newDellQuery = groq`*[_type == 'product' && brand->title =='dell' && position =='new-arrival']{
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

const DellPage = async () => {
  const banners = await client.fetch(bannerQuery);
  const dellProducts = await client.fetch(dellQuery);
  const newDellProducts = await client.fetch(newDellQuery);
  return (
    <main className="text-sm min-h-screen overflow-hidden">
      <Banner2
        banners={banners}
        bannerText={"Order your Dell Products here!"}
      />
      <NewArrival products={newDellProducts} />
      <AllProduct products={dellProducts} title="Dell" />
    </main>
  );
};

export default DellPage;
