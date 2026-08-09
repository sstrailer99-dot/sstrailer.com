-- Step 3 of 5
-- Row Level Security for media_items table

alter table public.media_items enable row level security;

drop policy if exists "Public read media" on public.media_items;
create policy "Public read media"
  on public.media_items for select
  using (true);

drop policy if exists "Authenticated insert media" on public.media_items;
create policy "Authenticated insert media"
  on public.media_items for insert
  to authenticated
  with check (true);

drop policy if exists "Authenticated update media" on public.media_items;
create policy "Authenticated update media"
  on public.media_items for update
  to authenticated
  using (true)
  with check (true);

drop policy if exists "Authenticated delete media" on public.media_items;
create policy "Authenticated delete media"
  on public.media_items for delete
  to authenticated
  using (true);
