import { getTranslations } from "next-intl/server";
import { PageHero } from "@/sections/shared/PageHero";
import { CTAButton } from "@/components/CTAButton";

const HERO_IMAGE =
  "https://lh3.googleusercontent.com/aida-public/AB6AXuBh6iaobxq3_r12lvTEQPci05cD4dGmdcPtsNrwU9HUY4cht-g3YNkosCn2o9oIxhULGgq9ztLd-ljNdk0hKXQPqO9uzkr9o78BZQ8Gf9xAIjIkTHB1RnnhgH81GbvPT_ONYOoFG44Rbm4gj-xOiFKmQmk1aSo5LiD2y02t7yvW0ppwZyN_gUeVDNhGlW8GPIswDP-NG72ALHdKaSmKtaPusB2K-AZYX5YpQFmcaslpG02MoJdB2RWJQA";

export async function FaqHero() {
  const t = await getTranslations("pages.faq.hero");
  const cta = await getTranslations("cta");

  return (
    <PageHero image={HERO_IMAGE} eyebrow={t("eyebrow")} title={t("title")} paragraph={t("paragraph")}>
      <CTAButton href="/contact" size="lg">
        {cta("contactUs")}
      </CTAButton>
    </PageHero>
  );
}
