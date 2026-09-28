/**
 * One-off: add cards to existing before_after_cases categories and seed the
 * 3 brand-new ones (Lip Repair, Eyelid Lifting, Scar Revision) added in
 * migration 0009_before_after_add_categories.sql. Placeholder before/after
 * pairs reused from the existing stock pool, pending real patient photo
 * uploads via /admin/before-after. Not shipped; run manually via
 * `node scripts/add-before-after-cards-2026-09-28.mjs`.
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

function angles(offset, withAfter) {
  return Array.from({ length: 4 }, (_, i) => {
    const pair = pool[(offset + i) % pool.length];
    return withAfter ? { image: pair.before, afterImage: pair.after } : { image: pair.before };
  });
}

function mk(overrides, offset, withAfter) {
  return {
    show_in_category_gallery: true,
    featured_on_home: false,
    is_published: true,
    angles: angles(offset, withAfter),
    ...overrides,
  };
}

const newCases = [
  // Nose: 7 -> 11 (4 new)
  mk(
    {
      slug: "nose-8",
      category: "nose",
      before_image: pool[0].before,
      after_image: pool[0].after,
      order_index: 7,
      title: { en: "Nasal Hump Removal", ar: "إزالة حدبة الأنف" },
      subtitle: { en: "Smoothing the bridge for a straighter profile.", ar: "تنعيم القصبة للحصول على ملف جانبي أكثر استقامة." },
    },
    1,
    true,
  ),
  mk(
    {
      slug: "nose-9",
      category: "nose",
      before_image: pool[1].before,
      after_image: pool[1].after,
      order_index: 8,
      title: { en: "Nostril Reduction", ar: "تصغير فتحتي الأنف" },
      subtitle: { en: "Refining nostril width for facial balance.", ar: "ضبط عرض فتحتي الأنف لتحقيق تناسق الوجه." },
    },
    2,
    true,
  ),
  mk(
    {
      slug: "nose-10",
      category: "nose",
      before_image: pool[2].before,
      after_image: pool[2].after,
      order_index: 9,
      title: { en: "Crooked Nose Correction", ar: "تصحيح اعوجاج الأنف" },
      subtitle: { en: "Straightening the nose for a centered profile.", ar: "تقويم الأنف للحصول على ملف متمركز." },
    },
    3,
    true,
  ),
  mk(
    {
      slug: "nose-11",
      category: "nose",
      before_image: pool[3].before,
      after_image: pool[3].after,
      order_index: 10,
      title: { en: "Nasal Tip Rotation", ar: "تدوير طرف الأنف" },
      subtitle: { en: "Adjusting tip angle for a balanced profile.", ar: "ضبط زاوية طرف الأنف للحصول على ملف متوازن." },
    },
    0,
    true,
  ),

  // Gynecomastia: 3 -> 5 (2 new)
  mk(
    {
      slug: "gynecomastia-4",
      category: "gynecomastia",
      before_image: pool[0].before,
      after_image: pool[0].after,
      order_index: 3,
      title: { en: "Liposuction-Assisted Gynecomastia Surgery", ar: "جراحة التثدي بمساعدة شفط الدهون" },
      subtitle: { en: "Combining excision and liposuction for a flatter chest.", ar: "الجمع بين الاستئصال وشفط الدهون للحصول على صدر أكثر استواءً." },
    },
    1,
    false,
  ),
  mk(
    {
      slug: "gynecomastia-5",
      category: "gynecomastia",
      before_image: pool[1].before,
      after_image: pool[1].after,
      order_index: 4,
      title: { en: "Chest Skin Tightening", ar: "شد جلد الصدر" },
      subtitle: { en: "Removing excess skin for a firmer chest contour.", ar: "إزالة الجلد الزائد للحصول على قوام صدر أكثر شدًا." },
    },
    2,
    false,
  ),

  // Otoplasty (ear): 1 -> 3 (2 new)
  mk(
    {
      slug: "otoplasty-2",
      category: "otoplasty",
      before_image: pool[2].before,
      after_image: pool[2].after,
      order_index: 1,
      title: { en: "Prominent Ear Correction", ar: "تصحيح بروز الأذن" },
      subtitle: { en: "Correcting protruding ears for balanced proportions.", ar: "تصحيح بروز الأذن لتحقيق تناسق طبيعي." },
    },
    3,
    false,
  ),
  mk(
    {
      slug: "otoplasty-3",
      category: "otoplasty",
      before_image: pool[3].before,
      after_image: pool[3].after,
      order_index: 2,
      title: { en: "Ear Pinning", ar: "تثبيت الأذن" },
      subtitle: { en: "Repositioning prominent ears closer to the head.", ar: "إعادة تقريب الأذن البارزة من الرأس." },
    },
    0,
    false,
  ),

  // Lip Repair (new category, 1 card)
  mk(
    {
      slug: "lip-repair-1",
      category: "lip-repair",
      before_image: pool[0].before,
      after_image: pool[0].after,
      order_index: 0,
      title: { en: "Lip Repair", ar: "إصلاح الشفاه" },
      subtitle: { en: "Restoring natural lip shape and function.", ar: "استعادة شكل ووظيفة الشفاه بشكل طبيعي." },
    },
    1,
    false,
  ),

  // Eyelid Lifting (new category, 1 card)
  mk(
    {
      slug: "eyelid-lift-1",
      category: "eyelid-lift",
      before_image: pool[1].before,
      after_image: pool[1].after,
      order_index: 0,
      title: { en: "Eyelid Lift", ar: "شد الجفون" },
      subtitle: { en: "A refreshed, more youthful look around the eyes.", ar: "مظهر منتعش وأكثر شبابًا حول العينين." },
    },
    2,
    false,
  ),

  // Scar Revision (new category, 1 card)
  mk(
    {
      slug: "scar-revision-1",
      category: "scar-revision",
      before_image: pool[2].before,
      after_image: pool[2].after,
      order_index: 0,
      title: { en: "Scar Revision", ar: "تحسين الندبات" },
      subtitle: { en: "Refining the appearance of scars for smoother skin.", ar: "تحسين مظهر الندبات للحصول على بشرة أكثر نعومة." },
    },
    3,
    false,
  ),
];

async function main() {
  const { error, count } = await supabase.from("before_after_cases").insert(newCases, { count: "exact" });
  if (error) throw error;
  console.log("before_after_cases: inserted", count, "new cards");
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
