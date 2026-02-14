"use client";

import { useEffect, useRef } from "react";
import { addRecentlyViewed } from "@/lib/recentlyviewed";

type TrackProps = {
  _id: string;
  slug: string;
  title: string;
  price?: number;
  rowprice?: number;
  image?: any;
  brand?: string;
  category?: string; 
};

export default function TrackRecentlyViewed({
  _id,
  slug,
  title,
  price,
  rowprice,
  image,
  brand,
  category,
}: TrackProps) {
  const wroteRef = useRef(false);

  useEffect(() => {
    const safeId = _id?.trim?.() ?? _id;
    const safeSlug = slug?.trim?.() ?? slug;

    if (!safeId || !safeSlug) return;

    // Prevent double-write in dev (React Strict Mode runs effects twice)
    if (process.env.NODE_ENV !== "production" && wroteRef.current) return;
    wroteRef.current = true;

    addRecentlyViewed({
      _id: safeId,
      slug: safeSlug,
      title,
      price,
      rowprice,
      image, 
      brand,
      category,
    });
  }, [_id, slug, title, price, rowprice, image, brand, category]);

  return null;
}
