import { getLocale } from "next-intl/server";
import { Icon } from "@/components/Icon";
import { stats } from "@/content/stats";

export async function AchievementStrip() {
  const locale = (await getLocale()) as "en" | "ar";

  return (
    <section className="border-y border-brand-gold/10 bg-brand-darker py-16">
      <div className="mx-auto grid max-w-7xl grid-cols-2 gap-6 px-4 sm:px-6 lg:grid-cols-4 lg:px-8">
        {stats.map((stat) => (
          <div
            key={stat.id}
            className="glass-panel flex flex-col items-center gap-2 rounded-2xl px-4 py-8 text-center"
          >
            <Icon name={stat.icon} className="h-6 w-6 text-brand-gold" />
            <p className="font-serif text-3xl text-brand-light sm:text-4xl">{stat.value}</p>
            <p className="text-xs uppercase tracking-wider text-brand-light/60 sm:text-sm">
              {stat.label[locale]}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}
