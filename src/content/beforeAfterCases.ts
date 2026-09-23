import type { BeforeAfterCase } from "@/types/content";

// Face-category pairs (7 genuinely distinct pairs pooled from Home + Cases & Reviews)
const F1_BEFORE = "https://lh3.googleusercontent.com/aida/AP1WRLvlHgZ8X15tLCT3LAg_cgKixrTXYk3zvYe66_-KZBjtJgjYJwHJI6Xvp3lXADXLNuJGSBTxK1dWd72Cn3w9KuS4e8bsQ8v7WobZzzNm-Oyo1zzUXeP3xt8pUHJsC5jXFWEW7WrIuYQ3dJGSJkya8tZE0kHOO2hzehcIFikSYiHW8VcqdM4xhnVGJsXN9_wxNgJAtttQe0g9WIUjdgvvqwyikYIoWE6PAWlU4GT3yTEe2nVylWWKX3B8Jm54";
const F1_AFTER = "https://lh3.googleusercontent.com/aida/AP1WRLu8NBBcpModbYhhji6yE9-J4o5z3R7FWp_i9iGiSqMK80tdXeZcsdK9jeD1Oq6VzKma3EkZ5s2Hv7k5oV4A3JdAEtmDvV8EpRMU2bkaityJ83t1RQuioA6qZsTspnZj883EkCI9tqOZS4NtzWkjMVfpsrUgatkyfq48yvf0CjCitLUtQjY-jeqsac4nHPGWgkcCdC791hXli5_53PzN6Cl3u5uZV0jG-SLa-YtSAQLsq0XkYlH-3vPWbaE";
const F2_BEFORE = "https://lh3.googleusercontent.com/aida/AP1WRLugtWEqxKGT0olY55IJi1XXZwifRqRavj9-SnM_sjorGMdkLi18zLkgkCoiNQ027d5GYgldZ5pmtr2JQjdguH0rYfYMJ_XRbzlE-cUdnlbk8K_v27qfIH5C709jB0chg6ydTHNjem_uVf46L4c6jq5Fzdg8SNrIKEp4dhKAYP0sW94XLMWpqqjEcdK4HbCrPL6FPC3lkWeJVQyMznulOrY_Ay622WqCl4tpCnsiMBwrYWb53x0IITtHo2t1";
const F2_AFTER = "https://lh3.googleusercontent.com/aida/AP1WRLvpiYmhS42zctt9QqauIjONQbNVge5HLnM9f_JMAqkkr0UJhx8ywI4JRyZGH6nVjJ9J5EtPMif-_jCPBj0MpB9L244N5zfiBbroF87wvdZaygRCwZDscshMuVHRDsMMg-k5WjW8pNBjAeUq2a335ff5m345K9Xnw8E8Ti6AbAjM6SsyI_50Ldv-3wtdgg172EdMCbs1JnRBpYSfteYtSBSyGCC9SywL2CPA2r4Kl4GW8Z9-1cG8YCajsVsi";
// Canonical direction (legacy Home.html and Cases&Reviews.html had before/after reversed for this pair — standardized here)
const F3_BEFORE = "https://lh3.googleusercontent.com/aida/AP1WRLthmfPokURjS1BzaQfLDh2VaAv5f_8osNajTTdI2XbFpqIDzeFZJYko4djfdEV5R-ieprbI6X3kcu2SOKTc9iw00ergXbhEvy4Z5j7QiOYBMela83QXQKnDZOnEyu7c7NxaBrGjhWmKSNYs6O0-eywpNfqcMDl4Pr4GViOkiv9tByO9fU7-uIxqawoi-DFUwX8CDg1SAKhuUC5uK0Kcb3-KMciiuTuNjYdaMRe279Wmqwd1ruLH1DsULIMK";
const F3_AFTER = "https://lh3.googleusercontent.com/aida/AP1WRLuXoJnAEMxCq1YwMJabgZJaQ9zpMtpXggioVE--dp_ilQnzOFL32VUgdAyfV0Z0M5-tj6r57Bg1j6btEONriCpUEhbwcjuIuLm1TDRf6kK8AhJ9NAULhttDlcnaDJLupgN9pUdy62sXqEmqYTQOZmGxJXrJbYXdhcIY_fcWEmHN4Xw3AORyS0d05DQeehZo6g_K3LZZsp3XgeHmooR6jDmHLlonnWRk2CqdFBAcliaSJ7LI-HUlCpJj9hfw";
const F4_BEFORE = "https://lh3.googleusercontent.com/aida-public/AB6AXuBhDqgAULomLxJP-__CDMsIYLDmnkEC5rfqpah1ixiRPSBEW7fwDYA7SgZSeowaj2MrvJNoHJekddmV_vzvNQaBn1nG6siJvmgpffelyKN7QhHDhsPzJd88eYAyWSti0X3DTthcQEuGu25i8JI8MD256vr3LGCItKZ9S0fQtsK3Oz5nyE9hTfoAMZvUIatEFJ0IayrRxoAdUtKAmgEBrWQCG4Nk6BUHNi1GXH6Lr63jF5Wbhxdye6RxNA";
const F4_AFTER = "https://lh3.googleusercontent.com/aida-public/AB6AXuDGa_GWe6A3kjzceWaayySE2MqdSF9kD5hTlsAcNJcPAUkCUkfMrWyvbRDWaQEOoG-2sxBuYZSlhO6KbzQYTK12cdocJUS7MSs-I5rwJKCezM5_MxelUdMOeQU4KeQtxg2uSJzZl1FOwRttyP40HTkoLAaOsPZtDQyt3nwEmGydtu9FtBKgbDuG_cj-m2jyAZQOt-yTLIdVvSU2kuZqzLu2T7w29reExHFCZdUF4qJOesysjQixPc1feg";
const F5_BEFORE = "https://lh3.googleusercontent.com/aida-public/AB6AXuD1p22_Q0si6dhiPM1dov4opfTOuAMZ7EypUiUIMDc8SlUklkkLfTI_gf3M7ud9LYnaavJoScIAcoE4QdER-1ki-A_hyGzvfD9m18hsS3S9-H79ub1cgltsXxzUT3cpMyScXrLcdZpZ2wr7zi4skMSvh1gEoWmnqQQaXC2y-K3V0ruS0pBfSSiNNgce0Ij3scr-2RhXBd4lP2o06HjX4p--ppt07npqY-OquvYMphob8jjP5aTTPMtr8w";
const F5_AFTER = "https://lh3.googleusercontent.com/aida-public/AB6AXuAbnYSEnbgx7m2g7MfPY0aQjFXSDC1rk95Id8cqvyJV26Rjg8HSk8bJk6yoUNFeK00aNECRj7Ha7fDgwZlAgjwsXLqVBPVfKA1rmahTs4I7oyzV7cRN2-TPqlWT-lC5i2KuVN99_hcxVapJYQZl9dXFH2T30bancR3SLY2-JPcdt4sCZ-xs3k-kctDZk9GSEJmCyrjkxM3wH81zXVlSOKAc4RhXLkHvFLsv4PWftn6cWBEhdpAAn2_5HA";
const F6_BEFORE = "https://lh3.googleusercontent.com/aida/AP1WRLvzpgpXsfvqJWkp84lN2sV3vfH_F3wjmPQHaTI4PFkUyjcgdpnbTFLxuIc97Cw3gMml32PHV-G2PpvneGPQvfw1Bdw5yhdKkBXlr7YTBS-TbG5ZtTOgDGgJdq7mfycktHcvhzC42seHV7tS-t46LoGZ8VhAT57D1s_2u27vust-j9xo5iD0tlMbhFKifI99ePV5AQ2zVnc2BWSO0CNTeCB7RcvQGSn-13R2AUEfodsDIXE9LtUn5QS5XkJO";
const F6_AFTER = "https://lh3.googleusercontent.com/aida/AP1WRLsuuovF3yMVUlq-B4ip7sp-HJxGMJYLTqHciUQEmHeSP8IuqYaO3gBM3Q7ZF80AXlrevQiJtpy_MgkM9z1kQ8d54Dx85ZJJwmFk4zA-AknIrzdVKdECKrgrEisB7XNZy6N6AS9nLm3i2mFofxwzznvu4Go-96HKE9DRkwAaBdC9lCCy6ZQgXm5EFZNQGhUIlXtgbiquZl2riW-oAf3r_EzPJCo0i6VW3Nho8ja3x04V7Bdh1P1jkovfTYAq";
const F7_BEFORE = "https://lh3.googleusercontent.com/aida/AP1WRLuXlxirl9kyKCi2zau9U5qPJhX_oJVJldW_-aJk9V51_RKfXSInG12iK1-x_-mEM4zTnf3EOchzRrtu-6Lmo-eHay8c6yS4eTXlQDkG2Ma4IK8mh9w6xYp-nqzVL2pWKWPuZe3Mxkv0yDsGUZTnj8COXoSQOqUja8KGb_giM2xvQI0-3L8z_KfTvCJgclZeYEqBeZpN_66Q85m57oGG-gs6hI8CcQFhkklWCsc6wyOos-1QX1UkoDpoKPE";
const F7_AFTER = "https://lh3.googleusercontent.com/aida/AP1WRLsmxLnzoFPO8wD5rIhQgiYLg2hbCgCmW747pJCFgmRMi1H41GXi9yPbNf-exevrY4XW8OXafJ6CI4ni4Xue-oQFrmFrCsMrdy8hgcjlBL6tCP9mgI5I_J7_tKbvvOB_cBWU6RETfKQcnPtoFO4ZSn_L_BL-lFr1NwoPQsCoA3K0twXc34wyDV-pVtMdg4fcDd8F0viA5vgdDfmMgaL3_cyxb9ghEL29s9ncc9OD0Fu-2hjG0Tr3HUYXeAxO";

