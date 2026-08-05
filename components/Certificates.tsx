"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { certificates } from "@/lib/data";

export function Certificates() {
  const [active, setActive] = useState<number | null>(null);
  const cert = active !== null ? certificates[active] : null;

  useEffect(() => {
    if (active === null) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setActive(null);
      if (e.key === "ArrowRight") {
        setActive((i) =>
          i === null ? i : (i + 1) % certificates.length,
        );
      }
      if (e.key === "ArrowLeft") {
        setActive((i) =>
          i === null
            ? i
            : (i - 1 + certificates.length) % certificates.length,
        );
      }
    };
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKey);
    };
  }, [active]);

  return (
    <section className="bg-bg-white py-20 md:py-28">
      <div className="mx-auto max-w-7xl px-5 md:px-8">
        <p className="reveal text-center text-xs font-bold uppercase tracking-[0.25em] text-accent">
          Credentials
        </p>
        <h2 className="reveal reveal-delay-1 display mt-2 text-center text-4xl font-extrabold text-navy md:text-5xl">
          Our Certificates
        </h2>
        <p className="reveal reveal-delay-2 mx-auto mt-4 max-w-2xl text-center text-sm leading-relaxed text-muted md:text-base">
          ISO-certified quality, environmental and safety systems — plus recognition
          for our participation with Chamber of Commerce News in the UAE.
        </p>

        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {certificates.map((item, i) => (
            <button
              key={item.slug}
              type="button"
              onClick={() => setActive(i)}
              className={[
                "reveal-scale group overflow-hidden border border-line bg-bg text-left transition-shadow hover:shadow-[0_16px_40px_rgba(6,22,40,0.12)]",
                ["reveal-delay-1", "reveal-delay-2", "reveal-delay-3", "reveal-delay-4"][
                  i % 4
                ],
              ].join(" ")}
            >
              <div className="relative aspect-[3/4] overflow-hidden bg-sky">
                <Image
                  src={item.image}
                  alt={item.title}
                  fill
                  className="object-cover object-top transition-transform duration-500 group-hover:scale-[1.03]"
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                  quality={75}
                  loading="lazy"
                />
              </div>
              <div className="border-t border-line bg-bg-white p-4">
                <p className="display text-xl font-bold text-navy">{item.title}</p>
                <p className="mt-1 text-xs font-semibold uppercase tracking-[0.12em] text-muted">
                  {item.subtitle}
                </p>
                <p className="mt-3 text-[0.65rem] font-bold uppercase tracking-[0.14em] text-accent">
                  View certificate →
                </p>
              </div>
            </button>
          ))}
        </div>
      </div>

      {cert ? (
        <div
          className="fixed inset-0 z-[80] flex items-center justify-center bg-navy-deep/90 p-4 md:p-8"
          onClick={() => setActive(null)}
          role="dialog"
          aria-modal="true"
          aria-label={cert.title}
        >
          <div
            className="relative flex max-h-[90dvh] w-full max-w-3xl flex-col overflow-hidden bg-bg-white animate-[fadeUp_0.25s_cubic-bezier(0.22,1,0.36,1)]"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-start justify-between gap-4 border-b border-line px-4 py-3 md:px-5">
              <div>
                <p className="display text-lg font-bold text-navy md:text-xl">
                  {cert.title}
                </p>
                <p className="mt-0.5 text-xs text-muted">
                  {cert.issuer} · No. {cert.number}
                </p>
              </div>
              <button
                type="button"
                onClick={() => setActive(null)}
                className="flex h-9 w-9 shrink-0 items-center justify-center border border-line text-navy transition-colors hover:border-accent hover:text-accent"
                aria-label="Close"
              >
                ✕
              </button>
            </div>

            <div className="relative min-h-0 flex-1 overflow-auto bg-sky/40 p-3 md:p-5">
              <div className="relative mx-auto aspect-[3/4] w-full max-w-xl">
                <Image
                  src={cert.image}
                  alt={cert.title}
                  fill
                  className="object-contain"
                  sizes="(max-width: 768px) 100vw, 640px"
                  quality={80}
                  priority
                />
              </div>
            </div>

            <div className="flex items-center justify-between gap-3 border-t border-line px-4 py-3 md:px-5">
              <button
                type="button"
                onClick={() =>
                  setActive(
                    (i) =>
                      i === null
                        ? i
                        : (i - 1 + certificates.length) % certificates.length,
                  )
                }
                className="text-xs font-bold uppercase tracking-[0.14em] text-navy transition-colors hover:text-accent"
              >
                ← Prev
              </button>
              <p className="text-[0.65rem] font-semibold uppercase tracking-[0.12em] text-muted">
                Issued {cert.issued}
                {cert.expires !== "—" ? ` · Expires ${cert.expires}` : ""}
              </p>
              <button
                type="button"
                onClick={() =>
                  setActive((i) =>
                    i === null ? i : (i + 1) % certificates.length,
                  )
                }
                className="text-xs font-bold uppercase tracking-[0.14em] text-navy transition-colors hover:text-accent"
              >
                Next →
              </button>
            </div>
          </div>
        </div>
      ) : null}
    </section>
  );
}
