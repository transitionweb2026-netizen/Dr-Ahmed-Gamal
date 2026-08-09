"use client";

import { useState } from "react";
import Image from "next/image";
import { useLocale, useTranslations } from "next-intl";
import { VideoModal } from "@/components/VideoModal";
import { Icon } from "@/components/Icon";
import type { Video } from "@/types/content";

export function StoriesGrid({ videos }: { videos: Video[] }) {
  const stories = videos.filter((v) => v.category.en === "Patient Story");
  const [selected, setSelected] = useState<Video | null>(null);
  const locale = useLocale() as "en" | "ar";
  const t = useTranslations("common");
  const tGrid = useTranslations("pages.patientStories.grid");

  return (
    <section className="bg-brand-darker py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
          {stories.map((video) => (
            <div
              key={video.id}
              className="gold-glass-card card-glow-halo rounded-2xl [--shadow-neon-gold:0_0_24px_rgba(212,175,55,.15)]"
            >
              <button
                type="button"
                onClick={() => setSelected(video)}
                aria-label={`${t("play")}: ${video.title[locale]}`}
                className="group relative flex aspect-[9/16] w-full flex-col overflow-hidden rounded-2xl focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-gold focus-visible:ring-offset-2 focus-visible:ring-offset-brand-darker"
              >
                <Image
                  src={video.thumbnail}
                  alt={video.title[locale]}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                  sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-brand-darker via-brand-darker/20 to-transparent" />
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="flex h-16 w-16 items-center justify-center rounded-full border border-brand-gold/30 bg-brand-darker/60 text-brand-gold transition-transform duration-300 group-hover:scale-110">
                    <Icon name="play_arrow" className="ms-1 h-[30px] w-[30px]" />
                  </div>
                </div>
                <div className="relative z-10 mt-auto translate-y-2 p-6 text-start transition-transform duration-300 group-hover:translate-y-0 group-focus-visible:translate-y-0">
                  <h3 className="mb-1 text-[24px] font-serif text-brand-light">{video.title[locale]}</h3>
                  <p className="text-body-md text-brand-light/70 opacity-0 transition-opacity duration-300 group-hover:opacity-100 group-focus-visible:opacity-100">
                    {tGrid("watchFullStory")}
                  </p>
                </div>
              </button>
            </div>
          ))}
        </div>
      </div>

      <VideoModal video={selected} onClose={() => setSelected(null)} />
    </section>
  );
}
