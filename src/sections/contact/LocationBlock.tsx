import { getLocale, getTranslations } from "next-intl/server";
import { CTAButton } from "@/components/CTAButton";
import { Icon } from "@/components/Icon";
import { contactInfo } from "@/constants/contactInfo";

export async function LocationBlock() {
  const locale = (await getLocale()) as "en" | "ar";
  const t = await getTranslations("pages.contact.location");
  const cta = await getTranslations("cta");

  return (
    <section className="bg-brand-dark py-24">
      <div className="mx-auto max-w-4xl px-4 text-center sm:px-6 lg:px-8">
        <p className="text-sm font-semibold uppercase tracking-widest text-brand-gold">{t("eyebrow")}</p>
        <h2 className="mt-4 font-serif text-4xl text-brand-light">{t("heading")}</h2>

        <div className="mt-8 flex items-center justify-center gap-3 text-lg text-brand-light/80">
          <Icon name="location_on" className="h-5 w-5 shrink-0 text-brand-gold" />
          <span>{contactInfo.address[locale]}</span>
        </div>

        <div className="mt-8">
          <CTAButton href={contactInfo.mapsUrl} variant="outline" size="lg">
            {cta("getDirections")}
          </CTAButton>
        </div>
      </div>
    </section>
  );
}
