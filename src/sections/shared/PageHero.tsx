import Image from "next/image";
import type { ReactNode } from "react";
import { cn } from "@/utils/cn";

interface PageHeroProps {
  image: string;
  eyebrow?: string;
  title: ReactNode;
  paragraph?: string;
  children?: ReactNode;
  /** Text/content alignment — most pages are centered, some are left-aligned. */
  align?: "center" | "start";
  /** Reference hero is 80vh/600px on most pages, 60vh/500px on Contact. */
  short?: boolean;
  /** Cases & Reviews' reference hero is min-h-screen — taller than every
   * other page's 80vh. Takes precedence over `short` when set. */
  fullHeight?: boolean;
  /** Background image opacity — reference is 60 on most pages, 40 on Contact. */
  imageOpacity?: 40 | 60;
  /** The floating glass "quick contact" capsule (see HeroContactCapsule), or a
   * bespoke variant (e.g. Cases & Reviews' fixed vertical edge capsule). */
  capsule?: ReactNode;
  /** Escape hatch for a page whose reference min-height doesn't fit the
   * short/default two-step scale (e.g. About's literal `min-h-[90vh]`).
   * Overrides `short` entirely when set. */
  minHeightClassName?: string;
  /** Extra classes appended to the background <Image> (e.g. a custom
   * `object-[…]` focal point for a page whose reference crops differently). */
  imageClassName?: string;
  /** Reference default is a single top-to-bottom gradient; About's hero uses
   * a horizontal + vertical pair instead (image bleeds in from one side,
   * darkening to transparent) — pass "directional" to swap in that pair. */
  gradientVariant?: "default" | "directional";
}

const imageOpacityClass = { 40: "opacity-40", 60: "opacity-60" } as const;

export function PageHero({
  image,
  eyebrow,
  title,
  paragraph,
  children,
  align = "center",
  short = false,
  fullHeight = false,
  imageOpacity = 60,
  capsule,
  minHeightClassName,
  imageClassName,
  gradientVariant = "default",
}: PageHeroProps) {
  const isCenter = align === "center";

  return (
    <section
      className={cn(
        "relative flex items-center justify-center overflow-hidden bg-brand-darker pt-24",
        fullHeight
          ? "min-h-screen"
          : (minHeightClassName ??
            (short ? "min-h-[500px] sm:min-h-[60vh]" : "min-h-[600px] sm:min-h-[80vh]")),
      )}
    >
      <div className="absolute inset-0 z-0">
        <Image
          src={image}
          alt=""
          fill
          priority
          className={cn("object-cover", imageOpacityClass[imageOpacity], imageClassName)}
          sizes="100vw"
        />
        {gradientVariant === "default" ? (
          <div className="absolute inset-0 bg-gradient-to-b from-brand-darker/80 via-brand-darker/50 to-brand-darker" />
        ) : (
          <>
            <div className="absolute inset-0 bg-gradient-to-r from-brand-darker via-brand-darker/60 to-transparent" />
            <div className="absolute inset-0 bg-gradient-to-t from-brand-darker via-transparent to-transparent" />
          </>
        )}
      </div>
      <div
        className={cn(
          "relative z-10 mx-auto max-w-4xl px-5 py-16 md:px-16",
          isCenter ? "text-center" : "text-start",
        )}
      >
        {eyebrow && (
          <p className="text-label-sm uppercase tracking-widest text-brand-gold">{eyebrow}</p>
        )}
        <h1
          className={cn(
            "mt-4 text-headline-lg-mobile font-serif text-brand-light md:text-display-lg",
            !isCenter && "max-w-3xl",
          )}
        >
          {title}
        </h1>
        {paragraph && (
          <p
            className={cn(
              "mt-6 text-body-lg leading-relaxed text-brand-light/70",
              !isCenter && "max-w-lg",
            )}
          >
            {paragraph}
          </p>
        )}
        {children && (
          <div
            className={cn(
              "mt-10 flex flex-wrap items-center gap-4",
              isCenter ? "justify-center" : "justify-start",
            )}
          >
            {children}
          </div>
        )}
      </div>
      {capsule}
    </section>
  );
}
