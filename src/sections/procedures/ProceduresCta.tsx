"use client";

import Image from "next/image";
import { motion, useReducedMotion } from "framer-motion";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { Icon } from "@/components/Icon";
import type { getContactInfo } from "@/services/contactInfo";
import { cn } from "@/utils/cn";

/**
 * Restores the legacy mockup's "liquid glass" consultation-gateway panel:
 * the .liquid-glass-cta card treatment (see globals.css), the rounded-xl
 * one-off button trio (deliberately distinct from the shared pill
 * CTAButton per the reference), and the floating 3D composition beside it
 * (calendar / medical-folder / appointment-confirmation cards over a
 * silhouette background), with a Framer Motion float disabled under
 * reduced motion.
 */
interface ProceduresCtaProps {
  contactInfo: Awaited<ReturnType<typeof getContactInfo>>;
  shortName: string;
  image: string;
}

export function ProceduresCta({ contactInfo, shortName, image }: ProceduresCtaProps) {
  const t = useTranslations("pages.procedures.cta");
  const cta = useTranslations("cta");
  const reduceMotion = useReducedMotion();

  const floatAnimation = (offset: number, duration: number, delay: number) =>
    reduceMotion
      ? {}
      : {
          animate: { y: [0, -offset, 0] },
          transition: { duration, repeat: Infinity, ease: "easeInOut" as const, delay },
        };

  const ctaButtonBase =
    "inline-flex w-full items-center justify-center gap-2 rounded-xl px-8 py-4 text-button uppercase transition-all duration-300 sm:w-auto";

  return (
    <section className="bg-brand-dark pb-[120px] pt-10">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="liquid-glass-cta relative overflow-hidden rounded-[2rem]">
          {/* Background cinematic elements */}
          <div className="pointer-events-none absolute inset-0 z-0 overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-[#2a1b12] to-[#0f0a07] opacity-90" />
            <div className="absolute -top-1/2 -start-[20%] h-[200%] w-[150%] rotate-45 bg-gradient-to-br from-brand-gold/10 via-transparent to-transparent mix-blend-screen" />
            <div className="absolute top-[20%] start-[30%] h-full w-full rotate-45 bg-gradient-to-br from-brand-gold/5 via-transparent to-transparent mix-blend-screen" />
          </div>

          <div className="relative z-10 grid min-h-[500px] grid-cols-1 lg:grid-cols-2">
            {/* Copy + buttons */}
            <div className="flex flex-col justify-center p-12 text-center lg:p-16 lg:text-start">
              {t("eyebrow") && (
                <p className="mb-6 inline-block w-fit self-center rounded-full border border-brand-gold/30 bg-black/20 px-4 py-1 text-label-sm uppercase tracking-[0.2em] text-brand-gold lg:self-start">
                  {t("eyebrow")}
                </p>
              )}
              <h2 className="mb-6 bg-gradient-to-r from-[#f2ca50] to-brand-gold bg-clip-text text-headline-md text-transparent md:text-headline-lg">
                {t("heading")}
              </h2>
              {t("paragraph") && (
                <p className="mb-10 max-w-lg text-body-lg text-brand-light/80">{t("paragraph")}</p>
              )}
              <div className="flex flex-col items-center gap-4 sm:flex-row lg:items-start">
                <Link
                  href="/contact"
                  className={cn(
                    ctaButtonBase,
                    "bg-brand-gold text-center font-bold text-brand-darker hover:bg-[#f2ca50] hover:shadow-[0_0_30px_rgba(212,175,55,0.4)]",
                  )}
                >
                  {cta("bookConsultation")}
                </Link>
                <a
                  href={contactInfo.whatsapp.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={cn(
                    ctaButtonBase,
                    "border border-white/20 bg-black/30 text-brand-light backdrop-blur-sm hover:border-brand-gold hover:text-brand-gold",
                  )}
                >
                  <Icon name="chat" className="h-5 w-5" />
                  {cta("whatsapp")}
                </a>
                <a
                  href={contactInfo.phone.href}
                  className={cn(
                    ctaButtonBase,
                    "border border-white/20 bg-black/30 text-brand-light backdrop-blur-sm hover:border-brand-gold hover:text-brand-gold",
                  )}
                >
                  <Icon name="call" className="h-5 w-5" />
                  {cta("callNow")}
                </a>
              </div>
            </div>

            {/* Right 3D composition — decorative only */}
            <div aria-hidden="true" className="relative hidden overflow-hidden lg:block lg:h-[400px]">
              <Image
                src={image}
                alt=""
                fill
                className="object-cover opacity-10 mix-blend-luminosity"
                sizes="50vw"
              />
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="relative h-full w-full max-w-[500px]">
                  {/* Illuminated base */}
                  <div className="absolute bottom-[20%] inset-x-0 mx-auto h-[100px] w-[300px] rounded-t-[100%] border-b border-brand-gold/50 bg-brand-gold/20 blur-[50px]" />

                  {/* Calendar card */}
                  <motion.div
                    {...floatAnimation(14, 6, 0)}
                    className="luxury-card absolute top-[30%] start-[20%] z-20 flex h-[160px] w-[140px] rotate-[-15deg] flex-col gap-2 rounded-xl p-4 shadow-2xl"
                  >
                    <div className="flex h-8 w-8 items-center justify-center rounded-full bg-brand-gold/20 text-brand-gold">
                      <Icon name="calendar_month" className="h-4 w-4" />
                    </div>
                    <div className="h-1.5 w-3/4 rounded bg-brand-gold/40" />
                    <div className="h-1.5 w-1/2 rounded bg-white/20" />
                    <div className="grid flex-grow grid-cols-4 gap-1">
                      {[0, 1, 2, 3, 4, 5, 6].map((cell) => (
                        <span
                          key={cell}
                          className={cn(
                            "rounded-sm",
                            cell === 2
                              ? "bg-brand-gold/50 shadow-[0_0_10px_rgba(212,175,55,0.5)]"
                              : "bg-white/10",
                          )}
                        />
                      ))}
                    </div>
                  </motion.div>

                  {/* Medical folder card */}
                  <motion.div
                    {...floatAnimation(10, 8, 0.4)}
                    className="absolute top-[20%] end-[15%] z-10 h-[220px] w-[180px] rotate-[10deg] rounded-lg border border-brand-gold/30 bg-gradient-to-br from-[#3a2c20] to-[#1a120c] p-5 shadow-[0_20px_40px_rgba(0,0,0,0.8)]"
                  >
                    <div className="mx-auto mb-6 h-4 w-16 rounded-full bg-brand-gold/30" />
                    <div className="space-y-3">
                      <div className="h-2 w-full rounded bg-white/10" />
                      <div className="h-2 w-5/6 rounded bg-white/10" />
                      <div className="h-2 w-4/6 rounded bg-white/10" />
                    </div>
                    <div className="mt-8 flex justify-center">
                      <div className="flex h-16 w-16 items-center justify-center rounded-full border-2 border-brand-gold/40 text-brand-gold/60">
                        <Icon name="medical_information" className="h-6 w-6" />
                      </div>
                    </div>
                  </motion.div>

                  {/* Appointment confirmation card */}
                  <motion.div
                    {...floatAnimation(12, 7, 0.8)}
                    className="liquid-glass-cta absolute bottom-[35%] start-[30%] z-30 flex h-[120px] w-[240px] items-center gap-4 rounded-xl border border-brand-gold/50 p-4 shadow-[0_30px_50px_rgba(0,0,0,0.9)]"
                  >
                    <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full border border-brand-gold/30 bg-brand-gold/10 text-brand-gold">
                      <Icon name="event_available" className="h-6 w-6" />
                    </div>
                    <div>
                      <p className="mb-1 text-xs font-bold uppercase tracking-wider text-brand-gold">
                        {t("eyebrow")}
                      </p>
                      <p className="font-serif text-sm text-white">{shortName}</p>
                    </div>
                  </motion.div>

                  {/* Floating particles — CSS-only, already neutralized by the
                      global prefers-reduced-motion rule in globals.css */}
                  <span className="absolute top-[10%] start-1/2 h-2 w-2 animate-ping rounded-full bg-brand-gold shadow-[0_0_10px_#f2ca50]" />
                  <span className="absolute bottom-[20%] end-[30%] h-1.5 w-1.5 animate-pulse rounded-full bg-brand-gold shadow-[0_0_8px_#f2ca50]" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
