import { defineField, defineType } from "sanity";

export default defineType({
  type: "document",
  name: "lenovobanner",
  title: "Lenovo Banner",
  fields: [
    defineField({
      name: "title",
      title: "Title",
      type: "string",
    }),
    defineField({
      name: "image",
      title: "Image",
      type: "image",
      description: "Banner Image",
      validation: (rule) => rule.required(),
      options: {
        hotspot: true,
      },
      preview: {
        select: {
          imageUrl: "asset.url",
          title: "caption",
        },
      },
    }),
  ],
  preview: {
    select: {
      title: "title",
      media: "image",
    },
  },
});
