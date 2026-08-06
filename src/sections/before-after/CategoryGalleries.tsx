"use client";

import { useLocale, useTranslations } from "next-intl";
import { Carousel } from "@/components/Carousel";
import { BeforeAfterSlider } from "@/components/BeforeAfterSlider";
import { beforeAfterCases } from "@/content/beforeAfterCases";
import type { CaseCategory } from "@/types/content";

const CATEGORIES: CaseCategory[] = ["face", "body", "breast"];

export function CategoryGalleries() {
  const locale = useLocale() as "en" | "ar";
  const t = useTranslations("pages.beforeAfter");

  return (
    <section className="bg-brand-dark py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <h2 className="mb-16 text-center font-serif text-4xl text-brand-light">
          {t("sectionHeading")}
        </h2>

        <div className="space-y-20">
          {CATEGORIES.map((category) => {
            const cases = beforeAfterCases.filter(
              (c) => c.category === category && c.id.startsWith("gallery-"),
            );

            return (
              <div key={category}>
                <h3 className="mb-8 font-serif text-2xl text-brand-gold">
                  {t(`groups.${category}`)}
                </h3>
                <Carousel
                  ariaLabel={t(`groups.${category}`)}
                  slideBasisClassName="basis-full sm:basis-1/2 lg:basis-1/3"
                >
                  {cases.map((item) => (
                    <div key={item.id} className="card-glow-halo rounded-2xl">
                      <BeforeAfterSlider
                        beforeImage={item.beforeImage}
                        afterImage={item.afterImage}
                        beforeAlt={`${item.title[locale]} — before`}
                        afterAlt={`${item.title[locale]} — after`}
                      />
                      <h4 className="mt-4 font-serif text-lg text-brand-light">
                        {item.title[locale]}
                      </h4>
                      <p className="text-sm text-brand-light/60">{item.subtitle[locale]}</p>
                    </div>
                  ))}
                </Carousel>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
