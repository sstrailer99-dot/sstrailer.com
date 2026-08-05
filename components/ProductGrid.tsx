import Image from "next/image";
import Link from "next/link";
import { products, type Product } from "@/lib/data";

type ProductGridProps = {
  limit?: number;
  items?: Product[];
};

export function ProductGrid({ limit, items = products }: ProductGridProps) {
  const list = limit ? items.slice(0, limit) : items;

  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-5 lg:grid-cols-3 xl:grid-cols-4 lg:gap-6">
      {list.map((product, i) => (
        <Link
          key={product.slug}
          href={`/products/${product.slug}`}
          className="product-tile group block overflow-hidden border border-line bg-bg-white"
        >
          <div className="relative aspect-[16/11] overflow-hidden bg-[#f3f6f9] sm:aspect-[4/3]">
            <Image
              src={product.image}
              alt={product.title}
              fill
              className="product-img object-contain p-3"
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
              quality={75}
            />
            <span className="absolute bottom-3 left-3 rounded-sm bg-accent px-2 py-1 text-[0.65rem] font-bold uppercase tracking-wider text-white shadow-sm">
              View
            </span>
          </div>
          <div className="p-4 sm:p-5">
            <p className="text-[0.65rem] font-bold uppercase tracking-[0.14em] text-accent">
              {product.capacity}
            </p>
            <h3 className="display mt-2 text-[1.35rem] font-bold leading-tight text-navy transition-colors group-hover:text-accent sm:text-2xl">
              {product.title}
            </h3>
            <p className="mt-2 line-clamp-3 text-sm leading-relaxed text-muted">
              {product.short}
            </p>
          </div>
        </Link>
      ))}
    </div>
  );
}
