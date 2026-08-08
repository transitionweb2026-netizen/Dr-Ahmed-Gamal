import { getLocale, getTranslations } from "next-intl/server";
import { milestones } from "@/content/milestones";
import { cn } from "@/utils/cn";
import type { Milestone } from "@/types/content";

// About.html's "Professional Journey" timeline is its own dated 4-item
// subset of the canonical 9-item milestone pool (Home's carousel uses a
// different 8-item subset) — filtered and ordered explicitly here rather
// than in src/content/milestones.ts itself.
const JOURNEY_MILESTONE_IDS = [
  "medical-degree",
  "board-certification",
  "international-fellowship",
  "private-practice-founded",
] as const;

const journeyMilestones = JOURNEY_MILESTONE_IDS.map((id) =>
  milestones.find((milestone) => milestone.id === id),
).filter((milestone): milestone is Milestone => Boolean(milestone));

function MilestoneCard({
  milestone,
  locale,
  align,
}: {
  milestone: Milestone;
  locale: "en" | "ar";
  align: "start" | "end";
}) {
  return (
    <div className={cn("neon-card rounded-2xl p-6", align === "end" && "md:text-end")}>
      <p dir="ltr" className="text-sm font-semibold text-brand-gold/80">
        {milestone.year}
      </p>
      <h3 className="mt-1 font-serif text-lg text-brand-light">{milestone.title[locale]}</h3>
      <p className="mt-2 text-sm leading-relaxed text-brand-light/60">
        {milestone.description[locale]}
      </p>
    </div>
  );
}

export async function JourneyTimeline() {
  const locale = (await getLocale()) as "en" | "ar";
  const t = await getTranslations("pages.about.timeline");

  return (
    <section className="relative overflow-hidden border-t border-brand-gold/10 bg-brand-dark py-24">
      <div className="relative z-10 mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
        <div className="mb-20 text-center">
          <p className="mb-4 text-xs font-semibold uppercase tracking-widest text-brand-gold">
            {t("eyebrow")}
          </p>
          <h2 className="font-serif text-4xl text-brand-light">{t("heading")}</h2>
        </div>

        {/*
          Center-line, alternating layout (About.html's "Professional Journey"
          timeline): a vertical line runs down the middle from md: up, with
          items alternating sides via CSS Grid column placement. Grid line
          numbering follows the container's writing direction, so col-start-1
          lands on the inline-start side automatically in both LTR and RTL —
          no left-/right- hardcoding or dirX() needed. Below md:, everything
          collapses to a single stacked column against a start-aligned line.
        */}
        <div className="relative space-y-10 md:space-y-14">
          <div
            aria-hidden
            className="absolute start-5 top-0 bottom-0 w-0.5 bg-gradient-to-b from-transparent via-brand-gold/50 to-transparent shadow-[0_0_10px_rgba(212,175,55,0.5)] md:start-1/2"
          />

          {journeyMilestones.map((milestone, i) => {
            const isEven = i % 2 === 0;
            return (
              <div
                key={milestone.id}
                className="group relative md:grid md:grid-cols-2 md:items-center md:gap-x-12"
              >
                <span
                  aria-hidden
                  className="timeline-pulse absolute start-5 top-6 -ms-2 z-10 h-4 w-4 rounded-full border-4 border-brand-darker bg-brand-gold md:start-1/2 md:top-1/2 md:-mt-2"
                />

                <div
                  className={cn("ps-16 md:row-start-1 md:ps-0", isEven ? "md:col-start-1" : "md:col-start-2")}
                >
                  <MilestoneCard milestone={milestone} locale={locale} align={isEven ? "end" : "start"} />
                </div>

                <div
                  className={cn(
                    "hidden md:row-start-1 md:block",
                    isEven
                      ? "md:col-start-2 md:ps-12 md:text-start"
                      : "md:col-start-1 md:pe-12 md:text-end",
                  )}
                >
                  <span
                    dir="ltr"
                    className="font-serif text-4xl text-brand-light/40 transition-colors duration-500 group-hover:text-brand-gold"
                  >
                    {milestone.year}
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
