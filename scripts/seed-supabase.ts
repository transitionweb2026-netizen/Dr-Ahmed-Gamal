/**
 * One-off seed script — migrates today's static content (src/content/*.ts,
 * src/constants/*.ts, messages/*.json) into the Supabase CMS tables, so the
 * CMS launches fully populated instead of empty. Not shipped/imported by
 * the app; run manually via `npx tsx scripts/seed-supabase.ts`.
 *
 * Uses the service-role key to bypass RLS for inserts.
 */
import { readFileSync } from "fs";
import { fileURLToPath } from "url";
import path from "path";
import { createClient } from "@supabase/supabase-js";

import { procedures } from "../src/content/procedures";
import { articles } from "../src/content/articles";
import { testimonials } from "../src/content/testimonials";
import { milestones } from "../src/content/milestones";
import { stats } from "../src/content/stats";
import { videos } from "../src/content/videos";
import { faqItems } from "../src/content/faqItems";
import { beforeAfterCases } from "../src/content/beforeAfterCases";
import { whyChooseUs } from "../src/content/whyChooseUs";
import { contactInfo } from "../src/constants/contactInfo";
import { site } from "../src/constants/site";
import { navLinks } from "../src/constants/nav";

// --- tiny .env.local loader (avoids adding a dotenv dependency) ---
const __dirname = path.dirname(fileURLToPath(import.meta.url));
const envPath = path.join(__dirname, "..", ".env.local");
for (const line of readFileSync(envPath, "utf-8").split("\n")) {
  const trimmed = line.trim();
  if (!trimmed || trimmed.startsWith("#")) continue;
  const eq = trimmed.indexOf("=");
  if (eq === -1) continue;
  const key = trimmed.slice(0, eq).trim();
  const value = trimmed.slice(eq + 1).trim();
  if (!(key in process.env)) process.env[key] = value;
}

const url = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY!;
if (!url || !serviceRoleKey) {
  throw new Error("NEXT_PUBLIC_SUPABASE_URL / SUPABASE_SERVICE_ROLE_KEY missing from .env.local");
}
const supabase = createClient(url, serviceRoleKey, { auth: { persistSession: false } });

const ABOUT_TIMELINE_SLUGS = new Set([
  "medical-degree",
  "board-certification",
  "international-fellowship",
  "private-practice-founded",
]);
const ABOUT_STAT_SLUGS = new Set(["years-experience", "procedures", "happy-patients", "advanced-trainings"]);

async function upsert(table: string, rows: unknown[]) {
  const { error, count } = await supabase.from(table).upsert(rows as never[], { count: "exact" });
  if (error) throw new Error(`${table}: ${error.message}`);
  console.log(`✓ ${table}: ${count ?? rows.length} rows`);
}

