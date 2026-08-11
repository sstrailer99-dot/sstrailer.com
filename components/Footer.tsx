import Image from "next/image";
import Link from "next/link";
import { company } from "@/lib/data";

const quickLinks = [
  ["/", "Home"],
  ["/products", "Products"],
  ["/about", "About Us"],
  ["/gallery", "Gallery"],
  ["/industries", "Industries"],
  ["/contact", "Contact Us"],
] as const;

export function Footer() {
  return (
    <footer className="bg-navy-deep text-white">
      <div className="mx-auto grid max-w-7xl gap-12 px-5 py-16 md:grid-cols-3 md:gap-10 md:px-8 md:py-20">
        <div>
          <Link
            href="/"
            className="inline-flex w-fit max-w-[13rem] flex-col items-center bg-white px-3 py-2"
          >
            <Image
              src={company.logo}
              alt={`${company.shortName} logo`}
              width={240}
              height={45}
              className="h-9 w-auto object-contain"
            />
            <p className="mt-1.5 w-full text-center text-[0.6rem] font-semibold leading-tight tracking-wide text-navy">
              {company.slogan}
            </p>
          </Link>
          <p className="mt-6 max-w-xs text-sm leading-relaxed text-white/55">
            {company.shortName} manufacturing facility — Ras Al Khor, Dubai.
          </p>
        </div>

        <div>
          <p className="text-xs font-bold uppercase tracking-[0.2em] text-accent-hot">
            Quick Links
          </p>
          <ul className="mt-5 space-y-3 text-sm text-white/70">
            {quickLinks.map(([href, label]) => (
              <li key={href}>
                <Link href={href} className="footer-link hover:text-white">
                  {label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <p className="text-xs font-bold uppercase tracking-[0.2em] text-accent-hot">
            Contact
          </p>
          <ul className="mt-5 space-y-3.5 text-sm text-white/70">
            <li>
              <a
                href={company.phoneHref}
                className="footer-link font-semibold text-white hover:text-accent-hot"
              >
                {company.phone}
              </a>
            </li>
            <li className="max-w-xs leading-relaxed">{company.address}</li>
            <li>
              <a
                href={company.whatsapp}
                target="_blank"
                rel="noopener noreferrer"
                className="footer-link hover:text-white"
              >
                WhatsApp
              </a>
            </li>
          </ul>
        </div>
      </div>

      <div className="border-t border-white/10">
        <div className="mx-auto flex max-w-7xl flex-col gap-3 px-5 py-5 text-xs text-white/40 md:px-8">
          <div className="flex flex-col gap-2 md:flex-row md:items-center md:justify-between">
            <p>
              © {new Date().getFullYear()} {company.name}
            </p>
            <p>Established {company.established} · Dubai, UAE</p>
          </div>
          <p className="text-center text-white/35">
            Website designed and developed by{" "}
            <a
              href="https://thedigitalmagnet.com"
              target="_blank"
              rel="noopener noreferrer"
              className="footer-link text-white/50 hover:text-white"
            >
              Magnet Digital LLC
            </a>
            {" · "}
            <a
              href="https://thedigitalmagnet.com"
              target="_blank"
              rel="noopener noreferrer"
              className="footer-link hover:text-white"
            >
              thedigitalmagnet.com
            </a>
            {" · "}
            <a
              href="https://hussainiitservices.com"
              target="_blank"
              rel="noopener noreferrer"
              className="footer-link hover:text-white"
            >
              hussainiitservices.com
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
}
