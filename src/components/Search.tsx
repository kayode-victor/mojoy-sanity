import { useState, useEffect } from "react";
import { IoSearchOutline, IoClose } from "react-icons/io5";
import { products } from "../lib/sanityClient";
import { ProductProps } from "../../type";
import Link from "next/link";

const Search = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState<ProductProps[]>([]);

  useEffect(() => {
    if (searchQuery) {
      // Fetch products from Sanity that match the search query
      const searchProducts = async () => {
        try {
          const productData = await products();
          const filteredResults = productData.filter(
            (product: ProductProps) =>
              typeof product.title === "string" &&
              product.title.toLowerCase().includes(searchQuery.toLowerCase())
          );
          setSearchResults(filteredResults.slice(0, 10));
        } catch (error) {
          console.error("Error fetching products:", error);
        }
      };
      searchProducts();
    } else {
      setSearchResults([]);
    }
  }, [searchQuery]);

  const handleLinkClick = () => {
    // Reset search query when a link is clicked
    setSearchQuery("");
  };

  return (
    <div className="relative w-full flex items-center justify-center mx-2">
      <div className="flex w-full items-center justify-between border-[1px] border-gray-200  px-5 lg:mx-20  rounded-md  lg:min-w-[600px] min-w-[320px] h-10 text-sm text-primary">
        <input
          type="text"
          placeholder="Search your products here..."
          className="flex w-full bg-transparent placeholder:to-gray-400 outline-none"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        {searchQuery ? (
          <IoClose
            onClick={() => setSearchQuery("")}
            className="w-5 h-5 hover:cursor-pointer hover:text-yellow-400"
          />
        ) : (
          <IoSearchOutline className="w-5 h-5 hover:cursor-pointer text-[#FACA15]" />
        )}
      </div>

      {/* Display search results */}
      {searchResults.length > 0 && (
        <div className="absolute lg:max-w-[600px]  top-10 bg-white w-full border border-gray-200 rounded-md shadow-md">
          <ul>
            {searchResults.map((product) => (
              <div
                key={product._id || ""}
                className="px-4 py-2 cursor-pointer hover:bg-gray-100"
              >
                <Link href={`/product/${product?.slug?.current}`} passHref>
                  <div
                    className="mx-8 lg:mx-16 py-2 border-b-2 "
                    onClick={handleLinkClick}
                  >
                    {product.title}
                  </div>
                </Link>
              </div>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default Search;
