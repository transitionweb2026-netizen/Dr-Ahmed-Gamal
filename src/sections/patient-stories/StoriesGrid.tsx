"use client";

import { useState } from "react";
import Image from "next/image";
import { useLocale, useTranslations } from "next-intl";
import { VideoModal } from "@/components/VideoModal";
import { Icon } from "@/components/Icon";
import { videos } from "@/content/videos";
import type { Video } from "@/types/content";

const stories = videos.filter((v) => v.category.en === "Patient Story");

export function StoriesGrid() {
  const [selected, setSelected] = useState<Video | null>(null);
  const locale = useLocale() as "en" | "ar";
  const t = useTranslations("common");

  return (
    <section className="bg-brand-darker py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {stories.map((video) => (
            <div
              key={video.id}
              className="gold-glass-card card-glow-halo rounded-2xl [--shadow-neon-gold:0_0_24px_rgba(212,175,55,.15)]"
            >
              <button
                type="button"
                onClick={() => setSelected(video)}
                aria-label={`${t("play")}: ${video.title[locale]}`}
                className="group relative block aspect-[9/16] w-full overflow-hidden rounded-2xl"
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
                  <div className="flex h-14 w-14 items-center justify-center rounded-full border-2 border-brand-gold/70 bg-brand-darker/60 text-brand-gold transition-transform duration-300 group-hover:scale-110">
                    <Icon name="play_arrow" className="h-6 w-6" />
                  </div>
                </div>
                <div className="absolute inset-x-0 bottom-0 translate-y-2 p-4 text-start opacity-0 transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100 group-focus-visible:translate-y-0 group-focus-visible:opacity-100">
                  <p className="text-xs uppercase tracking-wider text-brand-gold">
                    {video.category[locale]}
                  </p>
                  <h3 className="mt-1 font-serif text-base text-brand-light">{video.title[locale]}</h3>
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
