-- page_images — hero/section background images that previously had no CMS
-- field at all (hardcoded per-component consts). `slug` identifies where the
-- image is used (e.g. "home-hero", "about-cta"); `page` groups rows for the
-- admin list; seeded with today's exact hardcoded URLs so switching the
-- frontend to read from this table changes nothing visually until an admin
-- edits a row. Edit-only catalog (no create/delete UI), same pattern as
-- seo_metadata/translations.

create table page_images (
  slug text primary key,
  page text not null,
  label text not null,
  url text not null,
  updated_at timestamptz not null default now()
);

alter table page_images enable row level security;

create policy "public read page_images" on page_images
  for select using (true);

create policy "admins manage page_images" on page_images
  for all using (is_admin()) with check (is_admin());

create trigger page_images_set_updated_at
  before update on page_images
  for each row execute function set_updated_at();
