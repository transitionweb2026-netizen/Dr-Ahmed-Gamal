"use client";

import { useState } from "react";
import Image from "next/image";
import { useLocale, useTranslations } from "next-intl";
import { VideoModal } from "@/components/VideoModal";
import { Icon } from "@/components/Icon";
import type { Video } from "@/types/content";

export function VideosGrid({ videos }: { videos: Video[] }) {
  // Exactly 9 videos in this section, per the approved page structure —
  // slice, don't drop, so the remaining educational videos stay available
  // to the CMS/other pages.
  const educational = videos.filter((v) => v.videoType !== "patient_story").slice(0, 9);
  const [selected, setSelected] = useState<Video | null>(null);
  const locale = useLocale() as "en" | "ar";
  const t = useTranslations("pages.videos.latestSection");
  const common = useTranslations("common");

  return (
    <section className="bg-brand-darker py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Bespoke heading recipe (not SectionKicker): reference wants a flat
            32px two-stop 135deg horizontal gold gradient with a soft glow,
            not SectionKicker's vertical multi-stop gradient scaling to 48px. */}
        <div className="mb-16 flex flex-col items-center text-center">
          <span className="mb-4 text-label-sm uppercase tracking-widest text-brand-gold">
            {t("eyebrow")}
          </span>
          <div className="flex w-full max-w-4xl items-center justify-center gap-6">
            <div className="hidden h-px flex-1 bg-gradient-to-r from-transparent via-brand-gold/30 to-brand-gold/10 md:block" />
            <h2 className="relative text-headline-md bg-gradient-to-br from-[#f2ca50] to-[#d4af37] bg-clip-text font-serif text-transparent drop-shadow-[0_0_15px_rgba(212,175,55,0.3)]">
              {t("heading")}
            </h2>
            <div className="hidden h-px flex-1 bg-gradient-to-l from-transparent via-brand-gold/30 to-brand-gold/10 md:block" />
          </div>
          <p className="mt-6 max-w-2xl text-body-md text-brand-light/70">{t("paragraph")}</p>
        </div>

        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {educational.map((video) => (
            <button
              key={video.id}
              type="button"
              onClick={() => setSelected(video)}
              aria-label={common("play")}
              className="gold-glass-card group relative block aspect-[9/16] w-full overflow-hidden rounded-xl p-3 text-start shadow-[0_10px_40px_rgba(0,0,0,0.5)] transition-transform duration-500 hover:-translate-y-2 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-gold focus-visible:ring-offset-2 focus-visible:ring-offset-brand-darker"
            >
              <div className="absolute inset-2 overflow-hidden rounded-lg">
                <Image
                  src={video.thumbnail}
                  alt={video.title[locale]}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                  sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-brand-darker/90 via-brand-darker/20 to-transparent" />
              </div>
              <div className="absolute inset-0 flex items-center justify-center opacity-80 transition-opacity group-hover:opacity-100">
                <div className="glass-panel flex h-16 w-16 items-center justify-center rounded-full border border-brand-gold/30 text-brand-gold shadow-[0_0_20px_rgba(212,175,55,0.2)]">
                  <Icon name="play_arrow" className="h-8 w-8 ms-1" />
                </div>
              </div>
              <div className="absolute bottom-6 start-6 end-6">
                <span className="mb-2 inline-block rounded border border-white/10 bg-brand-darker/80 px-2 py-1 text-xs uppercase tracking-wider text-brand-gold backdrop-blur-md">
                  {video.category[locale]}
                </span>
                <h3 className="font-serif text-body-lg font-bold text-brand-light">{video.title[locale]}</h3>
              </div>
            </button>
          ))}
        </div>
      </div>

      <VideoModal video={selected} onClose={() => setSelected(null)} />
    </section>
  );
}
