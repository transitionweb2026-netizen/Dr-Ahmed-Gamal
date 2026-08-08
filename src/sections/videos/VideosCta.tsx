"use client";

import Image from "next/image";
import { motion, useReducedMotion } from "framer-motion";
import { useTranslations } from "next-intl";
import { CTAButton } from "@/components/CTAButton";
import { Icon } from "@/components/Icon";
import type { getContactInfo } from "@/services/contactInfo";
import { useDirection, dirX } from "@/lib/rtl";
import type { Video } from "@/types/content";

interface VideosCtaProps {
  contactInfo: Awaited<ReturnType<typeof getContactInfo>>;
  videos: Video[];
}

/**
 * Bespoke rebuild of the reference's 2-column glass CTA: text column (heading,
 * paragraph, 2 rounded-lg buttons) + a 3D-tilted phone mockup column with a
 * floating "Direct Line" glass card. Not using the shared ContactCtaBanner
 * here — that component's image slot renders a plain photo and always shows
 * 3 buttons, but this section needs only 2 (Book + WhatsApp) and an
 * illustrative phone mockup, not a photo.
 */
export function VideosCta({ contactInfo, videos }: VideosCtaProps) {
  // Reference's "Premium 3D Mobile Contact CTA" phone screenshot stands in for
  // a bespoke booking-app mockup — reusing a video thumbnail the same way
  // Home's FinalCta does for its own phone mockup (see src/sections/home/FinalCta.tsx).
  const phoneImage = videos.find((v) => v.id === "clinic-tour")!;
  const t = useTranslations("pages.videos.cta");
  const cta = useTranslations("cta");
  const dir = useDirection();
  const reduceMotion = useReducedMotion();

  const restRotateY = dirX(dir, -15);
  const hoverRotateY = dirX(dir, -5);

  return (
    <section className="bg-brand-darker px-5 py-[120px] md:px-16">
      <div className="gold-glass-card relative mx-auto flex max-w-5xl flex-col items-center gap-12 overflow-hidden rounded-3xl p-8 md:flex-row md:p-16">
        {/* Background glow blobs */}
        <div aria-hidden className="pointer-events-none absolute inset-0 z-0 opacity-20 mix-blend-screen">
          <div className="absolute top-0 end-0 h-96 w-96 rounded-full bg-brand-gold/40 blur-[100px]" />
          <div className="absolute bottom-0 start-0 h-96 w-96 rounded-full bg-brand-gold/20 blur-[100px]" />
        </div>

        {/* Text column */}
        <div className="relative z-10 flex-1 space-y-6 text-center md:text-start">
          <h2 className="text-headline-lg-mobile font-serif text-brand-light md:text-headline-lg">
            {t("titleLine1")}
            <br />
            <span className="bg-gradient-to-br from-[#f2ca50] to-[#d4af37] bg-clip-text text-transparent">
              {t("titleLine2")}
            </span>
          </h2>
          <p className="max-w-md text-body-md text-brand-light/70 md:mx-0 mx-auto">{t("paragraph")}</p>
          <div className="flex flex-col gap-4 pt-4 sm:flex-row sm:justify-center md:justify-start">
            <CTAButton href="/contact" size="lg" className="rounded-lg">
              <Icon name="calendar_month" className="h-4 w-4" />
              {cta("bookConsultation")}
            </CTAButton>
            <CTAButton href={contactInfo.whatsapp.href} variant="outline" size="lg" className="rounded-lg">
              <Icon name="chat" className="h-4 w-4" />
              {cta("whatsapp")}
            </CTAButton>
          </div>
        </div>

        {/* 3D phone mockup column */}
        <div className="relative z-10 w-full [perspective:1000px] md:w-[400px]">
          <motion.div
            initial={false}
            animate={reduceMotion ? {} : { rotateY: restRotateY, rotateX: 5 }}
            whileHover={reduceMotion ? undefined : { rotateY: hoverRotateY, rotateX: 2 }}
            transition={{ duration: 0.7, ease: "easeOut" }}
            className="relative aspect-[3/4] overflow-hidden rounded-[40px] border-[8px] border-brand-dark bg-brand-darker shadow-[20px_20px_60px_rgba(0,0,0,0.8),-5px_-5px_20px_rgba(255,255,255,0.05)]"
          >
            <Image
              src={phoneImage.thumbnail}
              alt=""
              fill
              className="object-cover opacity-70"
              sizes="(min-width: 768px) 400px, 100vw"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-brand-darker via-brand-darker/40 to-transparent" />

            {/* Floating "Direct Line" glass card */}
            <div className="gold-glass-card absolute inset-x-4 bottom-8 rounded-xl border border-brand-gold/30 bg-brand-darker/80 p-4 shadow-2xl backdrop-blur-xl">
              <div className="mb-3 flex items-center gap-4">
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full border border-brand-gold/20 bg-brand-gold/20">
                  <Icon name="support_agent" className="h-5 w-5 text-brand-gold" />
                </div>
                <div>
                  <div className="text-label-sm uppercase text-brand-gold">{t("directLine")}</div>
                  <div className="text-body-md text-brand-light">{cta("callNow")}</div>
                </div>
              </div>
              <a
                href={contactInfo.phone.href}
                className="flex w-full items-center justify-center gap-2 rounded border border-white/10 bg-brand-dark py-2 text-sm text-brand-light transition-colors hover:bg-brand-gold/10"
              >
                <Icon name="phone_in_talk" className="h-[18px] w-[18px]" />
                <span>{contactInfo.phone.display}</span>
              </a>
            </div>

            <div className="pointer-events-none absolute inset-0 bg-gradient-to-tr from-transparent via-white/5 to-white/10" />
          </motion.div>
        </div>
      </div>
    </section>
  );
}
