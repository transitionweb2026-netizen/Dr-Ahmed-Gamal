import { site } from "@/constants/site";
import type { getContactInfo } from "@/services/contactInfo";
import type { Article, FaqItem, Video } from "@/types/content";

type Locale = "en" | "ar";
// eslint-disable-next-line @typescript-eslint/no-explicit-any
type JsonLd = Record<string, any>;

function absoluteUrl(path: string): string {
  return `${site.url}${path}`;
}

/** Combined Physician + MedicalBusiness schema, rendered site-wide from the
 * root layout — takes the already-CMS-resolved contact info (with its own
 * static-fallback baked in) rather than importing the static constant
 * directly, so this stays in sync with whatever's edited in the CMS. */
export function buildPhysicianSchema(
  locale: Locale,
  contactInfo: Awaited<ReturnType<typeof getContactInfo>>,
): JsonLd {
  return {
    "@context": "https://schema.org",
    "@type": ["Physician", "MedicalBusiness"],
    name: site.name,
    image: site.logoUrl,
    url: absoluteUrl(`/${locale}`),
    telephone: contactInfo.phone.display,
    email: contactInfo.email.display,
    medicalSpecialty: "PlasticSurgery",
    address: {
      "@type": "PostalAddress",
      streetAddress: contactInfo.address[locale],
      addressCountry: "EG",
    },
    openingHoursSpecification: contactInfo.workingHours
      .filter((entry) => entry.hours.en.toLowerCase() !== "closed")
      .map((entry) => ({
        "@type": "OpeningHoursSpecification",
        dayOfWeek: entry.days.en,
        description: entry.hours[locale],
      })),
  };
}

export function buildBreadcrumbSchema(items: { name: string; path: string }[], locale: Locale): JsonLd {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: absoluteUrl(`/${locale}${item.path}`),
    })),
  };
}

export function buildFaqPageSchema(items: FaqItem[], locale: Locale): JsonLd {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: items.map((item) => ({
      "@type": "Question",
      name: item.question[locale],
      acceptedAnswer: {
        "@type": "Answer",
        text: item.answer[locale],
      },
    })),
  };
}

export function buildBlogPostingSchema(article: Article, locale: Locale): JsonLd {
  return {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: article.title[locale],
    description: article.excerpt[locale],
    image: article.image,
    datePublished: article.publishedAt,
    author: {
      "@type": "Person",
      name: site.name,
    },
    publisher: {
      "@type": "Organization",
      name: site.name,
      logo: { "@type": "ImageObject", url: site.logoUrl },
    },
    mainEntityOfPage: absoluteUrl(`/${locale}/articles/${article.slug}`),
  };
}

/** Omits contentUrl/embedUrl gracefully when no real video source exists yet. */
export function buildVideoObjectSchema(video: Video, locale: Locale): JsonLd {
  const schema: JsonLd = {
    "@context": "https://schema.org",
    "@type": "VideoObject",
    name: video.title[locale],
    description: video.title[locale],
    thumbnailUrl: video.thumbnail,
  };

  if (video.youtubeId) {
    schema.embedUrl = `https://www.youtube-nocookie.com/embed/${video.youtubeId}`;
  } else if (video.vimeoId) {
    schema.embedUrl = `https://player.vimeo.com/video/${video.vimeoId}`;
  }

  return schema;
}
