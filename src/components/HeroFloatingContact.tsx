import { getTranslations } from "next-intl/server";
import { HeroContactCapsule, type CapsuleLink } from "@/components/HeroContactCapsule";
import { getContactInfo } from "@/services/contactInfo";

/**
 * Single source of truth for the floating phone/social capsule shown on
 * every page's Hero. Config (icons, order, links) mirrors the original Home
 * hero exactly — every page must render the identical component with the
 * identical content; only its position (via HeroContactCapsule's `align`)
 * may vary per page.
 */
export async function HeroFloatingContact({ align = "end" }: { align?: "center" | "start" | "end" }) {
  const social = await getTranslations("social");
  const contactInfo = await getContactInfo();

  // No literal Facebook/Instagram/TikTok icons exist in the icon map —
  // these are the closest available stand-ins, icon-only (labelled via
  // ariaLabel). Real handles only exist for facebook/instagram today;
  // tiktok falls back to "#" until that account is supplied.
  const socialLinks: CapsuleLink[] = [
    { icon: "share", href: contactInfo.social.facebook ?? "#", ariaLabel: social("facebook") },
    { icon: "public", href: contactInfo.social.instagram ?? "#", ariaLabel: social("instagram") },
    { icon: "camera_alt", href: contactInfo.social.tiktok ?? "#", ariaLabel: social("tiktok") },
  ];
  const phoneLink: CapsuleLink[] = [
    { icon: "call", href: contactInfo.phone.href, label: contactInfo.phone.display },
  ];

  return <HeroContactCapsule groups={[socialLinks, phoneLink]} align={align} />;
}
