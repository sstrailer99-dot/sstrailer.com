-- Step 6 of 7 — cms_products table + security (run this BEFORE step 7, or use this file alone)
-- Admin-created products (merged with static products on the site)

create table if not exists public.cms_products (
  id uuid primary key default gen_random_uuid(),
  slug text unique not null,
  title text not null,
  short text not null,
  description text not null,
  capacity text not null,
  features jsonb not null default '[]'::jsonb,
  image text not null default '/icon.png',
  sort_order integer not null default 0,
  is_active boolean not null default true,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index if not exists cms_products_slug_idx on public.cms_products (slug);
create index if not exists cms_products_sort_idx on public.cms_products (sort_order, created_at);

alter table public.cms_products enable row level security;

drop policy if exists "Public read active cms products" on public.cms_products;
create policy "Public read active cms products"
  on public.cms_products for select
  using (is_active = true);

drop policy if exists "Authenticated read all cms products" on public.cms_products;
create policy "Authenticated read all cms products"
  on public.cms_products for select
  to authenticated
  using (true);

drop policy if exists "Authenticated insert cms products" on public.cms_products;
create policy "Authenticated insert cms products"
  on public.cms_products for insert
  to authenticated
  with check (true);

drop policy if exists "Authenticated update cms products" on public.cms_products;
create policy "Authenticated update cms products"
  on public.cms_products for update
  to authenticated
  using (true)
  with check (true);

drop policy if exists "Authenticated delete cms products" on public.cms_products;
create policy "Authenticated delete cms products"
  on public.cms_products for delete
  to authenticated
  using (true);
