"use client";

import { useState } from "react";
import Image from "next/image";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { VideoModal } from "@/components/VideoModal";
import { Icon } from "@/components/Icon";
import { videos } from "@/content/videos";

const introVideo = videos.find((v) => v.id === "meet-dr-ahmed")!;

export function AboutVideoSplit() {
  const [videoOpen, setVideoOpen] = useState(false);
  const t = useTranslations("pages.about.video");
  const cta = useTranslations("cta");

  return (
    <section className="relative border-y border-brand-gold/10 bg-brand-dark py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-2">
          <button
            type="button"
            onClick={() => setVideoOpen(true)}
            className="group relative order-2 block w-full lg:order-1"
            aria-label={introVideo.title.en}
          >
            <div className="absolute -inset-1 rounded-2xl bg-gradient-to-r from-brand-gold to-brand-darker opacity-30 blur transition duration-1000 group-hover:opacity-50" />
            <div className="relative aspect-video overflow-hidden rounded-2xl border border-brand-gold/20 shadow-glass shadow-2xl">
              <Image
                src={introVideo.thumbnail}
                alt=""
                fill
                className="object-cover transition-transform duration-500 group-hover:scale-105"
                sizes="(min-width: 1024px) 50vw, 100vw"
              />
              <div className="absolute inset-0 bg-brand-darker/30 transition-colors duration-500 group-hover:bg-brand-darker/10" />
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="flex h-16 w-16 items-center justify-center rounded-full border-2 border-brand-gold/70 bg-brand-darker/60 text-brand-gold transition-transform duration-300 group-hover:scale-110">
                  <Icon name="play_arrow" className="h-7 w-7" />
                </div>
              </div>
            </div>
          </button>

          <div className="order-1 space-y-6 lg:order-2">
            <h2 className="font-serif text-3xl leading-tight text-brand-light lg:text-4xl">
              {t("titleLine1")} <span className="italic text-brand-gold">{t("titleLine2")}</span>
            </h2>
            <p className="leading-relaxed text-brand-light/70">{t("paragraph")}</p>
            <Link
              href="/procedures"
              className="inline-flex items-center justify-center rounded-full border border-brand-gold bg-transparent px-8 py-3 text-sm font-medium uppercase tracking-wider text-brand-gold transition-all duration-300 hover:bg-brand-gold hover:text-brand-darker"
            >
              {cta("learnMore")}
            </Link>
          </div>
        </div>
      </div>

      <VideoModal video={videoOpen ? introVideo : null} onClose={() => setVideoOpen(false)} />
    </section>
  );
}
