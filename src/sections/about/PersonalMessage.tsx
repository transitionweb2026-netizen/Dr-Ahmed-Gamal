import Image from "next/image";
import { getTranslations } from "next-intl/server";

const PORTRAIT_IMAGE =
  "https://lh3.googleusercontent.com/aida-public/AB6AXuDOODoWObUH7MnELpTvoPb3O4NdeEoZ3oKMZlqC0uC6ycIDSqbeJQIQtxcvc55I3Y9KmgVoeTNR15eRIFvMXufvIZ4AeyjkLVninKL4CMDRMdvjxg_FU_HEHAOZoIde0o2abYKGDiJVL6VBUNlfG9UYcx3IFzFzyTuPtYXzzW_r8iWcyj2gtzEfX_YopLWqVOSUvIFxl3S3HffazB543kPiIQIAJ2gCOPNXslByKx1SRjFz9oQMwimQ4A";

export async function PersonalMessage() {
  const t = await getTranslations("pages.about.message");

  return (
    <section
      className="relative overflow-hidden py-24"
      style={{ background: "radial-gradient(circle at right, #2a1a0f 0%, #131313 100%)" }}
    >
      <div
        aria-hidden
        className="absolute inset-0 bg-[radial-gradient(rgba(212,175,55,0.05)_1px,transparent_1px)] opacity-30 [background-size:40px_40px]"
      />
      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 items-center gap-16 lg:grid-cols-2">
          <div className="group relative h-full">
            <div className="absolute -inset-2 rounded-2xl bg-gradient-to-r from-brand-gold/20 to-brand-darker opacity-40 blur-lg transition duration-1000 group-hover:opacity-60" />
            <div className="relative aspect-[3/4] h-full overflow-hidden rounded-2xl border border-brand-gold/30 shadow-2xl">
              <Image
                src={PORTRAIT_IMAGE}
                alt={t("signature")}
                fill
                className="object-cover"
                sizes="(min-width: 1024px) 50vw, 100vw"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-brand-darker/80 via-transparent to-transparent" />
            </div>
          </div>

          <div className="glass-panel relative space-y-8 rounded-2xl border border-brand-gold/10 p-10">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-brand-gold">
              {t("eyebrow")}
            </p>
            <h2 className="font-serif text-3xl leading-tight text-brand-light lg:text-5xl">
              {t("titleLine1")} <br />
              <span className="italic text-brand-gold">{t("titleLine2")}</span>
            </h2>
            <blockquote className="space-y-6 font-light leading-relaxed text-gray-300">
              <p>{t("paragraph1")}</p>
              <p>{t("paragraph2")}</p>
            </blockquote>
            <div className="border-t border-brand-gold/10 pt-6">
              <p className="font-serif text-2xl italic text-brand-gold">{t("signature")}</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
