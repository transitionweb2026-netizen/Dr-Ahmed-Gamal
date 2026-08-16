import type { IconName } from "@/constants/iconMap";

export interface Bilingual<T = string> {
  en: T;
  ar: T;
}

export type ProcedureCategory = "face" | "body" | "breast" | "non-surgical";

export interface FaqEntry {
  question: Bilingual;
  answer: Bilingual;
}

export interface Procedure {
  slug: string;
  name: Bilingual;
  shortDescription: Bilingual;
  category: ProcedureCategory;
  icon: IconName;
  image: string;
  featuredOnHome?: boolean;
  order: number;
  detail: {
    overview: Bilingual;
    recovery: Bilingual;
    faq: FaqEntry[];
  };
}

export type CaseCategory = "face" | "body" | "breast";

export interface BeforeAfterCase {
  id: string;
  title: Bilingual;
  subtitle: Bilingual;
  category: CaseCategory;
  beforeImage: string;
  afterImage: string;
  featuredOnHome?: boolean;
  showInCategoryGallery?: boolean;
}

export interface Testimonial {
  id: string;
  name: string;
  quote: Bilingual;
  rating: number;
  procedureSlug?: string;
  procedureName?: Bilingual;
  featuredOnHome?: boolean;
}

export interface Milestone {
  id: string;
  year: string;
  title: Bilingual;
  description: Bilingual;
  icon: IconName;
  featuredOnHome?: boolean;
  featuredOnAbout?: boolean;
}

export interface Article {
  slug: string;
  title: Bilingual;
  excerpt: Bilingual;
  body: Bilingual;
  category: Bilingual;
  publishedAt: string;
  readTimeMinutes: number;
  image: string;
  featured?: boolean;
}

export type VideoType = "educational" | "patient_story";

export interface Video {
  id: string;
  title: Bilingual;
  category: Bilingual;
  thumbnail: string;
  youtubeId?: string;
  vimeoId?: string;
  aspect?: "9:16" | "16:9";
  videoType?: VideoType;
}

export interface FaqItem {
  id: string;
  question: Bilingual;
  answer: Bilingual;
}

export interface Stat {
  id: string;
  value: string;
  label: Bilingual;
  icon: IconName;
  featuredOnHome?: boolean;
  featuredOnAbout?: boolean;
}

export interface ChecklistItem {
  id: string;
  text: Bilingual;
  icon: IconName;
}
