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

  // Real handles only exist for facebook/instagram today; tiktok falls
  // back to "#" until that account is supplied.
  const socialLinks: CapsuleLink[] = [
    { icon: "facebook", href: contactInfo.social.facebook ?? "#", ariaLabel: social("facebook") },
    { icon: "instagram", href: contactInfo.social.instagram ?? "#", ariaLabel: social("instagram") },
    { icon: "tiktok", href: contactInfo.social.tiktok ?? "#", ariaLabel: social("tiktok") },
  ];
  const phoneLink: CapsuleLink[] = [
    { icon: "call", href: contactInfo.phone.href, label: contactInfo.phone.display },
  ];

  return <HeroContactCapsule groups={[socialLinks, phoneLink]} align={align} />;
}
