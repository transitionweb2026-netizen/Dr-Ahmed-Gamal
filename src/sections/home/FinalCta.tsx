import { getTranslations } from "next-intl/server";
import { CTAButton } from "@/components/CTAButton";
import { Icon } from "@/components/Icon";

export async function FinalCta() {
  const t = await getTranslations("pages.home.finalCta");
  const cta = await getTranslations("cta");

  return (
    <section className="bg-brand-darker py-24">
      <div className="mx-auto grid max-w-7xl grid-cols-1 items-center gap-12 px-4 sm:px-6 lg:grid-cols-2 lg:px-8">
        <div className="neon-card order-2 flex flex-col items-center justify-center gap-4 rounded-3xl p-10 text-center lg:order-1 lg:-rotate-2">
          <Icon name="diamond" className="h-8 w-8 text-brand-gold" />
          <p className="text-xs font-semibold uppercase tracking-widest text-brand-gold">
            {t("phoneOverline")}
          </p>
          <CTAButton href="/contact" size="md">
            {cta("bookNow")}
          </CTAButton>
        </div>

        <div className="order-1 space-y-6 text-center lg:order-2 lg:text-start">
          <p className="text-sm font-semibold uppercase tracking-widest text-brand-gold">
            {t("eyebrow")}
          </p>
          <h2 className="font-serif text-4xl leading-tight text-brand-light lg:text-5xl">
            {t("titleLine1")} <br />
            <span className="italic text-brand-gold">{t("titleLine2")}</span>
          </h2>
          <p className="leading-relaxed text-brand-light/70">{t("paragraph")}</p>
          <CTAButton href="/contact" size="lg">
            {cta("requestConsultation")}
          </CTAButton>
        </div>
      </div>
    </section>
  );
}
