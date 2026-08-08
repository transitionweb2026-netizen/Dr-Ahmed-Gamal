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
    <section id="results" className="bg-brand-darker py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-16 flex items-center justify-center gap-6">
          <div className="h-px w-24 bg-gradient-to-r from-transparent to-brand-gold" />
          <h2 className="text-headline-lg-mobile font-serif bg-gradient-to-b from-brand-gold via-[#a67c00] to-[#5c4000] bg-clip-text text-transparent md:text-headline-lg">
            {t("sectionHeading")}
          </h2>
          <div className="h-px w-24 bg-gradient-to-l from-transparent to-brand-gold" />
        </div>

        <div className="space-y-20">
          {CATEGORIES.map((category) => {
            const cases = beforeAfterCases.filter(
              (c) => c.category === category && c.id.startsWith("gallery-"),
            );

            return (
              <div key={category}>
                <h3 className="mb-10 text-headline-md font-serif uppercase text-brand-light">
                  {t(`groups.${category}`)}
                </h3>
                {/* Reference puts dedicated prev/next buttons beside this heading
                    (top-right of the row); Carousel doesn't expose its embla API
                    for external control, so its own centered-below-content nav
                    is kept here (functional) rather than forked/relocated. */}
                <Carousel
                  ariaLabel={t(`groups.${category}`)}
                  slideBasisClassName="basis-full md:basis-1/3"
                  showDots={false}
                  navButtonClassName="border-brand-gold/40 bg-black/60"
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
