import Image from "next/image";
import Link from "next/link";

type PageHeroProps = {
  eyebrow: string;
  title: string;
  subtitle?: string;
  image: string;
  ctaHref?: string;
  ctaLabel?: string;
};

export function PageHero({
  eyebrow,
  title,
  subtitle,
  image,
  ctaHref = "/contact",
  ctaLabel = "Get a Quote",
}: PageHeroProps) {
  return (
    <section className="relative overflow-hidden pt-[6.5rem] sm:pt-[7.5rem] md:pt-[8.5rem]">
      <div className="absolute inset-0">
        <Image
          src={image}
          alt=""
          fill
          priority
          fetchPriority="high"
          quality={70}
          className="object-cover"
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-navy-deep/95 via-navy/85 to-navy/55" />
        <div className="absolute inset-0 bg-gradient-to-t from-navy-deep/60 to-transparent" />
      </div>

      <div className="relative z-10 mx-auto max-w-7xl px-4 py-14 sm:px-5 sm:py-20 md:px-8 md:py-28">
        <p className="page-enter text-[0.7rem] font-bold uppercase tracking-[0.22em] text-accent-hot sm:text-xs">
          {eyebrow}
        </p>
        <h1 className="page-enter page-enter-d1 display mt-3 max-w-4xl text-[clamp(1.9rem,7vw,4.75rem)] font-extrabold leading-[0.98] text-white">
          {title}
        </h1>
        {subtitle && (
          <p className="page-enter page-enter-d2 mt-4 max-w-2xl text-sm leading-relaxed text-white/75 sm:mt-5 sm:text-base md:text-lg">
            {subtitle}
          </p>
        )}
        <div className="page-enter page-enter-d3 mt-7 sm:mt-8">
          <Link href={ctaHref} className="btn-primary w-full sm:w-auto">
            {ctaLabel}
          </Link>
        </div>
      </div>
    </section>
  );
}