// Body-category pair (used only by Home's "Body Contouring" featured card)
const B2_BEFORE = "https://lh3.googleusercontent.com/aida-public/AB6AXuBeZgbac4ojzj2byKokz2-WDtMKBYFln99iEd_OVQulqZkM1wkx_x2CFDe4SS8HAppXdBfDJ5huG7kg_tGFY_KMX7vHLNZEXW8ir12hVXZZFpN7MUCOdO99yHZD5cApTHDl1YMNtueRXvI2FeWbBADU_GhKij4U3K2AgWB3CiOoNDTgkkhCB-u3EbhR0aRzn6v3MEE9GDiNTTr5sKKteeXnoT8dy3K0Bz-V-Mix-cAjNLaQ6_KZsQmqOw";
const B2_AFTER = "https://lh3.googleusercontent.com/aida-public/AB6AXuCJQnCxSidxFk5u3Z1usoeb8TPHiPAUvlNhPQeqUdpMZZM13ie5e3f7nd8BxeS0Wl7HYY-iJ0-NYXiE2iqFnroDn7pgBpWrUf38xmvPvx7LWaYXFof_BJCRXHGW-_Xl-I1OrDvkcf_CWB8jNsYcLH0bEjSIGQZzvCAo9upUXkGvUjy-NcKarqN5V9tSi76gJt4Y5xPCy7YK8Q4ep-IymFsbGg-vki1FvPJ6xoBLPpb50YHeOMrVYwbY6w";

