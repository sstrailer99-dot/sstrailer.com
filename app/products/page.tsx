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

      <section className="bg-bg-white py-14 sm:py-20 md:py-28">
        <div className="mx-auto max-w-7xl px-4 sm:px-5 md:px-8">
          <div className="mb-8 flex flex-wrap gap-2">
            <Link
              href="/products"
              className={`px-3 py-2 text-[0.65rem] font-bold uppercase tracking-[0.12em] transition-colors ${
                !type
                  ? "bg-navy text-white"
                  : "border border-line text-navy-mid hover:border-navy hover:text-navy"
              }`}
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
                  className={`px-3 py-2 text-[0.65rem] font-bold uppercase tracking-[0.12em] transition-colors ${
                    active
                      ? "bg-navy text-white"
                      : "border border-line text-navy-mid hover:border-navy hover:text-navy"
                  }`}
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
