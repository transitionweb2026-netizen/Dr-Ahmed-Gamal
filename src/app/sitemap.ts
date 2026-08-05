import type { MetadataRoute } from "next";
import { site } from "@/constants/site";
import { routing } from "@/i18n/routing";
import { procedures } from "@/content/procedures";
import { articles } from "@/content/articles";

const staticPaths = [
  "/",
  "/about",
  "/procedures",
  "/before-after",
  "/patient-stories",
  "/blog",
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

export default function sitemap(): MetadataRoute.Sitemap {
  const dynamicPaths = [
    ...procedures.map((p) => `/procedures/${p.slug}`),
    ...articles.map((a) => `/blog/${a.slug}`),
  ];

  const allPaths = [...staticPaths, ...dynamicPaths];

  return allPaths.flatMap((path) =>
    routing.locales.map((locale) => ({
      url: `${site.url}/${locale}${path === "/" ? "" : path}`,
      lastModified: new Date(),
      alternates: { languages: languageAlternates(path) },
    })),
  );
}
