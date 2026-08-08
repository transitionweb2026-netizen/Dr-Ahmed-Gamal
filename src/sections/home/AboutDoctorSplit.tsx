"use client";

import { useState } from "react";
import Image from "next/image";
import { useTranslations } from "next-intl";
import { CTAButton } from "@/components/CTAButton";
import { VideoModal } from "@/components/VideoModal";
import { Icon } from "@/components/Icon";
import type { Video } from "@/types/content";

const SECTION_IMAGE =
  "https://lh3.googleusercontent.com/aida-public/AB6AXuBuAAUmUYG5XKxUXhZPyCNb-QSxjsXwJzLMhOKkgPFYrb98sTxfjqdeA_laU20oROd_TmKHhmeCE0aSNPJRC4kVoxzW5km73cIgz-Sfr-1oam0e78jWFk3JsD2E2nVRKsS-oYcJbZntRruP4bJ-wgCVC4Qb0fFF8Q-3FFI87sGWbem9ysuhUwIUmnpJfc14xUEqgmAnMN_OfnVXgxx7dayXtJEAXJhJZncwViVsIQ1kuo7pxMkkElCCydeB_sNrTq1wRLI";

export function AboutDoctorSplit({ videos }: { videos: Video[] }) {
  const [videoOpen, setVideoOpen] = useState(false);
  const t = useTranslations("pages.home.about");
  const cta = useTranslations("cta");
  const introVideo = videos.find((v) => v.id === "meet-dr-ahmed")!;

  return (
    <section className="relative py-24">
      <div className="absolute inset-0 z-0">
        <Image src={SECTION_IMAGE} alt="" fill className="object-cover" sizes="100vw" />
        <div className="absolute inset-0" style={{ backgroundColor: "rgba(26, 18, 11, 0.7)" }} />
      </div>

      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-8 flex items-center justify-center gap-4">
          <div className="h-px max-w-[65px] flex-grow bg-gradient-to-r from-transparent via-brand-gold to-transparent shadow-[0_0_5px_rgba(212,175,55,0.5)]" />
          <h2
            className="bg-gradient-to-b from-brand-gold via-[#a67c00] to-[#5c4000] bg-clip-text font-serif text-2xl uppercase tracking-[0.2em] text-transparent md:text-3xl lg:text-4xl"
            style={{ textShadow: "0 0 10px rgba(212, 175, 55, 0.3)" }}
          >
            {t("kicker")}
          </h2>
          <div className="h-px max-w-[65px] flex-grow bg-gradient-to-l from-transparent via-brand-gold to-transparent shadow-[0_0_5px_rgba(212,175,55,0.5)]" />
        </div>

        <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-2 lg:gap-16">
          <div className="space-y-8">
            <h2 className="font-serif text-4xl leading-tight text-brand-light lg:text-5xl">
              {t("heading")}
              <span className="mt-2 block font-sans text-2xl font-light uppercase tracking-widest text-brand-gold lg:text-3xl">
                {t("subheading")}
              </span>
            </h2>
            <div className="space-y-6 font-light leading-relaxed text-gray-300">
              <p>{t("paragraph1")}</p>
              <p>{t("paragraph2")}</p>
            </div>
            <CTAButton href="/about" showArrow>
              {cta("learnMore")}
            </CTAButton>
          </div>

          <div className="group relative">
            <div className="absolute -inset-1 rounded-lg bg-gradient-to-r from-brand-gold to-brand-darker opacity-20 blur transition duration-1000 group-hover:opacity-40" />
            <button
              type="button"
              onClick={() => setVideoOpen(true)}
              className="relative block aspect-video w-full overflow-hidden rounded-lg border border-brand-gold/20 shadow-glass shadow-2xl"
              aria-label={introVideo.title.en}
            >
              <Image
                src={introVideo.thumbnail}
                alt=""
                fill
                className="object-cover object-top opacity-80"
                sizes="(min-width: 1024px) 50vw, 100vw"
              />
              <div className="absolute inset-0 flex items-center justify-center bg-brand-darker/40 transition duration-500 group-hover:bg-brand-darker/20">
                <div className="flex h-20 w-20 items-center justify-center rounded-full border-2 border-brand-gold text-brand-gold backdrop-blur-sm transition duration-300 group-hover:bg-brand-gold group-hover:text-brand-darker">
                  <Icon name="play_arrow" className="h-9 w-9" />
                </div>
              </div>
            </button>
          </div>
        </div>
      </div>

      <VideoModal video={videoOpen ? introVideo : null} onClose={() => setVideoOpen(false)} />
    </section>
  );
}
