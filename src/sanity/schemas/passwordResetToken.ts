import { defineType, defineField } from "sanity";

export default defineType({
  name: "passwordResetToken",
  title: "Password Reset Token",
  type: "document",
  fields: [
    defineField({
      name: "user",
      title: "User",
      type: "reference",
      to: [{ type: "user" }],
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "token",
      title: "Token",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "expiresAt",
      title: "Expires At",
      type: "datetime",
      validation: (Rule) => Rule.required(),
    }),
  ],
});
