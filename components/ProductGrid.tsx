import Link from "next/link";
import { RemoteImage } from "@/components/RemoteImage";
import { products, type Product } from "@/lib/data";

type ProductGridProps = {
  limit?: number;
  items?: Product[];
  columns?: 3 | 4;
};

export function ProductGrid({
  limit,
  items = products,
  columns = 4,
}: ProductGridProps) {
  const list = limit ? items.slice(0, limit) : items;
  const gridClass =
    columns === 3
      ? "grid grid-cols-1 gap-x-10 gap-y-16 sm:grid-cols-2 lg:grid-cols-3 sm:gap-x-12 sm:gap-y-20"
      : "grid grid-cols-1 gap-x-10 gap-y-16 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 sm:gap-x-12 sm:gap-y-20";

  return (
    <div className={`${gridClass} pb-4`}>
      {list.map((product) => (
        <Link
          key={product.slug}
          href={`/products/${product.slug}`}
          className="catalog-tile group flex flex-col items-center text-center"
        >
          <div className="relative mb-6 aspect-[5/3] w-full max-w-[320px] overflow-visible sm:mb-7 sm:max-w-none">
            <RemoteImage
              src={product.image}
              alt={`${product.title} — SS Trailers product thumbnail`}
              fill
              className="catalog-img object-contain object-center"
              sizes="(max-width: 640px) 85vw, (max-width: 1024px) 40vw, 22vw"
              quality={85}
            />
          </div>
          <h3 className="text-[1.05rem] font-medium tracking-wide text-[#2c2c2c] transition-colors group-hover:text-accent sm:text-lg">
            {product.title}
          </h3>
          <span className="catalog-btn mt-5 inline-flex min-h-[42px] items-center justify-center px-7 text-[0.95rem] font-medium text-[#1a1a1a]">
            View More
          </span>
        </Link>
      ))}
    </div>
  );
}
