import { createClient as createSupabaseClient } from "@supabase/supabase-js";
import type { GalleryPhoto, MediaItem, MediaSection } from "@/lib/cms/types";
import { getAllProducts, getProductBySlug } from "@/lib/cms/products";
import { getSupabaseAnonKey, getSupabaseUrl, isSupabaseConfigured } from "@/lib/supabase/config";

export async function fetchMediaItems(filters?: {
  productSlug?: string;
  section?: MediaSection;
}): Promise<MediaItem[]> {
  if (!isSupabaseConfigured()) return [];

  const supabase = createSupabaseClient(getSupabaseUrl(), getSupabaseAnonKey(), {
    auth: { persistSession: false, autoRefreshToken: false },
  });

  let query = supabase
    .from("media_items")
    .select("*")
    .order("sort_order", { ascending: true })
    .order("created_at", { ascending: true });

  if (filters?.productSlug) {
    query = query.eq("product_slug", filters.productSlug);
  }
  if (filters?.section) {
    query = query.eq("section", filters.section);
  }

  const { data, error } = await query;
  if (error) {
    console.error("[cms] fetchMediaItems:", error.message);
    return [];
  }

  return (data ?? []) as MediaItem[];
}

function cmsItemToGalleryPhoto(item: MediaItem, title: string): GalleryPhoto {
  return {
    id: item.id,
    src: item.url,
    alt: item.alt ?? `${title} media`,
    mediaType: item.media_type,
    embedUrl: item.media_type === "video" ? item.url : undefined,
  };
}

function staticGalleryPhotos(product: { title: string; gallery: string[] }): GalleryPhoto[] {
  return product.gallery.map((src, i) => ({
    src,
    alt: `${product.title} — photo ${i + 1}`,
    mediaType: "image" as const,
  }));
}

function staticProductPhotos(product: { title: string; gallery: string[] }): GalleryPhoto[] {
  return product.gallery.map((src, i) => ({
    src,
    alt: `${product.title} reference ${i + 1}`,
    mediaType: "image" as const,
  }));
}

export function mergeProductGallery(
  product: { slug: string; title: string; gallery: string[] },
  cmsItems: MediaItem[],
  section: MediaSection,
): GalleryPhoto[] {
  const staticPhotos =
    section === "gallery"
      ? staticGalleryPhotos(product)
      : staticProductPhotos(product);

  const cmsPhotos = cmsItems
    .filter((item) => item.product_slug === product.slug && item.section === section)
    .map((item) => cmsItemToGalleryPhoto(item, product.title));

  // Keep all static images, then append new CMS uploads (dedupe by URL)
  const seen = new Set<string>();
  const merged: GalleryPhoto[] = [];

  for (const photo of [...staticPhotos, ...cmsPhotos]) {
    if (seen.has(photo.src)) continue;
    seen.add(photo.src);
    merged.push(photo);
  }

  return merged;
}

export async function getProductWithMedia(slug: string) {
  const product = await getProductBySlug(slug);
  if (!product) return null;

  const cmsItems = await fetchMediaItems({ productSlug: slug });
  const productMedia = mergeProductGallery(product, cmsItems, "product");

  return {
    ...product,
    image: product.image,
    gallery: productMedia.map((m) => m.src),
    galleryItems: productMedia,
  };
}

export async function getProductsWithMedia() {
  return getAllProducts();
}

export async function getGalleryCategoriesMerged(category?: string) {
  const allProducts = await getAllProducts();
  const cmsItems = await fetchMediaItems();

  const categories = allProducts.map((product) => {
    const photos = mergeProductGallery(product, cmsItems, "gallery");
    return {
      slug: product.slug,
      title: product.title,
      photos,
    };
  });

  if (!category) return categories;

  const match = categories.filter((c) => c.slug === category);
  return match.length ? match : categories;
}

export function getPublicStorageUrl(storagePath: string) {
  return `${getSupabaseUrl()}/storage/v1/object/public/product-media/${storagePath}`;
}

export async function getNextSortOrder(productSlug: string, section: MediaSection) {
  const items = await fetchMediaItems({ productSlug, section });
  if (!items.length) return 0;
  return Math.max(...items.map((item) => item.sort_order)) + 1;
}
