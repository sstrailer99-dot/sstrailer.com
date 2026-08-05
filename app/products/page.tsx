import type { Metadata } from "next";
import Link from "next/link";
import { CtaBanner } from "@/components/CtaBanner";
import { PageHero } from "@/components/PageHero";
import { ProductGrid } from "@/components/ProductGrid";
import { getProductsByType, productTypes, products } from "@/lib/data";

export const metadata: Metadata = {
  title: "Products",
  description:
    "UAE’s trusted SS trailer & truck body builder — custom food-grade tankers, reefers, flatbeds & tippers. Curtain, skeleton, box, diesel tanker and multi-axle trailers in Dubai.",
};

type ProductsPageProps = {
  searchParams: Promise<{ type?: string }>;
};

export default async function ProductsPage({ searchParams }: ProductsPageProps) {
  const { type } = await searchParams;
  const filtered = type ? getProductsByType(type) : products;
  const activeType = productTypes.find((t) => t.href.endsWith(`type=${type}`));

  return (
    <>
      <PageHero
        eyebrow={
          activeType
            ? `${filtered.length} ${activeType.label} Builds`
            : `${products.length} Manufactured Products`
        }
        title={activeType ? activeType.label : "Our trailer range"}
        subtitle="UAE’s trusted SS trailer & truck body builder — custom food-grade tankers, reefers, flatbeds & tippers. 304/316L stainless, CNC-fabricated, ADR-certified."
        image="/images/trailer-flatbed.jpg"
        ctaHref="/contact"
        ctaLabel="Enquire Now"
      />

      <section className="bg-bg-white py-14 sm:py-20 md:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-5 md:px-8">
          <div className="mb-12 flex flex-wrap items-center justify-center gap-x-5 gap-y-3 md:mb-16">
            <Link
              href="/products"
              className={`filter-chip ${!type ? "is-active" : ""}`}
            >
              All
            </Link>
            {productTypes.map((item) => {
              const key = item.href.split("type=")[1];
              const active = type === key;
              return (
                <Link
                  key={item.label}
                  href={item.href}
                  className={`filter-chip ${active ? "is-active" : ""}`}
                >
                  {item.label}
                </Link>
              );
            })}
          </div>

          <ProductGrid items={filtered} />
        </div>
      </section>

      <CtaBanner />
    </>
  );
}
