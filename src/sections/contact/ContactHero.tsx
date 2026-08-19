import { getTranslations } from "next-intl/server";
import { PageHero } from "@/sections/shared/PageHero";
import { HeroFloatingContact } from "@/components/HeroFloatingContact";
import { CTAButton } from "@/components/CTAButton";
import { Icon } from "@/components/Icon";
import { getContactInfo } from "@/services/contactInfo";

export async function ContactHero({ image }: { image: string }) {
  const t = await getTranslations("pages.contact.hero");
  const cta = await getTranslations("cta");
  const contactInfo = await getContactInfo();

  return (
    <PageHero
      image={image}
      align="start"
      title={<span className="text-display-lg">{t("title")}</span>}
      paragraph={t("paragraph")}
      short
      capsule={<HeroFloatingContact />}
    >
      <CTAButton
        href={contactInfo.whatsapp.href}
        size="lg"
        className="px-8 hover:translate-y-0 hover:scale-105"
      >
        <Icon name="chat" className="h-4 w-4" />
        {cta("whatsapp")}
      </CTAButton>
    </PageHero>
  );
}
