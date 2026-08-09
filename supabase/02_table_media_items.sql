-- Step 2 of 5
-- Table: media_items
-- Stores uploaded images and Google Drive video links per product category

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
