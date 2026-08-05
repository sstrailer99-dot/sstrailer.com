import type { Metadata } from "next";
import Image from "next/image";
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
        <div className="mx-auto grid max-w-7xl items-center gap-10 px-5 md:grid-cols-[minmax(0,0.9fr)_minmax(0,1.2fr)] md:gap-16 md:px-8">
          <div className="reveal-image relative mx-auto aspect-[3/4] w-full max-w-md overflow-hidden border border-line bg-bg-white md:mx-0">
            <Image
              src={company.founder.photo}
              alt={`${company.founder.name}, ${company.founder.title} of ${company.shortName}`}
              fill
              className="object-cover object-top"
              sizes="(max-width: 768px) 100vw, 40vw"
              quality={80}
            />
          </div>
          <div>
            <p className="reveal text-xs font-bold uppercase tracking-[0.25em] text-accent">
              Founder&apos;s Message
            </p>
            <h2 className="reveal reveal-delay-1 display mt-2 text-4xl font-extrabold text-navy md:text-5xl">
              A word from {company.founder.name}
            </h2>
            <blockquote className="reveal reveal-delay-2 mt-6 border-l-4 border-accent pl-5 text-base leading-relaxed text-muted md:text-lg">
              “{company.founder.message}”
            </blockquote>
            <div className="reveal reveal-delay-3 mt-8">
              <p className="display text-2xl font-bold text-navy">
                {company.founder.name}
              </p>
              <p className="mt-1 text-xs font-bold uppercase tracking-[0.16em] text-accent">
                {company.founder.title} · {company.shortName}
              </p>
              <p className="mt-2 text-sm font-semibold text-muted">
                {company.slogan}
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-sky py-20 md:py-28">
        <div className="mx-auto grid max-w-7xl items-center gap-12 px-5 md:grid-cols-2 md:gap-16 md:px-8">
          <div className="reveal-image relative aspect-[4/5] overflow-hidden">
            <Image
              src="/images/workshop.jpg"
              alt="Workshop fabrication"
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, 50vw"
            />
          </div>
          <div>
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
            <ul className="reveal reveal-delay-4 mt-6 grid gap-2 sm:grid-cols-2">
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
        </div>
      </section>

      <Certificates />

      <CtaBanner />
    </>
  );
}
