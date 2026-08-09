"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";

const SELECTOR = ".reveal, .reveal-left, .reveal-scale, .reveal-image";

function resetRevealState() {
  document.querySelectorAll(SELECTOR).forEach((node) => {
    node.classList.remove("is-visible");
  });
  document.documentElement.classList.remove("js-ready");
}

export function RevealObserver() {
  const pathname = usePathname();

  useEffect(() => {
    let cancelled = false;
    let observer: IntersectionObserver | null = null;
    let mutationObserver: MutationObserver | null = null;
    let bootTimer = 0;
    let bootRaf = 0;

    const reveal = (node: Element) => {
      if (cancelled || node.classList.contains("is-visible")) return;

      const rect = node.getBoundingClientRect();
      const inView = rect.top < window.innerHeight * 1.02 && rect.bottom > -20;

      if (inView) {
        node.classList.add("is-visible");
      } else {
        observer?.observe(node);
      }
    };

    const scan = () => {
      if (cancelled) return;
      document.querySelectorAll(SELECTOR).forEach(reveal);
    };

    const boot = () => {
      if (cancelled) return;

      resetRevealState();
      document.documentElement.classList.add("js-ready");

      observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              entry.target.classList.add("is-visible");
              observer?.unobserve(entry.target);
            }
          });
        },
        { threshold: 0.08, rootMargin: "100px 0px 60px 0px" },
      );

      scan();

      mutationObserver = new MutationObserver((mutations) => {
        for (const mutation of mutations) {
          mutation.addedNodes.forEach((node) => {
            if (!(node instanceof Element)) return;
            if (node.matches(SELECTOR)) reveal(node);
            node.querySelectorAll(SELECTOR).forEach(reveal);
          });
        }
      });
      mutationObserver.observe(document.body, { childList: true, subtree: true });
    };

    // Defer until after React hydration (avoids className mismatch on streamed pages)
    bootRaf = requestAnimationFrame(() => {
      bootRaf = requestAnimationFrame(() => {
        bootTimer = window.setTimeout(boot, 50);
      });
    });

    return () => {
      cancelled = true;
      cancelAnimationFrame(bootRaf);
      window.clearTimeout(bootTimer);
      observer?.disconnect();
      mutationObserver?.disconnect();
      resetRevealState();
    };
  }, [pathname]);

  return null;
}
