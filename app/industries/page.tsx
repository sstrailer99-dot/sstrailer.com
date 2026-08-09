import { CtaBanner } from "@/components/CtaBanner";
import { IndustryGrid } from "@/components/IndustryGrid";
import { PageHero } from "@/components/PageHero";
import { createPageMetadata } from "@/lib/seo";

export const metadata = createPageMetadata({
  title: "Industries We Serve — Trailer Solutions UAE",
  description:
    "SS Trailers serves transport & logistics, construction, oil & gas, municipality, process & storage, and special equipment sectors across Dubai and the GCC.",
  path: "/industries",
  keywords: ["industrial trailers UAE", "construction trailer Dubai", "logistics trailer supplier"],
});

export default function IndustriesPage() {
  return (
    <>
      <PageHero
        eyebrow="Industries We Serve"
        title="Built for every sector"
        subtitle="Curtain, box, skeleton, diesel tanker, sand, multi-axle flatbed and extendable trailers for transport & logistics, construction, oil & gas, municipality & waste management, process & storage, and special equipment."
        image="/images/construction.jpg"
      />

      <section className="bg-bg-white py-16 md:py-24">
        <div className="mx-auto max-w-7xl px-5 md:px-8">
          <IndustryGrid />
        </div>
      </section>

      <CtaBanner />
    </>
  );
}
