"use client";

import { useState } from "react";
import Image from "next/image";
import { useLocale, useTranslations } from "next-intl";
import { VideoModal } from "@/components/VideoModal";
import { Icon } from "@/components/Icon";
import { videos } from "@/content/videos";
import type { Video } from "@/types/content";

// Legacy Videos.html's header-less "Introduction Heading" section — a
// full-bleed showcase strip that sits between the hero and the labeled
// "Our Latest Videos" grid (see VideosGrid.tsx). Reuses the same 12 real
// educational entries VideosGrid shows, with a distinct full-bleed card
// treatment (see restoration notes there) rather than legacy's literal
// copy-paste duplicate cards.
const educational = videos.filter((v) => v.category.en !== "Patient Story");

export function VideosIntroGrid() {
  const [selected, setSelected] = useState<Video | null>(null);
  const locale = useLocale() as "en" | "ar";
  const common = useTranslations("common");

  return (
    <section className="bg-brand-darker pb-16">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {educational.map((video) => (
            <button
              key={video.id}
              type="button"
              onClick={() => setSelected(video)}
              aria-label={common("play")}
              className="gold-glass-card card-glow-halo group relative block aspect-[9/16] w-full overflow-hidden rounded-3xl text-start shadow-2xl transition-transform duration-500 hover:scale-[1.02]"
            >
              <Image
                src={video.thumbnail}
                alt={video.title[locale]}
                fill
                className="object-cover opacity-80 transition-opacity duration-500 group-hover:opacity-100"
                sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-brand-darker via-transparent to-transparent" />
              <div className="absolute inset-0 flex flex-col justify-end gap-2 p-6">
                <p className="text-xs uppercase tracking-widest text-brand-gold">
                  {video.category[locale]}
                </p>
                <h3 className="font-serif text-xl leading-tight text-brand-light">
                  {video.title[locale]}
                </h3>
                <div className="mt-4 flex h-12 w-12 items-center justify-center rounded-full border border-brand-gold/30 bg-brand-gold/20 text-brand-gold backdrop-blur-md transition-colors duration-300 group-hover:bg-brand-gold group-hover:text-brand-darker">
                  <Icon name="play_arrow" className="h-5 w-5" />
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
