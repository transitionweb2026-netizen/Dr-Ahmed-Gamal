import { getLocale, getTranslations } from "next-intl/server";
import { Carousel } from "@/components/Carousel";
import { Icon } from "@/components/Icon";
import { getMilestones } from "@/services/milestones";

export async function MilestonesCarousel() {
  const locale = (await getLocale()) as "en" | "ar";
  const t = await getTranslations("pages.home.milestones");
  const milestones = await getMilestones();

  // CMS-controlled per milestone ("Featured on Home" checkbox, admin:
  // /admin/milestones) — About's timeline uses its own "Featured on About"
  // checkbox, see src/sections/about/JourneyTimeline.tsx.
  const homeMilestones = milestones.filter((m) => m.featuredOnHome);

  return (
    <section
      className="relative overflow-hidden py-24"
      style={{ background: "radial-gradient(circle at center, #2a1a0f 0%, #0e0905 100%)" }}
    >
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute inset-0 bg-[radial-gradient(rgba(212,175,55,0.05)_1px,transparent_1px)] opacity-30 [background-size:40px_40px]" />
        <div className="absolute inset-0 shadow-[inset_0_0_150px_rgba(0,0,0,0.8)]" />
      </div>

      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-16 text-center">
          <p className="mb-4 text-xs font-semibold uppercase tracking-[0.3em] text-brand-gold opacity-80">
            {t("eyebrow")}
          </p>
          <div className="mb-4 flex items-center justify-center gap-6">
            <div className="h-px w-12 bg-gradient-to-r from-transparent via-brand-gold/40 to-transparent shadow-[0_0_8px_rgba(212,175,55,0.3)]" />
            <h2 className="bg-gradient-to-b from-brand-gold via-[#a67c00] to-[#5c4000] bg-clip-text font-serif text-3xl text-transparent drop-shadow-[0_2px_10px_rgba(212,175,55,0.2)] md:text-4xl lg:text-5xl">
              {t("heading")}
            </h2>
            <div className="h-px w-12 bg-gradient-to-l from-transparent via-brand-gold/40 to-transparent shadow-[0_0_8px_rgba(212,175,55,0.3)]" />
          </div>
          <p className="mx-auto max-w-2xl font-light tracking-wide text-gray-400">{t("subtitle")}</p>
        </div>

        {/* Carousel's shared pagination dots render pill indicators
            (w-6/w-2 h-2); the HTML reference uses small circles (w-2.5 h-2.5)
            with an active glow shadow instead. Not exposed as a prop on the
            shared Carousel, so left as the component's default per the
            shared-foundation ownership boundary rather than forked here. */}
        <Carousel
          ariaLabel={t("heading")}
          slideBasisClassName="basis-full sm:basis-1/2 lg:basis-1/3"
          navButtonClassName="h-14 w-14 border-brand-gold/40 bg-[#1a120a]/80 shadow-[0_0_20px_rgba(212,175,55,0.2)] backdrop-blur-md"
        >
          {homeMilestones.map((milestone) => (
            <div
              key={milestone.id}
              className="relative flex aspect-[4/3] flex-col items-center justify-center rounded-xl border border-brand-gold/30 bg-brand-darker p-8 text-center shadow-[0_20px_50px_rgba(0,0,0,0.5),inset_0_0_20px_rgba(212,175,55,0.05)]"
            >
              <Icon name={milestone.icon} className="mb-4 h-16 w-16 text-brand-gold/40" />
              <h3 className="mb-2 font-serif text-xl text-brand-light">{milestone.title[locale]}</h3>
              <p className="line-clamp-1 text-xs uppercase tracking-widest text-gray-400">
                {milestone.description[locale]}
              </p>
            </div>
          ))}
        </Carousel>
      </div>
    </section>
  );
}
