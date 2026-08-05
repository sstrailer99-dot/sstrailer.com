import Image from "next/image";
import Link from "next/link";
import { CtaBanner } from "@/components/CtaBanner";
import { Hero } from "@/components/Hero";
import { IndustryGrid } from "@/components/IndustryGrid";
import { Process } from "@/components/Process";
import { ProductGrid } from "@/components/ProductGrid";
import { Stats } from "@/components/Stats";
import { company } from "@/lib/data";

export default function HomePage() {
  return (
    <>
      <Hero />
      <Stats />

      <section className="bg-bg-white py-20 md:py-28">
        <div className="mx-auto grid max-w-7xl items-center gap-12 px-5 md:grid-cols-2 md:gap-16 md:px-8">
          <div className="reveal-image relative aspect-[4/5] overflow-hidden md:aspect-[5/6]">
            <Image
              src="/images/workshop.jpg"
              alt="Steel fabrication and trailer manufacturing workshop"
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, 50vw"
              quality={70}
              loading="lazy"
            />
            <div className="absolute bottom-0 left-0 right-0 bg-accent px-6 py-5 text-white">
              <p className="display text-2xl font-bold md:text-3xl">
                Ras Al Khor Workshop
              </p>
              <p className="mt-1 text-sm text-white/85">Dubai · Industrial Area 2</p>
            </div>
          </div>
          <div>
            <p className="reveal text-xs font-bold uppercase tracking-[0.25em] text-accent">
              About Us
            </p>
            <h2 className="reveal reveal-delay-1 display mt-2 text-4xl font-extrabold text-navy md:text-5xl">
              UAE’s trusted SS trailer &amp; truck body builder
            </h2>
            <p className="reveal reveal-delay-2 mt-5 text-base leading-relaxed text-muted md:text-lg">
              {company.description}
            </p>
            <ul className="reveal reveal-delay-3 mt-6 grid gap-2 sm:grid-cols-2">
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
            <Link
              href="/about"
              className="reveal reveal-delay-4 btn-primary mt-8 inline-flex"
            >
              Learn More
            </Link>
          </div>
        </div>
      </section>

      <section className="bg-sky py-20 md:py-28">
        <div className="mx-auto max-w-7xl px-5 md:px-8">
          <div className="mb-12 flex flex-col gap-4 md:mb-16 md:flex-row md:items-end md:justify-between">
            <div>
              <p className="reveal text-xs font-bold uppercase tracking-[0.25em] text-accent">
                Featured Products
              </p>
              <h2 className="reveal reveal-delay-1 display mt-2 text-4xl font-extrabold text-navy md:text-5xl">
                Trailers & Truck Bodies
              </h2>
            </div>
            <Link
              href="/products"
              className="reveal reveal-delay-2 text-sm font-bold uppercase tracking-[0.14em] text-navy transition-colors hover:text-accent"
            >
              All products →
            </Link>
          </div>
          <ProductGrid limit={4} />
        </div>
      </section>

      <section className="bg-bg-white py-20 md:py-28">
        <div className="mx-auto max-w-7xl px-5 md:px-8">
          <div className="mb-12 flex flex-col gap-4 md:mb-16 md:flex-row md:items-end md:justify-between">
            <div>
              <p className="reveal text-xs font-bold uppercase tracking-[0.25em] text-accent">
                Industries
              </p>
              <h2 className="reveal reveal-delay-1 display mt-2 text-4xl font-extrabold text-navy md:text-5xl">
                Sectors We Serve
              </h2>
            </div>
            <Link
              href="/industries"
              className="reveal reveal-delay-2 text-sm font-bold uppercase tracking-[0.14em] text-navy transition-colors hover:text-accent"
            >
              All industries →
            </Link>
          </div>
          <IndustryGrid limit={3} />
        </div>
      </section>

      <Process showCta />
      <CtaBanner />
    </>
  );
}
