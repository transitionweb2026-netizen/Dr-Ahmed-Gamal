import { getTranslations } from "next-intl/server";
import { PageHero } from "@/sections/shared/PageHero";
import { CTAButton } from "@/components/CTAButton";

const HERO_IMAGE =
  "https://lh3.googleusercontent.com/aida-public/AB6AXuBuprpW66lSnPpxBGRGrIko0U_ZUgAbLWADxxjSF5s2xfyhtrOWQhVXeV8GEFoxpfyYIM889aULmtLhuHFaeydGzfPpcuwtxTo06ugmp8kh0rv94NM_wZlC3DboAKAkHGCdZYhFRUc8UpnCZu4U918iaAcL6N410hWOxMeHTG9yDQu-G_ycijdMSHLVAKcVhhqY0AIc9-N7Sbt0ORAhGTuPdGFV3BWF0zxxJnBsPZYgzw5F6irz1gNSuw";

export async function BlogHero() {
  const t = await getTranslations("pages.blog.hero");
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
