import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { CtaBanner } from "@/components/CtaBanner";
import { galleryItems } from "@/lib/data";

export const metadata: Metadata = {
  title: "Gallery",
  description:
    "SMS Auto product and workshop gallery — trailers, tankers and truck body builds manufactured in Ras Al Khor, Dubai.",
};

export default function GalleryPage() {
  return (
    <>
      <section className="bg-bg-white pt-[6.5rem] sm:pt-[7.5rem] md:pt-[8rem]">
        <div className="mx-auto max-w-7xl px-4 pb-10 pt-8 text-center sm:px-5 sm:pb-12 sm:pt-10 md:px-8">
          <p className="text-xs font-bold uppercase tracking-[0.25em] text-accent">
            Visual Showcase
          </p>
          <h1 className="display mt-3 text-4xl font-extrabold text-navy md:text-5xl">
            Gallery
          </h1>
        </div>

        <div className="mx-auto max-w-7xl px-4 pb-24 sm:px-5 sm:pb-28 md:px-8 md:pb-32">
          <div className="grid grid-cols-1 gap-x-10 gap-y-14 sm:grid-cols-2 lg:grid-cols-3 sm:gap-x-12 sm:gap-y-16">
            {galleryItems.map((item) => (
              <Link
                key={`${item.src}-${item.title}`}
                href={item.href}
                className="catalog-tile group flex flex-col items-center text-center"
              >
                <div className="relative mb-6 aspect-[16/10] w-full overflow-hidden">
                  <Image
                    src={item.src}
                    alt={item.alt}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    quality={75}
                    loading="lazy"
                  />
                </div>
                <h3 className="text-[1.05rem] font-medium tracking-wide text-[#2c2c2c] transition-colors group-hover:text-accent sm:text-lg">
                  {item.title}
                </h3>
                <span className="catalog-btn mt-5 inline-flex min-h-[42px] items-center justify-center px-7 text-[0.95rem] font-medium text-[#1a1a1a]">
                  View More
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <CtaBanner />
    </>
  );
}
