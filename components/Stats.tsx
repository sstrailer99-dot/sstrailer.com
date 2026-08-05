const stats = [
  { value: "304/316L", label: "Stainless Steel" },
  { value: "CNC", label: "Fabrication" },
  { value: "ADR", label: "Certified Builds" },
  { value: "GCC", label: "Fast Delivery" },
];

export function Stats() {
  return (
    <section className="bg-bg py-16 md:py-20">
      <div className="mx-auto max-w-7xl px-5 md:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <p className="reveal text-xs font-bold uppercase tracking-[0.25em] text-accent">
            Our Experience
          </p>
          <h2 className="reveal reveal-delay-1 display mt-3 text-3xl font-extrabold text-navy md:text-4xl">
            Built for reliability
          </h2>
          <p className="reveal reveal-delay-2 mt-4 text-sm leading-relaxed text-muted md:text-base">
            Quality fabrication focused on continuous improvement for transport,
            construction and industrial fleets.
          </p>
        </div>

        <div className="mt-12 grid grid-cols-2 gap-x-6 gap-y-10 md:mt-16 md:grid-cols-4 md:gap-8">
          {stats.map((stat, i) => (
            <div
              key={stat.label}
              className={[
                "reveal text-center",
                ["reveal-delay-1", "reveal-delay-2", "reveal-delay-3", "reveal-delay-4"][
                  i
                ],
              ].join(" ")}
            >
              <p className="stat-accent display text-3xl font-extrabold text-navy sm:text-4xl md:text-5xl">
                {stat.value}
              </p>
              <p className="mt-3 text-xs font-bold uppercase tracking-[0.2em] text-muted">
                {stat.label}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
