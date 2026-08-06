import type { Stat } from "@/types/content";

/**
 * Canonical stat pool — reconciles Home.html's achievement strip
 * (15+/5k+/98%/5.0) and About.html's achievement strip (20+/10k+/99%/50+)
 * conflicting numbers into one consistent set of values, keeping every
 * unique 4th-stat topic from both pages ("Patient Rating" from Home,
 * "Advanced Trainings" from About) rather than dropping one. Each page's
 * AchievementStrip picks its own 4-stat subset by id.
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
  {
    id: "advanced-trainings",
    value: "50+",
    label: { en: "Advanced Trainings", ar: "تدريب متقدم" },
    icon: "workspace_premium",
  },
];
