import { getLocale, getTranslations } from "next-intl/server";
import { Carousel } from "@/components/Carousel";
import { Icon } from "@/components/Icon";
import { milestones } from "@/content/milestones";

export async function MilestonesCarousel() {
  const locale = (await getLocale()) as "en" | "ar";
  const t = await getTranslations("pages.home.milestones");

  return (
    <section className="bg-brand-dark py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <h2 className="mb-12 font-serif text-4xl text-brand-light">{t("heading")}</h2>

        <Carousel
          ariaLabel={t("heading")}
          slideBasisClassName="basis-4/5 sm:basis-1/2 lg:basis-1/4"
        >
          {milestones.map((milestone) => (
            <div key={milestone.id} className="neon-card h-full rounded-2xl p-8">
              <Icon name={milestone.icon} className="h-8 w-8 text-brand-gold" />
              <p dir="ltr" className="mt-4 text-sm font-semibold text-brand-gold/80">
                {milestone.year}
              </p>
              <h3 className="mt-1 font-serif text-lg text-brand-light">{milestone.title[locale]}</h3>
              <p className="mt-2 text-sm leading-relaxed text-brand-light/60">
                {milestone.description[locale]}
              </p>
            </div>
          ))}
        </Carousel>
      </div>
    </section>
  );
}
