import { getTranslations } from "next-intl/server";
import { PageHero } from "@/sections/shared/PageHero";
import { CTAButton } from "@/components/CTAButton";

const HERO_IMAGE =
  "https://lh3.googleusercontent.com/aida-public/AB6AXuDcV0vbvQje3-P9bA5CHxztUL1YLIOFZQooHr4HmwSvcdYBR8yyB4zmjdPZgexBLlsrBN83doUN-8GADg3NMq9KQlv_1zMFntc8faWUaFADcupPCs28fZLbcYQ5xwQ6_g4t4z3q2OViQ_ul9bkqg_3Hvq_zXq7L3N4fZ7nTlxWnx4l12HbeqISkNhuhYG0J3o6eA47f0pSFGJHV_klo8XXkpdLuT7kWJaXzU6N6wnySJyD1rw97YVJmyw";

export async function VideosHero() {
  const t = await getTranslations("pages.videos.hero");
  const cta = await getTranslations("cta");

  return (
    <PageHero
      image={HERO_IMAGE}
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
