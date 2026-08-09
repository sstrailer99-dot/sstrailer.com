-- SS Trailers CMS — ALL-IN-ONE (optional)
-- Recommended: run the 5 separate files one by one (see supabase/README.md)

create extension if not exists "pgcrypto";

create table if not exists public.media_items (
  id uuid primary key default gen_random_uuid(),
  product_slug text not null,
  section text not null check (section in ('product', 'gallery')),
  media_type text not null check (media_type in ('image', 'video')),
  source text not null check (source in ('upload', 'drive')),
  url text not null,
  storage_path text,
  alt text,
  sort_order integer not null default 0,
  created_at timestamptz not null default now()
);

create index if not exists media_items_slug_section_idx
  on public.media_items (product_slug, section, sort_order);

alter table public.media_items enable row level security;

drop policy if exists "Public read media" on public.media_items;
create policy "Public read media"
  on public.media_items for select using (true);

drop policy if exists "Authenticated insert media" on public.media_items;
create policy "Authenticated insert media"
  on public.media_items for insert to authenticated with check (true);

drop policy if exists "Authenticated update media" on public.media_items;
create policy "Authenticated update media"
  on public.media_items for update to authenticated using (true) with check (true);

drop policy if exists "Authenticated delete media" on public.media_items;
create policy "Authenticated delete media"
  on public.media_items for delete to authenticated using (true);

insert into storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
values (
  'product-media',
  'product-media',
  true,
  10485760,
  array['image/jpeg', 'image/png', 'image/webp', 'image/gif', 'image/avif']
)
on conflict (id) do update set
  public = excluded.public,
  file_size_limit = excluded.file_size_limit,
  allowed_mime_types = excluded.allowed_mime_types;

drop policy if exists "Public read product media" on storage.objects;
create policy "Public read product media"
  on storage.objects for select using (bucket_id = 'product-media');

drop policy if exists "Authenticated upload product media" on storage.objects;
create policy "Authenticated upload product media"
  on storage.objects for insert to authenticated with check (bucket_id = 'product-media');

drop policy if exists "Authenticated delete product media" on storage.objects;
create policy "Authenticated delete product media"
  on storage.objects for delete to authenticated using (bucket_id = 'product-media');

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
  on public.cms_products for select using (is_active = true);

drop policy if exists "Authenticated read all cms products" on public.cms_products;
create policy "Authenticated read all cms products"
  on public.cms_products for select to authenticated using (true);

drop policy if exists "Authenticated insert cms products" on public.cms_products;
create policy "Authenticated insert cms products"
  on public.cms_products for insert to authenticated with check (true);

drop policy if exists "Authenticated update cms products" on public.cms_products;
create policy "Authenticated update cms products"
  on public.cms_products for update to authenticated using (true) with check (true);

drop policy if exists "Authenticated delete cms products" on public.cms_products;
create policy "Authenticated delete cms products"
  on public.cms_products for delete to authenticated using (true);
