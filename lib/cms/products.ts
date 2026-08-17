import type { Product } from "@/lib/data";
import { products as staticProducts } from "@/lib/data";
import { getSupabaseAnonKey, getSupabaseUrl, isSupabaseConfigured } from "@/lib/supabase/config";
import { createClient as createSupabaseClient } from "@supabase/supabase-js";

export type CmsProductRow = {
  id: string;
  slug: string;
  title: string;
  short: string;
  description: string;
  capacity: string;
  features: string[];
  image: string;
  sort_order: number;
  is_active: boolean;
  created_at: string;
  updated_at: string;
};

export type ProductCategory = {
  slug: string;
  title: string;
  source: "static" | "cms";
};

export function slugifyTitle(title: string) {
  return title
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

function rowToProduct(row: CmsProductRow): Product {
  return {
    slug: row.slug,
    title: row.title,
    short: row.short,
    desc: row.description,
    capacity: row.capacity,
    features: Array.isArray(row.features) ? row.features : [],
    image: row.image || "/icon.png",
    gallery: [],
  };
}

function mergeStaticWithCms(staticProduct: Product, cmsRow: CmsProductRow): Product {
  const cmsProduct = rowToProduct(cmsRow);

  return {
    ...staticProduct,
    title: cmsProduct.title || staticProduct.title,
    short: cmsProduct.short || staticProduct.short,
    desc: cmsProduct.desc || staticProduct.desc,
    capacity: cmsProduct.capacity || staticProduct.capacity,
    features: cmsProduct.features.length ? cmsProduct.features : staticProduct.features,
    // File-based thumbnails + gallery in lib/data.ts always win for static products
    image: staticProduct.image,
    gallery: staticProduct.gallery,
  };
}

export async function fetchCmsProducts(includeInactive = false): Promise<CmsProductRow[]> {
  if (!isSupabaseConfigured()) return [];

  const supabase = createSupabaseClient(getSupabaseUrl(), getSupabaseAnonKey(), {
    auth: { persistSession: false, autoRefreshToken: false },
  });

  let query = supabase
    .from("cms_products")
    .select("*")
    .order("sort_order", { ascending: true })
    .order("created_at", { ascending: true });

  if (!includeInactive) {
    query = query.eq("is_active", true);
  }

  const { data, error } = await query;
  if (error) {
    console.error("[cms] fetchCmsProducts:", error.message);
    return [];
  }

  return (data ?? []) as CmsProductRow[];
}

export async function getAllProducts(): Promise<Product[]> {
  const cmsRows = await fetchCmsProducts();
  const cmsBySlug = new Map(cmsRows.map((row) => [row.slug, row]));
  const staticSlugs = new Set(staticProducts.map((product) => product.slug));

  const mergedStatic = staticProducts.map((product) => {
    const cmsRow = cmsBySlug.get(product.slug);
    return cmsRow ? mergeStaticWithCms(product, cmsRow) : product;
  });

  const cmsOnly = cmsRows
    .filter((row) => !staticSlugs.has(row.slug))
    .map(rowToProduct);

  return [...mergedStatic, ...cmsOnly];
}

export async function getProductCategories(): Promise<ProductCategory[]> {
  const cmsRows = await fetchCmsProducts(true);
  const cmsSlugs = new Set(cmsRows.map((row) => row.slug));

  const staticCategories = staticProducts
    .filter((product) => !cmsSlugs.has(product.slug))
    .map((product) => ({
      slug: product.slug,
      title: product.title,
      source: "static" as const,
    }));

  const cmsCategories = cmsRows.map((row) => ({
    slug: row.slug,
    title: row.title,
    source: "cms" as const,
  }));

  return [...staticCategories, ...cmsCategories];
}

export async function getProductBySlug(slug: string): Promise<Product | null> {
  const staticProduct = staticProducts.find((product) => product.slug === slug);
  const cmsRows = await fetchCmsProducts();
  const cmsMatch = cmsRows.find((row) => row.slug === slug);

  if (staticProduct && cmsMatch) return mergeStaticWithCms(staticProduct, cmsMatch);
  if (staticProduct) return staticProduct;
  if (cmsMatch) return rowToProduct(cmsMatch);

  return null;
}

export async function getNextProductSortOrder() {
  const rows = await fetchCmsProducts(true);
  if (!rows.length) return 0;
  return Math.max(...rows.map((row) => row.sort_order)) + 1;
}

export function isSlugTaken(slug: string, cmsRows: CmsProductRow[]) {
  if (staticProducts.some((product) => product.slug === slug)) return true;
  return cmsRows.some((row) => row.slug === slug);
}
