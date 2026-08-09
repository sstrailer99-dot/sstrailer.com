"use client";

import { useState, type FormEvent } from "react";
import { company } from "@/lib/data";

type Status = "idle" | "loading" | "success" | "error";

export function ContactForm() {
  const [status, setStatus] = useState<Status>("idle");
  const [errorMessage, setErrorMessage] = useState("");

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const data = new FormData(form);

    const payload = {
      name: String(data.get("name") || ""),
      phone: String(data.get("phone") || ""),
      email: String(data.get("email") || ""),
      company: String(data.get("company") || ""),
      message: String(data.get("message") || ""),
      website: String(data.get("website") || ""),
    };

    setStatus("loading");
    setErrorMessage("");

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const result = (await response.json()) as { ok?: boolean; error?: string };

      if (!response.ok) {
        if (response.status === 503) {
          openWhatsApp(payload.name, payload.phone, payload.message);
          setStatus("success");
          form.reset();
          return;
        }
        throw new Error(result.error || "Could not send your message.");
      }

      setStatus("success");
      form.reset();
    } catch (error) {
      setStatus("error");
      setErrorMessage(
        error instanceof Error ? error.message : "Could not send your message. Try WhatsApp instead.",
      );
    }
  }

  function openWhatsApp(name: string, phone: string, message: string) {
    const text = encodeURIComponent(
      `Hello SS Trailers,\n\nName: ${name}\nPhone: ${phone}\n\n${message}`,
    );
    window.open(`${company.whatsapp}?text=${text}`, "_blank");
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
          Tell us the trailer type, capacity and timeline. Your enquiry goes to{" "}
          <a href={company.emailHref} className="font-semibold text-navy hover:text-accent">
            {company.email}
          </a>{" "}
          and we&apos;ll respond with a clear quotation.
        </p>

        <div className="reveal reveal-delay-3 mt-10 space-y-6 border border-line bg-bg-white p-6">
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.18em] text-muted">
              Email
            </p>
            <a
              href={company.emailHref}
              className="mt-1 block text-lg font-bold text-navy hover:text-accent"
            >
              {company.email}
            </a>
          </div>
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
            className="btn-outline inline-flex"
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
          <input
            type="text"
            name="website"
            tabIndex={-1}
            autoComplete="off"
            className="hidden"
            aria-hidden="true"
          />

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
                disabled={status === "loading"}
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
                disabled={status === "loading"}
              />
            </label>
            <label className="block sm:col-span-2">
              <span className="mb-2 block text-xs font-bold uppercase tracking-[0.14em] text-muted">
                Email
              </span>
              <input
                name="email"
                type="email"
                className="field"
                placeholder="you@company.com (optional — for our reply)"
                autoComplete="email"
                disabled={status === "loading"}
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
                disabled={status === "loading"}
              />
            </label>
            <label className="block sm:col-span-2">
              <span className="mb-2 block text-xs font-bold uppercase tracking-[0.14em] text-muted">
                Message *
              </span>
              <textarea
                name="message"
                required
                className="field min-h-[140px]"
                placeholder="Trailer type, capacity, timeline..."
                disabled={status === "loading"}
              />
            </label>
          </div>

          <button
            type="submit"
            className="btn-primary mt-6 w-full sm:w-auto"
            disabled={status === "loading"}
          >
            {status === "loading" ? "Sending…" : "Send enquiry"}
          </button>

          {status === "success" && (
            <p className="mt-4 text-sm font-medium text-accent">
              Thank you — your enquiry was sent. We&apos;ll reply via email or phone shortly.
            </p>
          )}

          {status === "error" && (
            <p className="mt-4 text-sm font-medium text-red-600">{errorMessage}</p>
          )}
        </form>
      </div>
    </div>
  );
}
