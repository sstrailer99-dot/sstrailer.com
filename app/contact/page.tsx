import type { Metadata } from "next";
import { ContactForm } from "@/components/ContactForm";
import { PageHero } from "@/components/PageHero";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Request a quote from Shahid Mehmood Salamat Auto General Repairing Co LLC. Call +971 54 512 9979 — Ras Al Khor, Dubai.",
};

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
