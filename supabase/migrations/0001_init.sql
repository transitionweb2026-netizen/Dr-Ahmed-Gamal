-- Dr. Ahmed Gamal El-Borhamy CMS schema.
--
-- Bilingual text fields use JSONB shaped {"en": "...", "ar": "..."} — this
-- mirrors the app's existing `Bilingual<T> = { en: T; ar: T }` TypeScript
-- type exactly, so a fetched row's field is already the shape every
-- component expects at `row.field[locale]` with zero transformation.
--
-- `slug` columns preserve the stable string ids the current static content
-- files use (e.g. "medical-degree", "years-experience") so the same
-- content-selection logic in components keeps working unchanged after the
-- data source swap.

create extension if not exists "pgcrypto";

-- ============================================================================
-- Helpers
-- ============================================================================

create or replace function set_updated_at()
returns trigger
language plpgsql
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

-- ============================================================================
-- admin_users — allowlist of Supabase Auth users permitted to write CMS data.
-- No public policies: only the service-role client (admin Server Actions)
-- and the admin_users themselves (via is_admin() below) can touch this.
-- ============================================================================

create table admin_users (
  id uuid primary key references auth.users (id) on delete cascade,
  email text not null,
  created_at timestamptz not null default now()
);

alter table admin_users enable row level security;

create or replace function is_admin()
returns boolean
language sql
security definer
stable
as $$
  select exists (select 1 from admin_users where id = auth.uid());
$$;

create policy "admins can read admin_users" on admin_users
  for select using (is_admin());

