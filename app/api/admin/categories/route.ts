import { NextResponse } from "next/server";
import { getProductCategories } from "@/lib/cms/products";
import { requireAdmin } from "@/lib/cms/auth";

export async function GET() {
  const auth = await requireAdmin();
  if ("error" in auth) return auth.error;

  const categories = await getProductCategories();
  return NextResponse.json({ categories });
}
