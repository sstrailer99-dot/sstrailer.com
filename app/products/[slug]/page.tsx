import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { CtaBanner } from "@/components/CtaBanner";
import { ProductGrid } from "@/components/ProductGrid";
import { getProduct, products } from "@/lib/data";

type Props = { params: Promise<{ slug: string }> };

export async function generateStaticParams() {
  return products.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const product = getProduct(slug);
  if (!product) return { title: "Product" };
  return {
    title: product.title,
    description: product.short,
  };
}

export default async function ProductDetailPage({ params }: Props) {
  const { slug } = await params;
  const product = getProduct(slug);
  if (!product) notFound();

  const related = products.filter((p) => p.slug !== product.slug).slice(0, 4);

  return (
    <>
      <section className="bg-bg pt-[6.5rem] sm:pt-[7.5rem] md:pt-[8.5rem]">
        <div className="mx-auto grid max-w-7xl gap-8 px-4 py-10 sm:gap-10 sm:px-5 sm:py-14 md:grid-cols-2 md:gap-14 md:px-8 md:py-20">
          <div className="page-enter relative aspect-[16/11] overflow-hidden border border-line bg-white sm:aspect-[4/3]">
            <Image
              src={product.image}
              alt={product.title}
              fill
              priority
              className="object-contain p-3"
              sizes="(max-width: 768px) 100vw, 50vw"
              quality={80}
            />
          </div>

          <div>
            <p className="page-enter text-[0.7rem] font-bold uppercase tracking-[0.2em] text-accent sm:text-xs">
              {product.capacity}
            </p>
            <h1 className="page-enter page-enter-d1 display mt-3 text-[clamp(1.85rem,6vw,3.5rem)] font-extrabold leading-[1.05] text-navy">
              {product.title}
            </h1>
            <p className="page-enter page-enter-d2 mt-4 text-sm leading-relaxed text-muted sm:mt-5 sm:text-base md:text-lg">
              {product.desc}
            </p>

            <ul className="page-enter page-enter-d3 mt-6 space-y-3 sm:mt-8">
              {product.features.map((feature) => (
                <li
                  key={feature}
                  className="flex items-start gap-3 text-sm font-semibold text-navy md:text-base"
                >
                  <span className="mt-1.5 inline-block h-2 w-2 shrink-0 bg-accent" />
                  {feature}
                </li>
              ))}
            </ul>

            <div className="page-enter page-enter-d4 mt-8 flex flex-col gap-3 sm:mt-9 sm:flex-row sm:flex-wrap">
              <Link href="/contact" className="btn-primary w-full sm:w-auto">
                Request a Quote
              </Link>
              <Link
                href="/products"
                className="inline-flex min-h-11 w-full items-center justify-center border-2 border-navy px-6 py-3 text-xs font-bold uppercase tracking-[0.12em] text-navy transition-colors hover:bg-navy hover:text-white sm:w-auto"
              >
                All Products
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-sky py-12 sm:py-16 md:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-5 md:px-8">
          <h2 className="reveal display text-2xl font-extrabold text-navy sm:text-3xl md:text-4xl">
            Gallery
          </h2>
          <div className="mt-6 grid gap-4 sm:mt-8 sm:grid-cols-2 sm:gap-5">
            {product.gallery.map((src, i) => (
              <div
                key={`${src}-${i}`}
                className="relative aspect-[16/10] overflow-hidden bg-white"
              >
                <Image
                  src={src}
                  alt={`${product.title} reference ${i + 1}`}
                  fill
                  className="object-contain p-2"
                  sizes="(max-width: 768px) 100vw, 50vw"
                  quality={75}
                />
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-bg-white py-14 sm:py-20 md:py-28">
        <div className="mx-auto max-w-7xl px-4 sm:px-5 md:px-8">
          <h2 className="reveal display mb-8 text-2xl font-extrabold text-navy sm:mb-10 sm:text-3xl md:text-4xl">
            Related Products
          </h2>
          <ProductGrid items={related} />
        </div>
      </section>

      <CtaBanner />
    </>
  );
}
