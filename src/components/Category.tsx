// app/components/Category.tsx (Server Component)

import { CategoryProps } from "../../type";
import { urlFor } from "@/lib/sanityClient";
import CategoryClient from ./CategoryClient.txs

interface Props {
  categories: CategoryProps[];
}

const Category = ({ categories }: Props) => {
  // Resolve image URLs on the server
  const mapped = categories.map((cat) => ({
    _id: cat._id,
    title: cat.title,
    imageUrl: urlFor(cat.image).url(),
  }));

  return <CategoryClient categories={mapped} />;
};

export default Category;
