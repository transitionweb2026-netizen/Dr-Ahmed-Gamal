import { getTranslations } from "next-intl/server";
import { PageHero } from "@/sections/shared/PageHero";
import { CTAButton } from "@/components/CTAButton";

const HERO_IMAGE =
  "https://lh3.googleusercontent.com/aida/AP1WRLs7JGqjVEkh-UYy-fHLzZvDwKy_VFdbH9qjvgO1_FDrKAhZpW-rqaQqsINVDbsYtpu2lJI9APGpbFpS0UQwAqiFZSyQq-_hYBlLoI3058MDrhqo4NcZC124V6PcMw6Q654UjCwkTnSigmTh18nJbNZ0bv_pR7dCGqeyUqkALVX6gDKybS7OxdA3txiLgqxGBKrhGN0CSignxOf3E_kHZ6YtMm7djV13AorO4s-1Ik7GiTfWRv6XI1YcnL4";

export async function PatientStoriesHero() {
  const t = await getTranslations("pages.patientStories.hero");
  const cta = await getTranslations("cta");

  return (
    <PageHero
      image={HERO_IMAGE}
      eyebrow={t("eyebrow")}
      title={
        <>
          {t("titleLine1")} <br />
          <span className="italic text-brand-gold">{t("titleLine2")}</span>
        </>
      }
      paragraph={t("paragraph")}
    >
      <CTAButton href="/contact" size="lg">
        {cta("contactUs")}
      </CTAButton>
    </PageHero>
  );
}
