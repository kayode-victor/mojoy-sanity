import { client } from "@/lib/sanityClient";

const categoryQuery = `*[_type == 'category']{
...
} | order(_createdAt asc)`;

export default async function CategoryDetails({ params }: { params: { id: string } }) {
  const { id } = params;
  const details = await client.fetch(`${categoryQuery}[_id == "${id}"]`);

  return <div>{JSON.stringify(details)}</div>;
}
