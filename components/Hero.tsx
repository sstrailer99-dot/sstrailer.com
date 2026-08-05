import Image from "next/image";
import Link from "next/link";
import { company } from "@/lib/data";

const featured = [
  { title: "Flatbed Trailer", href: "/products/flat-bed-trailer" },
  { title: "Heavy Duty Trailer", href: "/products/heavy-duty-trailer" },
  { title: "Side Curtain Trailer", href: "/products/curtain-trailer" },
  { title: "Tanker", href: "/products/diesel-tanker" },
];

export function Hero() {
  return (
    <section className="relative min-h-[88svh] overflow-hidden pt-[6.5rem] sm:pt-[7.5rem] md:min-h-[92svh] md:pt-[8.5rem]">
      <div className="absolute inset-0">
        <Image
          src="/images/trailer-flatbed.jpg"
          alt="Flatbed trailer and truck manufacturing"
          fill
          priority
          fetchPriority="high"
          quality={70}
          className="object-cover"
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-navy-deep/95 via-navy/85 to-navy/45" />
        <div className="absolute inset-0 bg-gradient-to-t from-navy-deep/80 via-transparent to-navy-deep/30" />
      </div>

      <div className="relative z-10 mx-auto flex min-h-[calc(88svh-6.5rem)] max-w-7xl flex-col justify-center px-4 pb-36 pt-8 sm:px-5 sm:pb-40 md:min-h-[calc(92svh-8.5rem)] md:px-8 md:pb-32 md:pt-10">
        <p className="page-enter text-[0.7rem] font-bold uppercase tracking-[0.22em] text-accent-hot sm:text-xs md:text-sm">
          {company.slogan}
        </p>
        <h1 className="page-enter page-enter-d1 display mt-3 max-w-4xl text-[clamp(2.15rem,8vw,5.75rem)] font-extrabold leading-[0.95] text-white">
          Shahid Mehmood Salamat
        </h1>
        <p className="page-enter page-enter-d2 mt-2 text-sm font-semibold uppercase tracking-[0.14em] text-white/80 sm:mt-3 sm:text-base md:text-lg">
          Auto General Repairing Co LLC
        </p>
        <p className="page-enter page-enter-d3 mt-4 max-w-xl text-sm leading-relaxed text-white/75 sm:mt-6 sm:text-base md:text-lg">
          {company.description}
        </p>
        <div className="page-enter page-enter-d4 mt-7 flex w-full flex-col gap-3 sm:mt-9 sm:w-auto sm:flex-row sm:flex-wrap sm:gap-4">
          <Link href="/contact" className="btn-primary w-full sm:w-auto">
            Request a Quote
          </Link>
          <Link href="/products" className="btn-outline w-full sm:w-auto">
            View Products
          </Link>
        </div>
      </div>

      <div className="absolute inset-x-0 bottom-0 z-10 hidden border-t border-white/10 bg-navy-deep/80 backdrop-blur-md lg:block">
        <div className="mx-auto grid max-w-7xl grid-cols-4 divide-x divide-white/10 px-8">
          {featured.map((item) => (
            <Link
              key={item.title}
              href={item.href}
              className="group px-5 py-5 transition-colors hover:bg-white/5"
            >
              <p className="display text-lg font-bold text-white transition-colors group-hover:text-accent-hot">
                {item.title}
              </p>
              <p className="mt-1 text-xs font-medium uppercase tracking-wider text-white/55">
                View details →
              </p>
            </Link>
          ))}
        </div>
      </div>

      <div className="absolute inset-x-0 bottom-0 z-10 border-t border-white/10 bg-navy-deep/90 backdrop-blur-md lg:hidden">
        <div className="flex snap-x snap-mandatory gap-0 overflow-x-auto overscroll-x-contain [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
          {featured.map((item) => (
            <Link
              key={item.title}
              href={item.href}
              className="min-w-[70%] snap-start border-r border-white/10 px-5 py-4 sm:min-w-[45%]"
            >
              <p className="display text-base font-bold text-white sm:text-lg">
                {item.title}
              </p>
              <p className="mt-1 text-[0.65rem] font-medium uppercase tracking-wider text-white/55">
                View details →
              </p>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
