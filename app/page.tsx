import Link from "next/link";
import { CtaBanner } from "@/components/CtaBanner";
import { Hero } from "@/components/Hero";
import { IndustryGrid } from "@/components/IndustryGrid";
import { ProductGrid } from "@/components/ProductGrid";
import { Stats } from "@/components/Stats";
import { company } from "@/lib/data";

export default function HomePage() {
  return (
    <>
      <Hero />

      <section className="bg-bg-white py-20 md:py-28">
        <div className="mx-auto max-w-3xl px-5 text-center md:px-8">
          <p className="reveal text-xs font-bold uppercase tracking-[0.25em] text-accent">
            Who We Are
          </p>
          <h2 className="reveal reveal-delay-1 display mt-3 text-4xl font-extrabold text-navy md:text-5xl">
            Manufacturing in Ras Al Khor
          </h2>
          <p className="reveal reveal-delay-2 mt-5 text-base leading-relaxed text-muted md:text-lg">
            {company.description}
          </p>
          <p className="reveal reveal-delay-3 mt-4 text-base leading-relaxed text-muted">
            We design, manufacture and supply trailers for fuel distribution,
            construction, transport and logistics across Dubai and the GCC.
          </p>
          <Link
            href="/about"
            className="reveal reveal-delay-4 btn-primary mt-9 inline-flex"
          >
            About Us
          </Link>
        </div>
      </section>

      <section className="bg-bg-white py-16 md:py-24">
        <div className="mx-auto max-w-7xl px-5 md:px-8">
          <div className="mb-14 text-center md:mb-16">
            <p className="reveal text-xs font-bold uppercase tracking-[0.25em] text-accent">
              Best Selling
            </p>
            <h2 className="reveal reveal-delay-1 display mt-3 text-4xl font-extrabold text-navy md:text-5xl">
              UAE Trailer Range
            </h2>
          </div>
          <ProductGrid limit={4} columns={4} />
          <div className="reveal mt-14 text-center">
            <Link
              href="/products"
              className="catalog-btn inline-flex min-h-[42px] items-center justify-center px-8 text-[0.95rem] font-medium text-[#1a1a1a] transition-colors hover:bg-navy hover:text-white"
            >
              View Products
            </Link>
          </div>
        </div>
      </section>

      <Stats />

      <section className="bg-bg-white py-16 md:py-24">
        <div className="mx-auto max-w-7xl px-5 md:px-8">
          <div className="mb-14 text-center md:mb-16">
            <p className="reveal text-xs font-bold uppercase tracking-[0.25em] text-accent">
              Industries
            </p>
            <h2 className="reveal reveal-delay-1 display mt-3 text-4xl font-extrabold text-navy md:text-5xl">
              Sectors We Serve
            </h2>
          </div>
          <IndustryGrid limit={3} />
        </div>
      </section>

      <CtaBanner />
    </>
  );
}
