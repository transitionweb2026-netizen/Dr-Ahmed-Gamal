import type { Bilingual } from "@/types/content";

/**
 * PLACEHOLDER CONTACT INFO — confirmed with the client as a stand-in.
 * One consistent set used everywhere (replaces the mismatched Beverly Hills /
 * London / random-UK-number data found across the legacy pages).
 * Swap every value below for the real clinic details before launch.
 */
export const contactInfo = {
  phone: {
    display: "+20 10 1234 5678",
    href: "tel:+201012345678",
  },
  emergencyPhone: {
    display: "+20 12 2345 6789",
    href: "tel:+201223456789",
  },
  whatsapp: {
    display: "+20 10 1234 5678",
    href: "https://wa.me/201012345678",
  },
  email: {
    display: "info@drahmedgamal.com",
    href: "mailto:info@drahmedgamal.com",
  },
  address: {
    en: "Elite Aesthetics Center, Street 90, Fifth Settlement, New Cairo, Egypt",
    ar: "مركز إيليت للتجميل، شارع 90، التجمع الخامس، القاهرة الجديدة، مصر",
  } satisfies Bilingual,
  mapsUrl:
    "https://www.google.com/maps/search/?api=1&query=" +
    encodeURIComponent("Street 90, Fifth Settlement, New Cairo, Egypt"),
  workingHours: [
    {
      days: { en: "Sunday – Thursday", ar: "الأحد – الخميس" },
      hours: { en: "10:00 AM – 8:00 PM", ar: "١٠:٠٠ ص – ٨:٠٠ م" },
    },
    {
      days: { en: "Saturday", ar: "السبت" },
      hours: { en: "12:00 PM – 6:00 PM (by appointment)", ar: "١٢:٠٠ م – ٦:٠٠ م (بموعد مسبق)" },
    },
    {
      days: { en: "Friday", ar: "الجمعة" },
      hours: { en: "Closed", ar: "مغلق" },
    },
  ] satisfies { days: Bilingual; hours: Bilingual }[],
  /**
   * PLACEHOLDER social links — no real accounts were supplied, but the
   * legacy mockups always showed a "Connect Socially" row/card, so these
   * stand in until real handles are provided. Swap before launch.
   */
  social: {
    instagram: "https://instagram.com/drahmedgamal",
    facebook: "https://facebook.com/drahmedgamal",
  } as Partial<Record<"instagram" | "facebook" | "tiktok" | "youtube", string>>,
};
