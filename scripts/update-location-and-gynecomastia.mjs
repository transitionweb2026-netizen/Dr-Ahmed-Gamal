/**
 * One-off: (1) point contact_info.address/maps_url at the real clinic
 * address supplied by the client, replacing the "Clinics branches"
 * placeholder text and old share.google link; (2) add a 3rd Gynecomastia
 * case back (2 -> 3), with a placeholder before/after pair pending a real
 * patient photo upload via /admin/before-after. Not shipped; run manually
 * via `node scripts/update-location-and-gynecomastia.mjs`.
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

const ADDRESS_AR =
  "عيادة دكتور احمد جمال الدين برهامى لجراحات التجميل، 9 MAGD El-Arab, Sidi Beshr Qebli, Montaza 2, Alexandria Governorate 5517134";
const ADDRESS_EN =
  "Dr. Ahmed Gamal El-Din Borhamy Plastic Surgery Clinic, 9 MAGD El-Arab, Sidi Beshr Qebli, Montaza 2, Alexandria Governorate 5517134";
const MAPS_URL = "https://www.google.com/maps/search/?api=1&query=" + encodeURIComponent(ADDRESS_EN);

async function main() {
  const { error: contactError } = await supabase
    .from("contact_info")
    .update({ address: { en: ADDRESS_EN, ar: ADDRESS_AR }, maps_url: MAPS_URL })
    .eq("id", 1);
  if (contactError) throw contactError;
  console.log("contact_info: address + maps_url updated to the real clinic location");

  const { error: caseError, count } = await supabase
    .from("before_after_cases")
    .insert(
      [
        {
          slug: "gynecomastia-3",
          category: "gynecomastia",
          before_image:
            "https://lh3.googleusercontent.com/aida/AP1WRLvlHgZ8X15tLCT3LAg_cgKixrTXYk3zvYe66_-KZBjtJgjYJwHJI6Xvp3lXADXLNuJGSBTxK1dWd72Cn3w9KuS4e8bsQ8v7WobZzzNm-Oyo1zzUXeP3xt8pUHJsC5jXFWEW7WrIuYQ3dJGSJkya8tZE0kHOO2hzehcIFikSYiHW8VcqdM4xhnVGJsXN9_wxNgJAtttQe0g9WIUjdgvvqwyikYIoWE6PAWlU4GT3yTEe2nVylWWKX3B8Jm54",
          after_image:
            "https://lh3.googleusercontent.com/aida/AP1WRLu8NBBcpModbYhhji6yE9-J4o5z3R7FWp_i9iGiSqMK80tdXeZcsdK9jeD1Oq6VzKma3EkZ5s2Hv7k5oV4A3JdAEtmDvV8EpRMU2bkaityJ83t1RQuioA6qZsTspnZj883EkCI9tqOZS4NtzWkjMVfpsrUgatkyfq48yvf0CjCitLUtQjY-jeqsac4nHPGWgkcCdC791hXli5_53PzN6Cl3u5uZV0jG-SLa-YtSAQLsq0XkYlH-3vPWbaE",
          order_index: 2,
          title: { en: "Puffy Nipple Correction", ar: "علاج انتفاخ الحلمة" },
          subtitle: {
            en: "Reducing localized puffiness for a flatter chest line.",
            ar: "تقليل الانتفاخ الموضعي للحصول على خط صدر أكثر استواءً.",
          },
          angles: [
            {
              image:
                "https://lh3.googleusercontent.com/aida/AP1WRLugtWEqxKGT0olY55IJi1XXZwifRqRavj9-SnM_sjorGMdkLi18zLkgkCoiNQ027d5GYgldZ5pmtr2JQjdguH0rYfYMJ_XRbzlE-cUdnlbk8K_v27qfIH5C709jB0chg6ydTHNjem_uVf46L4c6jq5Fzdg8SNrIKEp4dhKAYP0sW94XLMWpqqjEcdK4HbCrPL6FPC3lkWeJVQyMznulOrY_Ay622WqCl4tpCnsiMBwrYWb53x0IITtHo2t1",
            },
            {
              image:
                "https://lh3.googleusercontent.com/aida/AP1WRLthmfPokURjS1BzaQfLDh2VaAv5f_8osNajTTdI2XbFpqIDzeFZJYko4djfdEV5R-ieprbI6X3kcu2SOKTc9iw00ergXbhEvy4Z5j7QiOYBMela83QXQKnDZOnEyu7c7NxaBrGjhWmKSNYs6O0-eywpNfqcMDl4Pr4GViOkiv9tByO9fU7-uIxqawoi-DFUwX8CDg1SAKhuUC5uK0Kcb3-KMciiuTuNjYdaMRe279Wmqwd1ruLH1DsULIMK",
            },
            {
              image:
                "https://lh3.googleusercontent.com/aida-public/AB6AXuBhDqgAULomLxJP-__CDMsIYLDmnkEC5rfqpah1ixiRPSBEW7fwDYA7SgZSeowaj2MrvJNoHJekddmV_vzvNQaBn1nG6siJvmgpffelyKN7QhHDhsPzJd88eYAyWSti0X3DTthcQEuGu25i8JI8MD256vr3LGCItKZ9S0fQtsK3Oz5nyE9hTfoAMZvUIatEFJ0IayrRxoAdUtKAmgEBrWQCG4Nk6BUHNi1GXH6Lr63jF5Wbhxdye6RxNA",
            },
            {
              image:
                "https://lh3.googleusercontent.com/aida-public/AB6AXuD1p22_Q0si6dhiPM1dov4opfTOuAMZ7EypUiUIMDc8SlUklkkLfTI_gf3M7ud9LYnaavJoScIAcoE4QdER-1ki-A_hyGzvfD9m18hsS3S9-H79ub1cgltsXxzUT3cpMyScXrLcdZpZ2wr7zi4skMSvh1gEoWmnqQQaXC2y-K3V0ruS0pBfSSiNNgce0Ij3scr-2RhXBd4lP2o06HjX4p--ppt07npqY-OquvYMphob8jjP5aTTPMtr8w",
            },
          ],
          show_in_category_gallery: true,
          featured_on_home: false,
          is_published: true,
        },
      ],
      { count: "exact" },
    );
  if (caseError) throw caseError;
  console.log("before_after_cases: inserted", count, "new Gynecomastia card (Puffy Nipple Correction)");
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
