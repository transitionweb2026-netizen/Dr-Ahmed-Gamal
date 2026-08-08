"use client";

import { useLocale, useTranslations } from "next-intl";
import { CTAButton } from "@/components/CTAButton";
import { Carousel } from "@/components/Carousel";
import { BeforeAfterSlider } from "@/components/BeforeAfterSlider";
import { beforeAfterCases } from "@/content/beforeAfterCases";

const featured = beforeAfterCases.filter((c) => c.featuredOnHome);

export function BeforeAfterPreview() {
  const locale = useLocale() as "en" | "ar";
  const t = useTranslations("pages.home.beforeAfter");

  return (
    <section className="overflow-hidden border-y border-brand-gold/10 bg-brand-darker py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-16 text-center">
          <p className="mb-4 text-xs font-semibold uppercase tracking-widest text-brand-gold">
            {t("eyebrow")}
          </p>
          <h2 className="font-serif text-4xl text-brand-light">{t("heading")}</h2>
        </div>

        <Carousel ariaLabel={t("heading")}>
          {featured.map((item) => (
            <div key={item.id}>
              <BeforeAfterSlider
                beforeImage={item.beforeImage}
                afterImage={item.afterImage}
                beforeAlt={`${item.title[locale]} — before`}
                afterAlt={`${item.title[locale]} — after`}
              />
              <h3 className="mt-4 font-serif text-lg text-brand-light">{item.title[locale]}</h3>
              <p className="text-sm text-brand-light/60">{item.subtitle[locale]}</p>
            </div>
          ))}
        </Carousel>

        <div className="mt-16 text-center">
          <CTAButton href="/before-after">{t("cta")}</CTAButton>
        </div>
      </div>
    </section>
  );
}
