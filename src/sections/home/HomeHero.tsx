import Image from "next/image";
import { getTranslations } from "next-intl/server";
import { CTAButton } from "@/components/CTAButton";
import { HeroFloatingContact } from "@/components/HeroFloatingContact";

export async function HomeHero({ image }: { image: string }) {
  const t = await getTranslations("pages.home.hero");
  const cta = await getTranslations("cta");

  return (
    <section className="relative flex min-h-screen items-center justify-center overflow-hidden bg-brand-darker pb-16 pt-24">
      <div className="absolute inset-0 z-0">
        <Image
          src={image}
          alt=""
          fill
          priority
          className="object-cover object-center"
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-brand-darker/70 via-transparent to-transparent" />
      </div>

      <div className="relative z-10 mx-auto grid w-full max-w-7xl grid-cols-1 items-center gap-12 px-4 sm:px-6 lg:grid-cols-2 lg:px-8">
        <div className="flex flex-col gap-8">
          {/* Hidden on mobile — sat directly on top of the doctor's face at
              narrow widths; still shown from lg up. */}
          <p className="hidden rounded-full border border-brand-gold/30 bg-brand-dark/50 px-4 py-1 text-sm font-semibold uppercase tracking-[0.2em] text-brand-gold backdrop-blur-md lg:inline-block">
            {t("eyebrow")}
          </p>
          <h1 className="font-serif text-5xl leading-tight text-brand-light drop-shadow-[0_2px_12px_rgba(0,0,0,0.8)] lg:text-7xl">
            {t("titleLine1")} <br />
            <span className="italic text-brand-gold">{t("titleLine2")}</span>
          </h1>
          <p className="max-w-xl text-lg font-light leading-relaxed text-gray-300 drop-shadow-[0_2px_8px_rgba(0,0,0,0.8)]">
            {t("paragraph")}
          </p>
          <div className="flex flex-col items-start gap-6 sm:flex-row">
            <CTAButton href="/contact" size="lg">
              {cta("bookConsultation")}
            </CTAButton>
            <CTAButton href="/before-after" variant="outline" size="lg">
              {cta("viewResults")}
            </CTAButton>
          </div>
        </div>
      </div>

      <HeroFloatingContact />
    </section>
  );
}
