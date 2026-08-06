"use client";

import { useState } from "react";
import Image from "next/image";
import { useLocale, useTranslations } from "next-intl";
import { CTAButton } from "@/components/CTAButton";
import { VideoModal } from "@/components/VideoModal";
import { Icon } from "@/components/Icon";
import { videos } from "@/content/videos";
import type { Video } from "@/types/content";

const featured = videos.slice(0, 3);

export function FeaturedVideos() {
  const [selected, setSelected] = useState<Video | null>(null);
  const locale = useLocale() as "en" | "ar";
  const t = useTranslations("pages.home.videos");
  const cta = useTranslations("cta");

  return (
    <section className="bg-brand-dark py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-12 flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-end">
          <div>
            <p className="text-sm font-semibold uppercase tracking-widest text-brand-gold">
              {t("eyebrow")}
            </p>
            <h2 className="mt-2 font-serif text-4xl text-brand-light">{t("heading")}</h2>
          </div>
          <CTAButton href="/videos" variant="ghost" showArrow>
            {cta("showMore")}
          </CTAButton>
        </div>

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-3">
          {featured.map((video) => (
            <button
              key={video.id}
              type="button"
              onClick={() => setSelected(video)}
              aria-label={video.title[locale]}
              className="group relative block aspect-[9/16] w-full overflow-hidden rounded-2xl border border-brand-gold/20 shadow-glass"
            >
              <Image
                src={video.thumbnail}
                alt=""
                fill
                className="object-cover opacity-80 transition duration-500 group-hover:scale-105 group-hover:opacity-100"
                sizes="(min-width: 640px) 33vw, 100vw"
              />
              <div className="absolute inset-0 bg-brand-darker/30 transition duration-500 group-hover:bg-brand-darker/10" />
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="flex h-14 w-14 items-center justify-center rounded-full border-2 border-brand-gold/70 bg-brand-darker/60 text-brand-gold transition-transform duration-300 group-hover:scale-110">
                  <Icon name="play_arrow" className="h-6 w-6" />
                </div>
              </div>
            </button>
          ))}
        </div>
      </div>

      <VideoModal video={selected} onClose={() => setSelected(null)} />
    </section>
  );
}
