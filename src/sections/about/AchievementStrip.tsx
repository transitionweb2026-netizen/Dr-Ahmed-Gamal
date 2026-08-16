import { getLocale } from "next-intl/server";
import { getStats } from "@/services/stats";

export async function AchievementStrip() {
  const locale = (await getLocale()) as "en" | "ar";
  const stats = await getStats();
  // CMS-controlled per stat ("Featured on About" checkbox, admin: /admin/stats)
  // — Home's own set is controlled by its own "Featured on Home" checkbox,
  // see src/sections/home/AchievementStrip.tsx.
  const aboutStats = stats.filter((stat) => stat.featuredOnAbout);

  return (
    // Overlaps the section above by design (reference: -mt-12), sitting on
    // top of it as a floating strip.
    <section className="relative z-20 -mt-12 mb-12 bg-brand-darker py-12">
      <div className="mx-auto grid max-w-7xl grid-cols-2 gap-4 px-4 sm:px-6 lg:grid-cols-4 lg:gap-8 lg:px-8">
        {aboutStats.map((stat) => (
          <div
            key={stat.id}
            className="glass-panel rounded-xl border border-brand-gold/20 bg-[#1c1a18]/90 p-6 text-center shadow-glass transition duration-300 hover:-translate-y-1"
          >
            <p className="mb-1 font-serif text-3xl text-brand-gold lg:text-4xl">{stat.value}</p>
            <p className="text-[10px] font-medium uppercase tracking-widest text-gray-400 lg:text-xs">
              {stat.label[locale]}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}
