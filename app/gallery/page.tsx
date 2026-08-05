import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { CtaBanner } from "@/components/CtaBanner";
import { PageHero } from "@/components/PageHero";
import { galleryItems } from "@/lib/data";

export const metadata: Metadata = {
  title: "Gallery",
  description:
    "SMS Auto product and workshop gallery — trailers, tankers and truck body builds manufactured in Ras Al Khor, Dubai.",
};

export default function GalleryPage() {
  return (
    <>
      <PageHero
        eyebrow="Visual Showcase"
        title="Gallery"
        subtitle="A look at trailers, tankers and truck body builds from our Dubai workshop — plus the fabrication environments behind every SMS Auto unit."
        image="/images/manufacturing.jpg"
        ctaHref="/contact"
        ctaLabel="Enquire Now"
      />

      <section className="bg-bg-white py-14 sm:py-20 md:py-28">
        <div className="mx-auto max-w-7xl px-4 sm:px-5 md:px-8">
          <div className="columns-1 gap-5 sm:columns-2 lg:columns-3">
            {galleryItems.map((item) => (
              <Link
                key={`${item.src}-${item.title}`}
                href={item.href}
                className="group mb-5 block break-inside-avoid overflow-hidden bg-sky"
              >
                <div className="relative aspect-[4/3] overflow-hidden">
                  <Image
                    src={item.src}
                    alt={item.alt}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    quality={75}
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-navy-deep/80 via-transparent to-transparent opacity-80 transition-opacity group-hover:opacity-95" />
                  <div className="absolute inset-x-0 bottom-0 p-4">
                    <p className="display text-lg font-bold text-white">
                      {item.title}
                    </p>
                    <p className="mt-1 text-[0.65rem] font-semibold uppercase tracking-[0.14em] text-white/70">
                      View details →
                    </p>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <CtaBanner />
    </>
  );
}