-- ============================================================================
-- translations — every next-intl UI string (~239 keys x 2 locales).
-- `key` is the exact dot-path from messages/en.json, e.g.
-- "pages.home.hero.title" or "legal.privacy.sections.2.heading" for array
-- entries. src/i18n/request.ts fetches all rows for the current locale and
-- un-flattens them back into the nested tree next-intl expects, falling
-- back to the bundled messages/*.json for any missing key.
-- ============================================================================

create table translations (
  key text not null,
  locale text not null check (locale in ('en', 'ar')),
  value text not null,
  updated_at timestamptz not null default now(),
  primary key (key, locale)
);

alter table translations enable row level security;

create policy "public read translations" on translations
  for select using (true);

create policy "admins write translations" on translations
  for all using (is_admin()) with check (is_admin());

create trigger translations_set_updated_at
  before update on translations
  for each row execute function set_updated_at();

-- ============================================================================
-- procedures
-- ============================================================================

create table procedures (
  id uuid primary key default gen_random_uuid(),
  slug text not null unique,
  name jsonb not null,
  short_description jsonb not null,
  category text not null check (category in ('face', 'body', 'breast', 'non-surgical')),
  icon text not null,
  image text not null,
  overview jsonb not null,
  recovery jsonb not null,
  faq jsonb not null default '[]'::jsonb, -- [{ question: {en,ar}, answer: {en,ar} }, ...]
  featured_on_home boolean not null default false,
  order_index integer not null default 0,
  is_published boolean not null default true,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

alter table procedures enable row level security;

create policy "public read published procedures" on procedures
  for select using (is_published);

create policy "admins manage procedures" on procedures
  for all using (is_admin()) with check (is_admin());

create trigger procedures_set_updated_at
  before update on procedures
  for each row execute function set_updated_at();

-- ============================================================================
-- articles
-- ============================================================================

create table articles (
  id uuid primary key default gen_random_uuid(),
  slug text not null unique,
  title jsonb not null,
  excerpt jsonb not null,
  body jsonb not null, -- markdown source per locale
  category jsonb not null, -- free-text bilingual label, not an FK
  published_at date not null,
  read_time_minutes integer not null default 5,
  image text not null,
  featured boolean not null default false,
  is_published boolean not null default true,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

alter table articles enable row level security;

create policy "public read published articles" on articles
  for select using (is_published);

create policy "admins manage articles" on articles
  for all using (is_admin()) with check (is_admin());

create trigger articles_set_updated_at
  before update on articles
  for each row execute function set_updated_at();

-- ============================================================================
-- testimonials
-- ============================================================================

create table testimonials (
  id uuid primary key default gen_random_uuid(),
  slug text not null unique,
  name text not null, -- proper noun, not bilingual
  quote jsonb not null,
  rating integer not null check (rating between 1 and 5),
  procedure_slug text references procedures (slug) on delete set null,
  featured_on_home boolean not null default false,
  order_index integer not null default 0,
  is_published boolean not null default true,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

alter table testimonials enable row level security;

create policy "public read published testimonials" on testimonials
  for select using (is_published);

create policy "admins manage testimonials" on testimonials
  for all using (is_admin()) with check (is_admin());

create trigger testimonials_set_updated_at
  before update on testimonials
  for each row execute function set_updated_at();

-- ============================================================================
-- milestones — featured_on_home / featured_on_about mirror the current
-- hardcoded selection logic in MilestonesCarousel.tsx / JourneyTimeline.tsx
-- exactly, so which milestones show where doesn't change.
-- ============================================================================

create table milestones (
  id uuid primary key default gen_random_uuid(),
  slug text not null unique,
  year text not null,
  title jsonb not null,
  description jsonb not null,
  icon text not null,
  featured_on_home boolean not null default true,
  featured_on_about boolean not null default false,
  order_index integer not null default 0,
  is_published boolean not null default true,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

alter table milestones enable row level security;

create policy "public read published milestones" on milestones
  for select using (is_published);

create policy "admins manage milestones" on milestones
  for all using (is_admin()) with check (is_admin());

create trigger milestones_set_updated_at
  before update on milestones
  for each row execute function set_updated_at();

-- ============================================================================
-- stats — featured_on_home / featured_on_about mirror AchievementStrip.tsx's
-- current per-page 4-of-5 id filters.
-- ============================================================================

create table stats (
  id uuid primary key default gen_random_uuid(),
  slug text not null unique,
  value text not null, -- free text, e.g. "20+", "99%", "5.0"
  label jsonb not null,
  icon text not null,
  featured_on_home boolean not null default true,
  featured_on_about boolean not null default false,
  order_index integer not null default 0,
  is_published boolean not null default true,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

alter table stats enable row level security;

create policy "public read published stats" on stats
  for select using (is_published);

create policy "admins manage stats" on stats
  for all using (is_admin()) with check (is_admin());

create trigger stats_set_updated_at
  before update on stats
  for each row execute function set_updated_at();

-- ============================================================================
-- videos — video_type replaces the current fragile
-- `category.en === "Patient Story"` string-equality filter with an explicit
-- column, seeded to match today's split exactly (11 educational / 9 patient
-- story of 20 total).
-- ============================================================================

create table videos (
  id uuid primary key default gen_random_uuid(),
  slug text not null unique,
  title jsonb not null,
  category jsonb not null,
  thumbnail text not null,
  youtube_id text,
  vimeo_id text,
  aspect text not null default '9:16' check (aspect in ('9:16', '16:9')),
  video_type text not null check (video_type in ('educational', 'patient_story')),
  order_index integer not null default 0,
  is_published boolean not null default true,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

alter table videos enable row level security;

create policy "public read published videos" on videos
  for select using (is_published);

create policy "admins manage videos" on videos
  for all using (is_admin()) with check (is_admin());

create trigger videos_set_updated_at
  before update on videos
  for each row execute function set_updated_at();

-- ============================================================================
-- faq_items — the site-wide FAQ page list (distinct from procedures.faq).
-- ============================================================================

create table faq_items (
  id uuid primary key default gen_random_uuid(),
  slug text not null unique,
  question jsonb not null,
  answer jsonb not null,
  order_index integer not null default 0,
  is_published boolean not null default true,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

alter table faq_items enable row level security;

create policy "public read published faq_items" on faq_items
  for select using (is_published);

create policy "admins manage faq_items" on faq_items
  for all using (is_admin()) with check (is_admin());

create trigger faq_items_set_updated_at
  before update on faq_items
  for each row execute function set_updated_at();

-- ============================================================================
-- before_after_cases — show_in_category_gallery replaces today's fragile
-- `id.startsWith("gallery-")` string check with an explicit column, seeded
-- to match today's output exactly.
-- ============================================================================

create table before_after_cases (
  id uuid primary key default gen_random_uuid(),
  slug text not null unique,
  title jsonb not null,
  subtitle jsonb not null,
  category text not null check (category in ('face', 'body', 'breast')),
  before_image text not null,
  after_image text not null,
  featured_on_home boolean not null default false,
  show_in_category_gallery boolean not null default true,
  order_index integer not null default 0,
  is_published boolean not null default true,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

alter table before_after_cases enable row level security;

create policy "public read published before_after_cases" on before_after_cases
  for select using (is_published);

create policy "admins manage before_after_cases" on before_after_cases
  for all using (is_admin()) with check (is_admin());

create trigger before_after_cases_set_updated_at
  before update on before_after_cases
  for each row execute function set_updated_at();

-- ============================================================================
-- checklist_items — Home's "Why Choose Us" list.
-- ============================================================================

create table checklist_items (
  id uuid primary key default gen_random_uuid(),
  slug text not null unique,
  text jsonb not null,
  icon text not null,
  order_index integer not null default 0,
  is_published boolean not null default true,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

alter table checklist_items enable row level security;

create policy "public read published checklist_items" on checklist_items
  for select using (is_published);

create policy "admins manage checklist_items" on checklist_items
  for all using (is_admin()) with check (is_admin());

create trigger checklist_items_set_updated_at
  before update on checklist_items
  for each row execute function set_updated_at();

-- ============================================================================
-- nav_links
-- ============================================================================

create table nav_links (
  id uuid primary key default gen_random_uuid(),
  href text not null,
  label jsonb not null,
  order_index integer not null default 0,
  is_visible boolean not null default true,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

alter table nav_links enable row level security;

create policy "public read visible nav_links" on nav_links
  for select using (is_visible);

create policy "admins manage nav_links" on nav_links
  for all using (is_admin()) with check (is_admin());

create trigger nav_links_set_updated_at
  before update on nav_links
  for each row execute function set_updated_at();

-- ============================================================================
-- contact_info — singleton (id fixed at 1).
-- ============================================================================

create table contact_info (
  id integer primary key default 1 check (id = 1),
  phone_display text not null,
  phone_href text not null,
  emergency_phone_display text not null,
  emergency_phone_href text not null,
  whatsapp_display text not null,
  whatsapp_href text not null,
  email_display text not null,
  email_href text not null,
  address jsonb not null,
  maps_url text not null,
  working_hours jsonb not null default '[]'::jsonb, -- [{ days: {en,ar}, hours: {en,ar} }, ...]
  social jsonb not null default '{}'::jsonb, -- { instagram?, facebook?, tiktok?, youtube? }
  updated_at timestamptz not null default now()
);

alter table contact_info enable row level security;

create policy "public read contact_info" on contact_info
  for select using (true);

create policy "admins manage contact_info" on contact_info
  for all using (is_admin()) with check (is_admin());

create trigger contact_info_set_updated_at
  before update on contact_info
  for each row execute function set_updated_at();

-- ============================================================================
-- site_settings — singleton (id fixed at 1).
-- ============================================================================

create table site_settings (
  id integer primary key default 1 check (id = 1),
  name text not null,
  short_name text not null,
  logo_url text not null,
  updated_at timestamptz not null default now()
);

alter table site_settings enable row level security;

create policy "public read site_settings" on site_settings
  for select using (true);

create policy "admins manage site_settings" on site_settings
  for all using (is_admin()) with check (is_admin());

create trigger site_settings_set_updated_at
  before update on site_settings
  for each row execute function set_updated_at();

-- ============================================================================
-- seo_metadata — per-page meta title/description override.
-- page_slug matches the route's canonical path segment, e.g. "home",
-- "about", "procedures", "before-after", "patient-stories", "blog",
-- "videos", "faq", "contact".
-- ============================================================================

create table seo_metadata (
  page_slug text primary key,
  meta_title jsonb not null,
  meta_description jsonb not null,
  og_image text,
  updated_at timestamptz not null default now()
);

alter table seo_metadata enable row level security;

create policy "public read seo_metadata" on seo_metadata
  for select using (true);

create policy "admins manage seo_metadata" on seo_metadata
  for all using (is_admin()) with check (is_admin());

create trigger seo_metadata_set_updated_at
  before update on seo_metadata
  for each row execute function set_updated_at();

-- ============================================================================
-- Storage — public "media" bucket for admin-uploaded images.
-- ============================================================================

insert into storage.buckets (id, name, public)
values ('media', 'media', true)
on conflict (id) do nothing;

create policy "public read media" on storage.objects
  for select using (bucket_id = 'media');

create policy "admins upload media" on storage.objects
  for insert with check (bucket_id = 'media' and is_admin());

create policy "admins update media" on storage.objects
  for update using (bucket_id = 'media' and is_admin());

create policy "admins delete media" on storage.objects
  for delete using (bucket_id = 'media' and is_admin());
