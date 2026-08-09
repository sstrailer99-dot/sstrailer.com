import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { CtaBanner } from "@/components/CtaBanner";
import { ProductGrid } from "@/components/ProductGrid";
import { getIndustry, industries, products } from "@/lib/data";
import { createPageMetadata, industryKeywords } from "@/lib/seo";

type Props = { params: Promise<{ slug: string }> };

export async function generateStaticParams() {
  return industries.map((i) => ({ slug: i.slug }));
}

export async function generateMetadata({ params }: Props) {
  const { slug } = await params;
  const industry = getIndustry(slug);
  if (!industry) return createPageMetadata({ title: "Industry", description: "SS Trailers industry solutions.", path: `/industries/${slug}` });
  return createPageMetadata({
    title: `${industry.title} Trailers Dubai`,
    description: industry.short,
    path: `/industries/${slug}`,
    keywords: industryKeywords(industry.title),
    ogImage: industry.image,
  });
}

export default async function IndustryDetailPage({ params }: Props) {
  const { slug } = await params;
  const industry = getIndustry(slug);
  if (!industry) notFound();

  const relatedProducts = products.filter((p) =>
    industry.solutions.includes(p.title),
  );

  return (
    <>
      <section className="relative overflow-hidden pt-[7.5rem] md:pt-[8.5rem]">
        <div className="absolute inset-0">
          <Image
            src={industry.image}
            alt={`${industry.title} — SS Trailers industry solutions Dubai`}
            fill
            priority
            className="anim-ken object-cover"
            sizes="100vw"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-navy-deep/95 via-navy/85 to-navy/50" />
        </div>
        <div className="relative z-10 mx-auto max-w-7xl px-5 py-20 md:px-8 md:py-28">
          <p className="page-enter text-xs font-bold uppercase tracking-[0.28em] text-accent-hot">
            Industry Focus
          </p>
          <h1 className="page-enter page-enter-d1 display mt-3 max-w-4xl text-[clamp(2.4rem,6vw,4.75rem)] font-extrabold leading-[0.95] text-white">
            {industry.title}
          </h1>
          <p className="page-enter page-enter-d2 mt-5 max-w-2xl text-base leading-relaxed text-white/75 md:text-lg">
            {industry.desc}
          </p>
        </div>
      </section>

      <section className="bg-bg-white py-16 md:py-20">
        <div className="mx-auto max-w-7xl px-5 md:px-8">
          <h2 className="reveal display mb-10 text-center text-3xl font-extrabold text-navy md:mb-12 md:text-4xl">
            Recommended Solutions
          </h2>
          <ProductGrid items={relatedProducts} columns={3} />
          <Link
            href="/industries"
            className="reveal mt-12 inline-block text-sm font-bold uppercase tracking-[0.14em] text-navy transition-colors hover:text-accent"
          >
            ← All industries
          </Link>
        </div>
      </section>

      <CtaBanner />
    </>
  );
}
