import { getLocale } from "next-intl/server";
import { stats } from "@/content/stats";

// Home.html's own 4-stat set (years / procedures / happy patients / patient
// rating) — About.html's set uses a different 4th stat, see
// src/sections/about/AchievementStrip.tsx.
const homeStats = stats.filter((stat) => stat.id !== "advanced-trainings");

export async function AchievementStrip() {
  const locale = (await getLocale()) as "en" | "ar";

  return (
    <section className="border-y border-brand-gold/10 bg-brand-dark py-16">
      <div className="mx-auto grid max-w-7xl grid-cols-2 gap-8 px-4 sm:px-6 lg:grid-cols-4 lg:px-8">
        {homeStats.map((stat) => (
          <div
            key={stat.id}
            className="glass-panel rounded-lg p-8 text-center shadow-glass transition duration-500 hover:-translate-y-2"
          >
            <p className="mb-2 font-serif text-4xl text-brand-gold lg:text-5xl">{stat.value}</p>
            <p className="text-xs font-medium uppercase tracking-widest text-gray-400">
              {stat.label[locale]}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}
