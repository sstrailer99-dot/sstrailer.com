import { Certificates } from "@/components/Certificates";
import { CtaBanner } from "@/components/CtaBanner";
import { company } from "@/lib/data";
import { createPageMetadata } from "@/lib/seo";

export const metadata = createPageMetadata({
  title: "About SS Trailers Dubai",
  description: company.description,
  path: "/about",
  keywords: ["about SS Trailers", "trailer company Dubai", "Ras Al Khor manufacturer"],
});

export default function AboutPage() {
  return (
    <>
      <section className="bg-bg-white pt-[6.5rem] sm:pt-[7.5rem] md:pt-[8rem]">
        <div className="mx-auto max-w-3xl px-5 py-16 text-center sm:py-20 md:px-8 md:py-24">
          <p className="reveal text-xs font-bold uppercase tracking-[0.25em] text-accent">
            Who We Are
          </p>
          <h1 className="reveal reveal-delay-1 display mt-2 text-4xl font-extrabold text-navy md:text-5xl">
            {company.shortName}
          </h1>
          <p className="reveal reveal-delay-2 mt-5 text-base leading-relaxed text-muted md:text-lg">
            {company.about.intro}
          </p>
          <p className="reveal reveal-delay-3 mt-4 text-base leading-relaxed text-muted md:text-lg">
            {company.about.story}
          </p>
          <p className="reveal reveal-delay-3 mt-4 text-base leading-relaxed text-muted md:text-lg">
            {company.about.range}
          </p>
          <p className="reveal reveal-delay-4 mt-4 text-base leading-relaxed text-muted md:text-lg">
            {company.about.commitment}
          </p>
          <ul className="reveal reveal-delay-4 mx-auto mt-10 grid max-w-xl gap-2.5 text-left sm:grid-cols-2">
            {company.highlights.map((item) => (
              <li
                key={item}
                className="flex items-center gap-2 text-sm font-semibold text-navy"
              >
                <span className="inline-block h-2 w-2 shrink-0 bg-accent" />
                {item}
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="bg-bg py-16 md:py-24">
        <div className="mx-auto grid max-w-7xl gap-14 px-5 md:grid-cols-2 md:gap-16 md:px-8">
          <div className="reveal text-center md:text-left">
            <p className="text-xs font-bold uppercase tracking-[0.25em] text-accent">
              Our Vision
            </p>
            <h2 className="display mt-3 text-3xl font-extrabold text-navy md:text-4xl">
              Where we are headed
            </h2>
            <p className="mt-5 text-base leading-relaxed text-muted md:text-lg">
              {company.vision}
            </p>
          </div>
          <div className="reveal reveal-delay-2 text-center md:text-left">
            <p className="text-xs font-bold uppercase tracking-[0.25em] text-accent">
              Our Mission
            </p>
            <h2 className="display mt-3 text-3xl font-extrabold text-navy md:text-4xl">
              What we deliver
            </h2>
            <p className="mt-5 text-base leading-relaxed text-muted md:text-lg">
              {company.mission}
            </p>
          </div>
        </div>
      </section>

      <Certificates />

      <CtaBanner />
    </>
  );
}