async function main() {
  await upsert(
    "procedures",
    procedures.map((p) => ({
      slug: p.slug,
      name: p.name,
      short_description: p.shortDescription,
      category: p.category,
      icon: p.icon,
      image: p.image,
      overview: p.detail.overview,
      recovery: p.detail.recovery,
      faq: p.detail.faq,
      featured_on_home: p.featuredOnHome ?? false,
      order_index: p.order,
      is_published: true,
    })),
  );

  await upsert(
    "articles",
    articles.map((a) => ({
      slug: a.slug,
      title: a.title,
      excerpt: a.excerpt,
      body: a.body,
      category: a.category,
      published_at: a.publishedAt,
      read_time_minutes: a.readTimeMinutes,
      image: a.image,
      featured: a.featured ?? false,
      is_published: true,
    })),
  );

  await upsert(
    "testimonials",
    testimonials.map((t, i) => ({
      slug: t.id,
      name: t.name,
      quote: t.quote,
      rating: t.rating,
      procedure_slug: t.procedureSlug ?? null,
      featured_on_home: t.featuredOnHome ?? false,
      order_index: i,
      is_published: true,
    })),
  );

  await upsert(
    "milestones",
    milestones.map((m, i) => ({
      slug: m.id,
      year: m.year,
      title: m.title,
      description: m.description,
      icon: m.icon,
      featured_on_home: m.id !== "private-practice-founded",
      featured_on_about: ABOUT_TIMELINE_SLUGS.has(m.id),
      order_index: i,
      is_published: true,
    })),
  );

  await upsert(
    "stats",
    stats.map((s, i) => ({
      slug: s.id,
      value: s.value,
      label: s.label,
      icon: s.icon,
      featured_on_home: s.id !== "advanced-trainings",
      featured_on_about: ABOUT_STAT_SLUGS.has(s.id),
      order_index: i,
      is_published: true,
    })),
  );

  await upsert(
    "videos",
    videos.map((v, i) => ({
      slug: v.id,
      title: v.title,
      category: v.category,
      thumbnail: v.thumbnail,
      youtube_id: v.youtubeId ?? null,
      vimeo_id: v.vimeoId ?? null,
      aspect: v.aspect ?? "9:16",
      video_type: v.category.en === "Patient Story" ? "patient_story" : "educational",
      order_index: i,
      is_published: true,
    })),
  );

  await upsert(
    "faq_items",
    faqItems.map((f, i) => ({
      slug: f.id,
      question: f.question,
      answer: f.answer,
      order_index: i,
      is_published: true,
    })),
  );

  await upsert(
    "before_after_cases",
    beforeAfterCases.map((c, i) => ({
      slug: c.id,
      title: c.title,
      subtitle: c.subtitle,
      category: c.category,
      before_image: c.beforeImage,
      after_image: c.afterImage,
      featured_on_home: c.featuredOnHome ?? false,
      show_in_category_gallery: c.id.startsWith("gallery-"),
      order_index: i,
      is_published: true,
    })),
  );

  await upsert(
    "checklist_items",
    whyChooseUs.map((c, i) => ({
      slug: c.id,
      text: c.text,
      icon: c.icon,
      order_index: i,
      is_published: true,
    })),
  );

  await upsert(
    "nav_links",
    navLinks.map((n, i) => ({
      href: n.href,
      label: n.label,
      order_index: i,
      is_visible: true,
    })),
  );

  await upsert("contact_info", [
    {
      id: 1,
      phone_display: contactInfo.phone.display,
      phone_href: contactInfo.phone.href,
      emergency_phone_display: contactInfo.emergencyPhone.display,
      emergency_phone_href: contactInfo.emergencyPhone.href,
      whatsapp_display: contactInfo.whatsapp.display,
      whatsapp_href: contactInfo.whatsapp.href,
      email_display: contactInfo.email.display,
      email_href: contactInfo.email.href,
      address: contactInfo.address,
      maps_url: contactInfo.mapsUrl,
      working_hours: contactInfo.workingHours,
      social: contactInfo.social,
    },
  ]);

  await upsert("site_settings", [
    {
      id: 1,
      name: site.name,
      short_name: site.shortName,
      logo_url: site.logoUrl,
    },
  ]);

  // --- translations: flatten messages/en.json + ar.json into dot-path rows ---
  const en = JSON.parse(readFileSync(path.join(__dirname, "..", "messages", "en.json"), "utf-8"));
  const ar = JSON.parse(readFileSync(path.join(__dirname, "..", "messages", "ar.json"), "utf-8"));

  function flatten(obj: unknown, prefix: string, out: Record<string, string>) {
    if (obj === null || obj === undefined) return;
    if (Array.isArray(obj)) {
      obj.forEach((item, i) => flatten(item, prefix ? `${prefix}.${i}` : String(i), out));
      return;
    }
    if (typeof obj === "object") {
      for (const [k, v] of Object.entries(obj as Record<string, unknown>)) {
        flatten(v, prefix ? `${prefix}.${k}` : k, out);
      }
      return;
    }
    out[prefix] = String(obj);
  }

  const enFlat: Record<string, string> = {};
  const arFlat: Record<string, string> = {};
  flatten(en, "", enFlat);
  flatten(ar, "", arFlat);

  const translationRows = [
    ...Object.entries(enFlat).map(([key, value]) => ({ key, locale: "en", value })),
    ...Object.entries(arFlat).map(([key, value]) => ({ key, locale: "ar", value })),
  ];
  await upsert("translations", translationRows);

  console.log("\nSeed complete.");
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
