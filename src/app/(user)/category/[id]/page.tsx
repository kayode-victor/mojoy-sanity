'use client'
import { client } from "@/lib/sanityClient";
import { useParams } from "next/navigation";


const categoryQuery = `*[_type == 'category']{
...
} | order(_createdAt asc)`;

const CategoryDetails = async () => {
    const id = useParams()
    console.log(id);
    // const details = await client.fetch(`${categoryQuery}[_id == "${id}"]`);
    // console.log(details);
    return <div>CategoryDetails</div>;
}

export default CategoryDetails;