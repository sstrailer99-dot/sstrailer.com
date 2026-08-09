"use client";

import Image from "next/image";
import { useCallback, useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { AddProductForm } from "@/components/admin/AddProductForm";
import { CategoryPicker, type CategoryOption } from "@/components/admin/CategoryPicker";
import { createClient } from "@/lib/supabase/client";
import type { MediaItem, MediaSection } from "@/lib/cms/types";

type AdminPanelProps = {
  initialCategories: CategoryOption[];
};

type MainTab = "media" | "add-product";
type MediaTab = "product" | "gallery";

export function AdminPanel({ initialCategories }: AdminPanelProps) {
  const router = useRouter();
  const [categories, setCategories] = useState(initialCategories);
  const [mainTab, setMainTab] = useState<MainTab>("media");
  const [mediaTab, setMediaTab] = useState<MediaTab>("product");
  const [productSlug, setProductSlug] = useState(initialCategories[0]?.slug ?? "");
  const [items, setItems] = useState<MediaItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [uploading, setUploading] = useState(false);
  const [driveUrl, setDriveUrl] = useState("");
  const [alt, setAlt] = useState("");
  const [message, setMessage] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const section: MediaSection = mediaTab;

  const selectedCategory = useMemo(
    () => categories.find((category) => category.slug === productSlug),
    [categories, productSlug],
  );

  const refreshCategories = useCallback(async () => {
    try {
      const res = await fetch("/api/admin/categories");
      const data = await res.json();
      if (res.ok && data.categories) {
        setCategories(data.categories);
      }
    } catch {
      // Keep existing list if refresh fails
    }
  }, []);

  const loadItems = useCallback(async () => {
    if (!productSlug || mainTab !== "media") return;
    setLoading(true);
    setError(null);

    try {
      const res = await fetch(
        `/api/admin/media?productSlug=${encodeURIComponent(productSlug)}&section=${section}`,
      );
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Failed to load media");
      setItems(data.items ?? []);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to load media");
      setItems([]);
    } finally {
      setLoading(false);
    }
  }, [productSlug, section, mainTab]);

  useEffect(() => {
    loadItems();
  }, [loadItems]);

  async function handleUpload(file: File) {
    if (!productSlug) {
      setError("Select a product category first.");
      return;
    }

    setUploading(true);
    setMessage(null);
    setError(null);

    try {
      const formData = new FormData();
      formData.append("file", file);
      formData.append("productSlug", productSlug);
      formData.append("section", section);
      if (alt.trim()) formData.append("alt", alt.trim());

      const res = await fetch("/api/admin/media/upload", {
        method: "POST",
        body: formData,
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Upload failed");

      setMessage("Image uploaded successfully.");
      setAlt("");
      await loadItems();
      router.refresh();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Upload failed");
    } finally {
      setUploading(false);
    }
  }

  async function handleDriveSubmit(e: React.FormEvent) {
    e.preventDefault();
    setUploading(true);
    setMessage(null);
    setError(null);

    try {
      const res = await fetch("/api/admin/media", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          productSlug,
          section: "gallery",
          url: driveUrl.trim(),
          alt: alt.trim() || undefined,
        }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Failed to add video link");

      setMessage("Google Drive video added to gallery.");
      setDriveUrl("");
      setAlt("");
      await loadItems();
      router.refresh();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to add video link");
    } finally {
      setUploading(false);
    }
  }

  async function handleDelete(id: string) {
    if (!confirm("Delete this media item?")) return;

    setError(null);
    setMessage(null);

    try {
      const res = await fetch(`/api/admin/media/${id}`, { method: "DELETE" });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Delete failed");

      setMessage("Media deleted.");
      await loadItems();
      router.refresh();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Delete failed");
    }
  }

  async function handleSignOut() {
    const supabase = createClient();
    await supabase.auth.signOut();
    router.push("/admin/login");
    router.refresh();
  }

  function onFileChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (file) handleUpload(file);
    e.target.value = "";
  }

  function onDrop(e: React.DragEvent<HTMLLabelElement>) {
    e.preventDefault();
    const file = e.dataTransfer.files?.[0];
    if (file) handleUpload(file);
  }

  async function handleProductCreated(product: { slug: string; title: string }) {
    await refreshCategories();
    setProductSlug(product.slug);
    setMainTab("media");
    setMediaTab("product");
    setMessage(`"${product.title}" is ready. Upload product images below.`);
    router.refresh();
  }

  return (
    <div className="space-y-8">
      <div className="flex flex-wrap items-center justify-between gap-4 border-b border-black/10 pb-6">
        <div>
          <p className="text-xs font-bold uppercase tracking-[0.2em] text-accent">CMS</p>
          <h1 className="display mt-2 text-3xl font-extrabold text-navy">Admin Panel</h1>
          <p className="mt-2 max-w-2xl text-sm text-muted">
            Manage products, upload images, and add gallery videos.
          </p>
        </div>
        <button
          type="button"
          onClick={handleSignOut}
          className="inline-flex min-h-11 items-center border-2 border-navy px-5 text-xs font-bold uppercase tracking-[0.12em] text-navy transition-colors hover:bg-navy hover:text-white"
        >
          Sign out
        </button>
      </div>

      <div className="flex flex-wrap gap-3">
        <button
          type="button"
          onClick={() => setMainTab("media")}
          className={`filter-chip ${mainTab === "media" ? "is-active" : ""}`}
        >
          Media
        </button>
        <button
          type="button"
          onClick={() => setMainTab("add-product")}
          className={`filter-chip ${mainTab === "add-product" ? "is-active" : ""}`}
        >
          Add Product
        </button>
      </div>

      {mainTab === "add-product" ? (
        <div className="max-w-2xl">
          <AddProductForm onCreated={handleProductCreated} />
        </div>
      ) : (
        <>
          <div className="flex flex-wrap gap-3">
            {(["product", "gallery"] as const).map((value) => (
              <button
                key={value}
                type="button"
                onClick={() => setMediaTab(value)}
                className={`rounded-full border px-4 py-2 text-xs font-bold uppercase tracking-[0.12em] transition-colors ${
                  mediaTab === value
                    ? "border-navy bg-navy text-white"
                    : "border-black/15 bg-white text-navy hover:border-accent"
                }`}
              >
                {value === "product" ? "Product images" : "Gallery & videos"}
              </button>
            ))}
          </div>

          <div className="grid gap-6 lg:grid-cols-[320px_1fr]">
            <div className="space-y-4">
              <CategoryPicker
                categories={categories}
                value={productSlug}
                onChange={setProductSlug}
              />

              {selectedCategory && (
                <p className="text-sm text-muted">
                  Managing <strong className="text-navy">{selectedCategory.title}</strong>{" "}
                  {mediaTab === "product" ? "product page images" : "gallery photos & videos"}.
                </p>
              )}
            </div>

            <div className="space-y-6">
              <div className="rounded border border-black/10 bg-white p-5">
                <h2 className="text-sm font-bold uppercase tracking-[0.15em] text-navy">
                  Upload image
                </h2>
                <p className="mt-2 text-sm text-muted">
                  JPEG, PNG, WebP, GIF or AVIF — max 10 MB.
                </p>

                <label
                  className="mt-4 flex cursor-pointer flex-col items-center justify-center gap-3 border-2 border-dashed border-black/15 bg-[#fafafa] px-6 py-10 text-center transition-colors hover:border-accent hover:bg-accent-soft"
                  onDragOver={(e) => e.preventDefault()}
                  onDrop={onDrop}
                >
                  <span className="text-sm font-semibold text-navy">
                    {uploading ? "Uploading…" : "Click to choose an image"}
                  </span>
                  <span className="text-xs text-muted">or drag and drop here</span>
                  <input
                    type="file"
                    accept="image/jpeg,image/png,image/webp,image/gif,image/avif"
                    className="hidden"
                    disabled={uploading || !productSlug}
                    onChange={onFileChange}
                  />
                </label>

                <label className="mt-4 block">
                  <span className="mb-2 block text-xs font-bold uppercase tracking-[0.15em] text-muted">
                    Alt text (optional)
                  </span>
                  <input
                    value={alt}
                    onChange={(e) => setAlt(e.target.value)}
                    className="w-full border border-black/15 px-4 py-3 text-sm outline-none focus:border-accent"
                    placeholder="Describe the image"
                  />
                </label>
              </div>

              {mediaTab === "gallery" && (
                <form
                  onSubmit={handleDriveSubmit}
                  className="rounded border border-black/10 bg-white p-5"
                >
                  <h2 className="text-sm font-bold uppercase tracking-[0.15em] text-navy">
                    Google Drive video
                  </h2>
                  <p className="mt-2 text-sm text-muted">
                    Paste a Google Drive share link. Example:{" "}
                    <code className="text-xs">https://drive.google.com/file/d/FILE_ID/view</code>
                  </p>

                  <input
                    value={driveUrl}
                    onChange={(e) => setDriveUrl(e.target.value)}
                    required
                    className="mt-4 w-full border border-black/15 px-4 py-3 text-sm outline-none focus:border-accent"
                    placeholder="https://drive.google.com/file/d/..."
                  />

                  <button
                    type="submit"
                    disabled={uploading || !driveUrl.trim() || !productSlug}
                    className="btn-primary mt-4 disabled:opacity-60"
                  >
                    {uploading ? "Adding…" : "Add video link"}
                  </button>
                </form>
              )}

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
            </div>
          </div>

          <div>
            <div className="mb-4 flex items-end justify-between gap-4">
              <h2 className="display text-2xl font-extrabold text-navy">
                Current {mediaTab === "product" ? "product" : "gallery"} media
              </h2>
              <span className="text-xs font-bold uppercase tracking-[0.18em] text-muted">
                {items.length} items
              </span>
            </div>

            {loading ? (
              <p className="text-sm text-muted">Loading…</p>
            ) : items.length === 0 ? (
              <p className="rounded border border-black/10 bg-white px-5 py-8 text-sm text-muted">
                No CMS uploads yet for this category. Original site images still show on the
                website — new uploads will be added alongside them.
              </p>
            ) : (
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {items.map((item) => (
                  <article
                    key={item.id}
                    className="overflow-hidden rounded border border-black/10 bg-white"
                  >
                    <div className="relative aspect-[4/3] bg-[#f3f3f3]">
                      {item.media_type === "video" ? (
                        <iframe
                          src={item.url}
                          title={item.alt ?? "Gallery video"}
                          className="h-full w-full border-0"
                          allow="autoplay; encrypted-media"
                          allowFullScreen
                        />
                      ) : (
                        <Image
                          src={item.url}
                          alt={item.alt ?? "Uploaded media"}
                          fill
                          className="object-cover"
                          sizes="(max-width: 768px) 100vw, 33vw"
                        />
                      )}
                    </div>
                    <div className="space-y-3 p-4">
                      <div className="flex flex-wrap gap-2 text-[0.65rem] font-bold uppercase tracking-[0.12em]">
                        <span className="rounded bg-navy px-2 py-1 text-white">
                          {item.media_type}
                        </span>
                        <span className="rounded bg-black/5 px-2 py-1 text-navy">
                          {item.source}
                        </span>
                      </div>
                      {item.alt && <p className="text-sm text-muted">{item.alt}</p>}
                      <button
                        type="button"
                        onClick={() => handleDelete(item.id)}
                        className="text-xs font-bold uppercase tracking-[0.12em] text-accent hover:text-accent-hot"
                      >
                        Delete
                      </button>
                    </div>
                  </article>
                ))}
              </div>
            )}
          </div>
        </>
      )}
    </div>
  );
}
