# Supabase CMS Setup

Admin panel: `/admin/media` · Login: `/admin/login`

## 1. Create Supabase project

1. Go to [supabase.com](https://supabase.com) and create a project.
2. Copy **Project URL**, **anon key**, and **service role key** from Settings → API.

## 2. Configure `.env.local`

```env
NEXT_PUBLIC_SUPABASE_URL=https://xxxx.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
SUPABASE_SERVICE_ROLE_KEY=your-service-role-key
```

Restart the dev server after saving.

## 3. Run database SQL (separate files — easy)

In Supabase Dashboard → **SQL** → New query, run **each file in order**:

| Step | File |
|------|------|
| 1 | `supabase/01_extensions.sql` |
| 2 | `supabase/02_table_media_items.sql` |
| 3 | `supabase/03_rls_media_items.sql` |
| 4 | `supabase/04_storage_bucket.sql` |
| 5 | `supabase/05_storage_policies.sql` |
| 6 | `supabase/06_table_cms_products.sql` |
| 7 | `supabase/07_rls_cms_products.sql` |

See `supabase/README.md` for column details.

**Or** run everything at once: `supabase/schema.sql`

## 4. Create admin user

Supabase Dashboard → **Authentication** → **Users** → **Add user** → **Create new user**

| Field | Value |
|-------|-------|
| Email | `sstrailer99@gmail.com` |
| Password | Your admin password |
| Auto Confirm User | ✅ ON |

**Or run once from terminal** (uses service role key from `.env.local`):

```bash
node scripts/create-admin.mjs sstrailer99@gmail.com "YourPassword"
```

Then sign in at `/admin/login`.

### Login shows 400 / "Invalid login credentials"?

This means the admin user **does not exist yet** or the password is wrong — not a site bug.

1. Create the user in Supabase → Authentication → Users (with **Auto Confirm** ON)
2. Or run `scripts/create-admin.mjs` as above
3. Restart dev server after changing `.env.local`
4. Remove trailing slash from `NEXT_PUBLIC_SUPABASE_URL` if present

## 5. Use the admin panel

| Tab | Purpose |
|-----|---------|
| **Media** | Searchable product dropdown → upload product/gallery images + Drive videos |
| **Add Product** | Create a new product category on the website |

After adding a product, go to **Media** tab, select it from the dropdown, and upload images.

Google Drive video example:
```
https://drive.google.com/file/d/FILE_ID/view
```
## Notes

- Max upload: **10 MB** per image
- New uploads are **added** to existing images; originals are never removed from the site
- Delete an item in admin only to remove that uploaded image
