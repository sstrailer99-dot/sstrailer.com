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
    <div className="grid grid-cols-1 gap-x-10 gap-y-14 sm:grid-cols-2 lg:grid-cols-3 sm:gap-x-12 sm:gap-y-16">
      {list.map((item, i) => (
        <Link
          key={item.slug}
          href={`/industries/${item.slug}`}
          className={[
            "catalog-tile reveal-scale group flex flex-col items-center text-center",
            ["reveal-delay-1", "reveal-delay-2", "reveal-delay-3"][i % 3],
          ].join(" ")}
        >
          <div className="relative mb-6 aspect-[16/10] w-full overflow-hidden">
            <Image
              src={item.image}
              alt={`${item.title} — SS Trailers industry sector Dubai`}
              fill
              className="object-cover transition-transform duration-700 group-hover:scale-105"
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
              quality={75}
              loading="lazy"
            />
          </div>
          <h3 className="text-[1.05rem] font-medium tracking-wide text-[#2c2c2c] transition-colors group-hover:text-accent sm:text-lg">
            {item.title}
          </h3>
          <span className="catalog-btn mt-5 inline-flex min-h-[42px] items-center justify-center px-7 text-[0.95rem] font-medium text-[#1a1a1a]">
            View More
          </span>
        </Link>
      ))}
    </div>
  );
}
