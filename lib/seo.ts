import type { Metadata } from "next";

export const SITE_URL = "https://www.sstrailers.net";
export const SITE_NAME = "SS Trailers";
export const DEFAULT_OG_IMAGE = "/images/banner-01.png";

export const SEO_KEYWORDS = [
  "SS Trailers",
  "trailer manufacturer Dubai",
  "trailer manufacturer UAE",
  "truck body manufacturer Dubai",
  "flatbed trailer Dubai",
  "diesel tanker UAE",
  "tipper truck Dubai",
  "sand trailer UAE",
  "low bed trailer Dubai",
  "skeleton trailer",
  "curtain side trailer",
  "box trailer Dubai",
  "Ras Al Khor trailer factory",
  "GCC trailer supplier",
  "custom trailer fabrication UAE",
];

type PageSeoOptions = {
  title: string;
  description: string;
  path?: string;
  keywords?: string[];
  ogImage?: string;
  noIndex?: boolean;
};

export function createPageMetadata({
  title,
  description,
  path = "",
  keywords = [],
  ogImage = DEFAULT_OG_IMAGE,
  noIndex = false,
}: PageSeoOptions): Metadata {
  const url = `${SITE_URL}${path}`;
  const keywordList = [...new Set([...SEO_KEYWORDS, ...keywords])];

  return {
    title,
    description,
    keywords: keywordList,
    alternates: { canonical: url },
    openGraph: {
      title,
      description,
      url,
      siteName: SITE_NAME,
      locale: "en_AE",
      type: "website",
      images: [
        {
          url: ogImage,
          width: 1200,
          height: 630,
          alt: `${title} — ${SITE_NAME}`,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [ogImage],
    },
    robots: noIndex
      ? { index: false, follow: false }
      : { index: true, follow: true },
  };
}

export function productKeywords(title: string, capacity: string) {
  return [
    title,
    capacity,
    `${title} Dubai`,
    `${title} UAE`,
    "SS Trailers product",
  ];
}

export function industryKeywords(title: string) {
  return [title, `${title} trailers Dubai`, `${title} UAE`, "industrial trailers"];
}
