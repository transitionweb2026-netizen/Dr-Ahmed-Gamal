/**
 * One-off curation for before_after_cases after the client asked to:
 * - remove the "Male Chest Reduction" gynecomastia card (3 -> 2)
 * - remove "Ear Pinning" and "Prominent Ear Correction" otoplasty cards (3 -> 1)
 * - add 4 more Nose cases (3 -> 7)
 * (Arm Lift and Cleft Lip were dropped entirely in migration
 * 0007_before_after_drop_categories.sql, which already deleted their rows.)
 * Not shipped; run manually via `node scripts/curate-before-after-cases.mjs`.
 */
import { readFileSync } from "fs";
import { fileURLToPath } from "url";
import path from "path";
import { createClient } from "@supabase/supabase-js";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const envPath = path.join(__dirname, "..", ".env.local");
const env = {};
for (const line of readFileSync(envPath, "utf-8").split("\n")) {
  const trimmed = line.trim();
  if (!trimmed || trimmed.startsWith("#")) continue;
  const eq = trimmed.indexOf("=");
  if (eq === -1) continue;
  env[trimmed.slice(0, eq).trim()] = trimmed.slice(eq + 1).trim();
}

const supabase = createClient(env.NEXT_PUBLIC_SUPABASE_URL, env.SUPABASE_SERVICE_ROLE_KEY, {
  auth: { persistSession: false },
});

const pool = [
  {
    before:
      "https://lh3.googleusercontent.com/aida/AP1WRLvlHgZ8X15tLCT3LAg_cgKixrTXYk3zvYe66_-KZBjtJgjYJwHJI6Xvp3lXADXLNuJGSBTxK1dWd72Cn3w9KuS4e8bsQ8v7WobZzzNm-Oyo1zzUXeP3xt8pUHJsC5jXFWEW7WrIuYQ3dJGSJkya8tZE0kHOO2hzehcIFikSYiHW8VcqdM4xhnVGJsXN9_wxNgJAtttQe0g9WIUjdgvvqwyikYIoWE6PAWlU4GT3yTEe2nVylWWKX3B8Jm54",
    after:
      "https://lh3.googleusercontent.com/aida/AP1WRLu8NBBcpModbYhhji6yE9-J4o5z3R7FWp_i9iGiSqMK80tdXeZcsdK9jeD1Oq6VzKma3EkZ5s2Hv7k5oV4A3JdAEtmDvV8EpRMU2bkaityJ83t1RQuioA6qZsTspnZj883EkCI9tqOZS4NtzWkjMVfpsrUgatkyfq48yvf0CjCitLUtQjY-jeqsac4nHPGWgkcCdC791hXli5_53PzN6Cl3u5uZV0jG-SLa-YtSAQLsq0XkYlH-3vPWbaE",
  },
  {
    before:
      "https://lh3.googleusercontent.com/aida/AP1WRLugtWEqxKGT0olY55IJi1XXZwifRqRavj9-SnM_sjorGMdkLi18zLkgkCoiNQ027d5GYgldZ5pmtr2JQjdguH0rYfYMJ_XRbzlE-cUdnlbk8K_v27qfIH5C709jB0chg6ydTHNjem_uVf46L4c6jq5Fzdg8SNrIKEp4dhKAYP0sW94XLMWpqqjEcdK4HbCrPL6FPC3lkWeJVQyMznulOrY_Ay622WqCl4tpCnsiMBwrYWb53x0IITtHo2t1",
    after:
      "https://lh3.googleusercontent.com/aida/AP1WRLvpiYmhS42zctt9QqauIjONQbNVge5HLnM9f_JMAqkkr0UJhx8ywI4JRyZGH6nVjJ9J5EtPMif-_jCPBj0MpB9L244N5zfiBbroF87wvdZaygRCwZDscshMuVHRDsMMg-k5WjW8pNBjAeUq2a335ff5m345K9Xnw8E8Ti6AbAjM6SsyI_50Ldv-3wtdgg172EdMCbs1JnRBpYSfteYtSBSyGCC9SywL2CPA2r4Kl4GW8Z9-1cG8YCajsVsi",
  },
  {
    before:
      "https://lh3.googleusercontent.com/aida/AP1WRLthmfPokURjS1BzaQfLDh2VaAv5f_8osNajTTdI2XbFpqIDzeFZJYko4djfdEV5R-ieprbI6X3kcu2SOKTc9iw00ergXbhEvy4Z5j7QiOYBMela83QXQKnDZOnEyu7c7NxaBrGjhWmKSNYs6O0-eywpNfqcMDl4Pr4GViOkiv9tByO9fU7-uIxqawoi-DFUwX8CDg1SAKhuUC5uK0Kcb3-KMciiuTuNjYdaMRe279Wmqwd1ruLH1DsULIMK",
    after:
      "https://lh3.googleusercontent.com/aida/AP1WRLuXoJnAEMxCq1YwMJabgZJaQ9zpMtpXggioVE--dp_ilQnzOFL32VUgdAyfV0Z0M5-tj6r57Bg1j6btEONriCpUEhbwcjuIuLm1TDRf6kK8AhJ9NAULhttDlcnaDJLupgN9pUdy62sXqEmqYTQOZmGxJXrJbYXdhcIY_fcWEmHN4Xw3AORyS0d05DQeehZo6g_K3LZZsp3XgeHmooR6jDmHLlonnWRk2CqdFBAcliaSJ7LI-HUlCpJj9hfw",
  },
  {
    before:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuBhDqgAULomLxJP-__CDMsIYLDmnkEC5rfqpah1ixiRPSBEW7fwDYA7SgZSeowaj2MrvJNoHJekddmV_vzvNQaBn1nG6siJvmgpffelyKN7QhHDhsPzJd88eYAyWSti0X3DTthcQEuGu25i8JI8MD256vr3LGCItKZ9S0fQtsK3Oz5nyE9hTfoAMZvUIatEFJ0IayrRxoAdUtKAmgEBrWQCG4Nk6BUHNi1GXH6Lr63jF5Wbhxdye6RxNA",
    after:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuDGa_GWe6A3kjzceWaayySE2MqdSF9kD5hTlsAcNJcPAUkCUkfMrWyvbRDWaQEOoG-2sxBuYZSlhO6KbzQYTK12cdocJUS7MSs-I5rwJKCezM5_MxelUdMOeQU4KeQtxg2uSJzZl1FOwRttyP40HTkoLAaOsPZtDQyt3nwEmGydtu9FtBKgbDuG_cj-m2jyAZQOt-yTLIdVvSU2kuZqzLu2T7w29reExHFCZdUF4qJOesysjQixPc1feg",
  },
];

