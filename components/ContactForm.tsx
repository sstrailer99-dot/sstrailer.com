"use client";

import { useState, type FormEvent } from "react";
import { company } from "@/lib/data";

export function ContactForm() {
  const [sent, setSent] = useState(false);

  function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const data = new FormData(form);
    const name = String(data.get("name") || "");
    const phone = String(data.get("phone") || "");
    const message = String(data.get("message") || "");
    const text = encodeURIComponent(
      `Hello SMS Auto,\n\nName: ${name}\nPhone: ${phone}\n\n${message}`,
    );
    window.open(`${company.whatsapp}?text=${text}`, "_blank");
    setSent(true);
    form.reset();
  }

  return (
    <div className="grid gap-12 md:grid-cols-12 md:gap-14">
      <div className="md:col-span-5">
        <p className="reveal text-xs font-bold uppercase tracking-[0.25em] text-accent">
          Get a Free Quote
        </p>
        <h2 className="reveal reveal-delay-1 display mt-2 text-4xl font-extrabold text-navy md:text-5xl">
          Request a Quote
        </h2>
        <p className="reveal reveal-delay-2 mt-4 text-base leading-relaxed text-muted">
          Tell us the trailer type, capacity and timeline. We&apos;ll respond with
          a clear quotation.
        </p>

        <div className="reveal reveal-delay-3 mt-10 space-y-6 border border-line bg-bg-white p-6">
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.18em] text-muted">
              Phone / WhatsApp
            </p>
            <a
              href={company.phoneHref}
              className="mt-1 block text-xl font-bold text-navy hover:text-accent"
            >
              {company.phone}
            </a>
          </div>
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.18em] text-muted">
              Workshop
            </p>
            <p className="mt-1 text-sm leading-relaxed text-navy-mid">
              {company.address}
            </p>
          </div>
          <a
            href={company.whatsapp}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-primary inline-flex"
          >
            Chat on WhatsApp
          </a>
        </div>
      </div>

      <div className="reveal-left reveal-delay-2 md:col-span-7">
        <form
          onSubmit={onSubmit}
          className="border border-line bg-bg-white p-6 shadow-sm md:p-8"
        >
          <div className="grid gap-5 sm:grid-cols-2">
            <label className="block">
              <span className="mb-2 block text-xs font-bold uppercase tracking-[0.14em] text-muted">
                Name *
              </span>
              <input
                name="name"
                required
                className="field"
                placeholder="Your name"
                autoComplete="name"
              />
            </label>
            <label className="block">
              <span className="mb-2 block text-xs font-bold uppercase tracking-[0.14em] text-muted">
                Phone *
              </span>
              <input
                name="phone"
                required
                type="tel"
                className="field"
                placeholder="+971 ..."
                autoComplete="tel"
              />
            </label>
            <label className="block sm:col-span-2">
              <span className="mb-2 block text-xs font-bold uppercase tracking-[0.14em] text-muted">
                Company
              </span>
              <input
                name="company"
                className="field"
                placeholder="Company name (optional)"
                autoComplete="organization"
              />
            </label>
            <label className="block sm:col-span-2">
              <span className="mb-2 block text-xs font-bold uppercase tracking-[0.14em] text-muted">
                Message *
              </span>
              <textarea
                name="message"
                required
                className="field"
                placeholder="Trailer type, capacity, timeline..."
              />
            </label>
          </div>

          <button type="submit" className="btn-primary mt-6 w-full sm:w-auto">
            Send via WhatsApp
          </button>

          {sent && (
            <p className="mt-4 text-sm font-medium text-accent">
              WhatsApp opened — send the message to complete your enquiry.
            </p>
          )}
        </form>
      </div>
    </div>
  );
}
