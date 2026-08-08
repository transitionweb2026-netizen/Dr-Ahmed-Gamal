import Image from "next/image";
import { getLocale, getTranslations } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { Icon } from "@/components/Icon";
import { getArticles } from "@/services/articles";

export async function FeaturedArticle() {
  const locale = (await getLocale()) as "en" | "ar";
  const t = await getTranslations("pages.blog");
  const cta = await getTranslations("cta");

  const articles = await getArticles();
  const featured = articles.find((article) => article.featured);
  if (!featured) return null;

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

          <div className="gold-glass-card relative z-10 m-6 w-full max-w-2xl rounded-2xl p-6 backdrop-blur-xl sm:p-8 md:m-12 md:p-12">
            <span className="mb-4 inline-block text-label-sm uppercase tracking-widest text-brand-gold">
              {t("featuredLabel")}
            </span>
            <h2 className="mb-4 font-serif text-headline-lg leading-tight text-brand-light md:text-[40px]">
              {featured.title[locale]}
            </h2>
            <p className="mb-8 line-clamp-3 text-body-md text-brand-light/70">
              {featured.excerpt[locale]}
            </p>
            <Link
              href={`/blog/${featured.slug}`}
              className="inline-flex items-center gap-2 rounded-lg border border-brand-gold/50 bg-brand-gold/20 px-8 py-3 text-button uppercase tracking-wider text-brand-gold transition-all duration-300 hover:bg-brand-gold hover:text-brand-darker"
            >
              {cta("learnMore")}
              <Icon
                name="arrow_forward"
                className="h-[18px] w-[18px] rtl:rotate-180"
              />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
