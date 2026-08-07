"use client";

import { useCallback, useEffect, useState, type ReactNode } from "react";
import useEmblaCarousel from "embla-carousel-react";
import { useTranslations } from "next-intl";
import { useDirection } from "@/lib/rtl";
import { Icon } from "@/components/Icon";
import { cn } from "@/utils/cn";

interface CarouselProps {
  children: ReactNode[];
  className?: string;
  slideClassName?: string;
  /** Tailwind basis classes per breakpoint, e.g. "basis-full sm:basis-1/2 lg:basis-1/3" */
  slideBasisClassName?: string;
  showDots?: boolean;
  ariaLabel?: string;
  /** Override the default nav-button size/treatment for this usage. */
  navButtonClassName?: string;
}

export function Carousel({
  children,
  className,
  slideClassName,
  slideBasisClassName = "basis-full sm:basis-1/2 lg:basis-1/3",
  showDots = true,
  ariaLabel,
  navButtonClassName,
}: CarouselProps) {
  const dir = useDirection();
  const t = useTranslations("common");
  const [emblaRef, emblaApi] = useEmblaCarousel({ direction: dir, loop: false, align: "start" });
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [scrollSnaps, setScrollSnaps] = useState<number[]>([]);
  const [canPrev, setCanPrev] = useState(false);
  const [canNext, setCanNext] = useState(false);

  const onSelect = useCallback(() => {
    if (!emblaApi) return;
    setSelectedIndex(emblaApi.selectedScrollSnap());
    setCanPrev(emblaApi.canScrollPrev());
    setCanNext(emblaApi.canScrollNext());
  }, [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;
    // Embla's API instance only exists after mount; this reads its initial
    // snap list from that external system before subscribing to updates.
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setScrollSnaps(emblaApi.scrollSnapList());
    onSelect();
    emblaApi.on("select", onSelect);
    emblaApi.on("reInit", onSelect);
  }, [emblaApi, onSelect]);

  return (
    <div className={cn("relative", className)}>
      <div
        className="overflow-hidden"
        ref={emblaRef}
        role="region"
        aria-label={ariaLabel}
        aria-roledescription="carousel"
      >
        <div className="-ms-4 flex">
          {children.map((child, i) => (
            <div
              key={i}
              className={cn("min-w-0 shrink-0 grow-0 ps-4", slideBasisClassName, slideClassName)}
            >
              {child}
            </div>
          ))}
        </div>
      </div>

      <div className="mt-6 flex items-center justify-center gap-4">
        <button
          type="button"
          onClick={() => emblaApi?.scrollPrev()}
          disabled={!canPrev}
          aria-label={t("previous")}
          className={cn(
            "glass-panel flex h-12 w-12 items-center justify-center rounded-full border border-brand-gold/30 text-brand-gold shadow-neon-gold transition-all duration-300 hover:scale-110 hover:border-brand-gold disabled:opacity-30 disabled:hover:scale-100",
            navButtonClassName,
          )}
        >
          <Icon name="chevron_left" className="h-5 w-5 rtl:rotate-180" />
        </button>

        {showDots && (
          <div className="flex items-center">
            {scrollSnaps.map((_, i) => (
              <button
                key={i}
                type="button"
                onClick={() => emblaApi?.scrollTo(i)}
                aria-label={`${i + 1}`}
                aria-current={i === selectedIndex}
                className="flex h-6 w-6 items-center justify-center rounded-full focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-gold focus-visible:ring-offset-2 focus-visible:ring-offset-brand-darker"
              >
                <span
                  aria-hidden
                  className={cn(
                    "h-2 rounded-full transition-all",
                    i === selectedIndex ? "w-6 bg-brand-gold" : "w-2 bg-brand-gold/30 hover:bg-brand-gold/50",
                  )}
                />
              </button>
            ))}
          </div>
        )}

        <button
          type="button"
          onClick={() => emblaApi?.scrollNext()}
          disabled={!canNext}
          aria-label={t("next")}
          className={cn(
            "glass-panel flex h-12 w-12 items-center justify-center rounded-full border border-brand-gold/30 text-brand-gold shadow-neon-gold transition-all duration-300 hover:scale-110 hover:border-brand-gold disabled:opacity-30 disabled:hover:scale-100",
            navButtonClassName,
          )}
        >
          <Icon name="chevron_right" className="h-5 w-5 rtl:rotate-180" />
        </button>
      </div>
    </div>
  );
}
