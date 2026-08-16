/**
 * One-off seed for the page_images table — populates it with today's exact
 * hardcoded hero/section image URLs (from src/constants/pageImages.ts), so
 * switching the frontend to read from this table changes nothing visually
 * until an admin edits a row. Not shipped; run manually via
 * `npx tsx scripts/seed-page-images.ts`.
 */
import { readFileSync } from "fs";
import { fileURLToPath } from "url";
import path from "path";
import { createClient } from "@supabase/supabase-js";
import { pageImages } from "../src/constants/pageImages";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const envPath = path.join(__dirname, "..", ".env.local");
const env: Record<string, string> = {};
for (const line of readFileSync(envPath, "utf-8").split("\n")) {
  const trimmed = line.trim();
  if (!trimmed || trimmed.startsWith("#")) continue;
  const eq = trimmed.indexOf("=");
  if (eq === -1) continue;
  env[trimmed.slice(0, eq).trim()] = trimmed.slice(eq + 1).trim();
}

const supabase = createClient(env.NEXT_PUBLIC_SUPABASE_URL, env.SUPABASE_SERVICE_ROLE_KEY, {
  auth: { persistSession: false },
});

const rows = [
  { slug: "home-hero", page: "Home", label: "Hero background image", url: pageImages["home-hero"] },
  { slug: "home-about", page: "Home", label: "About section background image", url: pageImages["home-about"] },
  { slug: "home-specialties", page: "Home", label: "Specialties section background image", url: pageImages["home-specialties"] },
  { slug: "home-why-choose-us", page: "Home", label: "Why Choose Us background image", url: pageImages["home-why-choose-us"] },
  { slug: "home-videos", page: "Home", label: "Featured Videos background image", url: pageImages["home-videos"] },
  { slug: "about-hero", page: "About", label: "Hero background image", url: pageImages["about-hero"] },
  { slug: "about-message-portrait", page: "About", label: "Personal message portrait", url: pageImages["about-message-portrait"] },
  { slug: "about-procedures", page: "About", label: "Procedures section background image", url: pageImages["about-procedures"] },
  { slug: "about-cta", page: "About", label: "CTA background image", url: pageImages["about-cta"] },
  { slug: "procedures-hero", page: "Procedures", label: "Hero background image", url: pageImages["procedures-hero"] },
  { slug: "procedures-cta", page: "Procedures", label: "CTA silhouette image", url: pageImages["procedures-cta"] },
  { slug: "before-after-hero", page: "Before & After", label: "Hero background image", url: pageImages["before-after-hero"] },
  { slug: "before-after-cta", page: "Before & After", label: "CTA portrait image", url: pageImages["before-after-cta"] },
  { slug: "patient-stories-hero", page: "Patient Stories", label: "Hero background image", url: pageImages["patient-stories-hero"] },
  { slug: "videos-hero", page: "Videos", label: "Hero background image", url: pageImages["videos-hero"] },
  { slug: "articles-hero", page: "Articles", label: "Hero background image", url: pageImages["articles-hero"] },
  { slug: "articles-cta", page: "Articles", label: "CTA image", url: pageImages["articles-cta"] },
  { slug: "faq-hero", page: "FAQ", label: "Hero background image", url: pageImages["faq-hero"] },
  { slug: "contact-hero", page: "Contact", label: "Hero background image", url: pageImages["contact-hero"] },
  { slug: "contact-form-portrait", page: "Contact", label: "Form section portrait", url: pageImages["contact-form-portrait"] },
  { slug: "contact-location", page: "Contact", label: "Clinic location image", url: pageImages["contact-location"] },
];

async function main() {
  const { error, count } = await supabase.from("page_images").upsert(rows, { count: "exact" });
  if (error) throw new Error(error.message);
  console.log(`✓ page_images: ${count ?? rows.length} rows`);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
