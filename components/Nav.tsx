"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { company, industries, productTypes } from "@/lib/data";
import { ProductsMegaMenu } from "@/components/ProductsMegaMenu";

const links = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About" },
  { href: "/products", label: "Products", mega: true },
  { href: "/gallery", label: "Gallery" },
  { href: "/industries", label: "Industries" },
  { href: "/process", label: "Process" },
  { href: "/contact", label: "Contact" },
];

export function Nav() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [megaOpen, setMegaOpen] = useState(false);
  const [mobileProductsOpen, setMobileProductsOpen] = useState(false);
  const closeTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const openMega = () => {
    if (closeTimer.current) clearTimeout(closeTimer.current);
    setMegaOpen(true);
  };

  const scheduleCloseMega = () => {
    if (closeTimer.current) clearTimeout(closeTimer.current);
    closeTimer.current = setTimeout(() => setMegaOpen(false), 140);
  };

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setOpen(false);
    setMegaOpen(false);
    setMobileProductsOpen(false);
  }, [pathname]);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  useEffect(() => {
    return () => {
      if (closeTimer.current) clearTimeout(closeTimer.current);
    };
  }, []);

  return (
    <header className="fixed inset-x-0 top-0 z-50">
      <div className="hidden bg-navy-deep text-white md:block">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-8 py-2 text-xs tracking-wide">
          <p className="truncate text-white/75">
            {company.address.split(",").slice(0, 2).join(",")}
          </p>
          <div className="flex shrink-0 items-center gap-6">
            <a
              href={company.phoneHref}
              className="font-semibold text-white transition-colors hover:text-accent-hot"
            >
              {company.phone}
            </a>
            <a
              href={company.whatsapp}
              target="_blank"
              rel="noopener noreferrer"
              className="font-semibold text-white transition-colors hover:text-accent-hot"
            >
              WhatsApp
            </a>
          </div>
        </div>
      </div>

      <div
        className={`relative transition-all duration-500 ${
          scrolled || open || megaOpen
            ? "border-b border-line bg-bg-white shadow-sm"
            : "bg-bg-white"
        }`}
      >
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-3 px-4 py-3 sm:px-5 md:px-8">
          <Link
            href="/"
            className="group flex min-w-0 flex-1 items-center"
            aria-label={`${company.shortName} — ${company.slogan}`}
          >
            <span className="inline-flex w-fit max-w-[9.5rem] flex-col items-center sm:max-w-[13rem] md:max-w-[15rem]">
              <Image
                src={company.logo}
                alt={`${company.shortName} logo`}
                width={240}
                height={45}
                priority
                className="h-8 w-auto object-contain sm:h-10 md:h-11"
              />
              <span className="mt-1 w-full text-center text-[0.55rem] font-semibold leading-tight tracking-[0.02em] text-muted sm:text-[0.6rem]">
                {company.slogan}
              </span>
            </span>
          </Link>

          <a
            href={company.phoneHref}
            className="shrink-0 text-xs font-bold text-accent md:hidden"
            aria-label="Call us"
          >
            Call
          </a>

          <nav className="hidden items-center gap-5 xl:flex xl:gap-6">
            {links.map((link) => {
              const active =
                link.href === "/"
                  ? pathname === "/"
                  : pathname.startsWith(link.href);

              if (link.mega) {
                return (
                  <div
                    key={link.href}
                    className="relative"
                    onMouseEnter={openMega}
                    onMouseLeave={scheduleCloseMega}
                  >
                    <Link
                      href={link.href}
                      className={`nav-link inline-flex items-center gap-1.5 text-[0.78rem] font-semibold uppercase tracking-[0.1em] transition-colors ${
                        active || megaOpen ? "text-accent" : "text-navy-mid"
                      }`}
                      aria-expanded={megaOpen}
                      aria-haspopup="true"
                    >
                      {link.label}
                      <span
                        className={`text-[0.55rem] transition-transform ${
                          megaOpen ? "rotate-180" : ""
                        }`}
                      >
                        ▼
                      </span>
                    </Link>
                  </div>
                );
              }

              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`nav-link text-[0.78rem] font-semibold uppercase tracking-[0.1em] transition-colors ${
                    active ? "text-accent" : "text-navy-mid"
                  }`}
                >
                  {link.label}
                </Link>
              );
            })}
            <Link href="/contact" className="btn-primary !py-2.5 !text-xs">
              Get a Quote
            </Link>
          </nav>

          <button
            type="button"
            aria-label="Toggle menu"
            aria-expanded={open}
            className="flex h-11 w-11 shrink-0 flex-col items-center justify-center gap-1.5 xl:hidden"
            onClick={() => setOpen((v) => !v)}
          >
            <span
              className={`h-0.5 w-6 bg-navy transition-transform ${open ? "translate-y-2 rotate-45" : ""}`}
            />
            <span
              className={`h-0.5 w-6 bg-navy transition-opacity ${open ? "opacity-0" : ""}`}
            />
            <span
              className={`h-0.5 w-6 bg-navy transition-transform ${open ? "-translate-y-2 -rotate-45" : ""}`}
            />
          </button>
        </div>

        <ProductsMegaMenu
          open={megaOpen}
          onClose={() => setMegaOpen(false)}
          onMouseEnter={openMega}
        />

        <div
          className={`overflow-hidden border-b border-line bg-bg-white transition-all duration-500 xl:hidden ${
            open ? "max-h-[100dvh] opacity-100" : "max-h-0 opacity-0"
          }`}
        >
          <nav className="flex max-h-[calc(100dvh-4rem)] flex-col gap-1 overflow-y-auto px-4 py-4 sm:px-5">
            {links.map((link) => {
              if (link.mega) {
                return (
                  <div key={link.href} className="border-b border-line/70 pb-2">
                    <button
                      type="button"
                      className="flex min-h-11 w-full items-center justify-between py-3 text-left text-sm font-semibold uppercase tracking-[0.1em] text-navy"
                      onClick={() => setMobileProductsOpen((v) => !v)}
                      aria-expanded={mobileProductsOpen}
                    >
                      {link.label}
                      <span
                        className={`text-[0.55rem] transition-transform ${
                          mobileProductsOpen ? "rotate-180" : ""
                        }`}
                      >
                        ▼
                      </span>
                    </button>
                    <div
                      className={`overflow-hidden transition-all duration-300 ${
                        mobileProductsOpen
                          ? "max-h-[40rem] opacity-100"
                          : "max-h-0 opacity-0"
                      }`}
                    >
                      <div className="grid gap-5 pb-4 pl-1 sm:grid-cols-2">
                        <div>
                          <p className="text-[0.65rem] font-extrabold uppercase tracking-[0.18em] text-navy">
                            By Industry
                          </p>
                          <ul className="mt-2 space-y-2">
                            {industries.map((item) => (
                              <li key={item.slug}>
                                <Link
                                  href={`/industries/${item.slug}`}
                                  className="block py-1 text-xs font-semibold uppercase tracking-[0.1em] text-navy-mid"
                                >
                                  {item.title}
                                </Link>
                              </li>
                            ))}
                          </ul>
                        </div>
                        <div>
                          <p className="text-[0.65rem] font-extrabold uppercase tracking-[0.18em] text-navy">
                            By Type
                          </p>
                          <ul className="mt-2 space-y-2">
                            {productTypes.slice(0, 5).map((item) => (
                              <li key={item.label}>
                                <Link
                                  href={item.href}
                                  className="block py-1 text-xs font-semibold uppercase tracking-[0.1em] text-navy-mid"
                                >
                                  {item.label}
                                </Link>
                              </li>
                            ))}
                          </ul>
                          <Link
                            href="/products"
                            className="mt-3 inline-flex items-center bg-navy px-4 py-2.5 text-xs font-bold uppercase tracking-[0.14em] text-white"
                          >
                            View All &gt;&gt;
                          </Link>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              }

              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className="min-h-11 py-3 text-sm font-semibold uppercase tracking-[0.1em] text-navy"
                >
                  {link.label}
                </Link>
              );
            })}
            <Link href="/contact" className="btn-primary mt-3 w-full text-center">
              Get a Quote
            </Link>
            <a
              href={company.whatsapp}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-2 w-full border-2 border-navy py-3 text-center text-xs font-bold uppercase tracking-[0.12em] text-navy"
            >
              WhatsApp
            </a>
          </nav>
        </div>
      </div>
    </header>
  );
}
