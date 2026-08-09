import { NextResponse } from "next/server";
import { revalidatePath } from "next/cache";
import {
  fetchCmsProducts,
  getNextProductSortOrder,
  isSlugTaken,
  slugifyTitle,
} from "@/lib/cms/products";
import { requireAdmin } from "@/lib/cms/auth";

export async function GET() {
  const auth = await requireAdmin();
  if ("error" in auth) return auth.error;

  const { data, error } = await auth.supabase
    .from("cms_products")
    .select("*")
    .order("sort_order", { ascending: true })
    .order("created_at", { ascending: true });

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json({ products: data ?? [] });
}

export async function POST(request: Request) {
  const auth = await requireAdmin();
  if ("error" in auth) return auth.error;

  let body: {
    title?: string;
    slug?: string;
    short?: string;
    desc?: string;
    capacity?: string;
    features?: string[];
  };

  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON body" }, { status: 400 });
  }

  const title = body.title?.trim();
  const short = body.short?.trim();
  const desc = body.desc?.trim();
  const capacity = body.capacity?.trim();
  const slug = slugifyTitle(body.slug?.trim() || title || "");

  if (!title || !short || !desc || !capacity || !slug) {
    return NextResponse.json(
      { error: "title, short, desc, and capacity are required" },
      { status: 400 },
    );
  }

  const cmsRows = await fetchCmsProducts(true);
  if (isSlugTaken(slug, cmsRows)) {
    return NextResponse.json(
      { error: "A product with this slug already exists. Choose a different title or slug." },
      { status: 409 },
    );
  }

  const features = (body.features ?? [])
    .map((feature) => feature.trim())
    .filter(Boolean);

  const sortOrder = await getNextProductSortOrder();

  const { data, error } = await auth.supabase
    .from("cms_products")
    .insert({
      slug,
      title,
      short,
      description: desc,
      capacity,
      features,
      sort_order: sortOrder,
      is_active: true,
    })
    .select()
    .single();

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  revalidatePath("/products");
  revalidatePath(`/products/${slug}`);
  revalidatePath("/gallery");
  revalidatePath("/");
  revalidatePath("/admin/media");

  return NextResponse.json({ product: data });
}
