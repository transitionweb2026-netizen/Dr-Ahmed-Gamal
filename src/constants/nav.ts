import type { Bilingual } from "@/types/content";

export interface NavLink {
  href: string;
  label: Bilingual;
}

/** Static fallback used when the CMS is unreachable — see src/services/navLinks.ts. */
export const navLinks: NavLink[] = [
  { href: "/", label: { en: "Home", ar: "الرئيسية" } },
  { href: "/about", label: { en: "About", ar: "عن الطبيب" } },
  { href: "/procedures", label: { en: "Procedures", ar: "الإجراءات" } },
  { href: "/before-after", label: { en: "Before & After", ar: "قبل وبعد" } },
  { href: "/patient-stories", label: { en: "Patient Stories", ar: "قصص المرضى" } },
  { href: "/videos", label: { en: "Videos", ar: "الفيديوهات" } },
  { href: "/articles", label: { en: "Articles", ar: "المقالات" } },
  { href: "/faq", label: { en: "FAQ", ar: "الأسئلة الشائعة" } },
  { href: "/contact", label: { en: "Contact", ar: "تواصل معنا" } },
];
