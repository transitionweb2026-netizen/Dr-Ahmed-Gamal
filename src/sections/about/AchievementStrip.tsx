import { getLocale } from "next-intl/server";
import { Icon } from "@/components/Icon";
import { stats } from "@/content/stats";

// About.html's own 4-stat set (years / procedures / happy patients /
// advanced trainings) — Home.html's set swaps in "Patient Rating" for the
// 4th stat instead, see src/sections/home/AchievementStrip.tsx.
const ABOUT_STAT_IDS = ["years-experience", "procedures", "happy-patients", "advanced-trainings"];
const aboutStats = stats.filter((stat) => ABOUT_STAT_IDS.includes(stat.id));

export async function AchievementStrip() {
  const locale = (await getLocale()) as "en" | "ar";

  return (
    <section className="bg-brand-darker py-16">
      <div className="mx-auto grid max-w-7xl grid-cols-2 gap-4 px-4 sm:px-6 lg:grid-cols-4 lg:gap-8 lg:px-8">
        {aboutStats.map((stat) => (
          <div
            key={stat.id}
            className="flex flex-col items-center gap-2 rounded-xl border border-brand-gold/20 bg-[#1c1a18]/90 p-6 text-center shadow-glass backdrop-blur-md transition duration-300 hover:-translate-y-1"
          >
            <Icon name={stat.icon} className="h-6 w-6 text-brand-gold" />
            <p className="font-serif text-3xl text-brand-gold lg:text-4xl">{stat.value}</p>
            <p className="text-[10px] font-medium uppercase tracking-widest text-brand-light/60 lg:text-xs">
              {stat.label[locale]}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}
