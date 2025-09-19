"use client";
import { useState, useEffect } from "react";
import { products } from "@/lib/sanityClient";
import Product from "@/components/Product";
import ListProduct from "@/components/ListProduct";
import { ProductProps } from "../../../../type";
import { BsGridFill } from "react-icons/bs";
import { ImList } from "react-icons/im";
import Image from "next/image";
import noproduct from "../../../assets/noproduct.png";
import PriceRange from "@/components/PriceRange";

const ShopPage = () => {
  const [showGrid, setShowGrid] = useState(true);
  const [showList, setShowList] = useState(false);
  const [isLoading, setIsLoading] = useState(true); // Start with loading state
  const [productData, setProductData] = useState<ProductProps[]>([]);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [productsPerPage] = useState<number>(12);
  const [categories, setCategories] = useState<string[]>([]);
  const [brands, setBrands] = useState<string[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>("");
  const [selectedBrand, setSelectedBrand] = useState<string>("");
  // New state for price range
  const [priceRange, setPriceRange] = useState<{ min: number; max: number }>({
    min: 0,
    max: Infinity,
  });
  const [priceBounds, setPriceBounds] = useState<{ min: number; max: number }>({
    min: 0,
    max: 1000, // Default max, will be updated
  });

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true); // Show loader when fetching starts
      try {
        const data = await products();
        setProductData(data);

        // Extract unique categories
        const uniqueCategories: string[] = Array.from(
          new Set(data.map((item: { category: string }) => item.category))
        );
        setCategories(uniqueCategories);

        // Extract unique brands
        const uniqueBrands: string[] = Array.from(
          new Set(data.map((item: { brand: string }) => item.brand))
        );
        setBrands(uniqueBrands);
        // Calculate price boundaries
        const prices = data.map((item: ProductProps) => item.price);
        const minPrice = Math.floor(Math.min(...prices));
        const maxPrice = Math.ceil(Math.max(...prices));
        setPriceBounds({ min: minPrice, max: maxPrice });
        setPriceRange({ min: minPrice, max: maxPrice });
      } catch (error) {
        console.error("Error fetching product data:", error);
      } finally {
        // Hide the loader after a 15-second delay
        setTimeout(() => {
          setIsLoading(false);
        }, 3000);
      }
    };
    fetchData();
  }, []);

  const filteredProducts = productData.filter((product: any) => {
    const matchesCategory = selectedCategory
      ? product.category === selectedCategory
      : true;
    const matchesBrand = selectedBrand ? product.brand === selectedBrand : true;
    const matchesPrice =
      typeof product.price === "number" &&
      product.price >= priceRange.min &&
      product.price <= priceRange.max;

    return matchesCategory && matchesBrand && matchesPrice;
  });

  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = filteredProducts.slice(
    indexOfFirstProduct,
    indexOfLastProduct
  );

  const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

  const handleCategoryChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedCategory(e.target.value);
    setCurrentPage(1); // Reset page when category changes
  };

  const handleBrandChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedBrand(e.target.value);
    setCurrentPage(1); // Reset page when brand changes
  };
  // Handle price range change
  const handlePriceChange = (min: number, max: number) => {
    setPriceRange({ min, max });
    setCurrentPage(1); // Reset page on price change
  };

  return (
    <div className="flex flex-col w-full my-4 lg:my-10 px-1 lg:px-10 overflow-hidden">
      <div className="flex items-center justify-between gap-2 lg:pb-10 pb-4">
        <div className="flex md:flex-row flex-col md:space-y-0 space-y-3 justify-between space-x-6 items-start md:items-center">
          <div> Filter:</div>
          <div className="w-full">
            <select
              className="px-1 py-1 border border-gray-300 rounded-md"
              onChange={handleCategoryChange}
            >
              <option value="">All Categories</option>
              {categories.map((category, index) => (
                <option key={index} value={category}>
                  {category}
                </option>
              ))}
            </select>
          </div>
          <div className="w-full">
            <select
              className="px-1 py-1 border border-gray-300 rounded-md"
              onChange={handleBrandChange}
            >
              <option value="">All Brands</option>
              {brands.map((brand, index) => (
                <option key={index} value={brand}>
                  {brand}
                </option>
              ))}
            </select>
          </div>

          <div className="w-full">
            <h1 className="font-medium p-2">Price Range</h1>
            {/* Price Range Component */}
            <PriceRange
              minPrice={priceBounds.min}
              maxPrice={priceBounds.max}
              currentMin={priceRange.min}
              currentMax={priceRange.max}
              onPriceChange={handlePriceChange}
            />
          </div>
        </div>
        <div className="flex w-full lg:w-1/2 justify-end lg:gap-4 gap-2">
          <span
            onClick={() => {
              setShowGrid(true);
              setShowList(false);
            }}
            className={`${
              showGrid
                ? "bg-primary text-yellow-400 border-[1px] border-yellow-400"
                : "border-[1px] border-gray-300 text-[#737373]"
            } w-8 h-8 text-lg flex items-center justify-center cursor-pointer`}
          >
            <BsGridFill />
          </span>
          <span
            onClick={() => {
              setShowGrid(false);
              setShowList(true);
            }}
            className={`${
              showList
                ? "bg-primary text-yellow-400 border-[1px] border-yellow-400"
                : "border-[1px] border-gray-300 text-[#737373]"
            } hidden  w-8 h-8 text-base md:flex items-center justify-center cursor-pointer listView`}
          >
            <ImList />
          </span>
        </div>
      </div>
      {isLoading ? (
        <div className="loader-container h-[300px] md:h-[360px]">
          <div className="loader"></div>
        </div>
      ) : // Existing product display logic...
      currentProducts.length === 0 ? (
        <div className="flex flex-col items-center justify-center my-8">
          <Image
            src={noproduct}
            width={200}
            height={200}
            alt="No product"
            className="w-48 h-48 mb-4"
          />
          <p className="text-gray-600 text-lg">
            No product here. Try again later.
          </p>
        </div>
      ) : showGrid ? (
        <div className="w-full grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-2 md:gap-5 lg:gap-10">
          {currentProducts.map((item: ProductProps) => (
            <Product key={item._id} product={item} />
          ))}
        </div>
      ) : (
        <div className="w-full grid grid-cols-1 lg:grid-cols-2 gap-5">
          {currentProducts.map((item: ProductProps) => (
            <ListProduct key={item._id} product={item} />
          ))}
        </div>
      )}

      <nav className="flex justify-center mt-5">
        <ul className="flex gap-5">
          {Array.from(
            { length: Math.ceil(filteredProducts.length / productsPerPage) },
            (_, i) => (
              <li key={i} className="page-item">
                <button
                  onClick={() => paginate(i + 1)}
                  className={`page-link ${
                    i + 1 === currentPage
                      ? "bg-yellow-400 px-2 rounded-full"
                      : "text-gray-600"
                  }`}
                >
                  {i + 1}
                </button>
              </li>
            )
          )}
        </ul>
      </nav>
    </div>
  );
};

export default ShopPage;
