export type MediaSection = "product" | "gallery";
export type MediaType = "image" | "video";
export type MediaSource = "upload" | "drive";

export type MediaItem = {
  id: string;
  product_slug: string;
  section: MediaSection;
  media_type: MediaType;
  source: MediaSource;
  url: string;
  storage_path: string | null;
  alt: string | null;
  sort_order: number;
  created_at: string;
};

export type GalleryPhoto = {
  id?: string;
  src: string;
  alt: string;
  mediaType: MediaType;
  embedUrl?: string;
};
