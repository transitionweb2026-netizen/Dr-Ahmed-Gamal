import { getTranslations } from "next-intl/server";
import { PageHero } from "@/sections/shared/PageHero";
import { HeroContactCapsule } from "@/components/HeroContactCapsule";
import { CTAButton } from "@/components/CTAButton";
import { contactInfo } from "@/constants/contactInfo";

const HERO_IMAGE =
  "https://lh3.googleusercontent.com/aida-public/AB6AXuBh6iaobxq3_r12lvTEQPci05cD4dGmdcPtsNrwU9HUY4cht-g3YNkosCn2o9oIxhULGgq9ztLd-ljNdk0hKXQPqO9uzkr9o78BZQ8Gf9xAIjIkTHB1RnnhgH81GbvPT_ONYOoFG44Rbm4gj-xOiFKmQmk1aSo5LiD2y02t7yvW0ppwZyN_gUeVDNhGlW8GPIswDP-NG72ALHdKaSmKtaPusB2K-AZYX5YpQFmcaslpG02MoJdB2RWJQA";

export async function FaqHero() {
  const t = await getTranslations("pages.faq.hero");
  const cta = await getTranslations("cta");

  return (
    <PageHero
      image={HERO_IMAGE}
      align="start"
      eyebrow={t("eyebrow")}
      title={t("title")}
      paragraph={t("paragraph")}
      capsule={
        <HeroContactCapsule
          align="center"
          groups={[
            [{ icon: "call", href: contactInfo.phone.href, label: contactInfo.phone.display }],
            [
              { icon: "share", href: "#", ariaLabel: t("shareAriaLabel") },
              { icon: "mail", href: contactInfo.email.href, ariaLabel: t("emailAriaLabel") },
            ],
          ]}
        />
      }
    >
      <CTAButton href="/contact" size="lg">
        {cta("contactUs")}
      </CTAButton>
      <CTAButton href="/before-after" variant="outline" size="lg">
        {cta("viewResults")}
      </CTAButton>
    </PageHero>
  );
}
