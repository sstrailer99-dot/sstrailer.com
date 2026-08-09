import type { MetadataRoute } from "next";
import { getAllProducts } from "@/lib/cms/products";
import { industries, productTypes } from "@/lib/data";
import { SITE_URL } from "@/lib/seo";

const STATIC_PAGES: MetadataRoute.Sitemap = [
  { url: `${SITE_URL}/`, changeFrequency: "daily", priority: 1 },
  { url: `${SITE_URL}/products`, changeFrequency: "daily", priority: 0.8 },
  { url: `${SITE_URL}/about`, changeFrequency: "monthly", priority: 0.8 },
  { url: `${SITE_URL}/gallery`, changeFrequency: "weekly", priority: 0.8 },
  { url: `${SITE_URL}/industries`, changeFrequency: "monthly", priority: 0.8 },
  { url: `${SITE_URL}/contact`, changeFrequency: "monthly", priority: 0.8 },
  { url: `${SITE_URL}/process`, changeFrequency: "monthly", priority: 0.7 },
];

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const lastModified = new Date();
  const products = await getAllProducts();

  const productTypePages: MetadataRoute.Sitemap = productTypes.map((type) => ({
    url: `${SITE_URL}${type.href}`,
    lastModified,
    changeFrequency: "weekly" as const,
    priority: 0.8,
  }));

  const productPages: MetadataRoute.Sitemap = products.map((product) => ({
    url: `${SITE_URL}/products/${product.slug}`,
    lastModified,
    changeFrequency: "weekly" as const,
    priority: 0.8,
  }));

  const industryPages: MetadataRoute.Sitemap = industries.map((industry) => ({
    url: `${SITE_URL}/industries/${industry.slug}`,
    lastModified,
    changeFrequency: "monthly" as const,
    priority: 0.8,
  }));

  const galleryCategoryPages: MetadataRoute.Sitemap = products.map((product) => ({
    url: `${SITE_URL}/gallery?category=${product.slug}`,
    lastModified,
    changeFrequency: "weekly" as const,
    priority: 0.64,
  }));

  return [
    ...STATIC_PAGES.map((entry) => ({ ...entry, lastModified })),
    ...productTypePages,
    ...productPages,
    ...industryPages,
    ...galleryCategoryPages,
  ];
}
