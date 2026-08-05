import { getLocale, getTranslations } from "next-intl/server";
import { Icon } from "@/components/Icon";
import { milestones } from "@/content/milestones";
import { cn } from "@/utils/cn";
import type { Milestone } from "@/types/content";

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
    <div className={cn("neon-card rounded-2xl p-6", align === "end" && "lg:text-end")}>
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
    <section className="bg-brand-darker py-24">
      <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
        <h2 className="mb-16 text-center font-serif text-4xl text-brand-light">{t("heading")}</h2>

        <div className="relative space-y-10 lg:space-y-14">
          <div className="absolute start-5 top-0 bottom-0 w-px bg-brand-gold/20 lg:start-1/2" />

          {milestones.map((milestone, i) => {
            const isEven = i % 2 === 0;
            return (
              <div key={milestone.id} className="relative lg:grid lg:grid-cols-2 lg:gap-x-12">
                <span className="absolute start-5 top-6 -ms-4 z-10 flex h-8 w-8 items-center justify-center rounded-full border-2 border-brand-gold bg-brand-darker lg:start-1/2">
                  <Icon name={milestone.icon} className="h-3.5 w-3.5 text-brand-gold" />
                </span>

                <div
                  className={cn("ps-16 lg:ps-0", isEven ? "lg:col-start-1" : "lg:col-start-2")}
                >
                  <MilestoneCard milestone={milestone} locale={locale} align={isEven ? "end" : "start"} />
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
