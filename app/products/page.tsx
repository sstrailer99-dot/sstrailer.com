import type { Metadata } from "next";
import Link from "next/link";
import { CtaBanner } from "@/components/CtaBanner";
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
      <section className="relative z-10 bg-bg-white pt-[6.5rem] sm:pt-[7.5rem] md:pt-[8rem]">
        <div className="mx-auto max-w-7xl px-4 pb-10 pt-8 text-center sm:px-5 sm:pb-12 sm:pt-10 md:px-8">
          <p className="text-xs font-bold uppercase tracking-[0.25em] text-accent">
            {activeType
              ? `${filtered.length} ${activeType.label} Builds`
              : `${products.length} Manufactured Products`}
          </p>
          <h1 className="display mt-3 text-4xl font-extrabold text-navy md:text-5xl">
            {activeType ? activeType.label : "Our Trailer Range"}
          </h1>
        </div>

        <div className="mx-auto max-w-7xl px-4 pb-24 sm:px-5 sm:pb-28 md:px-8 md:pb-32">
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

      <div className="relative z-0">
        <CtaBanner />
      </div>
    </>
  );
}
