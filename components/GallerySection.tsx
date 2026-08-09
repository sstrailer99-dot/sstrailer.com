"use client";

import { useState } from "react";
import { RemoteImage } from "@/components/RemoteImage";
import type { GalleryPhoto } from "@/lib/cms/types";

type GallerySectionProps = {
  title: string;
  photos: GalleryPhoto[];
  showHeading?: boolean;
  previewCount?: number;
};

export function GallerySection({
  title,
  photos,
  showHeading = true,
  previewCount = 3,
}: GallerySectionProps) {
  const [expanded, setExpanded] = useState(false);
  const hasMore = photos.length > previewCount;
  const visible = expanded || !hasMore ? photos : photos.slice(0, previewCount);

  const imageCount = photos.filter((photo) => photo.mediaType !== "video").length;
  const videoCount = photos.filter((photo) => photo.mediaType === "video").length;
  const countLabel =
    videoCount > 0
      ? `${photos.length} items (${imageCount} photos, ${videoCount} videos)`
      : `${photos.length} ${photos.length === 1 ? "photo" : "photos"}`;

  return (
    <div>
      {showHeading && (
        <div className="mb-6 flex items-end justify-between gap-4 border-b border-black/10 pb-3">
          <h2 className="display text-2xl font-extrabold text-navy md:text-3xl">
            {title}
          </h2>
          <span className="shrink-0 text-xs font-bold uppercase tracking-[0.18em] text-muted">
            {countLabel}
          </span>
        </div>
      )}

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-5 lg:grid-cols-3">
        {visible.map((photo, index) => (
          <figure
            key={photo.id ?? `${photo.src}-${index}`}
            className="group relative aspect-[4/3] overflow-hidden bg-[#f3f3f3]"
          >
            {photo.mediaType === "video" && photo.embedUrl ? (
              <iframe
                src={photo.embedUrl}
                title={photo.alt}
                className="h-full w-full border-0"
                allow="autoplay; encrypted-media; fullscreen"
                allowFullScreen
              />
            ) : (
              <RemoteImage
                src={photo.src}
                alt={photo.alt}
                fill
                className="object-cover transition-transform duration-700 group-hover:scale-105"
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                quality={80}
              />
            )}
          </figure>
        ))}
      </div>

      {hasMore && (
        <div className="mt-8 flex justify-center">
          <button
            type="button"
            onClick={() => setExpanded((v) => !v)}
            className="catalog-btn inline-flex min-h-[44px] items-center justify-center px-8 text-[0.95rem] font-medium tracking-wide text-[#1a1a1a]"
          >
            {expanded ? "Show Less" : `View More (${photos.length - previewCount})`}
          </button>
        </div>
      )}
    </div>
  );
}
