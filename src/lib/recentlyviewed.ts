// lib/recentlyviewed.ts

export type RecentlyViewedItem = {
  _id: string;
  slug: string;
  title: string;
  price?: number;
  rowprice?: number;
  image?: any; // ✅ Sanity image object
  brand?: string;
  category?: string;
  viewedAt: number;
};

const KEY = "mojoy:recently_viewed:v1";
const LIMIT = 12;

function safeParse<T>(value: string | null): T | null {
  if (!value) return null;
  try {
    return JSON.parse(value) as T;
  } catch {
    return null;
  }
}

function isValidItem(x: any): x is RecentlyViewedItem {
  return (
    x &&
    typeof x._id === "string" &&
    x._id.trim().length > 0 &&
    typeof x.slug === "string" &&
    x.slug.trim().length > 0 &&
    typeof x.title === "string" &&
    typeof x.viewedAt === "number"
  );
}

export function getRecentlyViewed(limit = 8): RecentlyViewedItem[] {
  if (typeof window === "undefined") return [];

  const raw = safeParse<any[]>(localStorage.getItem(KEY)) ?? [];
  return raw
    .filter(isValidItem)
    .sort((a, b) => b.viewedAt - a.viewedAt)
    .slice(0, limit);
}

export function addRecentlyViewed(
  item: Omit<RecentlyViewedItem, "viewedAt">,
  limit = LIMIT
) {
  if (typeof window === "undefined") return;

  const safeId = item?._id?.trim?.() ?? item._id;
  const safeSlug = item?.slug?.trim?.() ?? item.slug;

  if (!safeId || !safeSlug) return;

  const currentRaw = safeParse<any[]>(localStorage.getItem(KEY)) ?? [];
  const current = currentRaw.filter(isValidItem);

  const next: RecentlyViewedItem[] = [
    { ...item, _id: safeId, slug: safeSlug, viewedAt: Date.now() },
    ...current.filter((x) => x._id !== safeId),
  ].slice(0, limit);

  localStorage.setItem(KEY, JSON.stringify(next));
}

export function clearRecentlyViewed() {
  if (typeof window === "undefined") return;
  localStorage.removeItem(KEY);
}