// Category → 3 named procedures (nose, gynecomastia, otoplasty) — Arm Lift and
// Cleft Lip were dropped entirely per client request, and the surviving
// categories' card counts were curated (Nose 3→7, Gynecomastia 3→2,
// Otoplasty 3→1). Category here is unrelated to the "Featured on Home"
// cases below — it's only used to group cards into the Before & After
// page's category carousels — so reusing this same small pool of stock
// pairs across categories is fine (see scripts/curate-before-after-cases.mjs,
// the source of truth these mirror).
export const beforeAfterCases: BeforeAfterCase[] = [
  // --- Home page featured preview (6) ---
  {
    id: "home-facelift-neck-lift",
    category: "gynecomastia",
    beforeImage: F4_BEFORE,
    afterImage: F4_AFTER,
    featuredOnHome: true,
    title: { en: "Facelift & Neck Lift", ar: "شد الوجه والرقبة" },
    subtitle: { en: "Natural jawline definition", ar: "تحديد طبيعي لخط الفك" },
  },
  {
    id: "home-rhinoplasty-1",
    category: "nose",
    beforeImage: F5_BEFORE,
    afterImage: F5_AFTER,
    featuredOnHome: true,
    title: { en: "Rhinoplasty", ar: "تجميل الأنف" },
    subtitle: { en: "Refined nasal profile", ar: "ملف أنفي أكثر انسيابية" },
  },
  {
    id: "home-body-contouring",
    category: "gynecomastia",
    beforeImage: B2_BEFORE,
    afterImage: B2_AFTER,
    featuredOnHome: true,
    title: { en: "Body Contouring", ar: "نحت الجسم" },
    subtitle: { en: "Sculpted abdominal area", ar: "منطقة بطن منحوتة" },
  },
  {
    id: "home-facelift",
    category: "otoplasty",
    beforeImage: F6_BEFORE,
    afterImage: F6_AFTER,
    featuredOnHome: true,
    title: { en: "Facelift", ar: "شد الوجه" },
    subtitle: { en: "Significant rejuvenation", ar: "تجديد ملحوظ للشباب" },
  },
  {
    id: "home-rhinoplasty-2",
    category: "nose",
    beforeImage: F7_BEFORE,
    afterImage: F7_AFTER,
    featuredOnHome: true,
    title: { en: "Rhinoplasty", ar: "تجميل الأنف" },
    subtitle: { en: "Refined nasal bridge", ar: "قصبة أنفية أكثر دقة" },
  },
  {
    id: "home-jawline-sculpting",
    category: "otoplasty",
    beforeImage: F3_BEFORE,
    afterImage: F3_AFTER,
    featuredOnHome: true,
    title: { en: "Jawline Sculpting", ar: "نحت خط الفك" },
    subtitle: { en: "Defined jawline", ar: "خط فك محدد المعالم" },
  },

  // --- Before & After page: Nose Cases carousel (7) ---
  {
    id: "nose-1",
    category: "nose",
    showInCategoryGallery: true,
    beforeImage: F1_BEFORE,
    afterImage: F1_AFTER,
    title: { en: "Rhinoplasty", ar: "تجميل الأنف" },
    subtitle: {
      en: "Refined nasal profile for balanced facial harmony.",
      ar: "تحسين ملامح الأنف لتحقيق تناسق طبيعي للوجه.",
    },
  },
  {
    id: "nose-2",
    category: "nose",
    showInCategoryGallery: true,
    beforeImage: F2_BEFORE,
    afterImage: F2_AFTER,
    title: { en: "Nasal Tip Refinement", ar: "تحسين طرف الأنف" },
    subtitle: {
      en: "Subtle reshaping for a naturally elegant tip.",
      ar: "إعادة تشكيل دقيقة للحصول على طرف أنف أنيق وطبيعي.",
    },
  },
  {
    id: "nose-3",
    category: "nose",
    showInCategoryGallery: true,
    beforeImage: F3_BEFORE,
    afterImage: F3_AFTER,
    title: { en: "Nasal Bridge Contouring", ar: "نحت قصبة الأنف" },
    subtitle: {
      en: "Smoothing the bridge for a refined side profile.",
      ar: "تنعيم القصبة لملف جانبي أكثر دقة.",
    },
  },
  {
    id: "nose-4",
    category: "nose",
    showInCategoryGallery: true,
    beforeImage: F4_BEFORE,
    afterImage: F4_AFTER,
    title: { en: "Nose Reshaping", ar: "إعادة تشكيل الأنف" },
    subtitle: {
      en: "A refined, naturally balanced nose shape.",
      ar: "شكل أنف منحوت بتناسق طبيعي.",
    },
  },
  {
    id: "nose-5",
    category: "nose",
    showInCategoryGallery: true,
    beforeImage: F5_BEFORE,
    afterImage: F5_AFTER,
    title: { en: "Deviated Septum Correction", ar: "تصحيح انحراف الحاجز الأنفي" },
    subtitle: {
      en: "Restoring both function and form.",
      ar: "استعادة الوظيفة والمظهر معًا.",
    },
  },
  {
    id: "nose-6",
    category: "nose",
    showInCategoryGallery: true,
    beforeImage: F6_BEFORE,
    afterImage: F6_AFTER,
    title: { en: "Nasal Profile Balancing", ar: "موازنة ملامح الأنف" },
    subtitle: {
      en: "Smoothing the profile for facial harmony.",
      ar: "تنعيم الملف الجانبي لتحقيق تناسق الوجه.",
    },
  },
  {
    id: "nose-7",
    category: "nose",
    showInCategoryGallery: true,
    beforeImage: F7_BEFORE,
    afterImage: F7_AFTER,
    title: { en: "Revision Rhinoplasty", ar: "تجميل الأنف التصحيحي" },
    subtitle: {
      en: "Refining results from a previous procedure.",
      ar: "تحسين نتائج عملية سابقة.",
    },
  },

  // --- Before & After page: Gynecomastia Cases carousel (3) ---
  {
    id: "gynecomastia-1",
    category: "gynecomastia",
    showInCategoryGallery: true,
    beforeImage: F4_BEFORE,
    afterImage: F4_AFTER,
    title: { en: "Gynecomastia Correction", ar: "علاج التثدي" },
    subtitle: {
      en: "Restoring a firmer, more masculine chest contour.",
      ar: "استعادة قوام صدر أكثر تحديدًا وذكورية.",
    },
  },
  {
    id: "gynecomastia-2",
    category: "gynecomastia",
    showInCategoryGallery: true,
    beforeImage: F5_BEFORE,
    afterImage: F5_AFTER,
    title: { en: "Chest Contouring", ar: "نحت الصدر" },
    subtitle: {
      en: "Reducing excess tissue for a natural silhouette.",
      ar: "تقليل الأنسجة الزائدة للحصول على قوام طبيعي.",
    },
  },
  {
    id: "gynecomastia-3",
    category: "gynecomastia",
    showInCategoryGallery: true,
    beforeImage: F1_BEFORE,
    afterImage: F2_AFTER,
    title: { en: "Puffy Nipple Correction", ar: "علاج انتفاخ الحلمة" },
    subtitle: {
      en: "Reducing localized puffiness for a flatter chest line.",
      ar: "تقليل الانتفاخ الموضعي للحصول على خط صدر أكثر استواءً.",
    },
  },

  // --- Before & After page: Otoplasty (Bat Ears) Cases carousel (1) ---
  {
    id: "otoplasty-1",
    category: "otoplasty",
    showInCategoryGallery: true,
    beforeImage: F1_BEFORE,
    afterImage: F1_AFTER,
    title: { en: "Otoplasty", ar: "تجميل الأذن" },
    subtitle: {
      en: "Repositioning prominent ears closer to the head.",
      ar: "إعادة تقريب الأذن البارزة من الرأس.",
    },
  },
];
