"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { company } from "@/lib/data";

const slides = [
  {
    src: "/images/banner-01.png",
    alt: "SS Trailers Dubai side body trailer with truck — custom trailer manufacturer in Ras Al Khor UAE",
  },
  {
    src: "/images/banner-02.png",
    alt: "SS Trailers connector trailer converter dolly — heavy-duty trailer fabrication in Dubai UAE",
  },
  {
    src: "/images/banner-03.png",
    alt: "SS Trailers fuel tanker trailer — ADR-ready tank trailer manufacturing in Dubai UAE",
  },
];

const SLIDE_MS = 6500;

export function Hero() {
  const [active, setActive] = useState(0);

  useEffect(() => {
    const id = window.setInterval(() => {
      setActive((current) => (current + 1) % slides.length);
    }, SLIDE_MS);
    return () => window.clearInterval(id);
  }, []);

  return (
    <section className="relative min-h-[88svh] overflow-hidden pt-[6rem] sm:pt-[7rem] md:min-h-[92svh] md:pt-[7.75rem]">
      <div className="absolute inset-0 bg-[#eef1f4]">
        {slides.map((slide, index) => {
          const isActive = index === active;

          return (
            <div
              key={slide.src}
              className={`absolute inset-0 transition-opacity duration-700 ease-out ${
                isActive
                  ? "z-[1] opacity-100"
                  : "pointer-events-none z-0 opacity-0"
              }`}
            >
              <Image
                key={isActive ? `zoom-${active}` : slide.src}
                src={slide.src}
                alt={slide.alt}
                title={slide.alt}
                fill
                priority
                loading="eager"
                quality={85}
                className={`object-contain object-center md:object-[72%_center] ${
                  isActive ? "hero-slide-zoom" : ""
                }`}
                sizes="100vw"
              />
            </div>
          );
        })}
        <div className="pointer-events-none absolute inset-0 z-[2] bg-gradient-to-r from-navy-deep/92 via-navy/70 to-navy/20" />
        <div className="pointer-events-none absolute inset-0 z-[2] bg-gradient-to-t from-navy-deep/50 via-transparent to-navy-deep/15" />
      </div>

      <div className="relative z-10 mx-auto flex min-h-[calc(88svh-6rem)] max-w-7xl flex-col justify-center px-4 py-16 sm:px-5 sm:py-20 md:min-h-[calc(92svh-7.75rem)] md:px-8 md:py-24">
        <p className="page-enter text-[0.7rem] font-bold uppercase tracking-[0.24em] text-accent-hot sm:text-xs">
          {company.slogan}
        </p>

        <h1 className="display mt-4 max-w-4xl text-[clamp(2.2rem,7vw,5.25rem)] font-extrabold leading-[0.95] text-white">
          <span className="banner-line banner-line-d1">
            <span>Shahid Salamat</span>
          </span>
        </h1>
        <p className="page-enter page-enter-d2 mt-3 text-sm font-semibold uppercase tracking-[0.14em] text-white/85 sm:text-base md:text-lg">
          Auto General Trading Company LLC
        </p>

        <p className="page-enter page-enter-d3 mt-5 max-w-xl text-sm leading-relaxed text-white/75 sm:mt-6 sm:text-base md:text-lg">
          {company.description}
        </p>

        <div className="page-enter page-enter-d4 mt-8 flex w-full flex-col gap-3 sm:mt-10 sm:w-auto sm:flex-row sm:flex-wrap sm:gap-4">
          <Link href="/contact" className="btn-primary w-full sm:w-auto">
            Request a Quote
          </Link>
          <Link href="/products" className="btn-outline w-full sm:w-auto">
            View Products
          </Link>
        </div>

        <div className="mt-10 flex items-center gap-2">
          {slides.map((_, index) => (
            <button
              key={index}
              type="button"
              aria-label={`Go to banner ${index + 1}`}
              onClick={() => setActive(index)}
              className={`h-1.5 rounded-full transition-all duration-300 ${
                index === active
                  ? "w-8 bg-accent-hot"
                  : "w-3 bg-white/40 hover:bg-white/70"
              }`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
