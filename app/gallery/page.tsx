import Link from "next/link";
import { CtaBanner } from "@/components/CtaBanner";
import { GallerySection } from "@/components/GallerySection";
import { getGalleryCategoriesMerged } from "@/lib/cms/media";
import { getProductCategories } from "@/lib/cms/products";
import { createPageMetadata } from "@/lib/seo";

export const metadata = createPageMetadata({
  title: "Trailer Photo Gallery Dubai",
  description:
    "SS Trailers photo gallery — flatbed, tanker, tipper, sand and heavy-duty trailer builds by category, manufactured in Ras Al Khor, Dubai.",
  path: "/gallery",
  keywords: ["trailer gallery Dubai", "trailer photos UAE", "SS Trailers builds"],
});

export const dynamic = "force-dynamic";

type GalleryPageProps = {
  searchParams: Promise<{ category?: string }>;
};

export default async function GalleryPage({ searchParams }: GalleryPageProps) {
  const { category } = await searchParams;
  const [sections, filterCategories] = await Promise.all([
    getGalleryCategoriesMerged(category),
    getProductCategories(),
  ]);
  const active = filterCategories.find((c) => c.slug === category);

  return (
    <>
      <section className="bg-bg-white pt-[6.5rem] sm:pt-[7.5rem] md:pt-[8rem]">
        <div className="mx-auto max-w-7xl px-4 pb-8 pt-8 text-center sm:px-5 sm:pb-10 sm:pt-10 md:px-8">
          <p className="text-xs font-bold uppercase tracking-[0.25em] text-accent">
            Visual Showcase
          </p>
          <h1 className="display mt-3 text-4xl font-extrabold text-navy md:text-5xl">
            {active ? active.title : "Gallery"}
          </h1>
          <p className="mx-auto mt-4 max-w-2xl text-base text-muted">
            Trailer photos organised by category — browse builds from our Dubai
            workshop.
          </p>
        </div>

        <div className="mx-auto max-w-7xl px-4 pb-24 sm:px-5 sm:pb-28 md:px-8 md:pb-32">
          <div className="mb-12 flex flex-wrap items-center justify-center gap-x-5 gap-y-3 md:mb-16">
            <Link
              href="/gallery"
              className={`filter-chip ${!category ? "is-active" : ""}`}
            >
              All
            </Link>
            {filterCategories.map((item) => (
              <Link
                key={item.slug}
                href={`/gallery?category=${item.slug}`}
                className={`filter-chip ${category === item.slug ? "is-active" : ""}`}
              >
                {item.title}
              </Link>
            ))}
          </div>

          <div className="space-y-16 md:space-y-20">
            {sections.map((section) => (
              <GallerySection
                key={section.slug}
                title={section.title}
                photos={section.photos}
                showHeading={!active}
              />
            ))}
          </div>
        </div>
      </section>

      <CtaBanner />
    </>
  );
}
