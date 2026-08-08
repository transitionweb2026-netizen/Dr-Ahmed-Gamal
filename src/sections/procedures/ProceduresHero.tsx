import { getTranslations } from "next-intl/server";
import { PageHero } from "@/sections/shared/PageHero";
import { HeroFloatingContact } from "@/components/HeroFloatingContact";
import { CTAButton } from "@/components/CTAButton";

const HERO_IMAGE =
  "https://lh3.googleusercontent.com/aida-public/AB6AXuBbfwXVr3GsatDscK-Cy0c4KRhRPBQT7vxMc7rv8iTdTzzSdcwyHo-kjTCsAKpHaBl8C5bbADWIrNt87fRDcB4ONulCXsaq0a3RVl3o79J7YZMp9KdcqUfz315Nr4ylapY_6A6g89oc25dErurGuARUmB9SK0KQMpItQXUUQ_gYypAnX4Hc7hWLwdrNsh98_qznmmFokUpHdwj7-2BZFE4MvtDIf9_YVbdvD8CPoGm74x_t_QiJPhnk2w";

export async function ProceduresHero() {
  const t = await getTranslations("pages.procedures.hero");
  const cta = await getTranslations("cta");

  return (
    <PageHero
      image={HERO_IMAGE}
      align="start"
      eyebrow={
        // Reference eyebrow is a pill badge (border + translucent fill +
        // blur), not bare text. PageHero already wraps eyebrow in the
        // correct label typography/color, so only the pill "chrome" needs
        // adding here.
        <span className="inline-block rounded-full border border-brand-gold/30 bg-brand-dark/50 px-4 py-1 tracking-[0.2em] backdrop-blur-md">
          {t("eyebrow")}
        </span>
      }
      title={t("title")}
      paragraph={t("paragraph")}
      capsule={<HeroFloatingContact />}
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
