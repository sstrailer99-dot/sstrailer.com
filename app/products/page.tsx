import { CtaBanner } from "@/components/CtaBanner";
import { ProductGrid } from "@/components/ProductGrid";
import { getProductsWithMedia } from "@/lib/cms/media";
import { createPageMetadata } from "@/lib/seo";

export const metadata = createPageMetadata({
  title: "Trailer Products Dubai UAE",
  description:
    "Browse SS Trailers product range — flatbed, skeleton, box, diesel tanker, tipper, sand, low bed, curtain, extendable and heavy-duty trailers manufactured in Dubai for UAE and GCC fleets.",
  path: "/products",
  keywords: [
    "trailer products Dubai",
    "buy trailer UAE",
    "flatbed trailer price Dubai",
    "tanker trailer UAE",
  ],
});

export const dynamic = "force-dynamic";

export default async function ProductsPage() {
  const items = await getProductsWithMedia();

  return (
    <>
      <section className="relative z-10 bg-bg-white pt-[6.5rem] sm:pt-[7.5rem] md:pt-[8rem]">
        <div className="mx-auto max-w-7xl px-4 pb-24 pt-10 sm:px-5 sm:pb-28 sm:pt-12 md:px-8 md:pb-32">
          <div className="mb-12 text-center md:mb-16">
            <p className="reveal text-xs font-bold uppercase tracking-[0.25em] text-accent">
              Manufacturing Range
            </p>
            <h1 className="reveal reveal-delay-1 display mt-3 text-4xl font-extrabold text-navy md:text-5xl">
              Trailer Products Dubai
            </h1>
            <p className="reveal reveal-delay-2 mx-auto mt-4 max-w-2xl text-base text-muted">
              Custom-built trailers and truck bodies from our Ras Al Khor workshop — flatbed,
              tanker, tipper, sand, low bed and heavy-duty builds for UAE fleets.
            </p>
          </div>
          <ProductGrid items={items} />
        </div>
      </section>

      <div className="relative z-0">
        <CtaBanner />
      </div>
    </>
  );
}
