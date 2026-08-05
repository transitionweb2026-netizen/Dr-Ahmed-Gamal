"use client";

import { useId, useState } from "react";
import Image from "next/image";
import { useTranslations } from "next-intl";
import { useDirection } from "@/lib/rtl";
import { Icon } from "@/components/Icon";
import { cn } from "@/utils/cn";

interface BeforeAfterSliderProps {
  beforeImage: string;
  afterImage: string;
  beforeAlt?: string;
  afterAlt?: string;
  className?: string;
}

export function BeforeAfterSlider({
  beforeImage,
  afterImage,
  beforeAlt,
  afterAlt,
  className,
}: BeforeAfterSliderProps) {
  const [value, setValue] = useState(50);
  const id = useId();
  const dir = useDirection();
  const t = useTranslations("common");

  const clipFromEnd = 100 - value;
  const clipPath =
    dir === "rtl" ? `inset(0 0 0 ${clipFromEnd}%)` : `inset(0 ${clipFromEnd}% 0 0)`;

  return (
    <div
      className={cn(
        "group relative aspect-[4/5] w-full select-none overflow-hidden rounded-2xl bg-brand-dark",
        className,
      )}
    >
      <Image
        src={beforeImage}
        alt={beforeAlt ?? t("before")}
        fill
        className="object-cover"
        sizes="(min-width: 1024px) 33vw, 100vw"
      />
      <div className="absolute inset-0" style={{ clipPath }}>
        <Image
          src={afterImage}
          alt={afterAlt ?? t("after")}
          fill
          className="object-cover"
          sizes="(min-width: 1024px) 33vw, 100vw"
        />
      </div>

      <span className="absolute top-3 start-3 rounded-full bg-brand-darker/70 px-3 py-1 text-[10px] font-semibold uppercase tracking-wider text-brand-light backdrop-blur-sm">
        {t("before")}
      </span>
      <span className="absolute top-3 end-3 rounded-full bg-brand-gold/90 px-3 py-1 text-[10px] font-semibold uppercase tracking-wider text-brand-darker backdrop-blur-sm">
        {t("after")}
      </span>

      <div
        aria-hidden
        className="pointer-events-none absolute inset-y-0 -translate-x-1/2 rtl:translate-x-1/2 w-0.5 bg-brand-gold shadow-[0_0_10px_rgba(212,175,55,0.7)]"
        style={{ insetInlineStart: `${value}%` }}
      />
      <div
        aria-hidden
        className="pointer-events-none absolute top-1/2 flex h-9 w-9 -translate-x-1/2 -translate-y-1/2 rtl:translate-x-1/2 items-center justify-center rounded-full border-2 border-brand-gold bg-brand-darker text-brand-gold shadow-glass transition-shadow group-focus-within:ring-4 group-focus-within:ring-brand-gold/50 group-focus-within:ring-offset-2 group-focus-within:ring-offset-brand-darker"
        style={{ insetInlineStart: `${value}%` }}
      >
        <Icon name="unfold_more" className="h-4 w-4" />
      </div>

      <label htmlFor={id} className="sr-only">
        {t("before")} / {t("after")}
      </label>
      <input
        id={id}
        type="range"
        min={0}
        max={100}
        value={value}
        onChange={(event) => setValue(Number(event.target.value))}
        className="absolute inset-0 h-full w-full cursor-ew-resize opacity-0"
      />
    </div>
  );
}
