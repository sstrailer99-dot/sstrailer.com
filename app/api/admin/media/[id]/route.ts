import { NextResponse } from "next/server";
import { revalidatePath } from "next/cache";
import { requireAdmin, getServiceClient } from "@/lib/cms/auth";

type RouteContext = { params: Promise<{ id: string }> };

export async function DELETE(_request: Request, context: RouteContext) {
  const auth = await requireAdmin();
  if ("error" in auth) return auth.error;

  const { id } = await context.params;

  const { data: item, error: fetchError } = await auth.supabase
    .from("media_items")
    .select("*")
    .eq("id", id)
    .single();

  if (fetchError || !item) {
    return NextResponse.json({ error: "Media item not found" }, { status: 404 });
  }

  if (item.storage_path) {
    const storageClient = getServiceClient() ?? auth.supabase;
    await storageClient.storage.from("product-media").remove([item.storage_path]);
  }

  const { error: deleteError } = await auth.supabase
    .from("media_items")
    .delete()
    .eq("id", id);

  if (deleteError) {
    return NextResponse.json({ error: deleteError.message }, { status: 500 });
  }

  revalidatePath("/gallery");
  revalidatePath(`/products/${item.product_slug}`);
  revalidatePath("/products");

  return NextResponse.json({ ok: true });
}
