import { NextResponse } from "next/server";
import { revalidatePath } from "next/cache";
import type { MediaSection } from "@/lib/cms/types";
import { getNextSortOrder, getPublicStorageUrl } from "@/lib/cms/media";
import { requireAdmin } from "@/lib/cms/auth";

const ALLOWED_TYPES = new Set([
  "image/jpeg",
  "image/png",
  "image/webp",
  "image/gif",
  "image/avif",
]);

const MAX_BYTES = 10 * 1024 * 1024;

export async function POST(request: Request) {
  const auth = await requireAdmin();
  if ("error" in auth) return auth.error;

  let formData: FormData;
  try {
    formData = await request.formData();
  } catch {
    return NextResponse.json({ error: "Expected multipart form data" }, { status: 400 });
  }

  const file = formData.get("file");
  const productSlug = String(formData.get("productSlug") ?? "").trim();
  const section = String(formData.get("section") ?? "").trim() as MediaSection;
  const alt = String(formData.get("alt") ?? "").trim();

  if (!(file instanceof File)) {
    return NextResponse.json({ error: "file is required" }, { status: 400 });
  }

  if (!productSlug || (section !== "product" && section !== "gallery")) {
    return NextResponse.json(
      { error: "productSlug and valid section (product|gallery) are required" },
      { status: 400 },
    );
  }

  if (!ALLOWED_TYPES.has(file.type)) {
    return NextResponse.json(
      { error: "Only JPEG, PNG, WebP, GIF, and AVIF images are allowed" },
      { status: 400 },
    );
  }

  if (file.size > MAX_BYTES) {
    return NextResponse.json({ error: "Image must be 10 MB or smaller" }, { status: 400 });
  }

  const ext = file.name.split(".").pop()?.toLowerCase() || "jpg";
  const safeExt = ["jpg", "jpeg", "png", "webp", "gif", "avif"].includes(ext) ? ext : "jpg";
  const storagePath = `${productSlug}/${section}/${crypto.randomUUID()}.${safeExt}`;

  const buffer = Buffer.from(await file.arrayBuffer());

  const { error: uploadError } = await auth.supabase.storage
    .from("product-media")
    .upload(storagePath, buffer, {
      contentType: file.type,
      upsert: false,
    });

  if (uploadError) {
    return NextResponse.json({ error: uploadError.message }, { status: 500 });
  }

  const publicUrl = getPublicStorageUrl(storagePath);
  const sortOrder = await getNextSortOrder(productSlug, section);

  const { data, error } = await auth.supabase
    .from("media_items")
    .insert({
      product_slug: productSlug,
      section,
      media_type: "image",
      source: "upload",
      url: publicUrl,
      storage_path: storagePath,
      alt: alt || null,
      sort_order: sortOrder,
    })
    .select()
    .single();

  if (error) {
    await auth.supabase.storage.from("product-media").remove([storagePath]);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  revalidatePath("/gallery");
  revalidatePath(`/products/${productSlug}`);
  revalidatePath("/products");

  return NextResponse.json({ item: data });
}
