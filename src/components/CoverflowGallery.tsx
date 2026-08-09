"use client";

import { useCallback, useState } from "react";
import Image from "next/image";
import { motion, useReducedMotion } from "framer-motion";
import { useTranslations } from "next-intl";
import { useDirection, dirX } from "@/lib/rtl";
import { Icon } from "@/components/Icon";
import { Lightbox } from "@/components/Lightbox";
import { cn } from "@/utils/cn";

interface CoverflowGalleryProps {
  images: string[];
  className?: string;
}

export function CoverflowGallery({ images, className }: CoverflowGalleryProps) {
  const [index, setIndex] = useState(0);
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const dir = useDirection();
  const reduceMotion = useReducedMotion();
  const t = useTranslations("common");

  const goTo = useCallback(
    (i: number) => setIndex(((i % images.length) + images.length) % images.length),
    [images.length],
  );

  return (
    <div className={cn("relative", className)}>
      <div
        className="relative flex h-80 items-center justify-center overflow-hidden [perspective:1200px] sm:h-96"
        role="region"
        aria-roledescription="carousel"
        aria-label="Photo gallery"
      >
        {images.map((src, i) => {
          let offset = i - index;
          if (offset > images.length / 2) offset -= images.length;
          if (offset < -images.length / 2) offset += images.length;

          const isActive = offset === 0;
          const absOffset = Math.abs(offset);
          if (absOffset > 3) return null;

          const xSign = dirX(dir, offset >= 0 ? 1 : -1);
          const translateXPercent = xSign * Math.min(absOffset, 3) * 60;
          const translateZ = -absOffset * 120;
          const rotateY = dirX(dir, offset > 0 ? -35 : offset < 0 ? 35 : 0);
          const scale = isActive ? 1 : 0.75;
          const opacity = 1 - absOffset * 0.22;
          const zIndex = 10 - absOffset;

          return (
            <motion.button
              type="button"
              key={i}
              onClick={() => (isActive ? setLightboxOpen(true) : goTo(i))}
              className="absolute top-1/2 start-1/2 h-64 w-48 overflow-hidden rounded-xl border border-brand-gold/20 shadow-glass focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-gold focus-visible:ring-offset-2 focus-visible:ring-offset-brand-darker sm:h-80 sm:w-60"
              style={{ zIndex }}
              animate={
                reduceMotion
                  ? { x: "-50%", y: "-50%", opacity: isActive ? 1 : 0.5, scale: isActive ? 1 : 0.92 }
                  : {
                      x: `calc(-50% + ${translateXPercent}%)`,
                      y: "-50%",
                      z: translateZ,
                      rotateY,
                      scale,
                      opacity,
                    }
              }
              transition={{ type: "spring", stiffness: 260, damping: 30 }}
              aria-label={
                isActive
                  ? t("viewLargerPhoto", { number: i + 1, total: images.length })
                  : t("photoOf", { number: i + 1, total: images.length })
              }
              aria-current={isActive}
            >
              <Image src={src} alt="" fill className="object-cover" sizes="240px" />
              {!isActive && <div className="absolute inset-0 bg-brand-darker/40" />}
            </motion.button>
          );
        })}
      </div>

      <div className="mt-6 flex items-center justify-center gap-6">
        <button
          type="button"
          onClick={() => goTo(index - 1)}
          aria-label={t("previous")}
          className="flex h-10 w-10 items-center justify-center rounded-full border border-brand-gold/30 text-brand-gold transition-colors hover:border-brand-gold hover:bg-brand-gold/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-gold focus-visible:ring-offset-2 focus-visible:ring-offset-brand-darker"
        >
          <Icon name="chevron_left" className="h-5 w-5 rtl:rotate-180" />
        </button>
        <span dir="ltr" className="font-mono text-sm text-brand-light/60">
          {String(index + 1).padStart(2, "0")} / {String(images.length).padStart(2, "0")}
        </span>
        <button
          type="button"
          onClick={() => goTo(index + 1)}
          aria-label={t("next")}
          className="flex h-10 w-10 items-center justify-center rounded-full border border-brand-gold/30 text-brand-gold transition-colors hover:border-brand-gold hover:bg-brand-gold/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-gold focus-visible:ring-offset-2 focus-visible:ring-offset-brand-darker"
        >
          <Icon name="chevron_right" className="h-5 w-5 rtl:rotate-180" />
        </button>
      </div>

      <Lightbox
        images={images}
        index={index}
        open={lightboxOpen}
        onOpenChange={setLightboxOpen}
        onIndexChange={goTo}
      />
    </div>
  );
}
