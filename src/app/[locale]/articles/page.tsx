import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { hasLocale } from "next-intl";
import { routing } from "@/i18n/routing";
import { buildMetadata } from "@/lib/seo";
import { BlogHero } from "@/sections/blog/BlogHero";
import { FeaturedArticle } from "@/sections/blog/FeaturedArticle";
import { ArticleGrid } from "@/sections/blog/ArticleGrid";
import { BlogCta } from "@/sections/blog/BlogCta";
import { getSeoMetadata } from "@/services/seoMetadata";
import { getPageImages } from "@/services/pageImages";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale: rawLocale } = await params;
  const locale = hasLocale(routing.locales, rawLocale) ? rawLocale : routing.defaultLocale;
  const [t, seo] = await Promise.all([
    getTranslations({ locale, namespace: "pages.blog.hero" }),
    getSeoMetadata("articles"),
  ]);

  return buildMetadata({
    locale,
    path: "/articles",
    title: seo?.metaTitle[locale] || `${t("titleLine1")} ${t("titleLine2")}`,
    description: seo?.metaDescription[locale] || t("paragraph"),
    image: seo?.ogImage ?? undefined,
  });
}

export default async function ArticlesPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const images = await getPageImages();

  return (
    <main>
      <BlogHero image={images["articles-hero"]} />
      <FeaturedArticle />
      <ArticleGrid />
      <BlogCta image={images["articles-cta"]} />
    </main>
  );
}
