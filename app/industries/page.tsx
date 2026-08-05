import type { Metadata } from "next";
import { CtaBanner } from "@/components/CtaBanner";
import { IndustryGrid } from "@/components/IndustryGrid";
import { PageHero } from "@/components/PageHero";

export const metadata: Metadata = {
  title: "Industries",
  description:
    "Trailer and truck body solutions for transport & logistics, construction, oil & gas, municipality & waste management, process & storage, and special equipment.",
};

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