function angles(offset) {
  return Array.from({ length: 4 }, (_, i) => {
    const pair = pool[(offset + i) % pool.length];
    return { image: pair.before, afterImage: pair.after };
  });
}

async function main() {
  const { error: delError, count: delCount } = await supabase
    .from("before_after_cases")
    .delete({ count: "exact" })
    .in("slug", ["gynecomastia-3", "otoplasty-2", "otoplasty-3"]);
  if (delError) throw delError;
  console.log("before_after_cases: removed", delCount, "cards (Male Chest Reduction, Ear Pinning, Prominent Ear Correction)");

  const newNoseCases = [
    {
      slug: "nose-4",
      category: "nose",
      before_image: pool[0].before,
      after_image: pool[0].after,
      order_index: 3,
      title: { en: "Nose Reshaping", ar: "إعادة تشكيل الأنف" },
      subtitle: {
        en: "A refined, naturally balanced nose shape.",
        ar: "شكل أنف منحوت بتناسق طبيعي.",
      },
      angles: angles(1),
    },
    {
      slug: "nose-5",
      category: "nose",
      before_image: pool[1].before,
      after_image: pool[1].after,
      order_index: 4,
      title: { en: "Deviated Septum Correction", ar: "تصحيح انحراف الحاجز الأنفي" },
      subtitle: {
        en: "Restoring both function and form.",
        ar: "استعادة الوظيفة والمظهر معًا.",
      },
      angles: angles(2),
    },
    {
      slug: "nose-6",
      category: "nose",
      before_image: pool[2].before,
      after_image: pool[2].after,
      order_index: 5,
      title: { en: "Nasal Profile Balancing", ar: "موازنة ملامح الأنف" },
      subtitle: {
        en: "Smoothing the profile for facial harmony.",
        ar: "تنعيم الملف الجانبي لتحقيق تناسق الوجه.",
      },
      angles: angles(3),
    },
    {
      slug: "nose-7",
      category: "nose",
      before_image: pool[3].before,
      after_image: pool[3].after,
      order_index: 6,
      title: { en: "Revision Rhinoplasty", ar: "تجميل الأنف التصحيحي" },
      subtitle: {
        en: "Refining results from a previous procedure.",
        ar: "تحسين نتائج عملية سابقة.",
      },
      angles: angles(0),
    },
  ].map((r) => ({ ...r, show_in_category_gallery: true, featured_on_home: false, is_published: true }));

  const { error: insError, count: insCount } = await supabase
    .from("before_after_cases")
    .insert(newNoseCases, { count: "exact" });
  if (insError) throw insError;
  console.log("before_after_cases: inserted", insCount, "new Nose cases");

  const { error: transError, count: transCount } = await supabase
    .from("translations")
    .delete({ count: "exact" })
    .in("key", ["pages.beforeAfter.groups.arm-lift", "pages.beforeAfter.groups.cleft-lip"]);
  if (transError) throw transError;
  console.log("translations: removed", transCount, "stale arm-lift/cleft-lip group-label rows");
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
