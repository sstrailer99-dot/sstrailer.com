"use client";

import Link from "next/link";
import { RemoteImage } from "@/components/RemoteImage";

export type MarqueeItem = {
  slug: string;
  title: string;
  image: string;
  href: string;
};

type CatalogMarqueeProps = {
  items: MarqueeItem[];
  imageFit?: "contain" | "cover";
  duration?: number;
};

export function CatalogMarquee({
  items,
  imageFit = "contain",
  duration = 40,
}: CatalogMarqueeProps) {
  if (!items.length) return null;

  const loop = [...items, ...items];

  return (
    <div className="marquee relative -mx-5 overflow-hidden md:-mx-8">
      <div
        className="marquee-track flex w-max gap-10 py-2 sm:gap-12"
        style={{ animationDuration: `${duration}s` }}
      >
        {loop.map((item, i) => (
          <Link
            key={`${item.slug}-${i}`}
            href={item.href}
            className="catalog-tile group flex w-[240px] shrink-0 flex-col items-center text-center sm:w-[280px]"
          >
            <div
              className={`relative mb-5 aspect-[5/3] w-full overflow-hidden ${
                imageFit === "cover" ? "" : "overflow-visible"
              }`}
            >
              <RemoteImage
                src={item.image}
                alt={item.title}
                fill
                className={
                  imageFit === "cover"
                    ? "object-cover transition-transform duration-700 group-hover:scale-105"
                    : "catalog-img object-contain object-center"
                }
                sizes="280px"
                quality={80}
              />
            </div>
            <h3 className="text-[1.05rem] font-medium tracking-wide text-[#2c2c2c] transition-colors group-hover:text-accent sm:text-lg">
              {item.title}
            </h3>
            <span className="catalog-btn mt-4 inline-flex min-h-[42px] items-center justify-center px-7 text-[0.95rem] font-medium text-[#1a1a1a]">
              View More
            </span>
          </Link>
        ))}
      </div>
    </div>
  );
}
