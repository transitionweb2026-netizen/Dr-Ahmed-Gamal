"use client";

import { useState } from "react";
import Image from "next/image";
import { useLocale, useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { VideoModal } from "@/components/VideoModal";
import { Icon } from "@/components/Icon";
import type { Video } from "@/types/content";

export function FeaturedVideos({ videos, image }: { videos: Video[]; image: string }) {
  const [selected, setSelected] = useState<Video | null>(null);
  const locale = useLocale() as "en" | "ar";
  const t = useTranslations("pages.home.videos");
  const featured = videos.slice(0, 3);

  return (
    <section className="relative bg-brand-darker py-24">
      <div className="absolute inset-0 z-0">
        <Image src={image} alt="" fill className="object-cover" sizes="100vw" />
        <div className="absolute inset-0 bg-black/40" />
      </div>

      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-16 text-center">
          <p className="mb-4 text-xs font-semibold uppercase tracking-widest text-brand-gold">
            {t("eyebrow")}
          </p>
          <h2 className="font-serif text-4xl text-brand-light">{t("heading")}</h2>
        </div>

        <div className="mx-auto mb-12 grid max-w-5xl grid-cols-1 gap-8 sm:grid-cols-3">
          {featured.map((video) => (
            <button
              key={video.id}
              type="button"
              onClick={() => setSelected(video)}
              aria-label={video.title[locale]}
              className="group relative block aspect-[9/16] w-full overflow-hidden rounded-2xl border border-brand-gold/20 shadow-glass focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-gold focus-visible:ring-offset-2 focus-visible:ring-offset-brand-darker"
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
                <div className="flex h-16 w-16 items-center justify-center rounded-full border-2 border-brand-gold bg-brand-dark/50 text-brand-gold backdrop-blur-sm transition-transform duration-300 group-hover:scale-110">
                  <Icon name="play_arrow" className="h-6 w-6" />
                </div>
              </div>
            </button>
          ))}
        </div>

        <div className="text-center">
          <Link
            href="/videos"
            className="inline-flex items-center text-sm font-bold uppercase tracking-widest text-brand-gold transition-colors duration-300 hover:text-white"
          >
            {t("cta")} <span className="ms-2">→</span>
          </Link>
        </div>
      </div>

      <VideoModal video={selected} onClose={() => setSelected(null)} />
    </section>
  );
}
