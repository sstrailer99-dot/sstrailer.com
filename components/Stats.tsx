const stats = [
  { value: "304/316L", label: "Stainless Steel" },
  { value: "CNC", label: "Fabrication" },
  { value: "ADR", label: "Certified" },
  { value: "GCC", label: "Fast Delivery" },
];

export function Stats() {
  return (
    <section className="border-y border-line bg-bg-white py-12 md:py-14">
      <div className="mx-auto grid max-w-7xl grid-cols-2 gap-8 px-5 md:grid-cols-4 md:px-8">
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
            <p className="display text-3xl font-extrabold text-navy sm:text-4xl md:text-5xl">
              {stat.value}
            </p>
            <p className="mt-2 text-xs font-bold uppercase tracking-[0.2em] text-muted">
              {stat.label}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}
