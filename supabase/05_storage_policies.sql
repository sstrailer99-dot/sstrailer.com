-- Step 5 of 5
-- Storage policies for product-media bucket

drop policy if exists "Public read product media" on storage.objects;
create policy "Public read product media"
  on storage.objects for select
  using (bucket_id = 'product-media');

drop policy if exists "Authenticated upload product media" on storage.objects;
create policy "Authenticated upload product media"
  on storage.objects for insert
  to authenticated
  with check (bucket_id = 'product-media');

drop policy if exists "Authenticated delete product media" on storage.objects;
create policy "Authenticated delete product media"
  on storage.objects for delete
  to authenticated
  using (bucket_id = 'product-media');
