import { getTranslations } from "next-intl/server";
import { PageHero } from "@/sections/shared/PageHero";
import { CTAButton } from "@/components/CTAButton";
import { HeroContactCapsule } from "@/components/HeroContactCapsule";
import { contactInfo } from "@/constants/contactInfo";

const HERO_IMAGE =
  "https://lh3.googleusercontent.com/aida-public/AB6AXuDcV0vbvQje3-P9bA5CHxztUL1YLIOFZQooHr4HmwSvcdYBR8yyB4zmjdPZgexBLlsrBN83doUN-8GADg3NMq9KQlv_1zMFntc8faWUaFADcupPCs28fZLbcYQ5xwQ6_g4t4z3q2OViQ_ul9bkqg_3Hvq_zXq7L3N4fZ7nTlxWnx4l12HbeqISkNhuhYG0J3o6eA47f0pSFGJHV_klo8XXkpdLuT7kWJaXzU6N6wnySJyD1rw97YVJmyw";

export async function VideosHero() {
  const t = await getTranslations("pages.videos.hero");
  const cta = await getTranslations("cta");

  return (
    <PageHero
      image={HERO_IMAGE}
      title={
        <span className="drop-shadow-2xl">
          {t("titleLine1")} <br />
          <span className="bg-gradient-to-br from-[#f2ca50] to-[#d4af37] bg-clip-text text-transparent">
            {t("titleLine2")}
          </span>
        </span>
      }
      paragraph={t("paragraph")}
      capsule={
        <HeroContactCapsule
          groups={[
            [{ icon: "call", href: contactInfo.phone.href, label: contactInfo.phone.display }],
            [
              { icon: "share", href: "#", ariaLabel: t("shareAriaLabel") },
              { icon: "mail", href: contactInfo.email.href, ariaLabel: t("mailAriaLabel") },
            ],
          ]}
        />
      }
    >
      <CTAButton
        href="/contact"
        size="lg"
        showArrow
        className="mb-20 rounded-full bg-gradient-to-r from-brand-gold to-[#f2ca50] text-brand-darker shadow-[0_10px_30px_rgba(212,175,55,0.25)] hover:shadow-[0_15px_40px_rgba(212,175,55,0.4)]"
      >
        {cta("contactUs")}
      </CTAButton>
    </PageHero>
  );
}
