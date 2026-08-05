import Image from "next/image";
import Link from "next/link";
import { industries, type Industry } from "@/lib/data";

type IndustryGridProps = {
  limit?: number;
  items?: Industry[];
};

export function IndustryGrid({ limit, items = industries }: IndustryGridProps) {
  const list = limit ? items.slice(0, limit) : items;

  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-5 lg:grid-cols-3 lg:gap-6">
      {list.map((item, i) => (
        <Link
          key={item.slug}
          href={`/industries/${item.slug}`}
          className={[
            "reveal-scale group relative block overflow-hidden border border-line",
            ["reveal-delay-1", "reveal-delay-2", "reveal-delay-3"][i % 3],
          ].join(" ")}
        >
          <div className="relative aspect-[16/10] overflow-hidden sm:aspect-[16/11]">
            <Image
              src={item.image}
              alt={item.title}
              fill
              className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
              quality={75}
              loading="lazy"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-navy-deep via-navy/55 to-transparent" />
            <div className="absolute inset-x-0 bottom-0 p-5 sm:p-6">
              <h3 className="display text-2xl font-bold text-white sm:text-3xl">
                {item.title}
              </h3>
              <p className="mt-2 line-clamp-2 text-sm leading-relaxed text-white/75">
                {item.short}
              </p>
              <span className="mt-3 inline-block text-xs font-bold uppercase tracking-[0.14em] text-accent-hot sm:mt-4">
                Explore sector →
              </span>
            </div>
          </div>
        </Link>
      ))}
    </div>
  );
}
