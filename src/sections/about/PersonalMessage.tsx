import Image from "next/image";
import { getTranslations } from "next-intl/server";
import { Icon } from "@/components/Icon";

const PORTRAIT_IMAGE =
  "https://lh3.googleusercontent.com/aida-public/AB6AXuDOODoWObUH7MnELpTvoPb3O4NdeEoZ3oKMZlqC0uC6ycIDSqbeJQIQtxcvc55I3Y9KmgVoeTNR15eRIFvMXufvIZ4AeyjkLVninKL4CMDRMdvjxg_FU_HEHAOZoIde0o2abYKGDiJVL6VBUNlfG9UYcx3IFzFzyTuPtYXzzW_r8iWcyj2gtzEfX_YopLWqVOSUvIFxl3S3HffazB543kPiIQIAJ2gCOPNXslByKx1SRjFz9oQMwimQ4A";

export async function PersonalMessage() {
  const t = await getTranslations("pages.about.message");

  return (
    <section className="bg-brand-dark py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-2">
          <div className="relative aspect-[4/5] w-full overflow-hidden rounded-2xl">
            <Image
              src={PORTRAIT_IMAGE}
              alt={t("signature")}
              fill
              className="object-cover"
              sizes="(min-width: 1024px) 50vw, 100vw"
            />
          </div>

          <div className="glass-panel relative rounded-2xl p-8 sm:p-10">
            <Icon name="format_quote" className="h-10 w-10 text-brand-gold/50" />
            <p className="mt-4 text-sm font-semibold uppercase tracking-widest text-brand-gold">
              {t("eyebrow")}
            </p>
            <h2 className="mt-2 font-serif text-3xl text-brand-light sm:text-4xl">
              {t("titleLine1")} <span className="italic text-brand-gold">{t("titleLine2")}</span>
            </h2>
            <blockquote className="mt-6 space-y-4 leading-relaxed text-brand-light/80">
              <p>{t("paragraph1")}</p>
              <p>{t("paragraph2")}</p>
            </blockquote>
            <p className="mt-6 font-serif text-lg italic text-brand-gold">{t("signature")}</p>
          </div>
        </div>
      </div>
    </section>
  );
}
