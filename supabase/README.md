# Supabase SQL Setup (run in order)

Open **Supabase Dashboard → SQL → New query** and run each file **one by one** in this order:

| Step | File | What it creates |
|------|------|-----------------|
| 1 | `01_extensions.sql` | Required PostgreSQL extension |
| 2 | `02_table_media_items.sql` | **media_items** table + index |
| 3 | `03_rls_media_items.sql` | Security rules for **media_items** |
| 4 | `04_storage_bucket.sql` | **product-media** storage bucket |
| 5 | `05_storage_policies.sql` | Security rules for storage |
| 6 | `06_table_cms_products.sql` | **cms_products** table (admin-created products) |
| 7 | `07_rls_cms_products.sql` | Security rules for **cms_products** |

## media_items table columns

| Column | Type | Description |
|--------|------|-------------|
| id | uuid | Auto ID |
| product_slug | text | Category slug (e.g. `flat-bed-trailer`) |
| section | text | `product` or `gallery` |
| media_type | text | `image` or `video` |
| source | text | `upload` or `drive` |
| url | text | Public image URL or Drive embed URL |
| storage_path | text | Supabase storage path (uploads only) |
| alt | text | Optional alt text |
| sort_order | integer | Display order |
| created_at | timestamptz | Upload time |

## Admin login

Create the admin user in **Authentication → Users → Add user** (do not use SQL for passwords):

- **Email:** `sstrailer99@gmail.com`
- **Password:** set when creating the user in Supabase Dashboard
- **Login URL:** `/admin/login`

## All-in-one option

If you prefer one file, you can still run the old combined `schema.sql` — same result.
