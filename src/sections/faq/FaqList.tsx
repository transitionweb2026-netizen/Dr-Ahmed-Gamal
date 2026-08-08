import { getTranslations } from "next-intl/server";
import { FaqAccordion } from "@/components/FaqAccordion";
import { faqItems } from "@/content/faqItems";

const midpoint = Math.ceil(faqItems.length / 2);
const firstHalf = faqItems.slice(0, midpoint);
const secondHalf = faqItems.slice(midpoint);

export async function FaqList() {
  const t = await getTranslations("pages.faq.intro");

  return (
    <section className="bg-brand-darker pb-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-3xl text-center">
          <p className="text-label-sm uppercase tracking-widest text-brand-gold">{t("eyebrow")}</p>
          <h2 className="mt-4 text-headline-lg font-serif text-brand-light">{t("heading")}</h2>
          <p className="mt-4 text-body-lg leading-relaxed text-brand-light/70">{t("paragraph")}</p>
        </div>

        <div className="mt-16 grid grid-cols-1 gap-x-8 lg:grid-cols-2">
          <FaqAccordion items={firstHalf} />
          <FaqAccordion items={secondHalf} />
        </div>
      </div>
    </section>
  );
}
