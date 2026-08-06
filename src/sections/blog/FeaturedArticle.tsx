import Image from "next/image";
import { getLocale, getTranslations } from "next-intl/server";
import { CTAButton } from "@/components/CTAButton";
import { articles } from "@/content/articles";

export async function FeaturedArticle() {
  const locale = (await getLocale()) as "en" | "ar";
  const t = await getTranslations("pages.blog");
  const cta = await getTranslations("cta");
  const common = await getTranslations("common");

  const featured = articles.find((article) => article.featured);
  if (!featured) return null;

  const formattedDate = new Intl.DateTimeFormat(locale, {
    year: "numeric",
    month: "short",
    day: "numeric",
  }).format(new Date(featured.publishedAt));

  return (
    <section className="bg-brand-darker pb-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="group relative flex min-h-[420px] items-end overflow-hidden rounded-3xl shadow-[0_20px_50px_rgba(0,0,0,0.5)] sm:min-h-[500px] md:items-center">
          <Image
            src={featured.image}
            alt={featured.title[locale]}
            fill
            priority
            className="object-cover transition-transform duration-1000 group-hover:scale-105"
            sizes="100vw"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-brand-darker via-brand-darker/80 to-transparent md:from-brand-darker md:via-brand-darker/70 md:to-transparent md:ltr:bg-gradient-to-r md:rtl:bg-gradient-to-l" />

          <div className="gold-glass-card relative z-10 w-full rounded-t-2xl p-6 backdrop-blur-xl sm:p-8 md:my-12 md:ms-12 md:w-auto md:max-w-xl md:rounded-2xl md:p-12">
            <span className="inline-block rounded-full border border-brand-gold/40 px-4 py-1 text-xs font-semibold uppercase tracking-widest text-brand-gold">
              {t("featuredLabel")}
            </span>
            <h2 className="mt-4 font-serif text-3xl leading-tight text-brand-light sm:text-4xl">
              {featured.title[locale]}
            </h2>
            <p className="mt-4 line-clamp-3 leading-relaxed text-brand-light/70">
              {featured.excerpt[locale]}
            </p>
            <div className="mt-4 flex items-center gap-3 text-sm text-brand-light/65">
              <span>{formattedDate}</span>
              <span aria-hidden>•</span>
              <span>{common("minRead", { minutes: featured.readTimeMinutes })}</span>
            </div>
            <div className="mt-8">
              <CTAButton href={`/blog/${featured.slug}`} showArrow>
                {cta("readMore")}
              </CTAButton>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
