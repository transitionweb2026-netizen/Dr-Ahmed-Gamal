/**
 * One-off seed for before_after_cases.angles — populates 4 placeholder
 * angle views per existing case (Nose cases get a before/after pair per
 * angle; every other category gets a single photo per angle), reusing the
 * same stock image pool as scripts/seed-before-after-cases.mjs, pending
 * real angle photos uploaded via /admin/before-after. Not shipped; run
 * manually via `node scripts/seed-before-after-angles.mjs`.
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
  {
    before:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuD1p22_Q0si6dhiPM1dov4opfTOuAMZ7EypUiUIMDc8SlUklkkLfTI_gf3M7ud9LYnaavJoScIAcoE4QdER-1ki-A_hyGzvfD9m18hsS3S9-H79ub1cgltsXxzUT3cpMyScXrLcdZpZ2wr7zi4skMSvh1gEoWmnqQQaXC2y-K3V0ruS0pBfSSiNNgce0Ij3scr-2RhXBd4lP2o06HjX4p--ppt07npqY-OquvYMphob8jjP5aTTPMtr8w",
    after:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuAbnYSEnbgx7m2g7MfPY0aQjFXSDC1rk95Id8cqvyJV26Rjg8HSk8bJk6yoUNFeK00aNECRj7Ha7fDgwZlAgjwsXLqVBPVfKA1rmahTs4I7oyzV7cRN2-TPqlWT-lC5i2KuVN99_hcxVapJYQZl9dXFH2T30bancR3SLY2-JPcdt4sCZ-xs3k-kctDZk9GSEJmCyrjkxM3wH81zXVlSOKAc4RhXLkHvFLsv4PWftn6cWBEhdpAAn2_5HA",
  },
  {
    before:
      "https://lh3.googleusercontent.com/aida/AP1WRLvzpgpXsfvqJWkp84lN2sV3vfH_F3wjmPQHaTI4PFkUyjcgdpnbTFLxuIc97Cw3gMml32PHV-G2PpvneGPQvfw1Bdw5yhdKkBXlr7YTBS-TbG5ZtTOgDGgJdq7mfycktHcvhzC42seHV7tS-t46LoGZ8VhAT57D1s_2u27vust-j9xo5iD0tlMbhFKifI99ePV5AQ2zVnc2BWSO0CNTeCB7RcvQGSn-13R2AUEfodsDIXE9LtUn5QS5XkJO",
    after:
      "https://lh3.googleusercontent.com/aida/AP1WRLsuuovF3yMVUlq-B4ip7sp-HJxGMJYLTqHciUQEmHeSP8IuqYaO3gBM3Q7ZF80AXlrevQiJtpy_MgkM9z1kQ8d54Dx85ZJJwmFk4zA-AknIrzdVKdECKrgrEisB7XNZy6N6AS9nLm3i2mFofxwzznvu4Go-96HKE9DRkwAaBdC9lCCy6ZQgXm5EFZNQGhUIlXtgbiquZl2riW-oAf3r_EzPJCo0i6VW3Nho8ja3x04V7Bdh1P1jkovfTYAq",
  },
  {
    before:
      "https://lh3.googleusercontent.com/aida/AP1WRLuXlxirl9kyKCi2zau9U5qPJhX_oJVJldW_-aJk9V51_RKfXSInG12iK1-x_-mEM4zTnf3EOchzRrtu-6Lmo-eHay8c6yS4eTXlQDkG2Ma4IK8mh9w6xYp-nqzVL2pWKWPuZe3Mxkv0yDsGUZTnj8COXoSQOqUja8KGb_giM2xvQI0-3L8z_KfTvCJgclZeYEqBeZpN_66Q85m57oGG-gs6hI8CcQFhkklWCsc6wyOos-1QX1UkoDpoKPE",
    after:
      "https://lh3.googleusercontent.com/aida/AP1WRLsmxLnzoFPO8wD5rIhQgiYLg2hbCgCmW747pJCFgmRMi1H41GXi9yPbNf-exevrY4XW8OXafJ6CI4ni4Xue-oQFrmFrCsMrdy8hgcjlBL6tCP9mgI5I_J7_tKbvvOB_cBWU6RETfKQcnPtoFO4ZSn_L_BL-lFr1NwoPQsCoA3K0twXc34wyDV-pVtMdg4fcDd8F0viA5vgdDfmMgaL3_cyxb9ghEL29s9ncc9OD0Fu-2hjG0Tr3HUYXeAxO",
  },
  {
    before:
      "https://lh3.googleusercontent.com/aida/AP1WRLtsZcIKgBV4xvkA1II32vkJ-3jl7uka5cX3bgdLLCmyK36ir2I9BEn5JmhoSGiSDcUsSrsqa_SWk-8wSxtyh7mYYnypyWM2MuE9To3WgHsYUU259eEsH-Wl9OC9Zk0lY7frVMNdf23ooQyrIfp_y2rFsZJKgo7ScmwQXM6FCV_BM7S1hdFqsbSZwc3V7QhlfYmXqssS7MRYIr5gu6a1EBW2yiJgBzczJOKeSqjem_ZryocQ_ErL9LboivAz",
    after:
      "https://lh3.googleusercontent.com/aida/AP1WRLvWGHraHbJV88T6daPqMCZcXkTWykgBKYq---IxaAdzivp40_aRSCFhopluUR4AGUoQ5dHZnZEDnIlVAtPvr40GlS8VdX7wSmd2DHWKY5kVqHnPYleyI9uDOAPZ7gBNH_J8kUMvoPGZLfp7dvJI_s6f3HYWq42LX_M0lSD7tSIpTxLCi9JOLY71UuS2Fjs6mLWEhBojU5nf_GLIX2P0t5sqqlFl2age15JJv-SYg675jbaJxuhmnNzu3qkp",
  },
  {
    before:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuBeZgbac4ojzj2byKokz2-WDtMKBYFln99iEd_OVQulqZkM1wkx_x2CFDe4SS8HAppXdBfDJ5huG7kg_tGFY_KMX7vHLNZEXW8ir12hVXZZFpN7MUCOdO99yHZD5cApTHDl1YMNtueRXvI2FeWbBADU_GhKij4U3K2AgWB3CiOoNDTgkkhCB-u3EbhR0aRzn6v3MEE9GDiNTTr5sKKteeXnoT8dy3K0Bz-V-Mix-cAjNLaQ6_KZsQmqOw",
    after:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuCJQnCxSidxFk5u3Z1usoeb8TPHiPAUvlNhPQeqUdpMZZM13ie5e3f7nd8BxeS0Wl7HYY-iJ0-NYXiE2iqFnroDn7pgBpWrUf38xmvPvx7LWaYXFof_BJCRXHGW-_Xl-I1OrDvkcf_CWB8jNsYcLH0bEjSIGQZzvCAo9upUXkGvUjy-NcKarqN5V9tSi76gJt4Y5xPCy7YK8Q4ep-IymFsbGg-vki1FvPJ6xoBLPpb50YHeOMrVYwbY6w",
  },
];

function noseAngles(offset) {
  return Array.from({ length: 4 }, (_, i) => {
    const pair = pool[(offset + i) % pool.length];
    return { image: pair.before, afterImage: pair.after };
  });
}

function singleAngles(offset) {
  return Array.from({ length: 4 }, (_, i) => {
    const pair = pool[(offset + i) % pool.length];
    return { image: pair.before };
  });
}

const updates = [
  { slug: "nose-1", angles: noseAngles(0) },
  { slug: "nose-2", angles: noseAngles(1) },
  { slug: "nose-3", angles: noseAngles(2) },
  { slug: "gynecomastia-1", angles: singleAngles(3) },
  { slug: "gynecomastia-2", angles: singleAngles(4) },
  { slug: "gynecomastia-3", angles: singleAngles(5) },
  { slug: "arm-lift-1", angles: singleAngles(6) },
  { slug: "arm-lift-2", angles: singleAngles(7) },
  { slug: "arm-lift-3", angles: singleAngles(0) },
  { slug: "cleft-lip-1", angles: singleAngles(1) },
  { slug: "cleft-lip-2", angles: singleAngles(2) },
  { slug: "cleft-lip-3", angles: singleAngles(3) },
  { slug: "otoplasty-1", angles: singleAngles(4) },
  { slug: "otoplasty-2", angles: singleAngles(5) },
  { slug: "otoplasty-3", angles: singleAngles(6) },
];

async function main() {
  const results = await Promise.all(
    updates.map(({ slug, angles }) => supabase.from("before_after_cases").update({ angles }).eq("slug", slug)),
  );
  const failed = results.find((r) => r.error);
  if (failed?.error) throw failed.error;
  console.log(`before_after_cases: seeded angles for ${updates.length} rows`);
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
