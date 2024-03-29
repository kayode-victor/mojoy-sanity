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

const ShopPage = () => {
  const [showGrid, setShowGrid] = useState(true);
  const [showList, setShowList] = useState(false);
  const [productData, setProductData] = useState<ProductProps[]>([]);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [productsPerPage] = useState<number>(12);
  const [categories, setCategories] = useState<string[]>([]);
  const [brands, setBrands] = useState<string[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>("");
  const [selectedBrand, setSelectedBrand] = useState<string>("");

  useEffect(() => {
    const fetchData = async () => {
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
      } catch (error) {
        console.error("Error fetching product data:", error);
      }
    };
    fetchData();
  }, []);

  const filteredProducts = productData.filter((product: ProductProps) => {
    if (selectedCategory && selectedBrand) {
      return (
        product.category === selectedCategory && product.brand === selectedBrand
      );
    } else if (selectedCategory) {
      return product.category === selectedCategory;
    } else if (selectedBrand) {
      return product.brand === selectedBrand;
    }
    return true;
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

  return (
    <div className="flex flex-col w-full my-4 lg:my-10 px-2 lg:px-16 overflow-hidden">
      <div className="flex items-center justify-between  gap-2 lg:pb-10 pb-4">
        <div className="flex w-full lg:w-1/2 px-2 items-center">
          Filter:
          <select
            className="ml-2 px-2 py-1 border border-gray-300 rounded-md"
            onChange={handleCategoryChange}
          >
            <option value="">Category</option>
            {categories.map((category, index) => (
              <option key={index} value={category}>
                {category}
              </option>
            ))}
          </select>
          <select
            className="ml-2 px-2 py-1 border border-gray-300 rounded-md"
            onChange={handleBrandChange}
          >
            <option value="">Brand</option>
            {brands.map((brand, index) => (
              <option key={index} value={brand}>
                {brand}
              </option>
            ))}
          </select>
        </div>
        <div className="flex w-full lg:w-1/2 justify-end gap-4">
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
            } w-8 h-8 text-base flex items-center justify-center cursor-pointer listView`}
          >
            <ImList />
          </span>
        </div>
      </div>
      {currentProducts.length === 0 ? (
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
        <div className="w-full grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-5 mr-5">
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
