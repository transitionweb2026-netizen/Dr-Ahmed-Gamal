"use client";

import { motion, useReducedMotion } from "framer-motion";
import { useTranslations } from "next-intl";
import { CTAButton } from "@/components/CTAButton";
import { Icon } from "@/components/Icon";
import { contactInfo } from "@/constants/contactInfo";

/**
 * Restores a slice of the legacy mockup's floating 3D composition (calendar
 * card, medical-folder card, appointment-confirmation card) that sat beside
 * the consultation buttons — the rebuild had flattened this section down to
 * plain text + buttons. Not a pixel-exact recreation, but brings back the
 * layered, illustrative feel using the existing .neon-card/.gold-glass-card
 * utilities plus a Framer Motion float, disabled under reduced motion.
 */
export function ProceduresCta() {
  const t = useTranslations("pages.procedures.cta");
  const cta = useTranslations("cta");
  const proceduresT = useTranslations("procedures");
  const siteT = useTranslations("site");
  const reduceMotion = useReducedMotion();

  const floatAnimation = (offset: number, duration: number, delay: number) =>
    reduceMotion
      ? {}
      : {
          animate: { y: [0, -offset, 0] },
          transition: { duration, repeat: Infinity, ease: "easeInOut" as const, delay },
        };

  return (
    <section className="bg-brand-dark py-24">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="neon-card relative overflow-hidden rounded-[2rem]">
          <div className="grid grid-cols-1 items-center gap-12 p-8 sm:p-12 lg:grid-cols-2 lg:p-16">
            {/* Copy + buttons */}
            <div className="text-center lg:text-start">
              {t("eyebrow") && (
                <p className="text-sm font-semibold uppercase tracking-widest text-brand-gold">
                  {t("eyebrow")}
                </p>
              )}
              <h2 className="mt-4 font-serif text-3xl text-brand-light sm:text-4xl">{t("heading")}</h2>
              {t("paragraph") && (
                <p className="mt-4 leading-relaxed text-brand-light/70">{t("paragraph")}</p>
              )}
              <div className="mt-8 flex flex-wrap items-center justify-center gap-4 lg:justify-start">
                <CTAButton href="/contact" size="lg">
                  {cta("bookConsultation")}
                </CTAButton>
                <CTAButton href={contactInfo.whatsapp.href} variant="outline" size="lg">
                  {cta("whatsapp")}
                </CTAButton>
                <CTAButton href={contactInfo.phone.href} variant="outline" size="lg">
                  {cta("callNow")}
                </CTAButton>
              </div>
            </div>

            {/* Floating illustrative composition — decorative only */}
            <div aria-hidden="true" className="relative hidden h-[340px] lg:block">
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="h-48 w-64 rounded-full bg-brand-gold/10 blur-[70px]" />
              </div>

              {/* Calendar card */}
              <motion.div
                {...floatAnimation(14, 6, 0)}
                className="neon-card absolute start-[6%] top-[12%] z-20 w-36 rotate-[-8deg] rounded-xl p-4 shadow-2xl"
              >
                <div className="flex h-9 w-9 items-center justify-center rounded-full bg-brand-gold/15 text-brand-gold">
                  <Icon name="calendar_month" className="h-4 w-4" />
                </div>
                <p className="mt-3 text-xs font-semibold uppercase tracking-wider text-brand-gold">
                  {cta("bookNow")}
                </p>
                <div className="mt-2 grid grid-cols-4 gap-1">
                  {[0, 1, 2, 3, 4, 5, 6, 7].map((cell) => (
                    <span
                      key={cell}
                      className={
                        cell === 2
                          ? "h-2 rounded-sm bg-brand-gold/60 shadow-[0_0_6px_rgba(212,175,55,0.5)]"
                          : "h-2 rounded-sm bg-brand-light/10"
                      }
                    />
                  ))}
                </div>
              </motion.div>

              {/* Medical folder / overview card */}
              <motion.div
                {...floatAnimation(10, 8, 0.4)}
                className="neon-card absolute end-[4%] top-[2%] z-10 w-40 rotate-[7deg] rounded-xl p-5 shadow-2xl"
              >
                <div className="mx-auto mb-4 h-3 w-14 rounded-full bg-brand-gold/30" />
                <div className="space-y-2">
                  <div className="h-1.5 w-full rounded bg-brand-light/10" />
                  <div className="h-1.5 w-5/6 rounded bg-brand-light/10" />
                  <div className="h-1.5 w-4/6 rounded bg-brand-light/10" />
                </div>
                <div className="mt-5 flex flex-col items-center gap-1">
                  <Icon name="medical_information" className="h-6 w-6 text-brand-gold/70" />
                  <p className="text-[11px] font-semibold uppercase tracking-wider text-brand-gold/80">
                    {proceduresT("overview")}
                  </p>
                </div>
              </motion.div>

              {/* Appointment confirmation card */}
              <motion.div
                {...floatAnimation(12, 7, 0.8)}
                className="gold-glass-card absolute bottom-[10%] start-[18%] z-30 flex w-56 items-center gap-4 rounded-xl p-4 shadow-2xl"
              >
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full border border-brand-gold/30 bg-brand-gold/10 text-brand-gold">
                  <Icon name="event_available" className="h-6 w-6" />
                </div>
                <div>
                  <p className="text-xs font-bold uppercase tracking-wider text-brand-gold">
                    {t("eyebrow")}
                  </p>
                  <p className="font-serif text-sm text-brand-light">{siteT("shortName")}</p>
                </div>
              </motion.div>

              {/* Floating particles — CSS-only, already neutralized by the
                  global prefers-reduced-motion rule in globals.css */}
              <span className="absolute top-[8%] start-1/2 h-2 w-2 animate-ping rounded-full bg-brand-gold shadow-[0_0_10px_rgba(212,175,55,0.8)]" />
              <span className="absolute bottom-[16%] end-[28%] h-1.5 w-1.5 animate-pulse rounded-full bg-brand-gold shadow-[0_0_8px_rgba(212,175,55,0.8)]" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
