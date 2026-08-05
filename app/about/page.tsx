import type { Metadata } from "next";
import { Certificates } from "@/components/Certificates";
import { CtaBanner } from "@/components/CtaBanner";
import { PageHero } from "@/components/PageHero";
import { company } from "@/lib/data";

export const metadata: Metadata = {
  title: "About Us",
  description: company.description,
};

export default function AboutPage() {
  return (
    <>
      <PageHero
        eyebrow="About the Company"
        title="UAE’s trusted SS trailer & truck body builder"
        subtitle={company.description}
        image="/images/manufacturing.jpg"
      />

      <section className="bg-bg-white py-20 md:py-28">
        <div className="mx-auto max-w-3xl px-5 text-center md:px-8">
          <p className="reveal text-xs font-bold uppercase tracking-[0.25em] text-accent">
            Who We Are
          </p>
          <h2 className="reveal reveal-delay-1 display mt-2 text-4xl font-extrabold text-navy md:text-5xl">
            {company.shortName}
          </h2>
          <p className="reveal reveal-delay-2 mt-5 text-base leading-relaxed text-muted md:text-lg">
            {company.description}
          </p>
          <p className="reveal reveal-delay-3 mt-4 text-base leading-relaxed text-muted">
            From flatbed, heavy duty, side body, sand, A-frame and extendable
            builds to low bed, box, curtain, flexy, connector and tankers —
            every unit is fabricated to specification at our Ras Al Khor
            workshop in Dubai.
          </p>
          <ul className="reveal reveal-delay-4 mx-auto mt-8 grid max-w-xl gap-2 text-left sm:grid-cols-2">
            {company.highlights.map((item) => (
              <li
                key={item}
                className="flex items-center gap-2 text-sm font-semibold text-navy"
              >
                <span className="inline-block h-2 w-2 shrink-0 bg-accent" />
                {item}
              </li>
            ))}
          </ul>
        </div>
      </section>

      <Certificates />

      <CtaBanner />
    </>
  );
}
