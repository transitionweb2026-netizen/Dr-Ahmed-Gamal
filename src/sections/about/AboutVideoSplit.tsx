"use client";

import { useState } from "react";
import Image from "next/image";
import { useTranslations } from "next-intl";
import { CTAButton } from "@/components/CTAButton";
import { VideoModal } from "@/components/VideoModal";
import { Icon } from "@/components/Icon";
import { videos } from "@/content/videos";

const introVideo = videos.find((v) => v.id === "meet-dr-ahmed")!;

export function AboutVideoSplit() {
  const [videoOpen, setVideoOpen] = useState(false);
  const t = useTranslations("pages.about.video");
  const cta = useTranslations("cta");

  return (
    <section className="relative bg-brand-darker py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-2">
          <button
            type="button"
            onClick={() => setVideoOpen(true)}
            className="group relative order-2 block aspect-[4/5] w-full overflow-hidden rounded-2xl lg:order-1"
            aria-label={introVideo.title.en}
          >
            <Image
              src={introVideo.thumbnail}
              alt=""
              fill
              className="object-cover transition-transform duration-500 group-hover:scale-105"
              sizes="(min-width: 1024px) 50vw, 100vw"
            />
            <div className="absolute inset-0 bg-brand-darker/30 transition-colors group-hover:bg-brand-darker/50" />
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="flex h-16 w-16 items-center justify-center rounded-full border-2 border-brand-gold/70 bg-brand-darker/60 text-brand-gold transition-transform duration-300 group-hover:scale-110">
                <Icon name="play_arrow" className="h-7 w-7" />
              </div>
            </div>
          </button>

          <div className="order-1 space-y-6 lg:order-2">
            <h2 className="font-serif text-4xl text-brand-light">
              {t("titleLine1")} <span className="italic text-brand-gold">{t("titleLine2")}</span>
            </h2>
            <p className="leading-relaxed text-brand-light/70">{t("paragraph")}</p>
            <CTAButton href="/procedures" variant="outline" showArrow>
              {cta("learnMore")}
            </CTAButton>
          </div>
        </div>
      </div>

      <VideoModal video={videoOpen ? introVideo : null} onClose={() => setVideoOpen(false)} />
    </section>
  );
}
