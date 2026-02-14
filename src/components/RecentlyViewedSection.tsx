"use client";

import { useEffect, useState } from "react";
import {
  getRecentlyViewed,
  clearRecentlyViewed,
  RecentlyViewedItem,
} from "@/lib/recentlyviewed";
import Product from "@/components/Product";
import { Trash2 } from "lucide-react";

export default function RecentlyViewedSection() {
  const [items, setItems] = useState<RecentlyViewedItem[]>([]);

  useEffect(() => {
    setItems(getRecentlyViewed(8));
  }, []);

  const handleClear = () => {
    const ok = window.confirm("Clear your recently viewed items?");
    if (!ok) return;

    clearRecentlyViewed();
    setItems([]);
  };

  if (!items.length) return null;

  return (
    <section className="bg-gray-50 my-6 p-4 rounded-lg">
      {/* Header */}
      <div className="flex flex-col items-center justify-center">
        <h2 className="text-2xl text-center lg:text-3xl font-medium">
          Recently Viewed
        </h2>

        <button
          type="button"
          onClick={handleClear}
          aria-label="Clear recently viewed"
          title="Clear recently viewed"
          className="
                    flex items-center justify-center
                    h-10 w-10
                    rounded-full
                    text-gray-600
                    hover:text-red-600
                    hover:bg-red-50
                    transition-all
                    hover:-rotate-6
                    active:rotate-0
                    "
        >
          <Trash2 className="h-5 w-5 stroke-[2.5]" />
        </button>
      </div>

      {/* Products */}
      <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-4">
        {items.map((p) => (
          <Product
            key={p._id}
            product={
              {
                _id: p._id,
                title: p.title,
                slug: { current: p.slug },
                price: p.price,
                rowprice: p.rowprice,
                brand: p.brand,
                category: p.category,
                image: p.image,
              } as any
            }
          />
        ))}
      </div>
    </section>
  );
}
