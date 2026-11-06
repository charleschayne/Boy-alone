begin;
create table if not exists public.catalog_products (
 id text primary key,
 data jsonb not null,
 published_data jsonb,
 status text not null default 'draft' check (status in ('draft','published','archived')),
 sort_order integer not null default 0,
 published_sort_order integer not null default 0,
 updated_at timestamptz not null default now()
);
create unique index if not exists catalog_published_slug on public.catalog_products ((published_data->>'slug')) where status = 'published';
create table if not exists public.store_settings (
 id integer primary key check (id = 1),
 is_open boolean not null default false,
 closed_message text not null default '',
 updated_at timestamptz not null default now()
);
insert into public.store_settings (id) values (1) on conflict do nothing;
alter table public.catalog_products enable row level security;
alter table public.store_settings enable row level security;
revoke all on public.catalog_products, public.store_settings from anon, authenticated;
grant all on public.catalog_products, public.store_settings to service_role;
insert into storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
 values ('product-images','product-images',true,10485760,array['image/webp']) on conflict do nothing;
commit;
