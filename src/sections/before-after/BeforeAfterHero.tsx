import { getTranslations } from "next-intl/server";
import { PageHero } from "@/sections/shared/PageHero";
import { CTAButton } from "@/components/CTAButton";
import { Icon } from "@/components/Icon";
import { getContactInfo } from "@/services/contactInfo";
import type { IconName } from "@/constants/iconMap";

const HERO_IMAGE =
  "https://lh3.googleusercontent.com/aida-public/AB6AXuDreGDi5Tk5vPjyM0FkzujGOSivDoOuN6JzhgfqEyk82twgar9ZlVqQA8Mxuj9Pa3d71I0psf0deXNczx2CxGQpwqV33pqQeMK71vqiEqpJcJTLchBjn_aYnXoOktF9ukPzQecONsikmXGtafgZTiq5Qip0u8gS1olO7gD8CaYPVVhiVsd-kDIWYuAYirx2zOnpyeamKfQArfQzitgUywx4SaZq4drgSVwtkDn59R4bugr-dkoaoHWRDQ";

export async function BeforeAfterHero() {
  const t = await getTranslations("pages.beforeAfter.hero");
  const cta = await getTranslations("cta");
  const contactInfo = await getContactInfo();

  // Legacy's "Floating Social Capsule" (fixed right-6 top-1/2, flex-col) — a
  // page-specific vertical variant of the standard bottom-center
  // HeroContactCapsule, so it's built bespoke here rather than reusing that
  // component's (horizontal, bottom-anchored) container.
  const capsuleLinks: { icon: IconName; href: string; ariaLabel: string }[] = [
    { icon: "share", href: contactInfo.social.instagram ?? "#", ariaLabel: t("capsule.share") },
    { icon: "photo_camera", href: "#results", ariaLabel: t("capsule.gallery") },
    { icon: "play_circle", href: "/videos", ariaLabel: t("capsule.videos") },
    { icon: "chat", href: contactInfo.whatsapp.href, ariaLabel: cta("whatsapp") },
    { icon: "call", href: contactInfo.phone.href, ariaLabel: cta("callNow") },
  ];

  return (
    <PageHero
      image={HERO_IMAGE}
      fullHeight
      title={
        <>
          {t("titleLine1")}{" "}
          <span className="bg-gradient-to-b from-brand-gold via-[#a67c00] to-[#5c4000] bg-clip-text text-transparent">
            {t("titleLine2")}
          </span>
        </>
      }
      paragraph={t("paragraph")}
      capsule={
        <div
          className="glass-panel fixed end-6 top-1/2 z-40 flex -translate-y-1/2 flex-col items-center gap-4 rounded-full p-3 shadow-2xl"
          style={{ background: "rgba(26, 18, 11, 0.6)", backdropFilter: "blur(20px)" }}
        >
          {capsuleLinks.map((link) => (
            <a
              key={link.icon}
              href={link.href}
              aria-label={link.ariaLabel}
              className="flex items-center text-brand-gold transition-all duration-300 hover:scale-110 hover:text-brand-light"
            >
              <Icon name={link.icon} className="h-5 w-5" />
            </a>
          ))}
        </div>
      }
    >
      <CTAButton href="/contact" variant="flat" size="lg">
        {cta("bookNow")}
      </CTAButton>
    </PageHero>
  );
}
