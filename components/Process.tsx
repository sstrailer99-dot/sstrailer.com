import Link from "next/link";

const steps = [
  {
    num: "01",
    title: "Inquiry",
    desc: "Call +971 54 512 9979 or send your requirements — trailer type, capacity and timeline.",
  },
  {
    num: "02",
    title: "Quotation",
    desc: "We prepare a clear, cost-effective quote with specs, materials and delivery schedule.",
  },
  {
    num: "03",
    title: "Manufacture",
    desc: "CNC fabrication, 304/316L stainless welding and ADR-certified finishing — fast delivery across Dubai, Abu Dhabi & GCC.",
  },
];

type ProcessProps = {
  showCta?: boolean;
};

export function Process({ showCta = false }: ProcessProps) {
  return (
    <section className="bg-navy py-20 md:py-28">
      <div className="mx-auto max-w-7xl px-5 md:px-8">
        <div className="mb-12 flex flex-col gap-4 md:mb-16 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="reveal text-xs font-bold uppercase tracking-[0.25em] text-accent-hot">
              How It Works
            </p>
            <h2 className="reveal reveal-delay-1 display mt-2 text-4xl font-extrabold text-white md:text-5xl">
              3 Easy Steps
            </h2>
          </div>
          {showCta && (
            <Link
              href="/process"
              className="reveal reveal-delay-2 text-sm font-bold uppercase tracking-[0.14em] text-white/80 transition-colors hover:text-accent-hot"
            >
              Full process →
            </Link>
          )}
        </div>

        <div className="grid gap-6 md:grid-cols-3">
          {steps.map((step, i) => (
            <article
              key={step.num}
              className={[
                "step-card reveal border border-white/10 bg-white/5 p-8 backdrop-blur-sm transition-all duration-500 hover:-translate-y-1 hover:bg-white/10",
                ["reveal-delay-1", "reveal-delay-2", "reveal-delay-3"][i],
              ].join(" ")}
            >
              <p className="step-num display text-5xl font-extrabold text-accent-hot">
                {step.num}
              </p>
              <h3 className="display mt-4 text-3xl font-bold text-white">
                {step.title}
              </h3>
              <p className="mt-3 text-sm leading-relaxed text-white/70 md:text-base">
                {step.desc}
              </p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
