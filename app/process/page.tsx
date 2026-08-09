import Image from "next/image";
import { CtaBanner } from "@/components/CtaBanner";
import { PageHero } from "@/components/PageHero";
import { Process } from "@/components/Process";
import { createPageMetadata } from "@/lib/seo";

export const metadata = createPageMetadata({
  title: "Our Manufacturing Process",
  description:
    "From inquiry to quotation, CNC fabrication and delivery — how SS Trailers builds custom trailers and truck bodies in Ras Al Khor, Dubai.",
  path: "/process",
  keywords: ["trailer manufacturing process", "CNC trailer fabrication Dubai"],
});

export default function ProcessPage() {
  return (
    <>
      <PageHero
        eyebrow="How It Works"
        title="From inquiry to delivery"
        subtitle="A clear three-step process for custom trailer and truck body fabrication."
        image="/images/fabrication.jpg"
      />

      <Process />

      <section className="bg-bg-white py-20 md:py-28">
        <div className="mx-auto grid max-w-7xl items-center gap-12 px-5 md:grid-cols-2 md:px-8">
          <div className="reveal-image relative aspect-[16/11] overflow-hidden">
            <Image
              src="/images/manufacturing.jpg"
              alt="SS Trailers CNC trailer fabrication workshop in Ras Al Khor Dubai"
              fill
              className="object-cover"
              sizes="50vw"
            />
          </div>
          <div>
            <p className="reveal text-xs font-bold uppercase tracking-[0.25em] text-accent">
              Workshop Capability
            </p>
            <h2 className="reveal reveal-delay-1 display mt-2 text-4xl font-extrabold text-navy md:text-5xl">
              CNC precision. Strong welds. Fleet-ready finish.
            </h2>
            <p className="reveal reveal-delay-2 mt-5 text-base leading-relaxed text-muted md:text-lg">
              Once your quote is approved, our Ras Al Khor workshop fabricates
              to specification — stainless or structural steel, fitted and
              finished for road duty across the UAE and GCC.
            </p>
          </div>
        </div>
      </section>

      <CtaBanner />
    </>
  );
}
