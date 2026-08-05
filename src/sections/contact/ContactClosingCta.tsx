import { getTranslations } from "next-intl/server";
import { CTAButton } from "@/components/CTAButton";
import { Icon } from "@/components/Icon";
import { contactInfo } from "@/constants/contactInfo";

export async function ContactClosingCta() {
  const t = await getTranslations("pages.contact.ctaBanner");
  const cta = await getTranslations("cta");

  return (
    <section className="bg-brand-dark py-24">
      <div className="mx-auto max-w-3xl px-4 text-center sm:px-6 lg:px-8">
        <h2 className="font-serif text-3xl text-brand-light sm:text-4xl">{t("heading")}</h2>
        <p className="mt-4 leading-relaxed text-brand-light/70">{t("paragraph")}</p>
        <div className="mt-8 flex justify-center">
          <CTAButton href={contactInfo.whatsapp.href} size="lg">
            <Icon name="chat" className="h-4 w-4" />
            {cta("whatsapp")}
          </CTAButton>
        </div>
      </div>
    </section>
  );
}
