// schemas/user.js
import { defineField, defineType } from "sanity";

export default defineType({
  name: "user",
  title: "User",
  type: "document",
  fields: [
    defineField({
      name: "name",
      title: "Name",
      type: "string",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "email",
      title: "Email",
      type: "string",
      validation: (rule) => rule.required().email(),
    }),
    defineField({
      name: "password",
      title: "Password",
      type: "string", // Hashed password
      hidden: true, // Hide in Sanity Studio for security
    }),
    defineField({
      name: "createdAt",
      title: "Created At",
      type: "datetime",
      validation: (rule) => rule.required(),
    }),
  ],
});
