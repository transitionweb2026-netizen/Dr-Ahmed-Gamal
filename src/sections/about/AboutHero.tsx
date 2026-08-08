import { getTranslations } from "next-intl/server";
import { PageHero } from "@/sections/shared/PageHero";
import { CTAButton } from "@/components/CTAButton";
import { HeroContactCapsule } from "@/components/HeroContactCapsule";
import { contactInfo } from "@/constants/contactInfo";

const HERO_IMAGE =
  "https://lh3.googleusercontent.com/aida-public/AB6AXuD0VNsM0wX80bzSvbTOR489BcEFjL1kq6Ana5TSz17vJzdDbhMpj5wDSBzqa4CFFaUQxa0i3bk5W7LsKv88Hn9jD88m3jPXnVmgsTq_hZ52H_s_ihzkdv0KsPgxdiwhmXaWlnVTHudtmoPpiOfsOxn7SPNwrpLVG6FcMlR4q_XJRkyTSUVNSh6DdnGU2pYmaJJxIOCRECMXsPUx7vijuf3AtBNDEMKeyaaiBAmsbo6v2H0St0B8UAGtGQ";

export async function AboutHero() {
  const t = await getTranslations("pages.about.hero");
  const cta = await getTranslations("cta");

  return (
    <PageHero
      image={HERO_IMAGE}
      eyebrow={t("eyebrow")}
      title={t("title")}
      paragraph={t("paragraph")}
      align="start"
      imageOpacity={60}
      imageClassName="object-[70%_20%]"
      gradientVariant="directional"
      minHeightClassName="min-h-[600px] pb-16 sm:min-h-[90vh]"
      capsule={
        <HeroContactCapsule
          groups={[
            [{ icon: "call", href: contactInfo.phone.href, label: contactInfo.phone.display }],
            [{ icon: "chat", href: contactInfo.whatsapp.href, label: cta("whatsapp") }],
          ]}
        />
      }
    >
      <CTAButton href="/contact" size="lg">
        {cta("bookConsultation")}
      </CTAButton>
      <CTAButton href="/before-after" variant="outline" size="lg">
        {cta("viewResults")}
      </CTAButton>
    </PageHero>
  );
}
