import type { Metadata } from "next";
import Image from "next/image";
import { notFound } from "next/navigation";
import ReactMarkdown from "react-markdown";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { hasLocale } from "next-intl";
import { routing } from "@/i18n/routing";
import { buildMetadata } from "@/lib/seo";
import { buildBlogPostingSchema } from "@/lib/jsonld";
import { JsonLd } from "@/components/JsonLd";
import { Link } from "@/i18n/navigation";
import { Icon } from "@/components/Icon";
import { getArticles } from "@/services/articles";
import { ContactCtaBanner } from "@/sections/shared/ContactCtaBanner";

export async function generateStaticParams() {
  const articles = await getArticles();
  return articles.map((article) => ({ slug: article.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}): Promise<Metadata> {
  const { locale: rawLocale, slug } = await params;
  const locale = hasLocale(routing.locales, rawLocale) ? rawLocale : routing.defaultLocale;
  const articles = await getArticles();
  const article = articles.find((item) => item.slug === slug);

  if (!article) {
    return {};
  }

  const loc = locale as "en" | "ar";
  return buildMetadata({
    locale,
    path: `/articles/${slug}`,
    title: article.title[loc],
    description: article.excerpt[loc],
    image: article.image,
  });
}

export default async function ArticleDetailPage({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { locale, slug } = await params;
  setRequestLocale(locale);

  const articles = await getArticles();
  const article = articles.find((item) => item.slug === slug);
  if (!article) {
    notFound();
  }

  const loc = locale as "en" | "ar";
  const t = await getTranslations("pages.blog");
  const ctaT = await getTranslations("pages.blog.cta");
  const common = await getTranslations("common");

  const formattedDate = new Intl.DateTimeFormat(loc, {
    year: "numeric",
    month: "short",
    day: "numeric",
  }).format(new Date(article.publishedAt));

  return (
    <main>
      <JsonLd data={buildBlogPostingSchema(article, loc)} />
      <article className="bg-brand-darker pb-24 pt-32">
        <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
          <Link
            href="/articles"
            className="inline-flex items-center gap-2 text-sm font-semibold uppercase tracking-widest text-brand-gold transition-colors hover:text-brand-light"
          >
            <Icon name="chevron_left" className="h-4 w-4 rtl:rotate-180" />
            {t("backToArticles")}
          </Link>

          <span className="mt-8 inline-block rounded-full border border-brand-gold/40 px-4 py-1 text-xs font-semibold uppercase tracking-widest text-brand-gold">
            {article.category[loc]}
          </span>

          <h1 className="mt-4 font-serif text-4xl leading-tight text-brand-light sm:text-5xl">
            {article.title[loc]}
          </h1>

          <div className="mt-4 flex items-center gap-3 text-sm text-brand-light/65">
            <span>{formattedDate}</span>
            <span aria-hidden>•</span>
            <span>{common("minRead", { minutes: article.readTimeMinutes })}</span>
          </div>

          <div className="relative mt-10 h-72 w-full overflow-hidden rounded-2xl sm:h-96">
            <Image
              src={article.image}
              alt={article.title[loc]}
              fill
              priority
              className="object-cover"
              sizes="(min-width: 1024px) 768px, 100vw"
            />
          </div>

          <div className="prose prose-invert prose-headings:font-serif prose-headings:text-brand-gold prose-a:text-brand-gold mt-10 max-w-none">
            <ReactMarkdown>{article.body[loc]}</ReactMarkdown>
          </div>
        </div>
      </article>

      <ContactCtaBanner eyebrow={ctaT("eyebrow")} heading={ctaT("heading")} paragraph={ctaT("paragraph")} />
    </main>
  );
}
