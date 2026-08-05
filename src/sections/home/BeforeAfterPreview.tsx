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
  const cta = useTranslations("cta");

  return (
    <section className="bg-brand-dark py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-12 flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-end">
          <h2 className="font-serif text-4xl text-brand-light">{t("heading")}</h2>
          <CTAButton href="/before-after" variant="ghost" showArrow>
            {cta("showMore")}
          </CTAButton>
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
      </div>
    </section>
  );
}
