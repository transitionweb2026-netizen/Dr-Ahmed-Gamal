import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { hasLocale } from "next-intl";
import { routing } from "@/i18n/routing";
import { buildMetadata } from "@/lib/seo";
import { BlogHero } from "@/sections/blog/BlogHero";
import { FeaturedArticle } from "@/sections/blog/FeaturedArticle";
import { ArticleGrid } from "@/sections/blog/ArticleGrid";
import { BlogCta } from "@/sections/blog/BlogCta";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale: rawLocale } = await params;
  const locale = hasLocale(routing.locales, rawLocale) ? rawLocale : routing.defaultLocale;
  const t = await getTranslations({ locale, namespace: "pages.blog.hero" });

  return buildMetadata({
    locale,
    path: "/articles",
    title: `${t("titleLine1")} ${t("titleLine2")}`,
    description: t("paragraph"),
  });
}

export default async function ArticlesPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  return (
    <main>
      <BlogHero />
      <FeaturedArticle />
      <ArticleGrid />
      <BlogCta />
    </main>
  );
}
