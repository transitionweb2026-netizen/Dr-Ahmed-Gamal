import type { Stat } from "@/types/content";

/**
 * Canonical achievement strip — reconciles Home.html's (15+/5k+/98%/5.0) and
 * About.html's (20+/10k+/99%/50+) conflicting numbers into one consistent set.
 */
export const stats: Stat[] = [
  {
    id: "years-experience",
    value: "20+",
    label: { en: "Years Experience", ar: "سنوات الخبرة" },
    icon: "schedule",
  },
  {
    id: "procedures",
    value: "10k+",
    label: { en: "Successful Procedures", ar: "عملية ناجحة" },
    icon: "medical_services",
  },
  {
    id: "happy-patients",
    value: "99%",
    label: { en: "Happy Patients", ar: "نسبة رضا المرضى" },
    icon: "groups",
  },
  {
    id: "patient-rating",
    value: "5.0",
    label: { en: "Patient Rating", ar: "تقييم المرضى" },
    icon: "star",
  },
];
