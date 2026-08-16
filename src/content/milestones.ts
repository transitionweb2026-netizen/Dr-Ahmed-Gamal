import type { Milestone } from "@/types/content";

/**
 * Canonical 9-item milestone set — reconciles Home.html's 8-card carousel
 * (categories, no years) with About.html's 4-item dated timeline (years, no
 * categories beyond 4) into one dataset with both, consumed by both a
 * carousel (Home) and a timeline (About). Includes "Private Practice
 * Founded" (2012), the one topic unique to About.html's timeline.
 */
export const milestones: Milestone[] = [
  {
    id: "medical-degree",
    year: "2001",
    title: { en: "Medical Degree", ar: "الدرجة العلمية في الطب" },
    description: {
      en: "Graduated with top honors, establishing the foundation for a career in surgical excellence.",
      ar: "تخرج بمرتبة الشرف الأولى، ليضع الأساس لمسيرة مهنية في التميز الجراحي.",
    },
    icon: "school",
    featuredOnHome: true,
    featuredOnAbout: true,
  },
  {
    id: "advanced-surgical-training",
    year: "2004",
    title: { en: "Advanced Surgical Training", ar: "تدريب جراحي متقدم" },
    description: {
      en: "Completed intensive training in microsurgical techniques for the most delicate reconstructive procedures.",
      ar: "أتم تدريبًا مكثفًا في تقنيات الجراحة المجهرية الدقيقة لأكثر العمليات الترميمية دقة.",
    },
    icon: "medical_services",
    featuredOnHome: true,
    featuredOnAbout: false,
  },
  {
    id: "board-certification",
    year: "2008",
    title: { en: "Board Certification", ar: "الحصول على البورد" },
    description: {
      en: "Achieved board certification in Plastic and Reconstructive Surgery.",
      ar: "حصل على البورد في الجراحة التجميلية والترميمية.",
    },
    icon: "workspace_premium",
    featuredOnHome: true,
    featuredOnAbout: true,
  },
  {
    id: "international-fellowship",
    year: "2010",
    title: { en: "International Fellowship", ar: "الزمالة الدولية" },
    description: {
      en: "Completed an international fellowship mastering advanced reconstructive and aesthetic techniques abroad.",
      ar: "أتم زمالة دولية أتقن خلالها أحدث تقنيات الجراحة الترميمية والتجميلية في الخارج.",
    },
    icon: "public",
    featuredOnHome: true,
    featuredOnAbout: true,
  },
  {
    id: "private-practice-founded",
    year: "2012",
    title: { en: "Private Practice Founded", ar: "تأسيس العيادة الخاصة" },
    description: {
      en: "Opened an independent practice dedicated to personalized, artistry-driven surgical care.",
      ar: "افتتح عيادة خاصة مستقلة مكرَّسة لتقديم رعاية جراحية شخصية تقوم على الحرفية الفنية.",
    },
    icon: "storefront",
    featuredOnHome: false,
    featuredOnAbout: true,
  },
  {
    id: "professional-membership",
    year: "2013",
    title: { en: "Professional Membership", ar: "العضوية المهنية" },
    description: {
      en: "Recognized as a member of the American Society of Plastic Surgeons, upholding the highest standards of patient care.",
      ar: "حصل على عضوية الجمعية الأمريكية لجراحي التجميل، التزامًا بأعلى معايير رعاية المرضى.",
    },
    icon: "groups",
    featuredOnHome: true,
    featuredOnAbout: false,
  },
  {
    id: "facial-surgery-training",
    year: "2016",
    title: { en: "Facial Surgery Training", ar: "تدريب في جراحات الوجه" },
    description: {
      en: "Pursued specialized advanced training in facial anatomy and rejuvenation techniques.",
      ar: "خضع لتدريب متقدم متخصص في تشريح الوجه وتقنيات تجديد الشباب.",
    },
    icon: "face",
    featuredOnHome: true,
    featuredOnAbout: false,
  },
  {
    id: "body-contouring-training",
    year: "2019",
    title: { en: "Body Contouring Training", ar: "تدريب في نحت الجسم" },
    description: {
      en: "Mastered high-definition body contouring methods for precise, natural-looking silhouettes.",
      ar: "أتقن أساليب نحت الجسم عالية الدقة للحصول على قوام طبيعي المظهر.",
    },
    icon: "body_fat",
    featuredOnHome: true,
    featuredOnAbout: false,
  },
  {
    id: "award-recognition",
    year: "2022",
    title: { en: "Award & Recognition", ar: "تكريم وتقدير" },
    description: {
      en: "Honored for an unwavering commitment to exceptional patient care and outcomes.",
      ar: "حصل على تكريم تقديرًا لالتزامه الدائم بتقديم رعاية ونتائج استثنائية للمرضى.",
    },
    icon: "military_tech",
    featuredOnHome: true,
    featuredOnAbout: false,
  },
];
