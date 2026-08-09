import type { MetadataRoute } from "next";
import { site } from "@/constants/site";
import { routing } from "@/i18n/routing";
import { getProcedures } from "@/services/procedures";
import { getArticles } from "@/services/articles";

const staticPaths = [
  "/",
  "/about",
  "/procedures",
  "/before-after",
  "/patient-stories",
  "/articles",
  "/videos",
  "/faq",
  "/contact",
  "/privacy",
  "/terms",
];

function languageAlternates(path: string) {
  const entries = routing.locales.map((locale) => [
    locale,
    `${site.url}/${locale}${path === "/" ? "" : path}`,
  ]);
  return Object.fromEntries(entries);
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const [procedures, articles] = await Promise.all([getProcedures(), getArticles()]);

  // Real per-item dates where we have them (article publish date); omitted
  // entirely elsewhere rather than stamping every URL with the build time,
  // which teaches crawlers to distrust the signal instead of helping them
  // prioritize re-crawls.
  const lastModByPath = new Map<string, Date>(
    articles.map((a) => [`/articles/${a.slug}`, new Date(a.publishedAt)]),
  );

  const dynamicPaths = [
    ...procedures.map((p) => `/procedures/${p.slug}`),
    ...articles.map((a) => `/articles/${a.slug}`),
  ];

  const allPaths = [...staticPaths, ...dynamicPaths];

  return allPaths.flatMap((path) =>
    routing.locales.map((locale) => ({
      url: `${site.url}/${locale}${path === "/" ? "" : path}`,
      ...(lastModByPath.has(path) ? { lastModified: lastModByPath.get(path) } : {}),
      alternates: { languages: languageAlternates(path) },
    })),
  );
}
