/**
 * One-off seed for the seo_metadata table — derives sensible default
 * meta title/description per page from content already seeded in
 * `translations` (site name/tagline, nav labels, hero paragraphs), so the
 * table starts populated instead of empty. Not shipped; run manually via
 * `npx tsx scripts/seed-seo-metadata.ts`.
 */
import { readFileSync } from "fs";
import { fileURLToPath } from "url";
import path from "path";
import { createClient } from "@supabase/supabase-js";

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

async function t(key: string): Promise<{ en: string; ar: string }> {
  const { data } = await supabase.from("translations").select("locale, value").eq("key", key);
  const en = data?.find((r) => r.locale === "en")?.value ?? "";
  const ar = data?.find((r) => r.locale === "ar")?.value ?? "";
  return { en, ar };
}

async function main() {
  const siteName = await t("site.name");
  const tagline = await t("site.tagline");

  const pages: { slug: string; navKey: string; paragraphKey: string }[] = [
    { slug: "home", navKey: "home", paragraphKey: "pages.home.hero.paragraph" },
    { slug: "about", navKey: "about", paragraphKey: "pages.about.hero.paragraph" },
    { slug: "procedures", navKey: "procedures", paragraphKey: "pages.procedures.hero.paragraph" },
    { slug: "before-after", navKey: "beforeAfter", paragraphKey: "pages.beforeAfter.hero.paragraph" },
    { slug: "patient-stories", navKey: "patientStories", paragraphKey: "pages.patientStories.hero.paragraph" },
    { slug: "blog", navKey: "blog", paragraphKey: "pages.blog.hero.paragraph" },
    { slug: "videos", navKey: "videos", paragraphKey: "pages.videos.hero.paragraph" },
    { slug: "faq", navKey: "faq", paragraphKey: "pages.faq.hero.paragraph" },
    { slug: "contact", navKey: "contact", paragraphKey: "pages.contact.hero.paragraph" },
  ];

  const rows = [];
  for (const p of pages) {
    const navLabel = await t(`nav.${p.navKey}`);
    const paragraph = await t(p.paragraphKey);
    const metaTitle =
      p.slug === "home"
        ? { en: `${siteName.en} | ${tagline.en}`, ar: `${siteName.ar} | ${tagline.ar}` }
        : { en: `${navLabel.en} | ${siteName.en}`, ar: `${navLabel.ar} | ${siteName.ar}` };

    rows.push({
      page_slug: p.slug,
      meta_title: metaTitle,
      meta_description: paragraph,
      og_image: null,
    });
  }

  const { error, count } = await supabase.from("seo_metadata").upsert(rows, { count: "exact" });
  if (error) throw new Error(error.message);
  console.log(`✓ seo_metadata: ${count ?? rows.length} rows`);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
