import Banner from "@/components/Banner";
import BestSeller from "@/components/BestSeller";
import TopDeal from "@/components/TopDeal";
// import Bottombanner from "@/components/Bottombanner";
import Category from "@/components/Category";
import HomeBanner from "@/components/Homebanner";
import Logos from "@/components/Logos";
import NewArrival from "@/components/NewArrival";
import Services from "@/components/Services";
import { client } from "@/lib/sanityClient";
import Brand from "@/sanity/schemas/brand";
import Brands from "@/components/Brands";
import { groq } from "next-sanity";

export const revalidate = 10;
const bannerQuery = groq`*[_type == 'banner']{
  image,
  _id
} | order(_createdAt asc)`;

const newArrivalQuery = groq`*[_type == 'product' && position =='new-arrival']{
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
  quantity,
 
} | order(_createdAt asc)`;
const topDealQuery = groq`*[_type == 'product' && position =='top-deal']{
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
  productId,
  isnew,
  body,
  quantity,

} | order(discount asc)`;
const bestSellerQuery = groq`*[_type == 'product' && position =='bestseller']{
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
  productId,
  isnew,
  body,
  quantity,

} | order(discount asc)`;
const categoryQuery = `*[_type == 'category']{
...
} | order(_createdAt asc)`;

const productsQuery = groq`*[_type == "brand"]{
  _id,
  title,
  
  "products": *[_type == "product" && references(^._id)]{
    _id,
    title,
    price,
    description,
    image,
    slug,
    position,
    ratings,
    description,
    'brand': brand->title,
    "category":category[0]->title,
     rowprice,
     productId,
    isnew,
    _type,
    _rev,
    _createdAt
  }
}`;
const HomePage = async () => {
  const banners = await client.fetch(bannerQuery);
  const newArrivalProducts = await client.fetch(newArrivalQuery);
  const topDealProducts = await client.fetch(topDealQuery);
  const bestSellerProducts = await client.fetch(bestSellerQuery);
  const categories = await client.fetch(categoryQuery);
  const brandsWithProducts = await client.fetch(productsQuery);
  const today = new Date();
  const showBlackFriday = today.getMonth() === 11; // November

  return (
    <main className="text-sm min-h-screen overflow-hidden">
      <Banner banners={banners} />

      <NewArrival products={newArrivalProducts} />
      <TopDeal products={topDealProducts} />
      <Brands brands={brandsWithProducts} />
      <HomeBanner />
      <Services />
      <Category categories={categories} />
      <BestSeller products={bestSellerProducts} />
      {/* <Bottombanner /> */}
      <Logos />
    </main>
  );
};

export default HomePage;
