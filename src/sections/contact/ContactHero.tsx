import { getTranslations } from "next-intl/server";
import { PageHero } from "@/sections/shared/PageHero";
import { HeroContactCapsule } from "@/components/HeroContactCapsule";
import { CTAButton } from "@/components/CTAButton";
import { Icon } from "@/components/Icon";
import { getContactInfo } from "@/services/contactInfo";

const HERO_IMAGE =
  "https://lh3.googleusercontent.com/aida-public/AB6AXuD0VNsM0wX80bzSvbTOR489BcEFjL1kq6Ana5TSz17vJzdDbhMpj5wDSBzqa4CFFaUQxa0i3bk5W7LsKv88Hn9jD88m3jPXnVmgsTq_hZ52H_s_ihzkdv0KsPgxdiwhmXaWlnVTHudtmoPpiOfsOxn7SPNwrpLVG6FcMlR4q_XJRkyTSUVNSh6DdnGU2pYmaJJxIOCRECMXsPUx7vijuf3AtBNDEMKeyaaiBAmsbo6v2H0St0B8UAGtGQ";

export async function ContactHero() {
  const t = await getTranslations("pages.contact.hero");
  const cta = await getTranslations("cta");
  const contactInfo = await getContactInfo();

  return (
    <PageHero
      image={HERO_IMAGE}
      title={<span className="text-display-lg">{t("title")}</span>}
      paragraph={t("paragraph")}
      short
      imageOpacity={40}
      capsule={
        <HeroContactCapsule
          groups={[
            [{ icon: "call", href: contactInfo.phone.href, label: t("capsule.call") }],
            [{ icon: "mail", href: contactInfo.email.href, label: t("capsule.email") }],
            [{ icon: "location_on", href: contactInfo.mapsUrl, label: t("capsule.directions") }],
          ]}
        />
      }
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
