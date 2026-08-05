"use client";

import Image from "next/image";
import { useLocale, useTranslations } from "next-intl";
import { Modal } from "@/components/ui/Modal";
import { Icon } from "@/components/Icon";
import type { Video } from "@/types/content";

interface VideoModalProps {
  video: Video | null;
  onClose: () => void;
}

export function VideoModal({ video, onClose }: VideoModalProps) {
  const t = useTranslations("common");
  const locale = useLocale() as "en" | "ar";

  const embedUrl = video?.youtubeId
    ? `https://www.youtube-nocookie.com/embed/${video.youtubeId}`
    : video?.vimeoId
      ? `https://player.vimeo.com/video/${video.vimeoId}`
      : null;

  return (
    <Modal
      open={!!video}
      onOpenChange={(open) => !open && onClose()}
      title={video ? video.title[locale] : ""}
      contentClassName="max-w-3xl aspect-video overflow-hidden bg-black"
    >
      {video &&
        (embedUrl ? (
          <iframe
            src={embedUrl}
            title={video.title[locale]}
            className="h-full w-full"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          />
        ) : (
          <div className="relative flex h-full w-full flex-col items-center justify-center gap-4 p-8 text-center">
            <Image
              src={video.thumbnail}
              alt=""
              fill
              className="object-cover opacity-20"
              sizes="768px"
            />
            <div className="relative z-10 flex flex-col items-center gap-3">
              <div className="flex h-16 w-16 items-center justify-center rounded-full border-2 border-brand-gold/50 text-brand-gold">
                <Icon name="play_arrow" className="h-8 w-8" />
              </div>
              <h3 className="font-serif text-xl text-brand-gold">{t("comingSoon.title")}</h3>
              <p className="max-w-sm text-sm text-brand-light/70">{t("comingSoon.description")}</p>
            </div>
          </div>
        ))}
    </Modal>
  );
}
