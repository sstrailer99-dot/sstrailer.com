import { ContactForm } from "@/components/ContactForm";
import { PageHero } from "@/components/PageHero";
import { createPageMetadata } from "@/lib/seo";

export const metadata = createPageMetadata({
  title: "Contact SS Trailers Dubai",
  description:
    "Request a trailer quote from SS Trailers. Call +971 54 512 9979, email info@sstrailers.net — Ras Al Khor Industrial Area, Dubai, UAE.",
  path: "/contact",
  keywords: ["contact SS Trailers", "trailer quote Dubai", "trailer manufacturer contact UAE"],
});

export default function ContactPage() {
  return (
    <>
      <PageHero
        eyebrow="Contact Us"
        title="Request a quote"
        subtitle="Tell us about your trailer, tanker or body-building requirement. We respond via WhatsApp and phone."
        image="/images/warehouse.jpg"
        ctaHref="tel:+971545129979"
        ctaLabel="Call +971 54 512 9979"
      />

      <section className="bg-sky py-20 md:py-28">
        <div className="mx-auto max-w-7xl px-5 md:px-8">
          <ContactForm />
        </div>
      </section>
    </>
  );
}
