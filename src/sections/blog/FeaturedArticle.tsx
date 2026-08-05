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
        <div className="grid grid-cols-1 items-center gap-10 overflow-hidden rounded-2xl glass-panel p-6 sm:p-10 lg:grid-cols-2">
          <div className="relative aspect-[4/3] w-full overflow-hidden rounded-2xl">
            <Image
              src={featured.image}
              alt={featured.title[locale]}
              fill
              priority
              className="object-cover"
              sizes="(min-width: 1024px) 50vw, 100vw"
            />
          </div>

          <div>
            <span className="inline-block rounded-full border border-brand-gold/40 px-4 py-1 text-xs font-semibold uppercase tracking-widest text-brand-gold">
              {t("featuredLabel")}
            </span>
            <h2 className="mt-4 font-serif text-3xl leading-tight text-brand-light sm:text-4xl">
              {featured.title[locale]}
            </h2>
            <p className="mt-4 leading-relaxed text-brand-light/70">{featured.excerpt[locale]}</p>
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
