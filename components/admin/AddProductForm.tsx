"use client";

import { useMemo, useState } from "react";
import { slugifyTitle } from "@/lib/cms/products";

type AddProductFormProps = {
  onCreated: (product: { slug: string; title: string }) => void;
};

export function AddProductForm({ onCreated }: AddProductFormProps) {
  const [title, setTitle] = useState("");
  const [slug, setSlug] = useState("");
  const [slugEdited, setSlugEdited] = useState(false);
  const [short, setShort] = useState("");
  const [desc, setDesc] = useState("");
  const [capacity, setCapacity] = useState("");
  const [featuresText, setFeaturesText] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [message, setMessage] = useState<string | null>(null);

  const previewSlug = useMemo(() => {
    if (slugEdited) return slugifyTitle(slug);
    return slugifyTitle(title);
  }, [title, slug, slugEdited]);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setMessage(null);

    const features = featuresText
      .split("\n")
      .map((line) => line.trim())
      .filter(Boolean);

    try {
      const res = await fetch("/api/admin/products", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          title: title.trim(),
          slug: previewSlug,
          short: short.trim(),
          desc: desc.trim(),
          capacity: capacity.trim(),
          features,
        }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Failed to create product");

      setMessage(`Product "${data.product.title}" created. Upload images in the Media tab.`);
      onCreated({ slug: data.product.slug, title: data.product.title });

      setTitle("");
      setSlug("");
      setSlugEdited(false);
      setShort("");
      setDesc("");
      setCapacity("");
      setFeaturesText("");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to create product");
    } finally {
      setLoading(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5 rounded border border-black/10 bg-white p-5">
      <div>
        <h2 className="text-sm font-bold uppercase tracking-[0.15em] text-navy">
          Add new product
        </h2>
        <p className="mt-2 text-sm text-muted">
          Creates a new product category on the website. Then upload photos in the Media tab.
        </p>
      </div>

      <label className="block">
        <span className="mb-2 block text-xs font-bold uppercase tracking-[0.15em] text-muted">
          Product title *
        </span>
        <input
          required
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="w-full border border-black/15 px-4 py-3 text-sm outline-none focus:border-accent"
          placeholder="e.g. Car Carrier Trailer"
        />
      </label>

      <label className="block">
        <span className="mb-2 block text-xs font-bold uppercase tracking-[0.15em] text-muted">
          URL slug
        </span>
        <input
          value={slugEdited ? slug : previewSlug}
          onChange={(e) => {
            setSlugEdited(true);
            setSlug(e.target.value);
          }}
          className="w-full border border-black/15 px-4 py-3 text-sm outline-none focus:border-accent"
          placeholder="auto-generated-from-title"
        />
        <p className="mt-1 text-xs text-muted">
          Page URL: <code>/products/{previewSlug || "your-slug"}</code>
        </p>
      </label>

      <label className="block">
        <span className="mb-2 block text-xs font-bold uppercase tracking-[0.15em] text-muted">
          Short description *
        </span>
        <input
          required
          value={short}
          onChange={(e) => setShort(e.target.value)}
          className="w-full border border-black/15 px-4 py-3 text-sm outline-none focus:border-accent"
          placeholder="One line summary for product cards"
        />
      </label>

      <label className="block">
        <span className="mb-2 block text-xs font-bold uppercase tracking-[0.15em] text-muted">
          Full description *
        </span>
        <textarea
          required
          rows={4}
          value={desc}
          onChange={(e) => setDesc(e.target.value)}
          className="w-full border border-black/15 px-4 py-3 text-sm outline-none focus:border-accent"
          placeholder="Detailed product description"
        />
      </label>

      <label className="block">
        <span className="mb-2 block text-xs font-bold uppercase tracking-[0.15em] text-muted">
          Capacity / type *
        </span>
        <input
          required
          value={capacity}
          onChange={(e) => setCapacity(e.target.value)}
          className="w-full border border-black/15 px-4 py-3 text-sm outline-none focus:border-accent"
          placeholder="e.g. Vehicle transport"
        />
      </label>

      <label className="block">
        <span className="mb-2 block text-xs font-bold uppercase tracking-[0.15em] text-muted">
          Features (one per line)
        </span>
        <textarea
          rows={4}
          value={featuresText}
          onChange={(e) => setFeaturesText(e.target.value)}
          className="w-full border border-black/15 px-4 py-3 text-sm outline-none focus:border-accent"
          placeholder={"Multi-vehicle loading\nHydraulic ramps\nBuilt for UAE fleet duty"}
        />
      </label>

      {message && (
        <p className="rounded border border-green-200 bg-green-50 px-4 py-3 text-sm text-green-800">
          {message}
        </p>
      )}
      {error && (
        <p className="rounded border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
          {error}
        </p>
      )}

      <button type="submit" disabled={loading} className="btn-primary disabled:opacity-60">
        {loading ? "Creating…" : "Create product"}
      </button>
    </form>
  );
}
