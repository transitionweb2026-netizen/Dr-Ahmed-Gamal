import { getTranslations } from "next-intl/server";
import { CTAButton } from "@/components/CTAButton";
import { Icon } from "@/components/Icon";
import { contactInfo } from "@/constants/contactInfo";

export async function ContactClosingCta() {
  const t = await getTranslations("pages.contact.ctaBanner");
  const cta = await getTranslations("cta");

  return (
    <section className="px-4 pb-[120px] sm:px-6 lg:px-8">
      <div className="gold-glass-card relative mx-auto max-w-4xl overflow-hidden rounded-2xl p-12 text-center">
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 bg-gradient-to-t from-brand-gold/5 to-transparent"
        />
        <h2 className="relative z-10 mb-4 text-headline-md font-serif text-brand-light">{t("heading")}</h2>
        <p className="relative z-10 mx-auto mb-8 max-w-xl text-body-lg text-brand-light/70">{t("paragraph")}</p>
        <div className="relative z-10 flex justify-center">
          <CTAButton
            href={contactInfo.whatsapp.href}
            size="lg"
            className="px-8 hover:translate-y-0 hover:scale-105"
          >
            <Icon name="chat" className="h-4 w-4" />
            {cta("whatsapp")}
          </CTAButton>
        </div>
      </div>
    </section>
  );
}
