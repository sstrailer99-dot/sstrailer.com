"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";

const SELECTOR = ".reveal, .reveal-left, .reveal-scale, .reveal-image";

export function RevealObserver() {
  const pathname = usePathname();

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.08, rootMargin: "100px 0px 60px 0px" },
    );

    const reveal = (node: Element) => {
      if (node.classList.contains("is-visible")) return;

      const rect = node.getBoundingClientRect();
      const inView =
        rect.top < window.innerHeight * 1.02 && rect.bottom > -20;

      if (inView) {
        node.classList.add("is-visible");
      } else {
        observer.observe(node);
      }
    };

    const scan = () => {
      document.querySelectorAll(SELECTOR).forEach(reveal);
    };

    scan();
    const raf = requestAnimationFrame(scan);
    const timeout = window.setTimeout(scan, 80);

    // Catch tiles added on filter/query changes (pathname stays the same)
    const mo = new MutationObserver((mutations) => {
      for (const mutation of mutations) {
        mutation.addedNodes.forEach((node) => {
          if (!(node instanceof Element)) return;
          if (node.matches(SELECTOR)) reveal(node);
          node.querySelectorAll(SELECTOR).forEach(reveal);
        });
      }
    });
    mo.observe(document.body, { childList: true, subtree: true });

    document.documentElement.classList.add("js-ready");

    return () => {
      cancelAnimationFrame(raf);
      window.clearTimeout(timeout);
      observer.disconnect();
      mo.disconnect();
    };
  }, [pathname]);

  return null;
}
