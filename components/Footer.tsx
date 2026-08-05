import Image from "next/image";
import Link from "next/link";
import { company } from "@/lib/data";

export function Footer() {
  return (
    <footer className="bg-navy-deep text-white">
      <div className="mx-auto grid max-w-7xl gap-10 px-5 py-14 md:grid-cols-3 md:px-8">
        <div>
          <Link
            href="/"
            className="inline-flex w-fit max-w-[14rem] flex-col items-center rounded-sm bg-white px-3 py-2"
          >
            <Image
              src={company.logo}
              alt={`${company.shortName} logo`}
              width={240}
              height={45}
              className="h-10 w-auto object-contain"
            />
            <p className="mt-1.5 w-full text-center text-[0.65rem] font-semibold leading-tight tracking-wide text-navy">
              {company.slogan}
            </p>
          </Link>
          <p className="mt-2 text-xs font-semibold uppercase tracking-[0.14em] text-white/55">
            {company.name}
          </p>
          <p className="mt-4 max-w-xs text-sm leading-relaxed text-white/65">
            {company.description}
          </p>
        </div>

        <div>
          <p className="text-xs font-bold uppercase tracking-[0.2em] text-accent-hot">
            Quick Links
          </p>
          <ul className="mt-4 space-y-2 text-sm text-white/75">
            {[
              ["/", "Home"],
              ["/about", "About"],
              ["/products", "Products"],
              ["/gallery", "Gallery"],
              ["/industries", "Industries"],
              ["/process", "Process"],
              ["/contact", "Contact"],
            ].map(([href, label]) => (
              <li key={href}>
                <Link href={href} className="transition-colors hover:text-white">
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
          <ul className="mt-4 space-y-3 text-sm text-white/75">
            <li>
              <a
                href={company.phoneHref}
                className="font-semibold text-white hover:text-accent-hot"
              >
                {company.phone}
              </a>
            </li>
            <li>{company.address}</li>
          </ul>
        </div>
      </div>

      <div className="border-t border-white/10">
        <div className="mx-auto flex max-w-7xl flex-col gap-2 px-5 py-5 text-xs text-white/45 md:flex-row md:items-center md:justify-between md:px-8">
          <p>
            © {new Date().getFullYear()} {company.name}
          </p>
          <p>Established {company.established} · Dubai, UAE</p>
        </div>
      </div>
    </footer>
  );
}
