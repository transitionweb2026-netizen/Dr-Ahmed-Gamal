import Image from "next/image";
import { getLocale, getTranslations } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { Icon } from "@/components/Icon";
import { getArticles } from "@/services/articles";

export async function ArticleGrid() {
  const locale = (await getLocale()) as "en" | "ar";
  const common = await getTranslations("common");

  const articles = await getArticles();
  const rest = articles.filter((article) => !article.featured);

  return (
    <section className="bg-brand-darker pb-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {rest.map((article) => {
            const formattedDate = new Intl.DateTimeFormat(locale, {
              year: "numeric",
              month: "short",
              day: "numeric",
            }).format(new Date(article.publishedAt));

            return (
              <Link
                key={article.slug}
                href={`/blog/${article.slug}`}
                className="gold-glass-card group flex flex-col overflow-hidden rounded-2xl shadow-[0_10px_40px_rgba(0,0,0,0.5)]! transition-transform duration-500 hover:-translate-y-2"
              >
                <div className="relative h-64 w-full overflow-hidden">
                  <Image
                    src={article.image}
                    alt={article.title[locale]}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                    sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-brand-darker via-transparent to-transparent" />
                  <span className="absolute start-4 top-4 rounded-full border border-white/10 bg-brand-darker/60 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-brand-gold backdrop-blur-md">
                    {article.category[locale]}
                  </span>
                </div>
                <div className="flex flex-1 flex-col bg-brand-dark/50 p-6">
                  <h3 className="mb-3 font-serif text-[24px] leading-tight text-brand-light transition-colors group-hover:text-brand-gold">
                    {article.title[locale]}
                  </h3>
                  <p className="flex-1 text-body-md leading-relaxed text-brand-light/60">
                    {article.excerpt[locale]}
                  </p>
                  <div className="mt-4 flex items-center gap-3 border-t border-white/10 pt-4 text-xs text-brand-light/65">
                    <span className="flex items-center gap-1">
                      <Icon name="calendar_today" className="h-4 w-4" />
                      {formattedDate}
                    </span>
                    <span aria-hidden>•</span>
                    <span className="flex items-center gap-1">
                      <Icon name="schedule" className="h-4 w-4" />
                      {common("minRead", { minutes: article.readTimeMinutes })}
                    </span>
                  </div>
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}
