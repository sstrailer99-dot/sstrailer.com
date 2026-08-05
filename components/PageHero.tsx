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
  const lines = title.split(/\s+/);
  const mid = Math.ceil(lines.length / 2);
  const line1 = lines.slice(0, mid).join(" ");
  const line2 = lines.slice(mid).join(" ");

  return (
    <section className="relative flex min-h-[52svh] items-center justify-center overflow-hidden sm:min-h-[58svh] md:min-h-[62svh]">
      <div className="absolute inset-0">
        <Image
          src={image}
          alt=""
          fill
          priority
          fetchPriority="high"
          quality={70}
          className="hero-zoom object-cover"
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-navy-deep/60" />
        <div className="absolute inset-0 bg-gradient-to-t from-navy-deep/75 via-transparent to-navy-deep/35" />
      </div>

      <div className="relative z-10 mx-auto w-full max-w-5xl px-4 py-28 text-center sm:px-5 sm:py-32 md:px-8 md:py-36">
        <p className="page-enter text-[0.7rem] font-bold uppercase tracking-[0.28em] text-accent-hot sm:text-xs">
          {eyebrow}
        </p>
        <h1 className="display mt-4 text-[clamp(2.2rem,7vw,5rem)] font-extrabold leading-[0.95] text-white">
          <span className="banner-line banner-line-d1">
            <span>{line1}</span>
          </span>
          {line2 ? (
            <span className="banner-line banner-line-d2">
              <span>{line2}</span>
            </span>
          ) : null}
        </h1>
        {subtitle && (
          <p className="page-enter page-enter-d2 mx-auto mt-5 max-w-2xl text-sm leading-relaxed text-white/70 sm:mt-6 sm:text-base">
            {subtitle}
          </p>
        )}
        <div className="page-enter page-enter-d3 mt-8">
          <Link href={ctaHref} className="btn-primary">
            {ctaLabel}
          </Link>
        </div>
      </div>
    </section>
  );
}
