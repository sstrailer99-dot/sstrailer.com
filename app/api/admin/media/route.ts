import { NextResponse } from "next/server";
import { revalidatePath } from "next/cache";
import type { MediaSection } from "@/lib/cms/types";
import { normalizeGoogleDriveVideoUrl } from "@/lib/cms/drive";
import { getNextSortOrder } from "@/lib/cms/media";
import { requireAdmin } from "@/lib/cms/auth";

export async function GET(request: Request) {
  const auth = await requireAdmin();
  if ("error" in auth) return auth.error;

  const { searchParams } = new URL(request.url);
  const productSlug = searchParams.get("productSlug");
  const section = searchParams.get("section") as MediaSection | null;

  let query = auth.supabase
    .from("media_items")
    .select("*")
    .order("sort_order", { ascending: true })
    .order("created_at", { ascending: true });

  if (productSlug) query = query.eq("product_slug", productSlug);
  if (section) query = query.eq("section", section);

  const { data, error } = await query;
  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json({ items: data ?? [] });
}

export async function POST(request: Request) {
  const auth = await requireAdmin();
  if ("error" in auth) return auth.error;

  let body: {
    productSlug?: string;
    section?: MediaSection;
    url?: string;
    alt?: string;
  };

  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON body" }, { status: 400 });
  }

  const { productSlug, section, url, alt } = body;

  if (!productSlug || !section || !url) {
    return NextResponse.json(
      { error: "productSlug, section, and url are required" },
      { status: 400 },
    );
  }

  if (section !== "product" && section !== "gallery") {
    return NextResponse.json({ error: "Invalid section" }, { status: 400 });
  }

  if (section === "product") {
    return NextResponse.json(
      { error: "Google Drive links are only supported in the Gallery tab. Use upload for Product images." },
      { status: 400 },
    );
  }

  let normalizedUrl: string;
  try {
    normalizedUrl = normalizeGoogleDriveVideoUrl(url).embedUrl;
  } catch (err) {
    return NextResponse.json(
      { error: err instanceof Error ? err.message : "Invalid Google Drive URL" },
      { status: 400 },
    );
  }

  const sortOrder = await getNextSortOrder(productSlug, section);

  const { data, error } = await auth.supabase
    .from("media_items")
    .insert({
      product_slug: productSlug,
      section,
      media_type: "video",
      source: "drive",
      url: normalizedUrl,
      alt: alt?.trim() || null,
      sort_order: sortOrder,
    })
    .select()
    .single();

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  revalidatePath("/gallery");
  revalidatePath(`/products/${productSlug}`);

  return NextResponse.json({ item: data });
}
