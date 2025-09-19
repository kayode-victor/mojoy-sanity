import { defineType, defineField } from "sanity";

export default defineType({
  name: "wishlist",
  title: "Wishlist",
  type: "document",
  fields: [
    defineField({
      name: "userId",
      title: "User ID",
      type: "string",
    }),
    defineField({
      name: "products",
      title: "Products",
      type: "array",
      //@ts-ignore
      of: [
        defineField({
          type: "reference",
          //@ts-ignore
          to: [{ type: "product" }],
        }),
      ],
    }),
  ],
});
