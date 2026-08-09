import { Suspense } from "react";
import { AdminLoginForm } from "@/components/admin/AdminLoginForm";

export default function AdminLoginPage() {
  return (
    <div className="mx-auto max-w-lg py-10">
      <div className="mb-8 text-center">
        <p className="text-xs font-bold uppercase tracking-[0.2em] text-accent">Admin</p>
        <h1 className="display mt-3 text-3xl font-extrabold text-navy">Sign in</h1>
        <p className="mt-3 text-sm text-muted">
          Use your Supabase admin account to manage product and gallery media.
        </p>
      </div>

      <Suspense fallback={<p className="text-center text-sm text-muted">Loading…</p>}>
        <AdminLoginForm />
      </Suspense>
    </div>
  );
}
