"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import {
  getProduct,
  industries,
  megaMenuFeatured,
  productTypes,
} from "@/lib/data";

type ProductsMegaMenuProps = {
  open: boolean;
  onClose: () => void;
  onMouseEnter: () => void;
};

export function ProductsMegaMenu({
  open,
  onClose,
  onMouseEnter,
}: ProductsMegaMenuProps) {
  const [slide, setSlide] = useState(0);
  const featured = megaMenuFeatured[slide];
  const product = getProduct(featured.slug);

  useEffect(() => {
    if (!open) return;
    const id = window.setInterval(() => {
      setSlide((s) => (s + 1) % megaMenuFeatured.length);
    }, 4500);
    return () => window.clearInterval(id);
  }, [open]);

  if (!open) return null;

  return (
    <div
      className="absolute inset-x-0 top-full z-50 hidden animate-[fadeUp_0.28s_cubic-bezier(0.22,1,0.36,1)] xl:block"
      onMouseEnter={onMouseEnter}
      onMouseLeave={onClose}
    >
      <div className="border-b border-line bg-bg-white shadow-[0_24px_60px_rgba(6,22,40,0.16)]">
        <div className="mx-auto grid max-w-7xl grid-cols-[minmax(0,1fr)_minmax(0,1.15fr)]">
          <div className="flex flex-col px-8 py-8">
            <div className="grid flex-1 grid-cols-2 gap-10">
              <div>
                <p className="text-[0.7rem] font-extrabold uppercase tracking-[0.2em] text-navy">
                  By Industry
                </p>
                <ul className="mt-4 space-y-3">
                  {industries.map((item) => (
                    <li key={item.slug}>
                      <Link
                        href={`/industries/${item.slug}`}
                        onClick={onClose}
                        className="text-[0.72rem] font-semibold uppercase tracking-[0.12em] text-navy-mid transition-colors hover:text-accent"
                      >
                        {item.title}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>

              <div>
                <p className="text-[0.7rem] font-extrabold uppercase tracking-[0.2em] text-navy">
                  By Type
                </p>
                <ul className="mt-4 space-y-3">
                  {productTypes.slice(0, 5).map((item) => (
                    <li key={item.label}>
                      <Link
                        href={item.href}
                        onClick={onClose}
                        className="text-[0.72rem] font-semibold uppercase tracking-[0.12em] text-navy-mid transition-colors hover:text-accent"
                      >
                        {item.label}
                      </Link>
                    </li>
                  ))}
                </ul>
                <Link
                  href="/products"
                  onClick={onClose}
                  className="mt-5 inline-flex items-center gap-2 bg-navy px-4 py-2.5 text-xs font-bold uppercase tracking-[0.16em] text-white transition-colors hover:bg-navy-mid"
                >
                  View All &gt;&gt;
                </Link>
              </div>
            </div>
          </div>

          <div className="relative min-h-[320px] overflow-hidden bg-navy-deep">
            <div
              className="absolute inset-0 origin-right"
              style={{
                clipPath: "polygon(10% 0, 100% 0, 100% 100%, 0 100%)",
              }}
            >
              <Image
                src={product?.image ?? "/images/trailer-flatbed.jpg"}
                alt={featured.title}
                fill
                className="object-cover object-center"
                sizes="(max-width: 1280px) 50vw, 640px"
                quality={70}
              />
              <div className="absolute inset-0 bg-gradient-to-l from-navy-deep/85 via-navy/35 to-transparent" />
            </div>

            <div className="absolute inset-y-0 right-0 z-10 flex w-[48%] items-center px-6 py-8">
              <div className="w-full bg-navy-deep/80 p-5">
                <p className="display text-xl font-extrabold leading-tight text-sky">
                  {featured.title}
                </p>
                <p className="mt-2 text-sm font-medium text-white/85">
                  {featured.tagline}
                </p>
                <p className="mt-3 text-[0.7rem] uppercase tracking-[0.12em] text-white/60">
                  {featured.capacity}
                </p>
                <Link
                  href={`/products/${featured.slug}`}
                  onClick={onClose}
                  className="btn-primary mt-5 !bg-navy !py-2.5 !text-[0.68rem] hover:!bg-navy-mid"
                >
                  Read More
                </Link>

                <div className="mt-5 flex items-center gap-3">
                  <button
                    type="button"
                    aria-label="Previous featured product"
                    onClick={() =>
                      setSlide(
                        (s) =>
                          (s - 1 + megaMenuFeatured.length) %
                          megaMenuFeatured.length,
                      )
                    }
                    className="flex h-8 w-8 items-center justify-center border border-white/30 text-white transition-colors hover:border-white hover:bg-white/10"
                  >
                    ‹
                  </button>
                  <button
                    type="button"
                    aria-label="Next featured product"
                    onClick={() =>
                      setSlide((s) => (s + 1) % megaMenuFeatured.length)
                    }
                    className="flex h-8 w-8 items-center justify-center border border-white/30 text-white transition-colors hover:border-white hover:bg-white/10"
                  >
                    ›
                  </button>
                  <div className="ml-1 flex gap-1.5">
                    {megaMenuFeatured.map((item, i) => (
                      <button
                        key={item.slug}
                        type="button"
                        aria-label={`Show ${item.title}`}
                        onClick={() => setSlide(i)}
                        className={`h-1.5 w-1.5 rounded-full transition-colors ${
                          i === slide ? "bg-accent-hot" : "bg-white/35"
                        }`}
                      />
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
