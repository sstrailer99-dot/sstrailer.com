import { company } from "@/lib/data";

export function MobileCallBar() {
  return (
    <div className="mobile-callbar md:!hidden">
      <a
        href={company.phoneHref}
        className="mx-1 flex min-h-11 items-center justify-center bg-accent text-xs font-bold uppercase tracking-[0.14em] text-white"
      >
        Call Now
      </a>
      <a
        href={company.whatsapp}
        target="_blank"
        rel="noopener noreferrer"
        className="mx-1 flex min-h-11 items-center justify-center border border-white/25 text-xs font-bold uppercase tracking-[0.14em] text-white"
      >
        WhatsApp
      </a>
    </div>
  );
}
