"use client";

import { useState } from "react";
import Image from "next/image";
import { useLocale, useTranslations } from "next-intl";
import { VideoModal } from "@/components/VideoModal";
import { Icon } from "@/components/Icon";
import { videos } from "@/content/videos";
import type { Video } from "@/types/content";

const educational = videos.filter((v) => v.category.en !== "Patient Story");

export function VideosGrid() {
  const [selected, setSelected] = useState<Video | null>(null);
  const locale = useLocale() as "en" | "ar";
  const t = useTranslations("pages.videos.latestSection");
  const common = useTranslations("common");

  return (
    <section className="bg-brand-darker py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto mb-12 max-w-2xl text-center">
          <p className="text-sm font-semibold uppercase tracking-widest text-brand-gold">
            {t("eyebrow")}
          </p>
          <h2 className="mt-2 font-serif text-4xl text-brand-light">{t("heading")}</h2>
          <p className="mt-4 leading-relaxed text-brand-light/70">{t("paragraph")}</p>
        </div>

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {educational.map((video) => (
            <button
              key={video.id}
              type="button"
              onClick={() => setSelected(video)}
              aria-label={common("play")}
              className="group relative block aspect-[9/16] w-full overflow-hidden rounded-2xl"
            >
              <Image
                src={video.thumbnail}
                alt={video.title[locale]}
                fill
                className="object-cover transition-transform duration-500 group-hover:scale-105"
                sizes="(min-width: 1024px) 25vw, (min-width: 640px) 50vw, 100vw"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-brand-darker via-brand-darker/20 to-transparent" />
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="flex h-14 w-14 items-center justify-center rounded-full border-2 border-brand-gold/70 bg-brand-darker/60 text-brand-gold transition-transform duration-300 group-hover:scale-110">
                  <Icon name="play_arrow" className="h-6 w-6" />
                </div>
              </div>
              <div className="absolute inset-x-0 bottom-0 p-4 text-start">
                <p className="text-xs uppercase tracking-wider text-brand-gold">
                  {video.category[locale]}
                </p>
                <h3 className="mt-1 font-serif text-base text-brand-light">{video.title[locale]}</h3>
              </div>
            </button>
          ))}
        </div>
      </div>

      <VideoModal video={selected} onClose={() => setSelected(null)} />
    </section>
  );
}
