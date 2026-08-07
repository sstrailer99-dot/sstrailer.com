import type { Metadata } from "next";
import { CtaBanner } from "@/components/CtaBanner";
import { ProductGrid } from "@/components/ProductGrid";
import { products } from "@/lib/data";

export const metadata: Metadata = {
  title: "Products",
  description:
    "UAE’s trusted SS trailer & truck body builder — custom food-grade tankers, reefers, flatbeds & tippers. Curtain, skeleton, box, diesel tanker and multi-axle trailers in Dubai.",
};

export default function ProductsPage() {
  return (
    <>
      <section className="relative z-10 bg-bg-white pt-[6.5rem] sm:pt-[7.5rem] md:pt-[8rem]">
        <div className="mx-auto max-w-7xl px-4 pb-24 pt-10 sm:px-5 sm:pb-28 sm:pt-12 md:px-8 md:pb-32">
          <ProductGrid items={products} />
        </div>
      </section>

      <div className="relative z-0">
        <CtaBanner />
      </div>
    </>
  );
}
