import Link from "next/link";

export function CtaBanner() {
  return (
    <section className="relative z-0 clear-both overflow-hidden bg-navy-deep py-14 sm:py-16 md:py-20">
      <div className="pointer-events-none absolute -right-20 top-0 h-64 w-64 rounded-full bg-accent/15 blur-3xl" />
      <div className="pointer-events-none absolute -left-16 bottom-0 h-48 w-48 rounded-full bg-white/5 blur-2xl" />
      <div className="relative mx-auto flex max-w-7xl flex-col items-start justify-between gap-8 px-4 sm:px-5 md:flex-row md:items-center md:gap-10 md:px-8">
        <div className="reveal max-w-2xl">
          <p className="text-xs font-bold uppercase tracking-[0.25em] text-accent-hot">
            Ready to build?
          </p>
          <h2 className="display mt-3 text-3xl font-extrabold text-white sm:text-4xl md:text-5xl">
            Request a custom quote today
          </h2>
          <p className="mt-4 max-w-xl text-sm leading-relaxed text-white/65 sm:text-base">
            Custom food-grade tankers, reefers, flatbeds & tippers —
            CNC-fabricated, ADR-certified. Fast delivery across Dubai, Abu Dhabi
            &amp; GCC.
          </p>
        </div>
        <div className="reveal reveal-delay-2 flex w-full flex-col gap-3 sm:w-auto sm:flex-row sm:flex-wrap">
          <Link href="/contact" className="btn-primary w-full sm:w-auto">
            Get a Quote
          </Link>
          <a href="tel:+971545129979" className="btn-outline w-full sm:w-auto">
            Call Now
          </a>
        </div>
      </div>
    </section>
  );
}
