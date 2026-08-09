import { AdminPanel } from "@/components/admin/AdminPanel";
import { getProductCategories } from "@/lib/cms/products";

export default async function AdminMediaPage() {
  const categories = await getProductCategories();

  return <AdminPanel initialCategories={categories} />;
}
