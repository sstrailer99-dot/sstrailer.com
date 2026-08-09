import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Admin",
  robots: { index: false, follow: false },
};

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-bg">
      <header className="border-b border-black/10 bg-bg-white">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 sm:px-5 md:px-8">
          <Link href="/admin/media" className="display text-lg font-extrabold text-navy">
            SS Trailers Admin
          </Link>
          <Link href="/" className="text-xs font-bold uppercase tracking-[0.12em] text-muted hover:text-navy">
            View site
          </Link>
        </div>
      </header>
      <main className="mx-auto max-w-7xl px-4 py-10 sm:px-5 md:px-8">{children}</main>
    </div>
  );
}
