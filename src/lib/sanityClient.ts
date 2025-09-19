//lib/sanityClient.ts
import { createClient, groq } from "next-sanity";
import imageUrlBuilder from "@sanity/image-url";

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID;
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET;
const apiVersion = process.env.NEXT_PUBLIC_SANITY_API_VERSION;
const token = process.env.SANITY_API_TOKEN;

// Server-side client with write permissions
export const sClient = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  dataset: "production",
  apiVersion: "2023-05-03",
  token: process.env.SANITY_WRITE_TOKEN, // Write-capable token
  useCdn: false, // Disable CDN for mutations
});

export const client = createClient({
  projectId,
  dataset,
  apiVersion,
  token,
  useCdn: false,
});

const builder = imageUrlBuilder(client);

export const urlFor = (source: any) => {
  return builder.image(source);
};

export const productQuery = groq`*[_type == 'product']{
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
  quantity,
  body,
} | order(_createdAt desc)`;

export const products = async () => {
  const productData = await client.fetch(productQuery);
  return productData;
};
