import { Libre_Caslon_Text, Montserrat, Amiri, Tajawal } from "next/font/google";

export const serifEn = Libre_Caslon_Text({
  variable: "--font-serif-en",
  subsets: ["latin"],
  weight: ["400", "700"],
  style: ["normal", "italic"],
  display: "swap",
});

export const sansEn = Montserrat({
  variable: "--font-sans-en",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
  display: "swap",
});

export const serifAr = Amiri({
  variable: "--font-serif-ar",
  subsets: ["arabic"],
  weight: ["400", "700"],
  style: ["normal", "italic"],
  display: "swap",
});

export const sansAr = Tajawal({
  variable: "--font-sans-ar",
  subsets: ["arabic"],
  // Tajawal has no weight 600; 700 is the nearest available weight and the
  // browser maps font-weight:600 (Tailwind's font-semibold) to it automatically.
  weight: ["300", "400", "500", "700"],
  display: "swap",
});

export const fontVariables = `${serifEn.variable} ${sansEn.variable} ${serifAr.variable} ${sansAr.variable}`;
