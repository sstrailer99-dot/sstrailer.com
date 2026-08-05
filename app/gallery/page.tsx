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

      <section className="bg-bg-white py-14 sm:py-20 md:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-5 md:px-8">
          <div className="grid grid-cols-1 gap-x-10 gap-y-14 sm:grid-cols-2 lg:grid-cols-3 sm:gap-x-12 sm:gap-y-16">
            {galleryItems.map((item, i) => (
              <Link
                key={`${item.src}-${item.title}`}
                href={item.href}
                className={[
                  "catalog-tile reveal-scale group flex flex-col items-center text-center",
                  ["reveal-delay-1", "reveal-delay-2", "reveal-delay-3"][i % 3],
                ].join(" ")}
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
