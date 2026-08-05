"use client";

import { useLocale } from "next-intl";

export type Direction = "ltr" | "rtl";

export function useDirection(): Direction {
  const locale = useLocale();
  return locale === "ar" ? "rtl" : "ltr";
}

/** Flips the sign of an x-axis offset/transform value when direction is RTL. */
export function dirX(dir: Direction, value: number): number {
  return dir === "rtl" ? -value : value;
}
